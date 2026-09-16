'use client';

import { useEffect, useState } from 'react';
import { Saree } from '@/lib/supabase';
import { getSarees } from '@/lib/sarees';
import SareeCard from '@/components/SareeCard';
import Link from 'next/link';

export default function Collection({
  showAll = false,
}: {
  showAll?: boolean;
}) {
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceSort, setPriceSort] = useState('');
  const [fabricFilter, setFabricFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [appliedSearchQuery, setAppliedSearchQuery] = useState('');
  const [appliedPriceSort, setAppliedPriceSort] = useState('');
  const [appliedFabricFilter, setAppliedFabricFilter] = useState('');
  const [appliedColorFilter, setAppliedColorFilter] = useState('');

  useEffect(() => {
    async function fetchSarees() {
      try {
        const data = await getSarees();
        setSarees(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSarees();
  }, []);

  const handleApplyFilters = () => {
    setAppliedSearchQuery(searchQuery);
    setAppliedPriceSort(priceSort);
    setAppliedFabricFilter(fabricFilter);
    setAppliedColorFilter(colorFilter);
  };

  const filteredSarees = sarees
    .filter((saree) => {
      const query = appliedSearchQuery.trim().toLowerCase();

      if (!query) return true;

      return (
        saree.title.toLowerCase().includes(query) ||
        Boolean(
          saree.fabric_type &&
          saree.fabric_type.toLowerCase().includes(query)
        ) ||
        Boolean(
          saree.color &&
          saree.color.toLowerCase().includes(query)
        )
      );
    })
    .filter((saree) => {
      if (!appliedFabricFilter) return true;

      return saree.fabric_type === appliedFabricFilter;
    })
    .filter((saree) => {
      if (!appliedColorFilter) return true;

      return saree.color === appliedColorFilter;
    })
    .sort((a, b) => {
      if (appliedPriceSort === 'low-high') {
        return Number(a.price_gbp) - Number(b.price_gbp);
      }

      if (appliedPriceSort === 'high-low') {
        return Number(b.price_gbp) - Number(a.price_gbp);
      }

      return 0;
    });

  const fabricTypes = Array.from(
    new Set(
      sarees
        .map((saree) => saree.fabric_type)
        .filter(Boolean)
    )
  ).sort();

  const colors = Array.from(
    new Set(
      sarees
        .map((saree) => saree.color)
        .filter(Boolean)
    )
  ).sort();

  return (
    <section id="collection" className="bg-[#f6f2eb] px-5 min-[700px]:px-7">
      <div className="mx-auto max-w-[1240px]">
        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row w-full gap-4 border-b border-[#ded7cd] py-4">
          
          <div className="relative flex-1">
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="h-10 w-full appearance-none border border-[#d8d1c7] bg-[#fbfaf7] px-4 text-sm uppercase text-[#5d554d] outline-none cursor-pointer"
            >
              <option value="">Price</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>

          <div className="relative flex-1">
            <select
              value={fabricFilter}
              onChange={(e) => setFabricFilter(e.target.value)}
              className="h-10 w-full appearance-none border border-[#d8d1c7] bg-[#fbfaf7] px-4 text-sm uppercase text-[#5d554d] outline-none cursor-pointer"
            >
              <option value="">Weave Type</option>

              {fabricTypes.map((fabric) => (
                <option key={fabric} value={fabric}>
                  {fabric}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1">
            <select
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
              className="h-10 w-full appearance-none border border-[#d8d1c7] bg-[#fbfaf7] px-4 text-sm uppercase text-[#5d554d] outline-none cursor-pointer"
            >
              <option value="">Colour</option>

              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
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

          <button
            type="button"
            onClick={handleApplyFilters}
            className="flex-1 h-10 bg-[#292420] text-sm font-medium uppercase tracking-widest text-white hover:bg-[#b88b3d] transition-colors"
          >
            Apply
          </button>

          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setPriceSort('');
              setFabricFilter('');
              setColorFilter('');

              setAppliedSearchQuery('');
              setAppliedPriceSort('');
              setAppliedFabricFilter('');
              setAppliedColorFilter('');
            }}
            className="flex-1 h-10 border border-[#3b342f] bg-transparent text-sm font-medium uppercase tracking-widest text-[#39322d] transition-colors hover:bg-[#39322d] hover:text-white"
          >
            Reset
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
            {(showAll ? filteredSarees : filteredSarees.slice(0, 6)).map((saree) => (
              <SareeCard key={saree.id} saree={saree} />
            ))}
          </div>
        )}

        {!showAll && (
          <div className="flex justify-center py-[40px]">
            <Link
              href="/sarees"
              className="border border-[#3b342f] px-6 py-[8px] text-sm uppercase tracking-[0.09em] text-[#39322d] hover:bg-[#39322d] hover:text-white"
            >
              View All Heritage Masterpieces
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}