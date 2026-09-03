import React, { useState } from 'react';
import { RestaurantProfile, ReservationData } from '../types';
import { Calendar as CalendarIcon, Clock, Users, MapPin, CheckCircle2, Send, Phone, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { tableSpreadImg } from '../data/restaurantData';

interface ReservationSectionProps {
  profile: RestaurantProfile;
  language: 'tr' | 'en';
  onReservationSuccess: (data: ReservationData) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  profile,
  language,
  onReservationSuccess,
}) => {
  const [location, setLocation] = useState<string>('main');
  const [guests, setGuests] = useState<string>('2');
  const [date, setDate] = useState<string>('2026-09-04');
  const [time, setTime] = useState<string>('19:30');
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ea580c', '#f59e0b', '#ffffff'],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onReservationSuccess({
        location,
        guests,
        date,
        time,
        guestName: guestName || (language === 'tr' ? 'Sayın Misafir' : 'Guest'),
        guestPhone: guestPhone || profile.phone,
        notes,
      });
    }, 400);
  };

  return (
    <section
      id="reservation"
      aria-label="Masa Rezervasyon Formu"
      className="relative py-28 overflow-hidden"
    >
      {/* Background Image with Dark Vignette Overlay matching screenshot */}
      <div className="absolute inset-0 z-0">
        <img
          src={tableSpreadImg}
          alt="Dining Table Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/95" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Ambiance Teaser Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30 text-xs font-semibold">
              <span>{language === 'tr' ? 'Garantili Masa Rezervasyonu' : 'Instant Guaranteed Seating'}</span>
            </div>

            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              {language === 'tr' ? 'Unutulmaz Bir Akşam' : 'A Table Prepared'}{' '}
              <span className="block italic text-[#ea580c] font-serif-luxury mt-1">
                {language === 'tr' ? 'İçin Yerinizi Ayırtın' : 'For Extraordinary Taste'}
              </span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base font-light max-w-lg leading-relaxed">
              {language === 'tr'
                ? 'Rezervasyonunuz oluşturulduğu anda sistemimize kaydedilir, WhatsApp üzerinden anında teyit SMS/mesajı iletilir. Beklemek yok, masa garantisi var.'
                : 'Your booking is instantly confirmed in our reservation system. No waiting lines, guaranteed priority dining.'}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === 'tr' ? 'Ücretsiz İptal & Değişiklik' : 'Free Cancellation'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === 'tr' ? 'Özel Kutlama / Pasta İkramı' : 'Complimentary Anniversary Prep'}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Reservation Card matching reference screenshot */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white text-zinc-900 rounded-3xl p-7 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-zinc-200/40">
              
              <h3 className="font-serif-luxury text-2xl font-bold text-zinc-900 tracking-tight">
                {language === 'tr' ? 'Masa Rezervasyonu' : 'Reserve Your Table'}
              </h3>
              <p className="text-xs text-zinc-500 mt-1 mb-6">
                {language === 'tr' ? 'Lütfen tercihlerinizi belirleyin' : 'Please select your preferred dining spot'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. Location Select */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    {language === 'tr' ? 'Bölüm Seçin' : 'Choose Location'}
                  </label>
                  <div className="relative">
                    <select
                      id="reservation-location-select"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c] transition-all appearance-none cursor-pointer"
                    >
                      <option value="main">
                        {language === 'tr' ? 'Ana Salon (Zarif & Rahat)' : 'Main Dining Hall'}
                      </option>
                      <option value="terrace">
                        {language === 'tr' ? 'Açık Bahçe / Teras' : 'Outdoor Terrace'}
                      </option>
                      <option value="chef">
                        {language === 'tr' ? 'Ocakbaşı & Şef Masası' : "Chef's Counter"}
                      </option>
                      <option value="vip">
                        {language === 'tr' ? 'VIP Aile & Özel Oda' : 'VIP Private Room'}
                      </option>
                    </select>
                    <MapPin className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Guests Select */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    {language === 'tr' ? 'Kişi Sayısı' : 'Guests'}
                  </label>
                  <div className="relative">
                    <select
                      id="reservation-guests-select"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c] transition-all appearance-none cursor-pointer"
                    >
                      <option value="1">1 {language === 'tr' ? 'Kişi' : 'Guest'}</option>
                      <option value="2">2 {language === 'tr' ? 'Kişi (Çiftler İçin)' : 'Guests'}</option>
                      <option value="3-4">3 - 4 {language === 'tr' ? 'Kişi (Aile Masası)' : 'Guests'}</option>
                      <option value="5-8">5 - 8 {language === 'tr' ? 'Kişi (Grup)' : 'Guests'}</option>
                      <option value="9+">9+ {language === 'tr' ? 'Kişi (Büyük Davet)' : 'Guests (Event)'}</option>
                    </select>
                    <Users className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Date & Time Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                      {language === 'tr' ? 'Tarih' : 'Date'}
                    </label>
                    <div className="relative">
                      <input
                        id="reservation-date-input"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                      {language === 'tr' ? 'Saat Aralığı' : 'Time'}
                    </label>
                    <div className="relative">
                      <select
                        id="reservation-time-select"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c] appearance-none"
                      >
                        <option value="12:30">12:30 - 14:00 (Öğle)</option>
                        <option value="18:00">18:00 - 19:30</option>
                        <option value="19:30">19:30 - 21:00 (Popüler)</option>
                        <option value="21:00">21:00 - 22:30</option>
                        <option value="22:30">22:30 - 00:00 (Gece)</option>
                      </select>
                      <Clock className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* 4. Guest Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      {language === 'tr' ? 'Adınız Soyadınız' : 'Your Name'}
                    </label>
                    <div className="relative">
                      <input
                        id="reservation-name-input"
                        type="text"
                        placeholder={language === 'tr' ? 'Örn: Can Demir' : 'John Doe'}
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      {language === 'tr' ? 'Telefon Numaranız' : 'Phone Number'}
                    </label>
                    <div className="relative">
                      <input
                        id="reservation-phone-input"
                        type="tel"
                        placeholder="0532 123 45 67"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Big Orange Submit Button matching screenshot */}
                <button
                  type="submit"
                  id="confirm-reservation-submit-btn"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-orange-600/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>
                    {isSubmitting
                      ? (language === 'tr' ? 'Hazırlanıyor...' : 'Processing...')
                      : (language === 'tr' ? 'REZERVASYONU ONAYLA' : 'CONFIRM RESERVATION')}
                  </span>
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
