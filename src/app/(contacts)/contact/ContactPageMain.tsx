"use client"
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import Link from 'next/link';
import Image from 'next/image';

const ContactPageMain = () => {
    return (
        <div className="contact-page" style={{ background: '#2C3539', minHeight: '100vh' }}>
            <style>{`
                .contact-page {
                    color: #ffffff;
                    font-family: var(--font-inter), sans-serif;
                }
                .contact-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 140px 40px 100px;
                }
                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                }
                .contact-info {
                    padding-top: 20px;
                }
                .contact-eyebrow {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 16px;
                }
                .contact-title {
                    font-size: 84px;
                    font-weight: 700;
                    margin: 0 0 24px;
                    line-height: 1.15;
                    color: #F0EEE9;
                }
                .contact-description {
                    font-size: 16px;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.65);
                    margin-bottom: 48px;
                }
                .contact-details {
                    margin-bottom: 48px;
                }
                .contact-detail-item {
                    margin-bottom: 20px;
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                }
                .contact-detail-icon {
                    filter: invert(1) brightness(0.5);
                    flex-shrink: 0;
                    margin-top: 4px;
                }
                .contact-detail-label {
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 6px;
                }
                .contact-detail-value {
                    font-size: 16px;
                    color: #ffffff;
                }
                .contact-detail-value a {
                    color: #ffffff;
                    text-decoration: none;
                    transition: opacity 0.3s ease;
                }
                .contact-detail-value a:hover {
                    opacity: 0.7;
                }
                .contact-social {
                    display: flex;
                    gap: 20px;
                }
                .social-link {
                    color: #ffffff;
                    transition: opacity 0.3s ease;
                }
                .social-link:hover {
                    opacity: 0.7;
                }
                .contact-form-wrapper {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    padding: 40px;
                }
                .form-title {
                    font-size: 18px;
                    font-weight: 600;
                    margin: 0 0 28px;
                    color: #ffffff;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                .form-label {
                    display: block;
                    font-size: 12px;
                    font-weight: 500;
                    color: rgba(255,255,255,0.6);
                    margin-bottom: 8px;
                }
                .form-input,
                .form-textarea,
                .form-select {
                    width: 100%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 6px;
                    padding: 14px 16px;
                    font-size: 14px;
                    color: #ffffff;
                    font-family: inherit;
                    transition: border-color 0.3s ease;
                }
                .form-input:focus,
                .form-textarea:focus,
                .form-select:focus {
                    outline: none;
                    border-color: rgba(255,255,255,0.3);
                }
                .form-input::placeholder,
                .form-textarea::placeholder {
                    color: rgba(255,255,255,0.3);
                }
                .form-select {
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='rgba(255,255,255,0.5)' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 16px center;
                    padding-right: 40px;
                }
                .form-select option {
                    background: #1a1a1a;
                    color: #ffffff;
                }
                .form-textarea {
                    min-height: 120px;
                    resize: vertical;
                }
                .form-submit {
                    width: 100%;
                    padding: 16px;
                    background: #ffffff;
                    color: #0a0a0a;
                    border: none;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: inherit;
                }
                .form-submit:hover {
                    background: rgba(255,255,255,0.9);
                    transform: translateY(-2px);
                }
                .form-note {
                    font-size: 12px;
                    color: rgba(255,255,255,0.4);
                    margin-top: 16px;
                    text-align: left;
                }
                .availability-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.3);
                    border-radius: 100px;
                    font-size: 12px;
                    font-weight: 500;
                    color: rgb(34, 197, 94);
                    margin-bottom: 32px;
                }
                .availability-dot {
                    width: 8px;
                    height: 8px;
                    background: rgb(34, 197, 94);
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @media (max-width: 991px) {
                    .contact-container {
                        padding: 120px 20px 80px;
                    }
                    .contact-grid {
                        grid-template-columns: 1fr;
                        gap: 48px;
                    }
                    .contact-title {
                        font-size: 48px;
                    }
                    .contact-form-wrapper {
                        padding: 28px;
                    }
                }
            `}</style>
            
            <PortfolioWebglHeader darkText={false} />
            <BackToTop />
            
            <main>
                <div className="contact-container">
                    <div className="contact-grid">
                        {/* Left Column - Info */}
                        <div className="contact-info">
                            <p className="contact-eyebrow">Contact</p>
                            <h1 className="contact-title">Let's discuss your AI initiative</h1>
                            <p className="contact-description">
                                Whether you're starting an AI pilot, scaling an existing system, 
                                or navigating regulatory requirements, I'd be happy to discuss 
                                how I can help.
                            </p>
                            
                            <div className="contact-details">
                                <div className="contact-detail-item">
                                    <Image 
                                        src="/assets/img/svg-icons/Email.svg"
                                        alt="Email"
                                        width={20}
                                        height={20}
                                        className="contact-detail-icon"
                                    />
                                    <div>
                                        <p className="contact-detail-label">Email</p>
                                        <p className="contact-detail-value">
                                            <a href="mailto:cmangun@gmail.com">cmangun@gmail.com</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="contact-detail-item">
                                    <Image 
                                        src="/assets/img/svg-icons/Phone.svg"
                                        alt="Phone"
                                        width={20}
                                        height={20}
                                        className="contact-detail-icon"
                                    />
                                    <div>
                                        <p className="contact-detail-label">Phone</p>
                                        <p className="contact-detail-value">
                                            <a href="tel:9177171894">917.717.1894</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="contact-detail-item">
                                    <Image 
                                        src="/assets/img/svg-icons/Location Map Marker.svg"
                                        alt="Location"
                                        width={20}
                                        height={20}
                                        className="contact-detail-icon"
                                    />
                                    <div>
                                        <p className="contact-detail-label">Location</p>
                                        <p className="contact-detail-value">New York, NY</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="contact-social">
                                <a href="https://www.linkedin.com/in/christopher-mangun-5257265/" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                                <a href="https://github.com/cmangun" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        {/* Right Column - Form */}
                        <div className="contact-form-wrapper">
                            <h2 className="form-title">Send a message</h2>
                            <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
                                <div className="form-group">
                                    <label className="form-label">Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        className="form-input" 
                                        placeholder="Your name"
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        className="form-input" 
                                        placeholder="your@email.com"
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Company</label>
                                    <input 
                                        type="text" 
                                        name="company" 
                                        className="form-input" 
                                        placeholder="Your company"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">How can I help?</label>
                                    <select name="inquiry_type" className="form-select" required>
                                        <option value="">Select an option</option>
                                        <option value="rag">RAG / Knowledge Systems</option>
                                        <option value="llm">LLM Integration</option>
                                        <option value="mlops">MLOps / Pipelines</option>
                                        <option value="compliance">AI Compliance (HIPAA/FDA)</option>
                                        <option value="advisory">General Advisory</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea 
                                        name="message" 
                                        className="form-textarea" 
                                        placeholder="Tell me about your project or challenge..."
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="form-submit">
                                    Send Message
                                </button>
                                <p className="form-note">
                                    I typically respond within 24 hours.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactPageMain;
