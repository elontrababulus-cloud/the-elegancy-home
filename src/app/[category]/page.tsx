import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/catalog.json';
import { Product } from '@/types';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Guard: if the route segment didn't resolve to a string, bail out
  if (!category || typeof category !== 'string') {
    notFound();
  }

  // Helper to slugify (removes ampersands and replaces spaces with dashes)
  const slugify = (text: string) => text.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

  // Find the actual category from the slug (robust matching)
  const matchedCategory = [...new Set((productsData as Product[]).map(p => p.category))].find(
    cat => slugify(cat) === decodeURIComponent(category).toLowerCase()
  );

  if (!matchedCategory) {
    notFound();
  }

  // Normalize category name for filtering
  const filteredProducts = (productsData as Product[]).filter(
    (p) => p.category === matchedCategory
  );

  const categoryName = matchedCategory;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-luxury-gray">
        <div className="container mx-auto px-6 text-center">
          <span className="text-luxury-gold text-xs uppercase tracking-ultra mb-4 block">Collection</span>
          <h1 className="text-5xl md:text-6xl font-serif text-luxury-charcoal mb-6">{categoryName}</h1>
          <p className="text-gray-400 font-light max-w-xl mx-auto uppercase tracking-widest text-[10px]">
            Discover our curated selection of bespoke {category.toLowerCase()} for the modern home.
          </p>
        </div>
      </section>

      {/* Filter & Sort Bar (Mock) */}
      <section className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-md border-y border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center text-[10px] uppercase tracking-ultra text-gray-500">
          <div className="flex space-x-12">
            <button className="hover:text-luxury-gold transition-colors">Filter By Material</button>
            <button className="hover:text-luxury-gold transition-colors">Filter By Price</button>
          </div>
          <p>{filteredProducts.length} Pieces Found</p>
          <button className="hover:text-luxury-gold transition-colors">Sort By: Featured</button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-40">
              <p className="text-gray-400 font-light italic">No items found in this collection yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
