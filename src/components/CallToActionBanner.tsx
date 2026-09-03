import React from 'react';
import { RestaurantProfile } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { pastaImg } from '../data/restaurantData';

interface CallToActionBannerProps {
  profile: RestaurantProfile;
  language: 'tr' | 'en';
  onBookTable: () => void;
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({
  profile,
  language,
  onBookTable,
}) => {
  return (
    <section aria-label="Alt Çağrı Alanı" className="py-16 bg-[#0c0c0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Box matching screenshot */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#18181e] via-[#141418] to-[#101014] border border-zinc-800 p-8 sm:p-12 lg:p-16 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 z-10 text-left">
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
                {language === 'tr' ? 'Lezzetin Yol Göstermesine' : 'Let Flavor'}{' '}
                <span className="block italic text-zinc-200 font-serif-luxury mt-1">
                  {language === 'tr' ? 'İzin Verin' : 'Lead the Way'}
                </span>
              </h2>

              <p className="text-zinc-400 text-sm sm:text-base font-light max-w-lg leading-relaxed">
                {language === 'tr'
                  ? 'Hemen bu akşam için masanızı ayırtın, damaklarınızda uzun süre iz bırakacak eşsiz bir gastronomi yolculuğuna katılın.'
                  : 'Reserve your table today and indulge in a taste that lingers.'}
              </p>

              <div>
                <button
                  id="cta-banner-book-table-btn"
                  onClick={onBookTable}
                  className="inline-flex items-center gap-3 bg-[#ea580c] hover:bg-[#c2410c] text-white px-7 py-3.5 rounded-full text-sm font-semibold shadow-xl shadow-orange-950/50 transition-all transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span>{language === 'tr' ? 'Masa Ayırt' : 'Book a Table'}</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Plate matching screenshot */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <div className="relative w-64 sm:w-80 md:w-96 aspect-square rounded-full group cursor-pointer" onClick={onBookTable}>
                {/* Subtle back ambient glow */}
                <div className="absolute inset-0 bg-orange-600/15 rounded-full blur-2xl -z-10" />

                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#1e1e24] shadow-2xl">
                  <img
                    src={pastaImg}
                    alt="Signature Gourmet Pasta"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/30 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
