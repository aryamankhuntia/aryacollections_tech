'use client';

import { useEffect, useState } from 'react';
import { supabase, Saree } from '@/lib/supabase';
import SareeCard from '@/components/SareeCard';
import { Search, ChevronDown } from 'lucide-react';

export default function Collection() {
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchSarees() {
      const { data } = await supabase
        .from('sarees')
        .select('*')
        .neq('status', 'archived')
        .order('created_at', { ascending: false });
      if (data) setSarees(data);
      setLoading(false);
    }
    fetchSarees();
  }, []);

  const filteredSarees = sarees.filter((saree) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      saree.title.toLowerCase().includes(query) ||
      Boolean(saree.fabric_type && saree.fabric_type.toLowerCase().includes(query)) ||
      Boolean(saree.color && saree.color.toLowerCase().includes(query))
    );
  });

  return (
    <section id="collection" className="bg-[#f6f2eb] px-5 min-[700px]:px-7">
      <div className="mx-auto max-w-[1240px]">
        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row w-full gap-4 border-b border-[#ded7cd] py-4">
          
          <div className="relative flex-1">
            <select className="h-10 w-full appearance-none border border-[#d8d1c7] bg-[#fbfaf7] px-4 text-sm uppercase text-[#5d554d] outline-none cursor-pointer">
              <option>Price</option>
              <option>Low to High</option>
              <option>High to Low</option>
            </select>
          </div>

          <div className="relative flex-1">
            <select className="h-10 w-full appearance-none border border-[#d8d1c7] bg-[#fbfaf7] px-4 text-sm uppercase text-[#5d554d] outline-none cursor-pointer">
              <option>Weave Type</option>
              <option>Silk</option>
              <option>Cotton</option>
            </select>
          </div>

          <div className="relative flex-1">
            <select className="h-10 w-full appearance-none border border-[#d8d1c7] bg-[#fbfaf7] px-4 text-sm uppercase text-[#5d554d] outline-none cursor-pointer">
              <option>Region</option>
              <option>Kanchipuram</option>
              <option>Banaras</option>
            </select>
          </div>

          <div className="flex-1 flex h-10 items-center border border-[#d8d1c7] bg-[#fbfaf7] px-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search weaves..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#9d948b]"
            />
          </div>

          <button className="flex-1 h-10 bg-[#292420] text-sm font-medium uppercase tracking-widest text-white hover:bg-[#b88b3d] transition-colors">
            Apply
          </button>
        </div>

        <div className="pb-6 pt-[56px] text-center">
          <p className="text-sm uppercase tracking-[0.19em] text-[#b88b3d]">The Signature Collection</p>
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <div className="py-16 text-center text-sm uppercase tracking-[0.1em] text-[#948a81]">Loading collection...</div>
        ) : filteredSarees.length === 0 ? (
          <div className="py-16 text-center text-sm uppercase tracking-[0.1em] text-[#948a81]">No sarees found.</div>
        ) : (
          <div className="desktop-grid-3 grid grid-cols-1 gap-x-[15px] gap-y-[28px]">
            {filteredSarees.slice(0, 6).map((saree) => (
              <SareeCard key={saree.id} saree={saree} />
            ))}
          </div>
        )}

        <div className="flex justify-center py-[40px]">
          <button className="border border-[#3b342f] px-6 py-[8px] text-sm uppercase tracking-[0.09em] text-[#39322d] hover:bg-[#39322d] hover:text-white">
            View All Heritage Masterpieces
          </button>
        </div>
      </div>
    </section>
  );
}