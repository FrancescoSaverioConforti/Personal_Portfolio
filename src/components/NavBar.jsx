import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { navLinks } from "../constants";
import LanguageSwitcher from "./LanguageSwitcher";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}
    >
      <div className="inner">

        {/* ---------------------- LOGO ---------------------- */}
        <a href="#hero" className="logo-container group">
          <img
            src="/images/logos/personal-logo.png"
            width={80}
            height={80}
            alt="Logo"
            className="logo-image"
          />
          <span className="logo-text">
            Francesco Saverio Conforti
          </span>
        </a>

        {/* ---------------------- NAV LINKS ---------------------- */}
        <nav className="desktop">
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

        {/* ---------------------- LANGUAGE SWITCHER ---------------------- */}
        <LanguageSwitcher />

        {/* ---------------------- CTA BUTTON ---------------------- */}
        <a href="#contact" className="contact-btn group">
          <div className="contact-btn-inner">
            <span className="contact-btn-text">{t('nav.contact')}</span>
            <svg className="contact-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"></path>
              <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
            </svg>
            <div className="contact-btn-shine"></div>
          </div>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
