import { useTranslation } from "react-i18next";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";

import { words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";
import { generateCV, generateSkillsCard } from "../utils/cvGenerator";

const ButtonPrimary = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="
      px-8 py-4 rounded-xl font-semibold text-white text-sm md:text-base
      bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent
      shadow-lg shadow-ai-primary/30
      transition-all duration-300
      hover:shadow-xl hover:shadow-ai-primary/50 hover:-translate-y-1
    "
  >
    {text}
  </button>
);
const ButtonSecondary = ({ text, onClick, disabled, loading }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="
      px-8 py-4 rounded-xl font-semibold text-white text-sm md:text-base
      bg-black-100/40 border border-white/10 backdrop-blur-xl
      transition-all duration-300
      hover:border-ai-primary/50 hover:text-ai-primary hover:-translate-y-1
      hover:shadow-lg hover:shadow-ai-primary/20
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
    "
  >
    {loading ? "⏳ " : ""}{text}
  </button>
);

const Hero = () => {
  const { t } = useTranslation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSkillsDownloading, setIsSkillsDownloading] = useState(false);

  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      await generateCV();
    } catch (error) {
      console.error("Error generating CV:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadSkills = async () => {
    setIsSkillsDownloading(true);
    try {
      await generateSkillsCard();
    } catch (error) {
      console.error("Error generating Skills Dossier:", error);
    } finally {
      setIsSkillsDownloading(false);
    }
  };

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden">


      <div className="hero-layout">
        {/* LEFT Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                {t('hero.title_start')}
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt={t(word.text)}
                          className="xl:size-12 md:size-10 size-10 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{t(word.text)}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>

              <h1>{t('hero.title_end')}</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              {t('hero.subtitle_role')}
              <br />
              {t('hero.subtitle_desc')}
            </p>

            <div className="flex flex-wrap gap-4 hero-cta relative z-50">
              <ButtonPrimary
                text={t('hero.cta_work')}
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              />

              <ButtonSecondary
                text={t('hero.cta_cv')}
                onClick={handleDownloadCV}
                disabled={isDownloading}
                loading={isDownloading}
              />

              <ButtonSecondary
                text={t('hero.cta_skills_dossier')}
                onClick={handleDownloadSkills}
                disabled={isSkillsDownloading}
                loading={isSkillsDownloading}
              />
            </div>

          </div>
        </header>

        {/* RIGHT 3D Model */}
        <figure>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </div>


    </section>
  );
};

export default Hero;
