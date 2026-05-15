/**
 * Globus China product scraper
 * Fetches product detail pages and extracts: name, price, brand, description, image gallery, specs
 */

const PRODUCTS_TO_SCRAPE = [
  // --- Decor & Accessories ---
  { id: '167080', name: 'Carpet Gabinetti',            category: 'Decor & Accessories' },
  { id: '121846', name: 'Mirror Quinarra',              category: 'Decor & Accessories' },
  { id: '164854', name: 'Mirror Funzionale',            category: 'Decor & Accessories' },
  { id: '167421', name: 'Carpet VISIONNAIRE Marvel',   category: 'Decor & Accessories' },
  { id: '171087', name: 'Folding screen Innovera',      category: 'Decor & Accessories' },
  { id: '154212', name: 'Hanger PORADA Ekero Rack',    category: 'Decor & Accessories' },
  { id: '163825', name: 'Hanger HERMES Groom',         category: 'Decor & Accessories' },
  { id: '167279', name: 'Mirror VISIONNAIRE Bartok',   category: 'Decor & Accessories' },
  { id: '164845', name: 'Mirror Embroidery',            category: 'Decor & Accessories' },
  { id: '155337', name: 'Figurine Bolognetto',          category: 'Decor & Accessories' },
  // --- Cabinets & Storage ---
  { id: '141425', name: 'TV stand Hesperinta',          category: 'Cabinets & Storage' },
  { id: '166879', name: 'Dresser FENDI Edge',           category: 'Cabinets & Storage' },
  { id: '162887', name: 'Sideboard Lucernaio',          category: 'Cabinets & Storage' },
  { id: '162896', name: 'Console Larmina',              category: 'Cabinets & Storage' },
  { id: '163939', name: 'Walk-in wardrobe Sasone',      category: 'Cabinets & Storage' },
  { id: '170544', name: 'Sideboard Azuleo',             category: 'Cabinets & Storage' },
  { id: '170338', name: 'TV stand Craftero',            category: 'Cabinets & Storage' },
  { id: '141433', name: 'Sideboard Zaparoli',           category: 'Cabinets & Storage' },
  { id: '160862', name: 'Console RUGIANO Rea',          category: 'Cabinets & Storage' },
  { id: '148712', name: 'Bookcase VISIONNAIRE Genesis', category: 'Cabinets & Storage' },
];

