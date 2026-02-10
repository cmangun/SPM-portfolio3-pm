"use client"
import MobileMenus from '@/layouts/subComponents/MobileMenus';
import MobileOffcanvas from '@/components/offcanvas/MobileOffcanvas';
import React, { useState } from 'react';
import { MenubarIcon } from '@/svg';
import Link from 'next/link';

interface FDEHeaderProps {
    containerCls?: string;
}

const FDEHeader: React.FC<FDEHeaderProps> = ({ containerCls = "container-1230" }) => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);

    return (
        <>
            <div className="tp-header-14-area header-transparent" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '20px 0' }}>
                <div className={`container ${containerCls}`}>
                    <div className="row">
                        <div className="col-12">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                {/* Logo Left */}
                                <div>
                                    <Link href="/portfolio-webgl-showcase" style={{ fontWeight: 400, fontSize: '28px', color: '#1a1a1a', textDecoration: 'none', fontFamily: 'inherit' }}>
                                        cmangun
                                    </Link>
                                </div>
                                
                                {/* Right: Email + Menu */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                    <Link 
                                        href="mailto:cmangun@gmail.com" 
                                        style={{ 
                                            fontSize: '14px', 
                                            color: '#1a1a1a', 
                                            textDecoration: 'none'
                                        }}
                                        className="d-none d-md-block"
                                    >
                                        cmangun@gmail.com
                                    </Link>
                                    <button 
                                        onClick={() => setOpenOffCanvas(true)} 
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            color: '#1a1a1a'
                                        }}
                                    >
                                        <span>Menu</span>
                                        <MenubarIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <nav className="tp-mobile-menu-active d-none">
                <MobileMenus />
            </nav>

            {/* off canvas */}
            <MobileOffcanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
        </>
    );
};

export default FDEHeader;
