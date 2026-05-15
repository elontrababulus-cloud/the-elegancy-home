import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group cursor-pointer">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-luxury-gray mb-6">
          <img
            src={product.main_image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
          <div className="absolute bottom-6 left-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <button className="w-full py-3 bg-white text-luxury-charcoal text-[10px] uppercase tracking-ultra shadow-lg">
              View Details
            </button>
          </div>
        </div>
      </Link>
      
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <p className="text-[10px] uppercase tracking-ultra text-gray-400">{product.category}</p>
          <p className="text-[10px] text-luxury-gold font-medium uppercase tracking-widest">{product.brand}</p>
        </div>
        <h3 className="text-lg font-serif text-luxury-charcoal group-hover:text-luxury-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 font-light italic">{product.price_range}</p>
      </div>
    </div>
  );
};

export default ProductCard;
