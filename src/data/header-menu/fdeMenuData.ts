import { MenuItem } from "@/types/menu-d-t";

// Simplified FDE navigation - optimized for Google sitelinks
const fdeMenuData: MenuItem[] = [
  {
    id: 1,
    hasDropdown: false,
    active: true,
    megaMenu: false,
    children: false,
    title: "Home",
    pluseIncon: false,
    link: "/",
  },
  {
    id: 2,
    hasDropdown: false,
    active: true,
    megaMenu: false,
    children: false,
    title: "Case Studies",
    pluseIncon: false,
    link: "/case-studies",
  },
  {
    id: 3,
    hasDropdown: false,
    active: true,
    megaMenu: false,
    children: false,
    title: "Certifications",
    pluseIncon: false,
    link: "/certifications",
  },
  {
    id: 4,
    hasDropdown: false,
    active: true,
    megaMenu: false,
    children: false,
    title: "Engagements",
    pluseIncon: false,
    link: "/resume",
  },
  {
    id: 5,
    hasDropdown: false,
    active: true,
    megaMenu: false,
    children: false,
    title: "Contact",
    pluseIncon: false,
    link: "/contact",
  },
];

export default fdeMenuData;
