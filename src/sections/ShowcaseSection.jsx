import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { showcaseProjects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  //const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    const projects = [rydeRef, libraryRef/*, ycDirectoryRef*/];
    projects.forEach((ref, index) => {
      gsap.fromTo(
        ref.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.15 * (index + 1),
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom-=120",
          },
        }
      );
    });
  }, []);

  const [project1, project2/*, project3*/] = showcaseProjects;

  return (
    <section id="work" ref={sectionRef} className="w-full mt-20 px-5 md:px-20 py-10 md:py-20 flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-10">{t('showcase.title')}</h1>

        <div className="flex xl:flex-row flex-col gap-12 justify-between">
          {/* Large Project - Left */}
          <div ref={rydeRef} className="h-full flex flex-col justify-between xl:w-[60%]">
            <div className="h-96 md:h-[50vh] xl:h-[70vh] relative rounded-2xl overflow-hidden border border-[rgba(102,126,234,0.3)] shadow-[0_8px_40px_rgba(102,126,234,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(102,126,234,0.1)] to-transparent pointer-events-none z-10" />
              <img
                src={project1.image}
                alt={t(project1.titleKey)}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="space-y-5 mt-5">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-['Space_Grotesk']">
                {t(project1.titleKey)}
              </h2>
              <p className="text-white-50 md:text-xl">
                {t(project1.descKey)}
              </p>
            </div>
          </div>

          {/* Small Projects - Right */}
          <div className="flex md:flex-row flex-col xl:flex-col gap-12 xl:w-[40%]">
            <div className="project" ref={libraryRef}>
              <div
                className="h-64 md:h-52 lg:h-72 xl:h-[37vh] relative rounded-2xl xl:px-5 2xl:px-12 py-0 overflow-hidden border border-[rgba(102,126,234,0.3)] shadow-[0_8px_40px_rgba(102,126,234,0.2)]"
                style={{ backgroundColor: project2.bgColor }}
              >
                <video
                  src={project2.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-fill transition-all duration-500 hover:scale-105 hover:brightness-110"
                />
              </div>
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mt-5 font-['Space_Grotesk']">
                {t(project2.titleKey)}
              </h2>
            </div>

            {/* <div className="project" ref={ycDirectoryRef}>
              <div
                className="h-64 md:h-52 lg:h-72 xl:h-[37vh] relative rounded-2xl xl:px-5 2xl:px-12 py-0 overflow-hidden border border-[rgba(102,126,234,0.3)] shadow-[0_8px_40px_rgba(102,126,234,0.2)]"
                style={{ backgroundColor: project3.bgColor }}
              >
                <img
                  src={project3.image}
                  alt={t(project3.titleKey)}
                  className="w-full h-full object-contain transition-all duration-500 hover:scale-105 hover:brightness-110"
                />
              </div>
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mt-5 font-['Space_Grotesk']">
                {t(project3.titleKey)}
              </h2>
            </div>*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
