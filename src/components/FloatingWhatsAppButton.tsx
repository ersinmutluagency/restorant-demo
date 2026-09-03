import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  whatsappNumber: string;
  brandName: string;
  language: 'tr' | 'en';
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  whatsappNumber,
  brandName,
  language,
}) => {
  const handleClick = () => {
    const text = encodeURIComponent(
      `Merhaba ${brandName}! Web sitenizden ulaşıyorum. Rezervasyon veya paket sipariş hakkında bilgi alabilir miyim?`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <button
        id="floating-whatsapp-btn"
        onClick={handleClick}
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white pl-3.5 pr-4 py-3 rounded-full shadow-2xl shadow-emerald-950/60 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-emerald-400/30"
        title="WhatsApp ile İletişime Geçin"
        aria-label="WhatsApp"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        </div>
        <div className="text-left hidden sm:block">
          <span className="text-[10px] text-emerald-200 block uppercase font-bold tracking-wider leading-none">
            {language === 'tr' ? 'Hızlı İletişim' : 'Instant Chat'}
          </span>
          <span className="text-xs font-bold leading-tight">WhatsApp Sipariş</span>
        </div>
      </button>
    </div>
  );
};
