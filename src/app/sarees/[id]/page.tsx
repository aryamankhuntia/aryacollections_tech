import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MessageCircle, ArrowLeft } from 'lucide-react';

import { getSareeById } from '@/lib/sarees';
import type { Metadata } from 'next';

function isValidUrl(urlString: string | null | undefined): boolean {
  if (!urlString) return false;

  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const saree = await getSareeById(id);

  if (!saree) {
    return {
      title: 'Saree Not Found | Arya Collections',
    };
  }

  return {
    title: `${saree.title} | Arya Collections`,
    description:
      saree.description ||
      `Explore ${saree.title} from Arya Collections.`,
    openGraph: {
      title: `${saree.title} | Arya Collections`,
      description:
        saree.description ||
        `Explore ${saree.title} from Arya Collections.`,
      images: saree.image_url
        ? [saree.image_url]
        : undefined,
    },
  };
}

export default async function SareePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const saree = await getSareeById(id);

  if (!saree) {
    notFound();
  }

  const isAvailable = saree.status === 'available';
  const hasValidImage = isValidUrl(saree.image_url);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

  const message = encodeURIComponent(
    `Hello! I'm interested in buying the "${saree.title}" (Ref: ${saree.id.slice(0, 6)}) listed for £${Number(saree.price_gbp).toFixed(2)}. Is it still available?`
  );

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <main className="min-h-screen bg-[#f6f2eb] text-[#29231f]">
      <div className="mx-auto max-w-[1240px] px-5 py-8 min-[700px]:px-7">

        {/* BACK LINK */}
        <Link
          href="/#collection"
          className="mb-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.1em] text-[#6f665e] hover:text-[#29231f]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Back to Collection
        </Link>

        {/* PRODUCT */}
        <div className="grid gap-10 md:grid-cols-2">

          {/* IMAGE */}
          <div className="relative aspect-[0.9] w-full overflow-hidden bg-[#ebe6de]">
            {hasValidImage ? (
              <Image
                src={saree.image_url}
                alt={saree.title}
                fill
                priority
                className={`object-cover ${
                  !isAvailable ? 'grayscale opacity-70' : ''
                }`}
                sizes="(max-width: 767px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm uppercase tracking-[0.1em] text-[#9a9188]">
                No Image
              </div>
            )}

            {!isAvailable && (
              <div className="absolute left-3 top-3 bg-[#29231f]/85 px-3 py-2 text-sm uppercase tracking-[0.1em] text-white">
                Sold Out
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">

            <p className="text-sm uppercase tracking-[0.19em] text-[#b88b3d]">
              Arya Collections
            </p>

            <h1 className="mt-3 font-serif text-3xl font-normal leading-tight text-[#302a26] md:text-4xl">
              {saree.title}
            </h1>

            <p className="mt-4 text-2xl font-medium text-[#a54839]">
              £{Number(saree.price_gbp).toFixed(2)}
            </p>

            <div className="mt-5 border-y border-[#ded7cd] py-4 text-sm text-[#6f665e]">
              <p>
                <span className="font-medium text-[#403934]">
                  Fabric:
                </span>{' '}
                {saree.fabric_type || 'Premium Handloom'}
              </p>

              {saree.color && (
                <p className="mt-2">
                  <span className="font-medium text-[#403934]">
                    Colour:
                  </span>{' '}
                  {saree.color}
                </p>
              )}

              <p className="mt-2">
                <span className="font-medium text-[#403934]">
                  Reference:
                </span>{' '}
                {saree.id.slice(0, 6).toUpperCase()}
              </p>
            </div>

            {saree.description && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#403934]">
                  About this saree
                </h2>

                <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-[#6f665e]">
                  {saree.description}
                </p>
              </div>
            )}

            <div className="mt-8">
              {isAvailable ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-[#21863b] text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#176d2e]"
                >
                  <MessageCircle
                    className="h-5 w-5"
                    strokeWidth={1.6}
                  />
                  Enquire on WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="flex h-12 w-full items-center justify-center rounded-sm bg-[#dedbd6] text-sm font-semibold uppercase tracking-widest text-[#918982]"
                >
                  Sold Out
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}