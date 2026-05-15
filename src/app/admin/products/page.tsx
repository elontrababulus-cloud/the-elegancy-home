'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit2, Trash2, Search, Plus, ExternalLink } from 'lucide-react';
import { Product } from '@/types';

export default function AdminProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif mb-2">Products</h1>
          <p className="text-gray-500 text-sm tracking-widest uppercase">Manage your luxury catalog</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="flex items-center space-x-2 bg-luxury-gold text-white px-6 py-3 rounded-lg text-xs uppercase tracking-ultra hover:bg-yellow-600 transition-all"
        >
          <Plus size={16} />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search by name, category, or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#0f0f0f] border border-white/5 p-4 pl-12 rounded-xl text-sm focus:ring-1 focus:ring-luxury-gold outline-none transition-all"
        />
      </div>

      {/* Product Table */}
      <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-gray-500 italic">Loading catalog...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-ultra text-gray-500">
                  <th className="px-8 py-6 font-medium">Product</th>
                  <th className="px-8 py-6 font-medium">Category</th>
                  <th className="px-8 py-6 font-medium">Price Range</th>
                  <th className="px-8 py-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded bg-white/5 overflow-hidden flex-shrink-0">
                          <img 
                            src={product.main_image_url} 
                            alt={product.name} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-400">{product.category}</td>
                    <td className="px-8 py-6 text-sm text-gray-400 italic">{product.price_range}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          href={`/product/${product.id}`} 
                          target="_blank"
                          className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <Link 
                          href={`/admin/products/${product.id}`} 
                          className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-luxury-gold transition-all"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProducts.length === 0 && (
              <div className="p-20 text-center text-gray-500 italic">No products found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
