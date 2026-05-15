import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const catalogPath = path.join(__dirname, '..', 'src', 'data', 'catalog.json');
const scrapedPath = path.join(__dirname, '..', 'src', 'data', 'scraped_products.json');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const scraped = JSON.parse(fs.readFileSync(scrapedPath, 'utf8'));

// Clean up scraped data
const cleanedScraped = scraped.map(p => ({
  ...p,
  name: p.name.replace(/\s+Price$/, '').trim()
}));

// Combine data
// We'll keep existing items and append new ones. 
// If an item exists in both (by ID), we'll update it with scraped data.
const combined = [...catalog];

cleanedScraped.forEach(newItem => {
  const index = combined.findIndex(item => item.id === newItem.id);
  if (index !== -1) {
    combined[index] = { ...combined[index], ...newItem };
  } else {
    combined.push(newItem);
  }
});

fs.writeFileSync(catalogPath, JSON.stringify(combined, null, 2), 'utf8');
console.log(`Merged ${cleanedScraped.length} products into catalog.json`);
