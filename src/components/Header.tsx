'use client';

import { Search, ShoppingBag } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-[60px] border-b border-[#e5ded5] bg-[#fffdf9]">
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-7">
        <a href="#" className="font-serif text-2xl font-bold tracking-[0.16em] text-[#29231f]">
          Arya Collections
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm uppercase tracking-[0.1em] text-[#b88b3d]">Home</a>
          <a href="#collection" className="text-sm uppercase tracking-[0.1em] text-[#403934] hover:text-[#b88b3d]">Collection</a>
          <a href="#story" className="text-sm uppercase tracking-[0.1em] text-[#403934] hover:text-[#b88b3d]">Our Story</a>
          <a href="#contact" className="text-sm uppercase tracking-[0.1em] text-[#403934] hover:text-[#b88b3d]">Contact</a>
        </nav>

        <div className="flex items-center gap-6">
          <Search className="h-5 w-5 text-[#342f2b] cursor-pointer" strokeWidth={1.4} />
          <div className="flex items-center gap-2 text-sm text-[#342f2b] cursor-pointer hover:text-[#b88b3d] transition-colors">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
            <span className="font-medium uppercase tracking-widest">Inquire</span>
          </div>
        </div>
      </div>
    </header>
  );
}