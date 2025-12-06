import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

import { projects } from "../constants";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const PremiumCaseCard = ({ study, index }) => {
  const { t } = useTranslation();
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -5;
    const rotateY = ((x - rect.width / 2) / rect.width) * 5;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;

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

  const results = t(study.result, { returnObjects: true });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        group relative p-8 rounded-[40px]
        bg-black-200/40 backdrop-blur-xl border border-white/5
        transition-all duration-300
        hover:shadow-[0_0_70px_rgba(0,212,255,0.25)]
      "
    >
      {/* Radial spotlight */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-[40px] opacity-0
          group-hover:opacity-100 transition duration-500
        "
        style={{
          background:
            "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(0,212,255,0.2), transparent 60%)",
        }}
      />

      {/* Neutral glow */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-[40px]
          opacity-40 group-hover:opacity-80 transition duration-700
          mix-blend-screen shadow-[0_0_60px_rgba(0,212,255,0.15)]
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">
        <h2 className="font-bold text-2xl mb-4">{t(study.title)}</h2>

        <div className="mb-4">
          <p className="text-white-50 text-sm">{t('case_studies.role')}</p>
          <p className="text-white font-semibold">{t(study.role)}</p>
        </div>

        <div className="mb-4">
          <p className="text-white-50 text-sm">{t('case_studies.tech_used')}</p>
          <p className="text-white font-semibold">{study.tech.join(", ")}</p>
        </div>

        <div>
          <p className="text-white-50 text-sm mb-2">{t('case_studies.results')}</p>
          <ul className="list-disc ms-5 text-white-50 flex flex-col gap-2">
            {results.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CaseStudies = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Filter Logic
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter((project) => {
      const title = t(project.title).toLowerCase();
      const techStack = project.tech.some((tech) =>
        tech.toLowerCase().includes(term)
      );
      return title.includes(term) || techStack;
    });

    setFilteredProjects(filtered);
  }, [searchTerm, t]);

  // Animation refresh when list changes
  useGSAP(() => {
    gsap.fromTo(
      ".case-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
  }, [filteredProjects]);

  return (
    <section id="case-studies" className="section-padding flex-center">
      <div className="w-full md:px-10 px-5">

        <TitleHeader
          title={t('case_studies.title')}
          sub={t('case_studies.sub')}
        />

        {/* Search Bar */}
        <div className="w-full flex justify-center mt-10 mb-5">
          <div className="relative w-full max-w-xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white-50 group-focus-within:text-ai-primary transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder={t('case_studies.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full pl-12 pr-6 py-4 rounded-2xl
                bg-black-200/50 border border-white/10
                text-white placeholder-white-50
                focus:outline-none focus:border-ai-primary/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)]
                transition-all duration-300
              "
            />
          </div>
        </div>

        <div
          ref={containerRef}
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-10"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((study, index) => (
              <div key={study.id || index} className="case-card">
                <PremiumCaseCard study={study} index={index} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-white-50 text-lg">No projects found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
