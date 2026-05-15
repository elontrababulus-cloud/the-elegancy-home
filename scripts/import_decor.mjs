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
        id: values[0],
        name: values[1],
        description: values[2],
        price: values[3],
        image: values[4]
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
    return {
      id: p.id,
      name: p.name,
      category: "Decor & Accessories",
      description: p.description,
      price_range: p.price.startsWith('from') ? p.price : `from ${p.price}`,
      main_image_url: p.image,
      brand: "Globus China"
    };
  });

  // Overwrite existing products or add new ones
  const existingIds = new Set(catalog.map(item => item.id));
  const catalogMap = new Map(catalog.map(item => [item.id, item]));
  
  for (const newP of newProducts) {
    catalogMap.set(newP.id, newP);
  }

  const updatedCatalog = Array.from(catalogMap.values());
  fs.writeFileSync(catalogPath, JSON.stringify(updatedCatalog, null, 2), 'utf-8');

  const addedCount = newProducts.filter(p => !existingIds.has(p.id)).length;
  const updatedCount = newProducts.length - addedCount;

  console.log(`Import complete: Added ${addedCount} new products, updated ${updatedCount} existing products in catalog.json.`);
}

importProducts().catch(console.error);
