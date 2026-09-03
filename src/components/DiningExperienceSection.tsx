import React from 'react';
import { RestaurantProfile } from '../types';
import { ArrowUpRight, Sparkles, Wine, Flame } from 'lucide-react';
import { tableSpreadImg, heroWingsImg, kebabImg } from '../data/restaurantData';

interface DiningExperienceSectionProps {
  profile: RestaurantProfile;
  language: 'tr' | 'en';
  onBookTable: () => void;
}

export const DiningExperienceSection: React.FC<DiningExperienceSectionProps> = ({
  profile,
  language,
  onBookTable,
}) => {
  return (
    <section id="experience" aria-label="Restoran Atmosferi ve Gastronomi Deneyimi" className="py-24 bg-[#0a0a0c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Multi-photo Culinary Collage matching screenshot */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-[500px]">
              
              {/* Central Main Dining Table Spread */}
              <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl aspect-[4/3] group">
                <img
                  src={tableSpreadImg}
                  alt="Gourmet Dining Table Spread"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Top-Right Mini Framed Photo (matches screenshot) */}
              <div className="absolute -top-8 -right-4 sm:-right-8 w-32 sm:w-40 aspect-square rounded-2xl overflow-hidden border-2 border-zinc-700 bg-zinc-950 shadow-2xl group cursor-pointer">
                <img
                  src={kebabImg}
                  alt="Special Grilled Dish"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Floating Bottom-Left Mini Framed Photo (matches screenshot) */}
              <div className="absolute -bottom-8 -left-4 sm:-left-8 w-32 sm:w-40 aspect-square rounded-2xl overflow-hidden border-2 border-zinc-700 bg-zinc-950 shadow-2xl group cursor-pointer">
                <img
                  src={heroWingsImg}
                  alt="Crispy Appetizer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Copywriting & CTA */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-xs font-semibold text-orange-400 border border-zinc-800">
              <Sparkles className="w-3 h-3 text-[#ea580c]" />
              <span>{language === 'tr' ? 'Büyüleyici Mekan & Lezzet' : 'The Signature Ambience'}</span>
            </div>

            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              {language === 'tr' ? 'Lüks ve Lezzet' : 'Luxury dining'}{' '}
              <span className="block italic text-zinc-200 font-serif-luxury mt-1">
                {language === 'tr' ? 'Burada Başlar' : 'starts here'}
              </span>
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-lg">
              {language === 'tr'
                ? 'İster baş başa romantik bir akşam yemeği, ister görkemli aile sofraları ve şirket kutlamaları; özenle seçilmiş müziklerimiz ve zarif atmosferimizle her anı özel kılmak için buradayız.'
                : "Whether it's an intimate dinner or a grand celebration, we're here to make it special."}
            </p>

            <div className="grid grid-cols-2 gap-4 py-3 border-y border-zinc-800/80">
              <div>
                <span className="block font-serif-luxury text-2xl font-bold text-white">400+</span>
                <span className="text-xs text-zinc-400">
                  {language === 'tr' ? 'Seçkin Şarap & Kokteyl Menüsü' : 'Curated Wine & Beverages'}
                </span>
              </div>
              <div>
                <span className="block font-serif-luxury text-2xl font-bold text-white">%100</span>
                <span className="text-xs text-zinc-400">
                  {language === 'tr' ? 'Doğal & Yerel Malzeme Kalitesi' : 'Locally Sourced Prime Produce'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="dining-book-table-btn"
                onClick={onBookTable}
                className="inline-flex items-center gap-3 bg-[#ea580c] hover:bg-[#c2410c] text-white px-7 py-3.5 rounded-full text-sm font-semibold shadow-xl shadow-orange-950/40 transition-all transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>{language === 'tr' ? 'Masa Ayırt' : 'Book a Table'}</span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
