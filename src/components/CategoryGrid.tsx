import React from 'react';
import Link from 'next/link';

const categories = [
  { 
    name: 'Sofas', 
    slug: 'sofas', 
    image: '/images/catalog/sofa-albionte.jpg',
    count: '4 Items'
  },
  { 
    name: 'Beds', 
    slug: 'beds', 
    image: '/images/catalog/bed-pradoso.jpg',
    count: '2 Items'
  },
  { 
    name: 'Lighting', 
    slug: 'lighting', 
    image: '/images/catalog/light-bentley.jpg',
    count: '2 Items'
  },
  { 
    name: 'Tables', 
    slug: 'tables', 
    image: '/images/catalog/table-lavetia.jpg',
    count: '2 Items'
  },
  { 
    name: 'Decor & Accessories', 
    slug: 'decor-accessories', 
    image: 'https://cdn.globus.pictures/fr/private/750/540/725cd9d9622fe6e60b6f7b1ec24c45f7bcb0377384553e7759be1dff58c499f2.jpeg',
    count: '10 Items'
  },
  { 
    name: 'Cabinets & Storage', 
    slug: 'cabinets-storage', 
    image: 'https://cdn.globus.pictures/fr/private/852/557/e42b17f229a009a539ac25226887f93e639e7c8352556083408f15ddf18bf144.png',
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
