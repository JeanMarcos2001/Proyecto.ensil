export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

export interface StatItem {
  icon: string;
  value: string;
  label: string;
}

export interface ProgramCard {
  icon: string;
  title: string;
  description: string;
  isActive?: boolean;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  image: string;
  year: string;
  program: string;
  isHighlight?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  id: string;
}