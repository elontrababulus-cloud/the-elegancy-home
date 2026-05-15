import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const csvPath = path.join(__dirname, '..', 'src', 'data', 'home_decor.csv');
const catalogPath = path.join(__dirname, '..', 'src', 'data', 'catalog.json');

function parseCSV(content) {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].split(',');
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    // Basic CSV parser that handles quotes
    const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
    const matches = lines[i].match(/"[^"]*"|[^,]+/g);
    if (matches) {
      const values = matches.map(v => v.replace(/^"|"$/g, '').replace(/""/g, '"'));
      data.push({
        name: values[0],
        description: values[1],
        price: values[2],
        image: values[3]
      });
    }
  }
  return data;
}

async function importProducts() {
  if (!fs.existsSync(csvPath)) {
    console.error('CSV file not found!');
    return;
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const products = parseCSV(csvContent);
  console.log(`Parsed ${products.length} products from CSV.`);

  let catalog = [];
  if (fs.existsSync(catalogPath)) {
    catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
  }

  const newProducts = products.map((p, index) => {
    // Extract ID from image URL if possible: ...?id=178452&...
    const idMatch = p.image.match(/id=(\d+)/);
    const id = idMatch ? idMatch[1] : `HD-${Date.now()}-${index}`;

    return {
      id: id,
      name: p.name,
      category: "Decor & Accessories",
      description: p.description,
      price_range: p.price.startsWith('from') ? p.price : `from ${p.price}`,
      main_image_url: p.image,
      brand: "Globus China"
    };
  });

  // Filter out duplicates based on ID
  const existingIds = new Set(catalog.map(item => item.id));
  const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p.id));

  const updatedCatalog = [...catalog, ...uniqueNewProducts];
  fs.writeFileSync(catalogPath, JSON.stringify(updatedCatalog, null, 2), 'utf-8');

  console.log(`Added ${uniqueNewProducts.length} new products to catalog.json (Skipped ${newProducts.length - uniqueNewProducts.length} duplicates).`);
}

importProducts().catch(console.error);