async function fetchProduct(product) {
  const url = `https://globus-china.com/products/${product.id}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xhtml+xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    if (!res.ok) {
      console.error(`[${product.id}] HTTP ${res.status}`);
      return null;
    }

    const html = await res.text();

    // Extract product name from og:title or h1
    const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] ?? product.name;
    const cleanName = ogTitle.replace(/ \| Globus.*$/, '').trim();

    // Extract description
    const ogDesc = html.match(/<meta property="og:description" content="([^"]+)"/)?.[1]
                ?? html.match(/<meta name="description" content="([^"]+)"/)?.[1]
                ?? '';

    // Extract price - look for structured data or price patterns
    const priceJsonMatch = html.match(/"price"\s*:\s*"?([0-9,.]+)"?/);
    const priceFromText = html.match(/from\s*\$\s*([\d,]+)/i)?.[1] 
                       ?? html.match(/\$\s*([\d,]+)/)?.[1];
    let priceRange = 'Contact for price';
    if (priceJsonMatch) {
      priceRange = `from $${Number(priceJsonMatch[1].replace(',','')).toLocaleString()}`;
    } else if (priceFromText) {
      priceRange = `from $${priceFromText}`;
    }

    // Extract brand from og:brand or structured data or product title
    const brandMatch = html.match(/"brand"\s*:\s*\{[^}]*"name"\s*:\s*"([^"]+)"/);
    const brandFromMeta = html.match(/<meta[^>]+property="product:brand"[^>]+content="([^"]+)"/i)?.[1];
    let brand = brandMatch?.[1] ?? brandFromMeta ?? 'Globus China';
    // Try to extract brand from product name (e.g. "Dresser FENDI Edge" -> "FENDI")
    if (brand === 'Globus China') {
      const titleBrand = cleanName.match(/^(?:Sofa|Bed|Chair|Table|Dresser|Cabinet|Mirror|Carpet|Console|Sideboard|TV stand|Bookcase|Hanger|Wardrobe|Figurine|Folding screen)\s+([A-Z][A-Z\s]+?)\s+\w/)?.[1]?.trim();
      if (titleBrand && titleBrand.length > 1 && titleBrand.toUpperCase() === titleBrand) {
        brand = titleBrand;
      }
    }

    // Extract ALL images from the page
    const allImgMatches = [...html.matchAll(/(?:src|data-src|data-lazy-src|content)="(https?:\/\/[^"]*(?:cdn|img|media|upload|static)[^"]*\.(?:jpg|jpeg|webp|png)(?:\?[^"]*)?[^"]*)"/gi)];
    const allImgSrcs = [...new Set(allImgMatches.map(m => m[1]))];

    // Filter to product images only (exclude icons, logos, etc.)
    const productImages = allImgSrcs.filter(url => {
      const lower = url.toLowerCase();
      return !lower.includes('logo') 
          && !lower.includes('icon') 
          && !lower.includes('sprite')
          && !lower.includes('favicon')
          && !lower.includes('avatar')
          && (lower.includes('product') || lower.includes('item') || lower.includes('catalog') || lower.includes('upload') || lower.includes('cdn') || url.includes(product.id));
    });

    // Also look for Next.js image blurDataURL or structured product images in JSON-LD
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    const jsonImages = [];
    if (jsonLdMatch) {
      for (const block of jsonLdMatch) {
        try {
          const json = JSON.parse(block.replace(/<script[^>]*>|<\/script>/g, ''));
          const imgs = json.image ?? json.images ?? [];
          if (Array.isArray(imgs)) jsonImages.push(...imgs);
          else if (typeof imgs === 'string') jsonImages.push(imgs);
        } catch {}
      }
    }

    // og:image is usually the main product image
    const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] ?? '';

    // Combine: og:image first, then JSON-LD images, then filtered page images
    const allImages = [...new Set([ogImage, ...jsonImages, ...productImages].filter(Boolean))];
    const mainImage = allImages[0] ?? '';
    const galleryImages = allImages.slice(1, 8); // max 7 gallery images

    // Extract specs / features from list items in the description area
    const specsRaw = [...html.matchAll(/<li[^>]*>([^<]{10,120})<\/li>/g)]
      .map(m => m[1].replace(/\s+/g, ' ').trim())
      .filter(s => !s.includes('<') && !s.includes('http') && s.length > 5 && s.length < 120)
      .slice(0, 8);

    return {
      id: product.id,
      name: cleanName,
      category: product.category,
      description: ogDesc,
      price_range: priceRange,
      brand,
      main_image_url: mainImage,
      gallery_images: galleryImages,
      specifications: specsRaw.length > 0 ? specsRaw : undefined,
    };
  } catch (err) {
    console.error(`[${product.id}] Error: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log(`Scraping ${PRODUCTS_TO_SCRAPE.length} products...\n`);
  const results = [];

  for (const product of PRODUCTS_TO_SCRAPE) {
    process.stdout.write(`Scraping ${product.id} (${product.name})... `);
    const data = await fetchProduct(product);
    if (data) {
      results.push(data);
      console.log(`✓ images: ${data.gallery_images.length + (data.main_image_url ? 1 : 0)}`);
    } else {
      console.log('✗ failed');
    }
    // polite delay
    await new Promise(r => setTimeout(r, 800));
  }

  // Write output
  const { writeFileSync } = await import('fs');
  const { join, dirname } = await import('path');
  const { fileURLToPath } = await import('url');
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outPath = join(__dirname, '..', 'src', 'data', 'scraped_products.json');
  writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\n✅ Written ${results.length} products to ${outPath}`);
  
  // Also print summary
  console.log('\n--- Summary ---');
  for (const p of results) {
    console.log(`${p.id} | ${p.name} | img: ${p.main_image_url ? '✓' : '✗'} | gallery: ${p.gallery_images.length}`);
  }
}

main().catch(console.error);
