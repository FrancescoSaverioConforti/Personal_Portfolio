import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const base = import.meta.env.BASE_URL;

    const languages = [
        { code: 'en', flag: `${base}images/eng.png`, name: 'languages.en' },
        { code: 'it', flag: `${base}images/ita.png`, name: 'languages.it' },
        { code: 'es', flag: `${base}images/esp.png`, name: 'languages.es' }
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Current Language Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 bg-black-200/60 backdrop-blur-xl border border-white/10 rounded-full hover:border-ai-primary/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300 group"
            >
                <img
                    src={currentLanguage.flag}
                    alt={currentLanguage.name}
                    className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-xs md:text-sm font-medium text-white hidden sm:block">
                    {currentLanguage.code.toUpperCase()}
                </span>
                <svg
                    className={`w-3 h-3 md:w-4 md:h-4 text-white-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-black-200/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden z-50 animate-[fadeIn_0.2s_ease-out]">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 ${i18n.language === lang.code
                                ? 'bg-ai-primary/20 text-ai-primary border-l-2 border-ai-primary'
                                : 'text-white hover:bg-white/5 hover:text-ai-primary'
                                }`}
                        >
                            <img
                                src={lang.flag}
                                alt={lang.name}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium">{t(lang.name)}</span>
                                <span className="text-xs text-white-500">{lang.code.toUpperCase()}</span>
                            </div>
                            {i18n.language === lang.code && (
                                <svg className="w-5 h-5 ml-auto text-ai-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default LanguageSwitcher;
