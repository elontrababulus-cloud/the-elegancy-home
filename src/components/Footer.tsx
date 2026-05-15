import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Mail, MessageSquare, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-luxury-charcoal text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-serif tracking-widest uppercase mb-8 block">
              The Elegant<span className="font-light text-white/60"> Homes</span>
            </Link>
            <p className="text-white/40 font-light leading-relaxed mb-8">
              Bespoke furniture and high-end interior sourcing for sophisticated living spaces. Elevating your home with timeless pieces.
            </p>
            <div className="flex space-x-6">
              <Globe size={18} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
              <MessageSquare size={18} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
              <Mail size={18} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] uppercase tracking-ultra text-white/30 mb-8 font-semibold">Collections</h4>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li><Link href="/sofas" className="hover:text-white transition-colors">Sofas & Seating</Link></li>
              <li><Link href="/beds" className="hover:text-white transition-colors">Beds & Bedroom</Link></li>
              <li><Link href="/lighting" className="hover:text-white transition-colors">Luxury Lighting</Link></li>
              <li><Link href="/tables" className="hover:text-white transition-colors">Dining Tables</Link></li>
            </ul>
          </div>

          {/* Sourcing */}
          <div>
            <h4 className="text-[10px] uppercase tracking-ultra text-white/30 mb-8 font-semibold">Sourcing</h4>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li><Link href="/contact" className="hover:text-white transition-colors">Request a Quote</Link></li>
              <li><Link href="/custom" className="hover:text-white transition-colors">Custom Orders</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">International Shipping</Link></li>
              <li><Link href="/concierge" className="hover:text-white transition-colors">Interior Concierge</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] uppercase tracking-ultra text-white/30 mb-8 font-semibold">Visit Us</h4>
            <div className="space-y-6 text-sm font-light text-white/60">
              <div className="flex items-start space-x-4">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-luxury-gold" />
                <span>Shop No E6 Westgate Shopping Complex</span>
              </div>
              <div className="flex items-start space-x-4">
                <Phone size={18} className="mt-1 flex-shrink-0 text-luxury-gold" />
                <div className="flex flex-col">
                  <span>+263 773 602 060</span>
                  <span>+263 772 230 161</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[10px] uppercase tracking-ultra text-white/20">
            © {new Date().getFullYear()} The Elegant Homes. All rights reserved.
          </p>
          <div className="flex space-x-8 text-[10px] uppercase tracking-ultra text-white/20">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
