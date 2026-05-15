import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, PlusCircle, Home, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0f0f0f] fixed h-full z-50">
        <div className="p-8">
          <Link href="/admin" className="block">
             <h2 className="text-xl font-serif tracking-widest text-white">THE ELEGANT <br/><span className="text-luxury-gold italic">ADMIN</span></h2>
          </Link>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          <Link 
            href="/admin" 
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-sm"
          >
            <LayoutDashboard size={18} className="text-luxury-gold" />
            <span>Dashboard</span>
          </Link>
          <Link 
            href="/admin/products" 
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-sm"
          >
            <Package size={18} className="text-luxury-gold" />
            <span>All Products</span>
          </Link>
          <Link 
            href="/admin/products/new" 
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-sm"
          >
            <PlusCircle size={18} className="text-luxury-gold" />
            <span>Add Product</span>
          </Link>
        </nav>

        <div className="absolute bottom-8 left-0 right-0 px-4 space-y-2">
          <Link 
            href="/" 
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-sm text-gray-400"
          >
            <Home size={18} />
            <span>View Site</span>
          </Link>
          <button 
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500/10 transition-colors text-sm text-gray-400 hover:text-red-400"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-12">
        {children}
      </main>
    </div>
  );
}
