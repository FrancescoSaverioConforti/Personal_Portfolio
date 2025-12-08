import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { navLinks } from "../constants";
import LanguageSwitcher from "./LanguageSwitcher";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const base = import.meta.env.BASE_URL;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Chiudi menu mobile quando clicchi su un link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Previeni scroll quando menu mobile è aperto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}
      >
        <div className="inner">

          {/* ---------------------- LOGO ---------------------- */}
          <a href="#hero" className="logo-container group">
            <img
              src={`${base}images/logos/personal-logo.png`}
              width={80}
              height={80}
              alt="Logo"
              className="logo-image"
            />
            <span className="logo-text">
              Francesco Saverio Conforti
            </span>
          </a>

          {/* ---------------------- NAV LINKS DESKTOP ---------------------- */}
          <nav className="desktop hidden lg:flex">
            <ul className="nav-list whitespace-nowrap flex-nowrap">
              {navLinks.map(({ link, name }) => (
                <li key={name} className="nav-item group whitespace-nowrap">
                  <a href={link} className="nav-link whitespace-nowrap">
                    <span className="nav-link-text whitespace-nowrap min-w-max">{t(name)}</span>
                    <span className="nav-link-underline"></span>
                    <span className="nav-link-glow"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------------------- AI COMMAND BAR ---------------------- */}
          {/*<div className="ai-command-bar group">
            <span className="ai-badge">
              <span className="ai-badge-icon">⚡</span>
              AI
            </span>
            <span className="ai-command-text">{t('nav.ai_command')}</span>
            <div className="ai-command-glow"></div>
          </div>*/}

          {/* ---------------------- LANGUAGE SWITCHER DESKTOP ---------------------- */}
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* ---------------------- CTA BUTTON DESKTOP ---------------------- */}
          <a href="#contact" className="contact-btn group hidden lg:flex">
            <div className="contact-btn-inner">
              <span className="contact-btn-text">{t('nav.contact')}</span>
              <svg className="contact-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13"></path>
                <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
              </svg>
              <div className="contact-btn-shine"></div>
            </div>
          </a>

          {/* ---------------------- HAMBURGER MOBILE ---------------------- */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden z-50 p-2 text-white hover:text-blue-400 transition-colors ml-auto"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ---------------------- MOBILE MENU OVERLAY ---------------------- */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* ---------------------- MOBILE MENU PANEL ---------------------- */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-slate-900 z-40 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col min-h-full pt-24 pb-8 px-6">
          {/* Mobile Nav Links */}
          <nav className="flex-1 mb-6">
            <ul className="space-y-2">
              {navLinks.map(({ link, name }) => (
                <li key={name}>
                  <a
                    href={link}
                    onClick={handleLinkClick}
                    className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all text-lg font-medium"
                  >
                    {t(name)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Language Switcher */}
          <div className="mb-4 relative z-50">
            <LanguageSwitcher />
          </div>

          {/* Mobile CTA */}
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            <span>{t('nav.contact')}</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"></path>
              <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default NavBar;