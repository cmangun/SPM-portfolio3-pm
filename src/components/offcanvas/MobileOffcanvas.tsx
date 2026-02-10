"use client"
import MobileMenus from "../../layouts/subComponents/MobileMenus";
import React, { useEffect } from 'react';

type IProps = {
    openOffcanvas: boolean;
    setOpenOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileOffcanvas: React.FC<IProps> = ({
    openOffcanvas,
    setOpenOffcanvas
}) => {
    useEffect(() => {
        if (openOffcanvas) {
            document.body.classList.add('offcanvas-open');
        } else {
            document.body.classList.remove('offcanvas-open');
        }
        return () => {
            document.body.classList.remove('offcanvas-open');
        };
    }, [openOffcanvas]);

    return (
        <>
            <style>{`
                .tp-offcanvas-2-area.offcanvas-2-black-bg .tp-offcanvas-2-bg {
                    background-color: rgba(0, 0, 0, 0.95) !important;
                    backdrop-filter: blur(10px) !important;
                    -webkit-backdrop-filter: blur(10px) !important;
                }
                .tp-offcanvas-2-area.offcanvas-2-black-bg .tp-offcanvas-2-bg.is-left {
                    width: 100% !important;
                }
                .offcanvas-close-btn {
                    position: fixed;
                    top: 20px;
                    right: 40px;
                    z-index: 100001;
                    background: transparent;
                    border: none;
                    padding: 12px 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 400;
                    letter-spacing: 0.5px;
                    color: #ffffff;
                    transition: opacity 0.3s ease;
                }
                .offcanvas-close-btn:hover {
                    opacity: 0.7;
                }
                .offcanvas-menu-wrapper {
                    position: absolute;
                    top: 100px;
                    right: 60px;
                }
                @media (max-width: 768px) {
                    .offcanvas-close-btn {
                        right: 20px;
                    }
                    .offcanvas-menu-wrapper {
                        right: 40px;
                    }
                }
            `}</style>
            <div className={`tp-offcanvas-2-area p-relative offcanvas-2-black-bg ${openOffcanvas ? "opened" : ""}`}>
                <div className="tp-offcanvas-2-bg is-left left-box"></div>
                <div className="tp-offcanvas-2-wrapper">
                    {/* Close button inside overlay - only render when open */}
                    {openOffcanvas && (
                        <button 
                            className="offcanvas-close-btn"
                            onClick={() => setOpenOffcanvas(false)}
                        >
                            <span>Christopher Mangun</span>
                            <svg 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none"
                            >
                                <path 
                                    d="M18 6L6 18M6 6L18 18" 
                                    stroke="#ffffff"
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    )}
                    
                    <div className="tp-offcanvas-2-left left-box" style={{ width: '100%' }}>
                        <div className="offcanvas-menu-wrapper">
                            <nav><MobileMenus /></nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileOffcanvas;
