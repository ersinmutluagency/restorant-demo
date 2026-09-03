import React, { useState } from 'react';
import { RestaurantProfile, ChefInfo } from '../types';
import { ChevronLeft, ChevronRight, Award, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface ChefsSectionProps {
  profile: RestaurantProfile;
  language: 'tr' | 'en';
}

export const ChefsSection: React.FC<ChefsSectionProps> = ({
  profile,
  language,
}) => {
  const [selectedChef, setSelectedChef] = useState<ChefInfo | null>(null);

  return (
    <section id="chefs" aria-label="Usta Şeflerimiz" className="py-24 bg-[#0c0c0e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference screenshot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              {language === 'tr' ? 'Usta Ellerin' : 'Crafted by'}{' '}
              <span className="block italic text-zinc-200 font-serif-luxury mt-1">
                {language === 'tr' ? 'Dokunuşu' : 'Experts'}
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              {language === 'tr'
                ? 'Her tabak bir vizyon, ustalık ve sınırsız tutkuyla şekillenir. Taze malzemeleri birer sanat eserine dönüştüren şeflerimizle tanışın.'
                : 'Each dish begins with vision, skill, and passion. Get to know the culinary artists who turn fresh ingredients into works of art.'}
            </p>
          </div>
        </div>

        {/* 3 Chef Cards matching screenshot (Arch top portraits) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profile.chefs.map((chef, idx) => (
            <motion.div
              key={chef.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => setSelectedChef(chef)}
              className="group text-center flex flex-col items-center cursor-pointer"
            >
              {/* Arch Shaped Chef Portrait Container */}
              <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-t-full rounded-b-2xl overflow-hidden border-2 border-zinc-800/80 bg-zinc-900 group-hover:border-orange-500/50 transition-all duration-500 shadow-2xl">
                <img
                  src={chef.image}
                  alt={chef.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark gradient mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

                {/* Floating experience tag */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700 text-[11px] text-orange-400 font-semibold flex items-center gap-1.5 whitespace-nowrap">
                  <Award className="w-3 h-3" />
                  <span>{chef.experience}</span>
                </div>
              </div>

              {/* Chef Name & Title */}
              <div className="mt-5 space-y-1">
                <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-medium group-hover:text-orange-400 transition-colors">
                  {chef.name}
                </h3>
                <p className="text-xs text-zinc-400 uppercase tracking-widest font-sans-ui">
                  {language === 'tr' ? chef.turkishRole : chef.role}
                </p>
              </div>

              {/* Short Bio */}
              <p className="text-xs text-zinc-400 max-w-xs mt-2 line-clamp-2 font-light">
                {chef.bio}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Navigation Arrows matching screenshot */}
        <div className="mt-12 flex items-center justify-between pt-6 border-t border-zinc-800/80">
          <button
            id="prev-chef-btn"
            className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            aria-label="Previous chef"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs text-zinc-500">
            {language === 'tr' ? 'Gastronomi ekibimiz' : 'Meet the culinary team'}
          </span>

          <button
            id="next-chef-btn"
            className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            aria-label="Next chef"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
