export type ConceptType = 'finedining' | 'kebap' | 'bistro';

export interface MenuItem {
  id: string;
  name: string;
  turkishName: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  turkishDescription: string;
  badge?: string;
  isChefSpecial?: boolean;
  calories?: number;
  prepTime?: string;
  ingredients?: string[];
  allergens?: string[];
}

export interface ChefInfo {
  id: string;
  name: string;
  role: string;
  turkishRole: string;
  experience: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  turkishRole: string;
  comment: string;
  turkishComment: string;
  rating: number;
  avatar: string;
}

export interface ReservationData {
  location: string;
  guests: string;
  date: string;
  time: string;
  guestName: string;
  guestPhone: string;
  notes?: string;
}

export interface RestaurantProfile {
  id: ConceptType;
  brandName: string;
  subTitle: string;
  badgeText: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroDishName: string;
  heroDishTag: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  workingHours: string;
  categories: { id: string; name: string }[];
  featuredDishes: MenuItem[];
  allMenu: MenuItem[];
  chefs: ChefInfo[];
  testimonials: Testimonial[];
}
