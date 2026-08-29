'use client';

import Image from 'next/image';
import { Saree } from '@/lib/supabase';
import { MessageCircle } from 'lucide-react';

function isValidUrl(
  urlString: string | null | undefined
): boolean {
  if (!urlString) return false;

  try {
    const url = new URL(urlString);

    return (
      url.protocol === 'http:' ||
      url.protocol === 'https:'
    );
  } catch {
    return false;
  }
}

export default function SareeCard({
  saree,
}: {
  saree: Saree;
}) {
  const isAvailable =
    saree.status === 'available';

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

  const message = encodeURIComponent(
    `Hello! I'm interested in buying the "${saree.title}" (Ref: ${saree.id.slice(
      0,
      6
    )}) listed for £${Number(
      saree.price_gbp
    ).toFixed(2)}. Is it still available?`
  );

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${message}`;

  const hasValidImage =
    isValidUrl(saree.image_url);

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden border border-[#e3ddd4] bg-white">

      <div className="relative aspect-[0.9] w-full overflow-hidden bg-[#ebe6de]">
        {hasValidImage ? (
          <Image
            src={saree.image_url}
            alt={saree.title}
            fill
            className={`object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
              !isAvailable
                ? 'grayscale opacity-70'
                : ''
            }`}
            sizes="(max-width: 699px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[7px] uppercase tracking-[0.1em] text-[#9a9188]">
            No Image
          </div>
        )}

        {!isAvailable && (
          <div className="absolute left-2 top-2 bg-[#29231f]/85 px-2 py-1 text-[6px] uppercase tracking-[0.1em] text-white">
            Sold Out
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2.5 py-2.5">

        <div className="flex items-start justify-between gap-2">

          <h3 className="min-w-0 font-serif text-[9px] font-normal leading-[1.4] text-[#302a26]">
            {saree.title}
          </h3>

          <span className="shrink-0 text-[8px] font-medium text-[#a54839]">
            £{Number(
              saree.price_gbp
            ).toFixed(2)}
          </span>
        </div>

        <p className="mt-1 truncate text-[6px] leading-[1.45] text-[#8d837b]">
          {saree.fabric_type ||
            'Premium Handloom'}
          {saree.color
            ? ` • ${saree.color}`
            : ''}
        </p>

        <div className="mt-2.5">
          {isAvailable ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[23px] w-full items-center justify-center gap-1.5 bg-[#21863b] text-[5.5px] font-semibold uppercase tracking-[0.055em] text-white hover:bg-[#176d2e]"
            >
              <MessageCircle
                className="h-[8px] w-[8px]"
                strokeWidth={1.6}
              />
              Enquire on WhatsApp
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="flex h-[23px] w-full items-center justify-center bg-[#dedbd6] text-[5.5px] font-semibold uppercase tracking-[0.055em] text-[#918982]"
            >
              Sold Out
            </button>
          )}
        </div>
      </div>
    </article>
  );
}