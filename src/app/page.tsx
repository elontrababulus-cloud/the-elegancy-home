import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import productsData from '@/data/catalog.json';
import { Product } from '@/types';

export default function Home() {
  const featuredProducts: Product[] = productsData.slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Categories */}
      <CategoryGrid />

      {/* Popular Products */}
      <section className="py-24 bg-luxury-gray">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-luxury-gold text-xs uppercase tracking-ultra mb-4 block">New Arrivals</span>
            <h2 className="text-4xl md:text-5xl font-serif text-luxury-charcoal">
              Modern Masterpieces
            </h2>
            <div className="w-24 h-[1px] bg-luxury-gold mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-20">
            <button className="px-12 py-4 bg-luxury-charcoal text-white text-xs uppercase tracking-ultra hover:bg-luxury-zinc transition-all duration-300">
              View Full Collection
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
                alt="Interior Design" 
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-12 -right-12 w-2/3 aspect-video hidden lg:block border-[12px] border-white overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000" 
                  alt="Detail" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-8">
              <span className="text-luxury-gold text-xs uppercase tracking-ultra block">Our Philosophy</span>
              <h2 className="text-5xl font-serif text-luxury-charcoal leading-tight">
                Crafting Spaces That <br /> Speak Your Language
              </h2>
              <p className="text-gray-500 font-light leading-loose text-lg">
                At The Elegant Homes, we believe that your environment is a reflection of your soul. Our sourcing experts traverse the globe to find pieces that don&apos;t just fill a room, but complete a vision.
              </p>
              <p className="text-gray-500 font-light leading-loose">
                From the initial concept to the final delivery, we handle every detail with the precision and care that luxury demands. Whether it&apos;s a single statement piece or a full estate curation, our commitment to quality is unwavering.
              </p>
              <div className="pt-6">
                <button className="text-xs uppercase tracking-ultra border-b border-luxury-charcoal pb-2 hover:text-luxury-gold hover:border-luxury-gold transition-all font-semibold">
                  About Our Sourcing Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
