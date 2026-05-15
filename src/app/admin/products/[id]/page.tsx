'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save, X, Image as ImageIcon } from 'lucide-react';
import { Product } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductFormPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === 'new';

  const [formData, setFormData] = useState<Partial<Product>>({
    id: '',
    name: '',
    category: 'Decor & Accessories',
    brand: 'Globus China',
    price_range: 'from $',
    description: '',
    main_image_url: '',
    gallery_images: [],
    specifications: []
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!isNew);

  useEffect(() => {
    if (!isNew) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data: Product[] = await res.json();
      const product = data.find(p => p.id === id);
      if (product) {
        setFormData(product);
      }
    } catch (err) {
      console.error('Failed to fetch product');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert('Failed to save product');
      }
    } catch (err) {
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const handleSpecChange = (index: number, value: string) => {
    const newSpecs = [...(formData.specifications || [])];
    newSpecs[index] = value;
    setFormData({ ...formData, specifications: newSpecs });
  };

  const addSpec = () => {
    setFormData({ 
      ...formData, 
      specifications: [...(formData.specifications || []), ''] 
    });
  };

  const removeSpec = (index: number) => {
    const newSpecs = (formData.specifications || []).filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: newSpecs });
  };

  if (fetching) return <div className="p-20 text-center text-gray-500 italic">Loading product data...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/admin/products" className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 className="text-4xl font-serif">{isNew ? 'Add Product' : 'Edit Product'}</h1>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">
              {isNew ? 'Create a new catalog entry' : `ID: ${id}`}
            </p>
          </div>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center space-x-2 bg-luxury-gold text-white px-8 py-4 rounded-lg text-xs uppercase tracking-ultra hover:bg-yellow-600 transition-all disabled:opacity-50"
        >
          <Save size={16} />
          <span>{loading ? 'Saving...' : 'Save Product'}</span>
        </button>
      </header>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-2xl space-y-6">
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-ultra text-gray-500">Product Name</label>
            <input 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-sm outline-none focus:border-luxury-gold"
              placeholder="e.g. Velvet Armchair"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-ultra text-gray-500">Unique ID</label>
            <input 
              required
              disabled={!isNew}
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-sm outline-none focus:border-luxury-gold disabled:opacity-50"
              placeholder="e.g. AC-101"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-ultra text-gray-500">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-sm outline-none focus:border-luxury-gold"
              >
                <option value="Sofas">Sofas</option>
                <option value="Beds">Beds</option>
                <option value="Tables">Tables</option>
                <option value="Lighting">Lighting</option>
                <option value="Decor & Accessories">Decor & Accessories</option>
                <option value="Cabinets & Storage">Cabinets & Storage</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-ultra text-gray-500">Brand</label>
              <input 
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-sm outline-none focus:border-luxury-gold"
                placeholder="Brand Name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-ultra text-gray-500">Price Range</label>
            <input 
              value={formData.price_range}
              onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
              className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-sm outline-none focus:border-luxury-gold"
              placeholder="e.g. from $1,200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-ultra text-gray-500">Description</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-sm outline-none focus:border-luxury-gold resize-none"
              placeholder="Product details and story..."
            />
          </div>
        </div>

        {/* Media & Specs */}
        <div className="space-y-8">
          {/* Image */}
          <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-medium mb-4 flex items-center space-x-2">
              <ImageIcon size={18} className="text-luxury-gold" />
              <span>Product Image</span>
            </h3>
            
            <div className="aspect-video bg-white/5 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
              {formData.main_image_url ? (
                <img src={formData.main_image_url} alt="Preview" className="w-full h-full object-contain" />
              ) : (
                <span className="text-gray-600 text-xs uppercase tracking-widest italic">No image URL provided</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-ultra text-gray-500">Main Image URL</label>
              <input 
                value={formData.main_image_url}
                onChange={(e) => setFormData({ ...formData, main_image_url: e.target.value })}
                className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-sm outline-none focus:border-luxury-gold"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-2xl space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Specifications</h3>
              <button 
                type="button"
                onClick={addSpec}
                className="text-luxury-gold text-[10px] uppercase tracking-ultra border-b border-luxury-gold pb-0.5 hover:text-white hover:border-white transition-all"
              >
                Add Spec
              </button>
            </div>

            <div className="space-y-3">
              {(formData.specifications || []).map((spec, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input 
                    value={spec}
                    onChange={(e) => handleSpecChange(index, e.target.value)}
                    className="flex-1 bg-white/5 border border-white/5 p-3 rounded-lg text-sm outline-none focus:border-luxury-gold"
                    placeholder="e.g. Solid Wood Construction"
                  />
                  <button 
                    type="button"
                    onClick={() => removeSpec(index)}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {(formData.specifications || []).length === 0 && (
                <p className="text-gray-600 text-xs italic">No specifications added.</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
