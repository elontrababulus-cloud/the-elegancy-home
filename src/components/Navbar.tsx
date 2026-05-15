"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Sofas', href: '/sofas' },
    { name: 'Beds', href: '/beds' },
    { name: 'Decor & Accessories', href: '/decor-accessories' },
    { name: 'Cabinets & Storage', href: '/cabinets-storage' },
    { name: 'Lighting', href: '/lighting' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif tracking-widest uppercase text-luxury-charcoal">
          The Elegant<span className="font-light"> Homes</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-xs uppercase tracking-ultra text-luxury-charcoal hover:text-luxury-gold transition-colors luxury-link"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link 
            href="/contact" 
            className="px-8 py-3 bg-luxury-charcoal text-white text-xs uppercase tracking-ultra hover:bg-luxury-zinc transition-all duration-300"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-luxury-charcoal">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col space-y-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-sm uppercase tracking-ultra text-luxury-charcoal border-b border-gray-100 pb-2"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/contact" 
            className="w-full py-4 bg-luxury-charcoal text-white text-center text-xs uppercase tracking-ultra"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
