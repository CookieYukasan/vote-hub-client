import { Icons } from "@/components/icons";

export type PromoCodes = Record<string, number>;

export type User = {
  _id: string;
  userName: string;
  image: string;
  email: string;
  isSubscribe: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Poll = {
  _id: string;
  title: string;
  description: string;
  options: string[];
  createdAt: Date;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    creator: string;
    linkedin: string;
    twitter: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

type WhyChooseUsItem = {
  title: string;
  description: string;
  icon: keyof typeof Icons | React.ReactNode;
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
  whyChooseUsItems: WhyChooseUsItem[];
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};
