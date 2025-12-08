import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { showcaseProjects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

// Componente per progetto principale (grande)
const HeroProject = ({ project, projectRef }) => {
  const { t } = useTranslation();

  return (
    <div ref={projectRef} className="h-full flex flex-col justify-between xl:w-[60%]">
      <div className="h-96 md:h-[50vh] xl:h-[70vh] relative rounded-2xl overflow-hidden border border-[rgba(102,126,234,0.3)] shadow-[0_8px_40px_rgba(102,126,234,0.2)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(102,126,234,0.1)] to-transparent pointer-events-none z-10" />
        {project.type === 'image' ? (
          <img
            src={project.image}
            alt={t(project.titleKey)}
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 hover:scale-105"
          />
        )}
      </div>
      <div className="space-y-5 mt-5">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-['Space_Grotesk']">
          {t(project.titleKey)}
        </h2>
        <p className="text-white-50 md:text-xl">
          {t(project.descKey)}
        </p>
      </div>
    </div>
  );
};

// Componente per progetti secondari (piccoli)
const SecondaryProject = ({ project, projectRef }) => {
  const { t } = useTranslation();

  return (
    <div className="project" ref={projectRef}>
      <div
        className="h-64 md:h-52 lg:h-72 xl:h-[37vh] relative rounded-2xl xl:px-5 2xl:px-12 py-0 overflow-hidden border border-[rgba(102,126,234,0.3)] shadow-[0_8px_40px_rgba(102,126,234,0.2)]"
        style={{ backgroundColor: project.bgColor }}
      >
        {project.type === 'video' ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-fill transition-all duration-500 hover:scale-105 hover:brightness-110"
          />
        ) : (
          <img
            src={project.image}
            alt={t(project.titleKey)}
            className="w-full h-full object-contain transition-all duration-500 hover:scale-105 hover:brightness-110"
          />
        )}
      </div>
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mt-5 font-['Space_Grotesk']">
        {t(project.titleKey)}
      </h2>
    </div>
  );
};

const AppShowcase = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const heroProjectRef = useRef(null);
  const secondaryProjectsRefs = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animate hero project
    if (heroProjectRef.current) {
      gsap.fromTo(
        heroProjectRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.15,
          scrollTrigger: {
            trigger: heroProjectRef.current,
            start: "top bottom-=120",
          },
        }
      );
    }

    // Animate secondary projects
    secondaryProjectsRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.15 * (index + 2),
            scrollTrigger: {
              trigger: ref,
              start: "top bottom-=120",
            },
          }
        );
      }
    });
  }, []);

  // Separa progetti: il primo è hero, gli altri sono secondari
  const [heroProject, ...secondaryProjects] = showcaseProjects;

  return (
    <section id="work" ref={sectionRef} className="w-full mt-20 px-5 md:px-20 py-10 md:py-20 flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-10">{t('showcase.title')}</h1>

        <div className="flex xl:flex-row flex-col gap-12 justify-between">
          {/* Large Project - Left */}
          <HeroProject project={heroProject} projectRef={heroProjectRef} />

          {/* Small Projects - Right */}
          <div className="flex md:flex-row flex-col xl:flex-col gap-12 xl:w-[40%]">
            {secondaryProjects.map((project, index) => (
              <SecondaryProject
                key={project.id}
                project={project}
                projectRef={(el) => (secondaryProjectsRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;