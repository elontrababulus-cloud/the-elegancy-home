import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import productsData from '@/data/catalog.json';
import { Product } from '@/types';
import { ChevronRight, Shield, Truck } from 'lucide-react';
import Link from 'next/link';
import ProductGallery from '@/components/ProductGallery';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // URL-safe category for linking (matches the slugify logic in category page)
  const categorySlug = product.category.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-ultra text-gray-400 mb-12">
            <Link href="/" className="hover:text-luxury-gold">Home</Link>
            <ChevronRight size={10} />
            <Link href={`/${categorySlug}`} className="hover:text-luxury-gold">{product.category}</Link>
            <ChevronRight size={10} />
            <span className="text-luxury-charcoal">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Product Images */}
            <ProductGallery 
              mainImage={product.main_image_url} 
              galleryImages={product.gallery_images} 
              productName={product.name} 
            />

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-10 pb-10 border-b border-gray-100">
                <span className="text-luxury-gold text-xs uppercase tracking-ultra mb-4 block">{product.brand}</span>
                <h1 className="text-4xl md:text-5xl font-serif text-luxury-charcoal mb-6 leading-tight">{product.name}</h1>
                <p className="text-2xl font-light text-luxury-charcoal/80 mb-8 italic">{product.price_range}</p>
                <p className="text-gray-500 font-light leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="mb-12">
                  <h3 className="text-[10px] uppercase tracking-ultra text-luxury-charcoal font-semibold mb-6">Specifications</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.specifications.map((spec, i) => (
                      <li key={i} className="flex items-center text-sm font-light text-gray-500">
                        <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full mr-3"></div>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quote Form */}
              <div className="bg-luxury-gray p-10 space-y-8">
                <div>
                  <h3 className="text-xl font-serif text-luxury-charcoal mb-2">Request a Quote</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Our experts will contact you within 24 hours.</p>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="NAME" 
                      className="bg-white border-none p-4 text-[10px] tracking-ultra focus:ring-1 focus:ring-luxury-gold outline-none w-full"
                    />
                    <input 
                      type="email" 
                      placeholder="EMAIL" 
                      className="bg-white border-none p-4 text-[10px] tracking-ultra focus:ring-1 focus:ring-luxury-gold outline-none w-full"
                    />
                  </div>
                  <textarea 
                    placeholder="YOUR MESSAGE OR CUSTOMIZATION REQUIREMENTS" 
                    rows={4}
                    className="bg-white border-none p-4 text-[10px] tracking-ultra focus:ring-1 focus:ring-luxury-gold outline-none w-full"
                  ></textarea>
                  <button className="w-full py-5 bg-luxury-charcoal text-white text-xs uppercase tracking-ultra hover:bg-luxury-zinc transition-all">
                    Submit Sourcing Inquiry
                  </button>
                </form>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div className="flex items-center space-x-4">
                  <Shield size={20} className="text-luxury-gold" />
                  <span className="text-[10px] uppercase tracking-ultra text-gray-400">Authenticity Guaranteed</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Truck size={20} className="text-luxury-gold" />
                  <span className="text-[10px] uppercase tracking-ultra text-gray-400">Global White-Glove Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section (Mock) */}
      <section className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-serif text-luxury-charcoal mb-12">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {productsData.filter(p => p.id !== product.id).slice(0, 4).map(p => (
               <Link key={p.id} href={`/product/${p.id}`} className="group">
                  <div className="aspect-square bg-luxury-gray overflow-hidden mb-4">
                    <img src={p.main_image_url} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="text-sm font-serif text-luxury-charcoal">{p.name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-ultra">{p.brand}</p>
               </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
