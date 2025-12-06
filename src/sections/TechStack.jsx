import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons } from "../constants";

const TechCardPremium = ({ tech }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // centro
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * -6; // tilt verticale
    const rotateY = ((x - midX) / midX) * 6;  // tilt orizzontale

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;

    // per il gradiente radiale
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        relative p-10 !rounded-[40px]
        bg-black-200/40 border border-white/5
        backdrop-blur-xl transition-all duration-300
        shadow-[0_0_0px_rgba(0,212,255,0)]
        group hover:shadow-[0_0_45px_rgba(0,212,255,0.3)]
      "
      style={{
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      }}
    >
      {/* BORDER RADIALE ANIMATO */}
      <div
        className="
          pointer-events-none absolute inset-0 !rounded-[40px]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        "
        style={{
          background:
            "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(0,212,255,0.35), transparent 60%)",
        }}
      />

      {/* GLOW ORBITALE MORBIDO */}
      <div
        className="
          pointer-events-none absolute inset-0 !rounded-[40px]
          opacity-40 group-hover:opacity-80
          transition-opacity duration-700
          mix-blend-screen
          shadow-[0_0_60px_rgba(0,212,255,0.25)]
        "
      />

      {/* CONTENUTO */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="tech-icon-wrapper scale-110 mb-6">
          <TechIconCardExperience model={tech} />
        </div>

        <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
        <p className="text-white-50 text-sm">
          {tech.desc ?? "Advanced AI automation tools"}
        </p>
      </div>
    </div>
  );
};

const TechStack = () => {
  const { t } = useTranslation();

  useGSAP(() => {
    gsap.fromTo(
      ".tech-card-modern",
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 75%",
        },
      }
    );
  });

  return (
    <section id="tech-stack" className="section-padding flex-center">
      <div className="w-full h-full md:px-20 px-5">
        {/* Header */}
        <TitleHeader
          title={t('tech_stack_section.title')}
          sub={t('tech_stack_section.sub')}
        />

        {/* Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-20">
          {techStackIcons.map((tech) => (
            <div key={tech.name} className="tech-card-modern">
              <TechCardPremium tech={tech} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
