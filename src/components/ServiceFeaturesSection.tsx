import React from 'react';
import { RestaurantProfile } from '../types';
import { ArrowUpRight, ShoppingBag, Sparkles, Calendar, Award, Clock, Users, ShieldCheck } from 'lucide-react';
import { waitressImg, pastaImg } from '../data/restaurantData';

interface ServiceFeaturesSectionProps {
  profile: RestaurantProfile;
  language: 'tr' | 'en';
  onBookTable: () => void;
}

export const ServiceFeaturesSection: React.FC<ServiceFeaturesSectionProps> = ({
  profile,
  language,
  onBookTable,
}) => {
  const features = [
    {
      icon: ShoppingBag,
      title: language === 'tr' ? 'Online Sipariş' : 'Online Orders',
      desc: language === 'tr' ? 'Sıcak ve özenli paket servisi' : 'Fast, warm & secure home delivery',
    },
    {
      icon: ShieldCheck,
      title: language === 'tr' ? 'Kusursuz Mutfak' : 'Spotless Kitchen',
      desc: language === 'tr' ? 'En üst düzey hijyen ve açık mutfak' : 'Certified hygiene & open kitchen standards',
    },
    {
      icon: Calendar,
      title: language === 'tr' ? 'Masa Rezervasyonu' : 'Table Reservation',
      desc: language === 'tr' ? 'Tek tıkla garantili yer ayırtma' : 'Instant booking & table guarantee',
    },
    {
      icon: Award,
      title: language === 'tr' ? 'Dünya Çapında Şefler' : 'World-Class Chefs',
      desc: language === 'tr' ? 'Zanaatkar gastronomi uzmanları' : 'Decades of culinary craftsmanship',
    },
    {
      icon: Clock,
      title: language === 'tr' ? 'Kesintisiz Hizmet' : '24/7 Availability',
      desc: language === 'tr' ? 'Öğle & akşam aralıksız ziyafet' : 'Open daily for lunch & late dinner',
    },
    {
      icon: Users,
      title: language === 'tr' ? 'Özel Salon & Bahçe' : 'Organized Dining Spaces',
      desc: language === 'tr' ? 'Aile, iş ve VIP kutlama alanları' : 'Spacious halls, terrace & private suites',
    },
  ];

  return (
    <section id="about" aria-label="Restoran Hizmet Ayrıcalıkları" className="py-24 bg-[#0c0c0e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & 6 Features Grid */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                {language === 'tr' ? 'Size En İyisini Sunuyoruz' : 'Serving You Better'}
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-lg">
                {language === 'tr'
                  ? 'Biz sadece harika yemekler sunmuyoruz. Özenli mutfağımızdan güler yüzlü servisimize kadar her anınızı unutulmaz bir deneyime dönüştürüyoruz.'
                  : 'We offer more than great food. From online orders to world-class chefs, we ensure every part of your experience is exceptional.'}
              </p>
            </div>

            {/* 6 Features (2 cols x 3 rows) matching reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 pt-2">
              {features.map((feat, index) => {
                const Icon = feat.icon;
                return (
                  <div key={index} className="flex items-start gap-3.5 group">
                    <div className="w-10 h-10 rounded-xl bg-[#ea580c]/15 border border-[#ea580c]/30 flex items-center justify-center shrink-0 text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5 font-light leading-tight">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Button: Book a Table ↗ */}
            <div className="pt-4">
              <button
                id="service-book-table-btn"
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

          {/* Right Column: Hostess / Waitress Collage matching screenshot */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              
              {/* Main Hostess Image with soft rounded organic frame */}
              <div className="relative rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-900 shadow-2xl aspect-[4/5] group">
                <img
                  src={waitressImg}
                  alt="Restoran Servis Ekibi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Bottom badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800">
                  <span className="text-[11px] text-orange-400 font-semibold tracking-wider uppercase block">
                    {language === 'tr' ? 'Misafir Memnuniyeti' : 'Hospitality Standard'}
                  </span>
                  <p className="text-xs text-zinc-300 mt-1">
                    {language === 'tr'
                      ? 'Her anınızda yanınızda olan kusursuz servis anlayışı.'
                      : 'Attentive, discreet, and refined hospitality tailored to you.'}
                  </p>
                </div>
              </div>

              {/* Floating food plate overlay in top left corner (matches screenshot) */}
              <div className="absolute -top-8 -left-6 sm:-left-10 w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-[#16161b] border-2 border-zinc-700/80 shadow-2xl overflow-hidden hidden sm:block animate-bounce-slow">
                <img
                  src={pastaImg}
                  alt="Fine Dining Plate"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
