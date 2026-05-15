import React from 'react';
import productsData from '@/data/catalog.json';
import { Package, TrendingUp, DollarSign, Layers } from 'lucide-react';

export default function AdminDashboard() {
  const totalProducts = productsData.length;
  const categories = [...new Set(productsData.map(p => p.category))];
  
  const stats = [
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'text-blue-400' },
    { label: 'Categories', value: categories.length, icon: Layers, color: 'text-purple-400' },
    { label: 'Featured Items', value: 8, icon: TrendingUp, color: 'text-green-400' },
    { label: 'Avg Price Range', value: '$1,200 - $8,000', icon: DollarSign, color: 'text-luxury-gold' },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-serif mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-sm tracking-widest uppercase">Catalog Management Overview</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#0f0f0f] border border-white/5 p-6 rounded-xl hover:border-white/10 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-medium">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity / Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-2xl">
          <h3 className="text-lg font-medium mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-white/5 rounded-xl text-left hover:bg-white/10 transition-all group">
              <p className="text-luxury-gold text-xs uppercase tracking-widest mb-1">Add New</p>
              <p className="text-sm font-light text-gray-400 group-hover:text-white transition-colors">Create product entry</p>
            </button>
            <button className="p-4 bg-white/5 rounded-xl text-left hover:bg-white/10 transition-all group">
              <p className="text-luxury-gold text-xs uppercase tracking-widest mb-1">Update Stats</p>
              <p className="text-sm font-light text-gray-400 group-hover:text-white transition-colors">Sync catalog counts</p>
            </button>
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-2xl">
          <h3 className="text-lg font-medium mb-6">Catalog Composition</h3>
          <div className="space-y-4">
             {categories.slice(0, 4).map(cat => (
               <div key={cat} className="flex justify-between items-center text-sm">
                 <span className="text-gray-400">{cat}</span>
                 <span className="font-medium">{productsData.filter(p => p.category === cat).length} Items</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
