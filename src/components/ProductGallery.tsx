'use client';

import React, { useState } from 'react';

interface ProductGalleryProps {
  mainImage: string;
  galleryImages?: string[];
  productName: string;
}

const ProductGallery = ({ mainImage, galleryImages = [], productName }: ProductGalleryProps) => {
  const [activeImage, setActiveImage] = useState(mainImage);
  const allImages = [mainImage, ...galleryImages].filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Main Image View */}
      <div className="aspect-[4/5] bg-luxury-gray overflow-hidden">
        <img 
          src={activeImage} 
          alt={productName} 
          className="w-full h-full object-contain transition-opacity duration-500"
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {allImages.slice(0, 8).map((img, index) => (
            <button 
              key={index}
              onClick={() => setActiveImage(img)}
              className={`aspect-square overflow-hidden border-2 transition-all ${
                activeImage === img ? 'border-luxury-gold' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img 
                src={img} 
                alt={`${productName} thumbnail ${index + 1}`} 
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
