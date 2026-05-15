import React from 'react';
import Link from 'next/link';

const categories = [
  { 
    name: 'Sofas', 
    slug: 'sofas', 
    image: '/images/categories/Sofas.webp',
    count: '4 Items'
  },
  { 
    name: 'Beds', 
    slug: 'beds', 
    image: '/images/categories/Beds and Matresses.webp',
    count: '2 Items'
  },
  { 
    name: 'Lighting', 
    slug: 'lighting', 
    image: '/images/categories/image.png',
    count: '2 Items'
  },
  { 
    name: 'Tables', 
    slug: 'tables', 
    image: '/images/categories/Tables and Chairs.webp',
    count: '2 Items'
  },
  { 
    name: 'Decor & Accessories', 
    slug: 'decor-accessories', 
    image: '/images/categories/Decors and Accessories.webp',
    count: '30 Items'
  },
  { 
    name: 'Cabinets & Storage', 
    slug: 'cabinets-storage', 
    image: '/images/categories/Cabinets and Storage.webp',
    count: '10 Items'
  }
];

const CategoryGrid = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-4 md:space-y-0">
          <div className="max-w-xl">
            <span className="text-luxury-gold text-xs uppercase tracking-ultra mb-4 block">Our Collections</span>
            <h2 className="text-4xl font-serif text-luxury-charcoal leading-tight">
              Curated for the Sophisticated <br /> Modern Home
            </h2>
          </div>
          <Link href="/catalog" className="text-xs uppercase tracking-ultra border-b border-luxury-charcoal pb-1 hover:text-luxury-gold hover:border-luxury-gold transition-all">
            View All Collections
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} className="group relative block aspect-[3/4] overflow-hidden">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <span className="text-[10px] uppercase tracking-ultra mb-2 opacity-80">{cat.count}</span>
                <h3 className="text-3xl font-serif">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
