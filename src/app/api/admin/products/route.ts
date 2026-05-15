import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CATALOG_PATH = path.join(process.cwd(), 'src', 'data', 'catalog.json');

function getCatalog() {
  if (!fs.existsSync(CATALOG_PATH)) return [];
  const content = fs.readFileSync(CATALOG_PATH, 'utf-8');
  return JSON.parse(content);
}

function saveCatalog(catalog: any[]) {
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const catalog = getCatalog();
    return NextResponse.json(catalog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read catalog' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const product = await req.json();
    const catalog = getCatalog();
    
    if (!product.id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const index = catalog.findIndex((p: any) => p.id === product.id);
    
    if (index !== -1) {
      // Update
      catalog[index] = { ...catalog[index], ...product };
    } else {
      // Create
      catalog.push(product);
    }

    saveCatalog(catalog);
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update catalog' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    let catalog = getCatalog();
    catalog = catalog.filter((p: any) => p.id !== id);
    saveCatalog(catalog);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
