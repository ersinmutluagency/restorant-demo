import React, { useState } from 'react';
import { ConceptType } from '../types';
import { Sparkles, Utensils, ChevronDown, ChevronUp, CheckCircle2, PhoneCall, ExternalLink, Globe2 } from 'lucide-react';

interface PitchDemoBannerProps {
  currentConcept: ConceptType;
  onSelectConcept: (concept: ConceptType) => void;
  language: 'tr' | 'en';
  onToggleLanguage: () => void;
}

export const PitchDemoBanner: React.FC<PitchDemoBannerProps> = ({
  currentConcept,
  onSelectConcept,
  language,
  onToggleLanguage,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const concepts: { id: ConceptType; labelTr: string; labelEn: string; icon: string }[] = [
    { id: 'finedining', labelTr: 'Fine Dining & Dünya Mutfağı', labelEn: 'Fine Dining (Savorelle)', icon: '🍷' },
    { id: 'kebap', labelTr: 'Kebapçı & Ocakbaşı', labelEn: 'Turkish Grill & Kebab', icon: '🥩' },
    { id: 'bistro', labelTr: 'Bistro, Kafe & Burger', labelEn: 'Urban Bistro & Cafe', icon: '🍔' },
  ];

  return (
    <aside 
      aria-label="Restoran Satış Demo Kontrol Paneli"
      className="sticky top-0 z-50 bg-[#16161a]/95 backdrop-blur-md border-b border-[#27272a] text-xs text-zinc-300 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Pitch Info Badge */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {language === 'tr' ? 'Restoran Satış Demo Paneli' : 'Restaurant Sales Demo Mode'}
          </span>
          <span className="hidden sm:inline-block text-zinc-500">|</span>
          <span className="hidden md:inline-block text-zinc-400 text-[11px]">
            {language === 'tr'
              ? 'Müşterinize sunarken konsepti tek tıkla değiştirin'
              : 'Switch business concept to pitch any restaurant'}
          </span>
        </div>

        {/* Center: Concept Switchers */}
        <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-full border border-zinc-800">
          {concepts.map((c) => (
            <button
              key={c.id}
              id={`concept-btn-${c.id}`}
              onClick={() => onSelectConcept(c.id)}
              className={`px-2.5 py-1 rounded-full font-medium transition-all text-xs flex items-center gap-1.5 ${
                currentConcept === c.id
                  ? 'bg-[#ea580c] text-white shadow-sm shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <span>{c.icon}</span>
              <span className="hidden sm:inline">{language === 'tr' ? c.labelTr : c.labelEn}</span>
              <span className="sm:hidden">{c.id.toUpperCase()}</span>
            </button>
          ))}
        </div>

        {/* Right: Language Toggle & Pitch Details Dropdown */}
        <div className="flex items-center gap-2">
          <button
            id="lang-toggle-btn"
            onClick={onToggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors"
            title="Dili Değiştir / Toggle Language"
          >
            <Globe2 className="w-3 h-3 text-amber-400" />
            <span className="font-semibold">{language.toUpperCase()}</span>
          </button>

          <button
            id="pitch-info-toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
          >
            <span className="text-[11px] font-medium">{language === 'tr' ? 'Neden Dönüşümü Yüksek?' : 'Why High Converting?'}</span>
            {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expanded Pitch highlights for selling to restaurant owners */}
      {isOpen && (
        <div className="bg-[#111114] border-t border-zinc-800 px-4 py-3 text-xs">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="flex items-start gap-2 bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-[12px]">{language === 'tr' ? '%0 Komisyonsuz Sipariş' : '0% Commission Direct Orders'}</strong>
                <span className="text-zinc-400 text-[11px]">
                  {language === 'tr'
                    ? 'Yemek platformlarına %30-40 komisyon ödemeden WhatsApp ve telefonla doğrudan sipariş alma.'
                    : 'Receive orders directly via WhatsApp with no third-party marketplace fees.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-[12px]">{language === 'tr' ? 'Anında Masa Rezervasyonu' : 'Instant Table Reservation'}</strong>
                <span className="text-zinc-400 text-[11px]">
                  {language === 'tr'
                    ? 'Müşteriler salon, kişi sayısı ve saat seçip masasını ayırtır, işletmeye anında bildirim düşer.'
                    : 'Guests book their preferred seating & date with automatic WhatsApp / SMS confirmation.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-[12px]">{language === 'tr' ? 'Mobil & QR Menü Uyumu' : 'Mobile & QR Menu Ready'}</strong>
                <span className="text-zinc-400 text-[11px]">
                  {language === 'tr'
                    ? 'Restorandaki masalara konacak QR kodlarla doğrudan bu lüks menü açılır, baskı maliyeti sıfırlanır.'
                    : 'Eliminates paper menu print costs with responsive digital QR table scanning.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-[12px]">{language === 'tr' ? 'Elit & Akılda Kalıcı Tasarım' : 'Elite Luxury Aesthetics'}</strong>
                <span className="text-zinc-400 text-[11px]">
                  {language === 'tr'
                    ? 'Siyah seramik tabak odaklı görsel dil, misafirde yüksek prestij ve güven uyandırır.'
                    : 'Studio dark dining aesthetics establish high culinary prestige and brand authority.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
