'use client';
import Link from "next/link";
import bannerBg from "../../../public/assets/img/bg-wrap-2.jpg";

const FDEHero = () => {
    return (
        <header 
            className="relative w-full min-h-screen flex items-center"
            style={{ backgroundImage: `url(${bannerBg.src})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <div className="pointer-events-none absolute inset-0 bg-black/30" aria-hidden="true" />
            <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
                <div className="max-w-xl bg-black/55 p-8 backdrop-blur-sm md:p-10 rounded-lg">
                    {/* ATS CRITICAL: Role declaration in first 200 characters */}
                    <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                        Senior Project Director — Healthcare, Regulated Marketing &amp; AI-Enabled Platforms
                    </p>

                    <h1 className="mt-3 text-4xl font-extrabold leading-[0.95] tracking-tight text-white md:text-5xl">
                        Christopher Mangun
                    </h1>

                    {/* ATS CRITICAL: Explicit role statement */}
                    <h2 className="mt-3 text-xl font-semibold tracking-tight text-white md:text-2xl">
                        Senior Project Director
                    </h2>

                    {/* ATS/AEO CRITICAL: Primary description with key terms */}
                    <p className="mt-4 text-sm leading-relaxed text-white/85 md:text-base">
                        I lead regulated healthcare programs — coordinating strategy, compliance, 
                        and cross-functional delivery to produce measurable results on time and on brand.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Link
                            href="/case-studies"
                            className="inline-flex items-center justify-center rounded bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all"
                        >
                            Case Studies
                        </Link>

                        <Link
                            href="/resume"
                            className="text-sm font-semibold text-white/90 underline underline-offset-4 hover:text-white transition-all"
                        >
                            Engagements
                        </Link>
                    </div>

                    {/* ATS/AEO CRITICAL: Specialization line */}
                    <p className="mt-4 text-[11px] leading-snug text-white/55">
                        15+ years leading regulated healthcare programs across pharma, diagnostics, 
                        medical devices, and enterprise marketing environments.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/60">
                        <span>Six Sigma Black Belt</span>
                        <span aria-hidden="true">•</span>
                        <span>Scrum Master CSM</span>
                        <span aria-hidden="true">•</span>
                        <span>Stanford AI/ML Healthcare</span>
                        <span aria-hidden="true">•</span>
                        <span>AWS Solutions Architect</span>
                    </div>

                    <div className="mt-6 text-xs text-white/60">
                        <a className="hover:text-white transition-colors" href="mailto:cmangun@gmail.com">
                            cmangun@gmail.com
                        </a>
                        <span className="mx-2" aria-hidden="true">•</span>
                        <a className="hover:text-white transition-colors" href="tel:+19177171894">
                            917.717.1894
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default FDEHero;
