import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-110 hover:scale-100"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <span className="inline-block text-white text-xs uppercase tracking-[0.4em] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Exclusive Collection 2026
        </span>
        <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Elegance in Every <br /> Detail
        </h1>
        <p className="text-white/80 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          Discover our curated selection of bespoke furniture designed for those who appreciate the finer things in life.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-700">
          <Link 
            href="/sofas" 
            className="px-10 py-4 bg-white text-luxury-charcoal text-xs uppercase tracking-ultra hover:bg-luxury-gold hover:text-white transition-all duration-500"
          >
            Explore Catalog
          </Link>
          <Link 
            href="/contact" 
            className="px-10 py-4 border border-white text-white text-xs uppercase tracking-ultra hover:bg-white hover:text-luxury-charcoal transition-all duration-500"
          >
            Sourcing Inquiry
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white mx-auto"></div>
      </div>
    </section>
  );
};

export default HeroSection;
