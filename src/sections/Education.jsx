import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { educationCards, certifications } from "../constants";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const { t } = useTranslation();
    const timelineRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        // Animate timeline line drawing
        gsap.fromTo(
            timelineRef.current,
            { scaleY: 0, transformOrigin: "top" },
            {
                scaleY: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#education",
                    start: "top 60%",
                },
            }
        );

        // Animate cards with stagger
        cardsRef.current.forEach((card, index) => {
            if (card) {
                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: index * 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                        },
                    }
                );
            }
        });
    }, []);

    return (
        <section id="education" className="section-padding">
            <div className="w-full h-full md:px-20 px-5 max-w-7xl mx-auto">
                <TitleHeader
                    title={t('education.title')}
                    sub={t('education.sub')}
                />

                <div className="mt-16 relative">
                    {/* Enhanced Vertical Timeline Line with Gradient Glow */}
                    <div
                        ref={timelineRef}
                        className="absolute left-1/2 top-0 bottom-0 w-1 hidden lg:block transform -translate-x-1/2"
                        style={{
                            background: 'linear-gradient(180deg, rgba(0,212,255,0.8) 0%, rgba(102,126,234,0.6) 50%, transparent 100%)',
                            boxShadow: '0 0 20px rgba(0,212,255,0.5), 0 0 40px rgba(102,126,234,0.3)',
                        }}
                    />

                    <div className="flex flex-col gap-16">
                        {educationCards.map((card, index) => {
                            const keyAreas = t(card.keyAreas, { returnObjects: true });

                            return (
                                <div
                                    key={card.id}
                                    className="relative"
                                    ref={(el) => (cardsRef.current[index] = el)}
                                >
                                    {/* Enhanced Timeline Dot with Ripple Effect */}
                                    <div className="absolute left-1/2 top-8 w-16 h-16 hidden lg:flex items-center justify-center z-10 transform -translate-x-1/2">
                                        {/* Ripple rings */}
                                        <div className="absolute inset-0 rounded-full bg-ai-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
                                        <div className="absolute inset-0 rounded-full bg-ai-secondary/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />

                                        {/* Main dot */}
                                        <div
                                            className="w-8 h-8 rounded-full border-4 border-black-300 relative group cursor-pointer transition-all duration-300 hover:scale-125"
                                            style={{
                                                background: 'linear-gradient(135deg, #00d4ff 0%, #667eea 100%)',
                                                boxShadow: '0 0 30px rgba(0,212,255,0.8), 0 0 60px rgba(102,126,234,0.4)',
                                            }}
                                        >
                                            {/* Pulsing inner glow */}
                                            <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse" />

                                            {/* Hover ripple */}
                                            <div className="absolute inset-0 rounded-full bg-ai-primary/50 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                                        </div>
                                    </div>

                                    {/* 2-Column Layout with Enhanced Cards */}
                                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                                        {/* Left Column - Enhanced Card */}
                                        <div className="lg:pr-12 flex flex-col items-start lg:items-end">
                                            <div
                                                className="bg-black-200/50 backdrop-blur-lg border border-white/10 p-6 rounded-2xl w-full max-w-md lg:ml-auto transition-all duration-500 hover:border-ai-primary/50 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] group"
                                                style={{
                                                    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                                                }}
                                                onMouseMove={(e) => {
                                                    const card = e.currentTarget;
                                                    const rect = card.getBoundingClientRect();
                                                    const x = e.clientX - rect.left;
                                                    const y = e.clientY - rect.top;
                                                    const centerX = rect.width / 2;
                                                    const centerY = rect.height / 2;
                                                    const rotateX = (y - centerY) / centerY * -5;
                                                    const rotateY = (x - centerX) / centerX * 5;
                                                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                                                }}
                                            >
                                                {/* Centered Header Section */}
                                                <div className="flex flex-col items-center text-center mb-6">
                                                    {/* University Logo with glow */}
                                                    <div className="w-20 h-20 bg-white rounded-xl p-3 mb-4 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-shadow duration-300">
                                                        <img
                                                            src={card.id === 1 ? "/images/Uniroma1.png" : "/images/Logo_Roma_Tre.png"}
                                                            alt={t(card.university)}
                                                            className="w-full h-full object-contain"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-black font-bold text-xl">${card.id === 1 ? 'S' : 'R3'}</div>`;
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Degree Title */}
                                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-ai-primary transition-colors duration-300">
                                                        {t(card.degree)}
                                                    </h3>

                                                    {/* University Name */}
                                                    <p className="text-lg text-ai-primary font-medium mb-3">
                                                        {t(card.university)}
                                                    </p>

                                                    {/* Date Badge */}
                                                    <div className="inline-flex px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white-500 group-hover:border-ai-primary/30 transition-colors duration-300">
                                                        {t(card.date)}
                                                    </div>
                                                </div>

                                                {/* Left-aligned Description */}
                                                <p className="text-white-600 leading-relaxed text-sm text-left">
                                                    {t(card.description)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right Column - Key Focus Areas */}
                                        <div className="lg:pl-12">
                                            <div className="bg-black-200/50 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:border-ai-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]">
                                                <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-ai-secondary animate-pulse"></span>
                                                    {t('education.key_focus')}
                                                </h4>
                                                <ul className="space-y-3">
                                                    {keyAreas.map((item, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-white-500 group/item">
                                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-ai-primary/50 shrink-0 group-hover/item:bg-ai-primary group-hover/item:shadow-[0_0_10px_rgba(0,212,255,0.6)] transition-all duration-300"></span>
                                                            <span className="leading-relaxed text-sm group-hover/item:text-white transition-colors duration-300">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Certifications Section */}
                <div className="mt-24">
                    <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-ai-secondary animate-pulse"></span>
                        {t('education.certifications_title')}
                    </h3>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert, index) => (
                            <div
                                key={index}
                                className="bg-black-200/50 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:border-ai-primary/30 transition-all duration-500 group flex items-start gap-4 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
                            >
                                {/* Certificate Icon */}
                                <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-ai-primary/20 to-ai-secondary/20 rounded-lg flex items-center justify-center border border-ai-primary/30 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-shadow duration-300">
                                    <svg className="w-6 h-6 text-ai-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>

                                {/* Certificate Content */}
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-ai-primary transition-colors">
                                        {cert.name}
                                    </h4>
                                    <p className="text-sm text-white-600 mb-2">{cert.issuer}</p>
                                    {cert.date && (
                                        <span className="inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white-500">
                                            {cert.date}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
