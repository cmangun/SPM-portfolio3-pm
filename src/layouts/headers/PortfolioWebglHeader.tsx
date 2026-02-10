"use client"
import MobileMenus from '@/layouts/subComponents/MobileMenus';
import MobileOffcanvas from '@/components/offcanvas/MobileOffcanvas';
import React, { useState } from 'react';

interface PortfolioWebglHeaderProps {
    darkText?: boolean;
    hideNameOnSlider?: boolean;
}

const PortfolioWebglHeader: React.FC<PortfolioWebglHeaderProps> = ({
    darkText = false,
    hideNameOnSlider = false
}) => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const textColor = darkText 
        ? (isHovered ? '#ffffff' : '#1a1a1a') 
        : (isHovered ? '#1a1a1a' : '#ffffff');
    
    const bgColor = darkText 
        ? (isHovered ? '#1a1a1a' : 'transparent') 
        : (isHovered ? '#ffffff' : 'transparent');

    return (
        <>
            <style>{`
                .fde-header-btn {
                    position: fixed !important;
                    top: 20px !important;
                    right: 40px !important;
                    z-index: 99999 !important;
                    border: none !important;
                    padding: 12px 20px !important;
                    cursor: pointer !important;
                    display: flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                    font-family: inherit !important;
                    font-size: 14px !important;
                    font-weight: 400 !important;
                    letter-spacing: 0.5px !important;
                    transition: all 0.3s ease !important;
                }
                .fde-header-btn.hidden {
                    opacity: 0 !important;
                    pointer-events: none !important;
                }
                @media (max-width: 768px) {
                    .fde-header-btn {
                        right: 20px !important;
                    }
                }
            `}</style>
            
            <button 
                onClick={() => setOpenOffCanvas(!openOffCanvas)} 
                className={`fde-header-btn ${openOffCanvas ? 'hidden' : ''}`}
                style={{
                    background: bgColor,
                    color: textColor,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {!hideNameOnSlider && (
                    <span style={{ position: 'relative', zIndex: 10, color: textColor }}>
                        Christopher Mangun
                    </span>
                )}
                <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    style={{ position: 'relative', zIndex: 10 }}
                >
                    <path 
                        d="M3 12H21M3 6H21M3 18H21" 
                        stroke={textColor}
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <nav className="tp-mobile-menu-active d-none">
                <MobileMenus />
            </nav>

            <MobileOffcanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
        </>
    );
};

export default PortfolioWebglHeader;
