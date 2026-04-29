export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderContent {
  navItems: NavItem[];
  ctaLabel: string;
}

export interface HeroContent {
  headline: string;
  bullets: string[];
  subtext: string;
  ctaLabel: string;
}

export interface TrustItem {
  iconName: string;
  text: string;
}

export interface AboutContent {
  heading: string;
  body1: string;
  body2: string;
  badgeName: string;
  badgeRole: string;
  trustItems: TrustItem[];
}

export interface Benefit {
  iconName: string;
  title: string;
  desc: string;
}

export interface WhyContent {
  heading: string;
  subtext: string;
  benefits: Benefit[];
}

export interface Product {
  id: string;
  name: string;
  desc: string;
  benefits: string[];
  image?: string;
}

export interface ProductContent {
  heading: string;
  subtext: string;
  products: Product[];
}

export interface DreamTeamContent {
  heading: string;
  body: string;
  bodyItems?: string[];
  bodyFooter?: string;
  ctaLabel: string;
}

export interface Promotion {
  title: string;
  description: string;
  cta: string;
  active: boolean;
}

export interface PromotionsContent {
  heading: string;
  subtext: string;
  promotions: Promotion[];
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
}

export interface TestimonialsContent {
  heading: string;
  subtext: string;
  testimonials: Testimonial[];
}

export interface BookingFormContent {
  heading: string;
  subtext: string;
  fields: {
    name: { label: string; placeholder: string };
    address: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  gdprText: string;
  submitLabel: string;
  submitLoadingLabel: string;
}

export interface FooterContent {
  tagline: string;
  navLabel: string;
  contactLabel: string;
  contactName: string;
  contactRole: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  navItems: NavItem[];
}

export interface ImagesContent {
  logo: string;
  hero: string[];
  christaPortrait: string;
  dreamTeam: string;
}

export interface TeamContent {
  heading: string;
  subtext: string;
  leadName: string;
  leadRole: string;
  leadBio: string;
  crewCaption: string;
}

export interface SiteContent {
  images: ImagesContent;
  header: HeaderContent;
  hero: HeroContent;
  about: AboutContent;
  why: WhyContent;
  product: ProductContent;
  dreamTeam: DreamTeamContent;
  promotions: PromotionsContent;
  testimonials: TestimonialsContent;
  bookingForm: BookingFormContent;
  team: TeamContent;
  footer: FooterContent;
}
