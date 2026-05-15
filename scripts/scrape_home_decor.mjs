import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const CATEGORY_URL = 'https://globus-china.com/store/decor-and-accessories/home-decor';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function fetchProduct(id) {
  const url = `https://globus-china.com/products/${id}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      }
    });

    if (!res.ok) return null;
    const html = await res.text();

    const name = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1]?.replace(/ \| Globus.*$/, '').trim() || 'Unknown';
    const description = html.match(/<meta property="og:description" content="([^"]+)"/)?.[1]?.trim() || '';
    
    // Price extraction
    const priceJsonMatch = html.match(/"price"\s*:\s*"?([0-9,.]+)"?/);
    const priceFromText = html.match(/from\s*\$\s*([\d,]+)/i)?.[1] ?? html.match(/\$\s*([\d,]+)/)?.[1];
    let price = 'Contact for price';
    if (priceJsonMatch) {
      price = `$${Number(priceJsonMatch[1].replace(',','')).toLocaleString()}`;
    } else if (priceFromText) {
      price = `$${priceFromText}`;
    }

    // Improved Image extraction: Find all CDN images and filter for product ones
    const allImgMatches = [...html.matchAll(/(?:src|data-src|data-lazy-src|content)="(https?:\/\/[^"]*(?:cdn|img|media|upload|static)[^"]*\.(?:jpg|jpeg|webp|png)(?:\?[^"]*)?[^"]*)"/gi)];
    const allImgSrcs = [...new Set(allImgMatches.map(m => m[1]))];
    
    const productImages = allImgSrcs.filter(url => {
      const lower = url.toLowerCase();
      return !lower.includes('logo') 
          && !lower.includes('icon') 
          && !lower.includes('avatar')
          && (lower.includes('product') || lower.includes('item') || lower.includes('catalog') || lower.includes('upload') || lower.includes('cdn') || url.includes(id));
    });

    // Fallback order: First filtered product image, then og:image
    const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] || '';
    const image = productImages[0] || ogImage;

    return { id, name, description, price, image };
  } catch (err) {
    console.error(`Error fetching ${id}: ${err.message}`);
    return null;
  }
}

async function scrape() {
  console.log(`Fetching category: ${CATEGORY_URL}`);
  const res = await fetch(CATEGORY_URL);
  const html = await res.text();

  // Find product IDs (links like /products/123456)
  const idMatches = [...html.matchAll(/\/products\/(\d+)/g)];
  const ids = [...new Set(idMatches.map(m => m[1]))];
  console.log(`Found ${ids.length} product IDs.`);

  const products = [];
  for (const id of ids.slice(0, 20)) { // Limit to 20 for safety
    console.log(`Scraping product ${id}...`);
    const details = await fetchProduct(id);
    if (details) products.push(details);
    await new Promise(r => setTimeout(r, 500)); // Be polite
  }

  // Convert to CSV
  const csvRows = [
    ['ID', 'Item Name', 'Description', 'Price', 'Image'],
    ...products.map(p => [
      `"${p.id}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.description.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${p.price}"`,
      `"${p.image}"`
    ])
  ];

  const csvContent = csvRows.map(row => row.join(',')).join('\n');
  const outPath = path.join(__dirname, '..', 'src', 'data', 'home_decor.csv');
  
  if (!fs.existsSync(path.dirname(outPath))) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
  }

  fs.writeFileSync(outPath, csvContent, 'utf-8');
  console.log(`Saved ${products.length} products to ${outPath}`);
}

scrape().catch(console.error);
