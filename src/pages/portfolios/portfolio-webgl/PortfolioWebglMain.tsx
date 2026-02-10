"use client"
import { addEvents, slideNextTransitionStart, slidePrevTransitionStart, verTextFragment } from '@/utils/WebglAnim';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import { portfolioWebglSlides, sliderImages } from '@/data/portfolioTwoData';
import { Autoplay, Mousewheel, Navigation, Pagination, EffectFade } from 'swiper/modules';
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef } from 'react';
import { WebGL } from '@/plugins';
import Image from 'next/image';
import Link from 'next/link';

const PortfolioWebglMain = () => {
    const webGLContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (webGLContainerRef.current) {
            const webGL = new WebGL({
                vertex: verTextFragment().vertex,
                fragment: verTextFragment().fragment,
            });
            // Instantiate WebGL
            addEvents(webGL)
            webGLContainerRef.current.appendChild(webGL.renderer.domElement);
            return () => {
                webGL.stop();
            };
        }
    }, []);

    return (
        <CursorAndBackgroundProvider bgColor='#000'>
            <div id="magic-cursor" className="cursor-white-bg">
                <div id="ball"></div>
            </div>
            {/* Global Components */}
            <BackToTop />
            <PortfolioWebglHeader hideNameOnSlider={true} />
            <main>
                <div id="port-showcase-slider-main">
                    <div className="port-showcase-slider-spaces p-relative">
                        <div className="port-showcase-slider-wrap tp-slider-parallax fix" id="showcase-slider-holder"
                            data-pattern-img="assets/img/webgl/1.jpg">
                            <div id="showcase-slider" className="swiper-container parallax-slider-active-2 p-relative">
                                <Swiper
                                    direction="horizontal"
                                    slidesPerView={1}
                                    touchStartPreventDefault={false}
                                    speed={1000}
                                    effect="fade"
                                    fadeEffect={{ crossFade: true }}
                                    loop={true}
                                    mousewheel={true}
                                    simulateTouch={true}
                                    touchRatio={1.5}
                                    threshold={5}
                                    longSwipesRatio={0.3}
                                    navigation={{
                                        nextEl: '.swiper-next',
                                        prevEl: '.swiper-prev',
                                    }}
                                    pagination={{
                                        el: '.tp-slider-dot',
                                        clickable: true,
                                    }}
                                    modules={[Navigation, Pagination, Autoplay, Mousewheel, EffectFade]}
                                    onSlidePrevTransitionStart={slidePrevTransitionStart}
                                    onSlideNextTransitionStart={slideNextTransitionStart}
                                    id="trigger-slides"
                                >
                                    {portfolioWebglSlides.map((item, i) => (
                                        <SwiperSlide key={item.id}>
                                            <div className={`slide-wrap ${i === 0 ? 'active' : ''}`} data-slide={i}></div>
                                            
                                            {/* Content Container */}
                                            <div className="container container-1230">
                                                <div className="row justify-content-center">
                                                    <div className="col-xl-8">
                                                        <div className="port-showcase-slider-item">
                                                            <div className="port-showcase-slider-content">
                                                                {item.isIntro ? (
                                                                    <>
                                                                        {/* H1: Name - Primary heading for SEO */}
                                                                        <h1 className="port-showcase-name-h1">
                                                                            Christopher<br />Mangun
                                                                        </h1>
                                                                        {/* H2: Role/Title - ATS/AEO CRITICAL */}
                                                                        <h2 className="port-showcase-role-h2">
                                                                            Senior Project Director
                                                                        </h2>
                                                                        {/* Body text - ATS/AEO optimized description */}
                                                                        <p className="port-showcase-slider-desc">
                                                                            {item.subtitle}
                                                                        </p>
                                                                        {/* CTA buttons - inline */}
                                                                        <div className="port-showcase-cta-wrap">
                                                                            <button 
                                                                                type="button"
                                                                                className="cta-case-studies-btn swiper-next"
                                                                            >
                                                                                Case&nbsp;Studies
                                                                            </button>
                                                                        </div>
                                                                        {/* Specialization line - ATS/AEO CRITICAL */}
                                                                        {item.specialization && (
                                                                            <p className="port-showcase-specialization">
                                                                                {item.specialization}
                                                                            </p>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <Link href={item.link} className="port-showcase-card-link" style={{ display: 'block', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                                                                        {/* Company Logo - Inside Card */}
                                                                        {item.logo && (
                                                                            <div className="port-showcase-logo-wrapper">
                                                                                <img 
                                                                                    src={item.logo} 
                                                                                    alt={item.brand} 
                                                                                    className="port-showcase-logo-img"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        <h1 className="port-showcase-slider-title port-showcase-slider-title-sm">
                                                                            <span>{item.title}</span>
                                                                        </h1>
                                                                        <p className="port-showcase-slider-desc">
                                                                            {item.subtitle}
                                                                        </p>
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            <div className="tp-showcase-arrow-box d-flex justify-content-between">
                                <button className="tp-showcase__button-prev swiper-prev d-inline-flex align-items-center">
                                    <i className="fas fa-chevron-left"></i>
                                    <span>Prev</span>
                                </button>
                                <button className="tp-showcase__button-next swiper-next d-inline-flex align-items-center">
                                    <span>Next</span>
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            <div className="tp-slider-dot d-none d-md-block"></div>
                        </div>
                    </div>
                </div>
                {/*  canvas slider */}
                <div id="canvas-slider" className="canvas-slider" ref={webGLContainerRef}>
                    {sliderImages.map((imgSrc, index) => (
                        <div key={index} className="slider-img" data-slide={index}>
                            <Image
                                className="slide-img"
                                src={imgSrc}
                                alt="showcase-img"
                                style={{ height: "auto" }}
                            />
                        </div>
                    ))}
                </div>
            </main>
        </CursorAndBackgroundProvider>
    );
};

export default PortfolioWebglMain;
