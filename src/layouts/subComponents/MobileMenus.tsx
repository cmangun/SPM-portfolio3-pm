"use client"
import menuItemsTwo from '@/data/header-menu/menuItemTwo';
import Link from 'next/link';
import { useRef, useState } from 'react';

const MobileMenus = () => {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    const el = itemRefs.current[index];
    if (el) {
      el.style.transform = 'translateX(-8px)';
      el.style.opacity = '0.7';
    }
  };

  const handleMouseLeave = (index: number) => {
    const el = itemRefs.current[index];
    if (el) {
      el.style.transform = 'translateX(0)';
      el.style.opacity = '1';
    }
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      <style>{`
        .fde-menu-list {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .fde-menu-list li::before {
          display: none !important;
          content: none !important;
        }
        .fde-menu-item {
          margin-bottom: 4px;
          text-align: right;
        }
        .fde-menu-link {
          font-size: 25px;
          font-weight: 600;
          color: #ffffff;
          text-decoration: none;
          display: inline-block;
          line-height: 1.4;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease;
          will-change: transform, opacity;
        }
        .fde-menu-parent {
          cursor: pointer;
        }
        .fde-submenu {
          list-style: none;
          padding: 8px 0 2px 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.3s ease, opacity 0.3s ease;
        }
        .fde-submenu.open {
          max-height: 500px;
          opacity: 1;
        }
        .fde-submenu-item {
          margin-bottom: 3px;
        }
        .fde-submenu-link {
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          display: inline-block;
          line-height: 1.4;
          transition: color 0.3s ease;
        }
        .fde-submenu-link:hover {
          color: #ffffff;
        }
        
        /* Mobile - base size */
        @media (max-width: 768px) {
          .fde-menu-item {
            margin-bottom: 3px;
          }
          .fde-menu-link {
            font-size: 20px;
          }
          .fde-submenu-link {
            font-size: 14px;
          }
        }
      `}</style>
      <ul className="fde-menu-list">
        {menuItemsTwo.map((item, index) => (
          <li key={`menu-${index}`} className="fde-menu-item">
            {item.subItems && item.subItems.length > 0 ? (
              <>
                <span 
                  className="fde-menu-link fde-menu-parent"
                  onClick={() => toggleDropdown(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  ref={(el) => { itemRefs.current[index] = el as HTMLAnchorElement; }}
                >
                  {item.title}
                </span>
                <ul className={`fde-submenu ${openDropdown === index ? 'open' : ''}`}>
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={`submenu-${index}-${subIndex}`} className="fde-submenu-item">
                      <Link href={subItem.href} className="fde-submenu-link">
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : item.static ? (
              <a 
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="fde-menu-link"
                ref={(el) => { itemRefs.current[index] = el; }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {item.title}
              </a>
            ) : (
              <Link 
                href={item.href} 
                className="fde-menu-link"
                ref={(el) => { itemRefs.current[index] = el; }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MobileMenus;
