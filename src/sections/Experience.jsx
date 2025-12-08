import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

// Componente riutilizzabile per la card di sinistra
const ExperienceCard = ({ card, t }) => {
  return (
    <div
      className="bg-black-200/50 backdrop-blur-lg border border-white/10 p-6 rounded-2xl w-full max-w-md lg:ml-auto transition-all duration-500 hover:border-ai-primary/50 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] group"
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      }}
      onMouseMove={(e) => {
        const cardEl = e.currentTarget;
        const rect = cardEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;
        cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }}
    >
      {/* Centered Header Section */}
      <div className="flex flex-col items-center text-center mb-6">
        {/* Logo with glow */}
        <div className="w-20 h-20 bg-white rounded-xl p-3 mb-4 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-shadow duration-300">
          <img
            src={card.logoPath}
            alt={card.company}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-black font-bold text-xl">${card.logoFallback}</div>`;
            }}
          />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-ai-primary transition-colors duration-300">
          {t(card.title)}
        </h3>

        {/* Company */}
        <p className="text-lg text-ai-primary font-medium mb-3">
          {card.company}
        </p>

        {/* Date Badge */}
        <div className="inline-flex px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white-500 group-hover:border-ai-primary/30 transition-colors duration-300">
          {t(card.date)}
        </div>
      </div>

      {/* Left-aligned Description */}
      <p className="text-white-600 leading-relaxed text-sm text-left">
        {t(card.review)}
      </p>
    </div>
  );
};

// Componente riutilizzabile per la card di destra
const ResponsibilitiesCard = ({ responsibilities, t }) => {
  return (
    <div className="bg-black-200/50 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:border-ai-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]">
      <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-ai-secondary animate-pulse"></span>
        {t('experience.responsibilities')}
      </h4>
      <ul className="space-y-3">
        {responsibilities.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-white-500 group/item">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-ai-primary/50 shrink-0 group-hover/item:bg-ai-primary group-hover/item:shadow-[0_0_10px_rgba(0,212,255,0.6)] transition-all duration-300"></span>
            <span className="leading-relaxed text-sm group-hover/item:text-white transition-colors duration-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Componente riutilizzabile per il timeline dot
const TimelineDot = () => {
  return (
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
  );
};

const Experience = () => {
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
          trigger: "#experience",
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
    <section id="experience" className="section-padding">
      <div className="w-full h-full md:px-20 px-5 max-w-7xl mx-auto">
        <TitleHeader
          title={t('experience.title')}
          sub={t('experience.sub')}
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
            {expCards.map((card, index) => {
              const responsibilities = t(card.responsibilities, { returnObjects: true });

              return (
                <div
                  key={card.id}
                  className="relative"
                  ref={(el) => (cardsRef.current[index] = el)}
                >
                  {/* Timeline Dot */}
                  <TimelineDot />

                  {/* 2-Column Layout */}
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column */}
                    <div className="lg:pr-12 flex flex-col items-start lg:items-end">
                      <ExperienceCard card={card} t={t} />
                    </div>

                    {/* Right Column */}
                    <div className="lg:pl-12">
                      <ResponsibilitiesCard responsibilities={responsibilities} t={t} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;