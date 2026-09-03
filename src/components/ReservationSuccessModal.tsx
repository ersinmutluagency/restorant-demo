import React from 'react';
import { ReservationData, RestaurantProfile } from '../types';
import { X, CheckCircle2, Calendar, Clock, Users, MapPin, MessageCircle, Phone } from 'lucide-react';

interface ReservationSuccessModalProps {
  data: ReservationData | null;
  profile: RestaurantProfile;
  language: 'tr' | 'en';
  onClose: () => void;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({
  data,
  profile,
  language,
  onClose,
}) => {
  if (!data) return null;

  const reservationCode = 'RES-' + Math.floor(100000 + Math.random() * 900000);

  const handleWhatsAppConfirm = () => {
    const text = encodeURIComponent(
      `Merhaba ${profile.brandName}! Web sitenizden masa rezervasyonu yaptırdım:\n\n` +
      `🎟️ Rezervasyon Kodu: ${reservationCode}\n` +
      `👤 İsim: ${data.guestName}\n` +
      `📞 Tel: ${data.guestPhone}\n` +
      `📅 Tarih: ${data.date}\n` +
      `⏰ Saat: ${data.time}\n` +
      `👥 Kişi Sayısı: ${data.guests} Kişi\n` +
      `📍 Bölüm: ${data.location}\n\n` +
      `Rezervasyonumu teyit edebilir misiniz? Teşekkürler!`
    );
    window.open(`https://wa.me/${profile.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#16161b] border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-[11px] font-mono text-orange-400 font-bold tracking-wider">
            {reservationCode}
          </span>

          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            {language === 'tr' ? 'Rezervasyonunuz Onaylandı!' : 'Reservation Confirmed!'}
          </h3>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
            {language === 'tr'
              ? `Sayın ${data.guestName}, masanız sizin için ayrıldı. Sizi ağırlamaktan mutluluk duyacağız.`
              : `Dear ${data.guestName}, your table has been prioritized. We look forward to hosting you.`}
          </p>
        </div>

        {/* Reservation Receipt Card */}
        <div className="my-6 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2.5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400">
            <span>{language === 'tr' ? 'Restoran' : 'Venue'}</span>
            <span className="font-semibold text-white">{profile.brandName}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>{language === 'tr' ? 'Tarih' : 'Date'}</span>
            </div>
            <span className="font-semibold text-white">{data.date}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>{language === 'tr' ? 'Saat' : 'Time'}</span>
            </div>
            <span className="font-semibold text-white">{data.time}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>{language === 'tr' ? 'Kişi Sayısı' : 'Party Size'}</span>
            </div>
            <span className="font-semibold text-white">{data.guests} {language === 'tr' ? 'Kişi' : 'Guests'}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>{language === 'tr' ? 'Masa Konumu' : 'Location'}</span>
            </div>
            <span className="font-semibold text-white">{data.location.toUpperCase()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <button
            onClick={handleWhatsAppConfirm}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === 'tr' ? 'WhatsApp ile Teyit Mesajı Gönder' : 'Confirm via WhatsApp'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-xs transition-colors cursor-pointer"
          >
            {language === 'tr' ? 'Tamam, Kapat' : 'Done, Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
