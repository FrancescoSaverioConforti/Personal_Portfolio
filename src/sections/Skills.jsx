import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { skillsProgress } from "../constants";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const skillNameMap = {
    "C": "skills.categories.names.c",
    "C#": "skills.categories.names.c_sharp",
    "C++": "skills.categories.names.cpp",
    "Python": "skills.categories.names.python",
    "Java": "skills.categories.names.java",
    "Javascript": "skills.categories.names.javascript",
    "AI & Machine Learning": "skills.categories.names.ai_ml",
    "Wireless & IoT": "skills.categories.names.wireless_iot",
    "Software Development": "skills.categories.names.software_dev",
    "HTML & CSS": "skills.categories.names.html_css",
    "Documentation": "skills.categories.names.documentation",
    "Mathematics": "skills.categories.names.mathematics",
    "Statistics": "skills.categories.names.statistics",
    "Benchmarking": "skills.categories.names.benchmarking",
    "Teamwork": "skills.categories.names.teamwork",
    "Problem Solving": "skills.categories.names.problem_solving",
    "Planning": "skills.categories.names.planning",
    "Reporting": "skills.categories.names.reporting",
    "Italiano": "skills.categories.names.italian",
    "Spagnolo": "skills.categories.names.spanish",
    "Inglese": "skills.categories.names.english"
};

const SkillBar = ({ skill, index }) => {
    const { t } = useTranslation();
    const trKey = skillNameMap[skill.name];
    const translatedName = trKey ? t(trKey) : skill.name;

    return (
        <div className="w-full mb-8 relative group skill-item last:mb-0">
            <div className="flex justify-between mb-3 items-end">
                <span className="text-white font-semibold text-lg tracking-wide group-hover:text-cyan-300 transition-colors duration-300">{translatedName}</span>
                <span className="text-cyan-400 font-bold text-lg drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform duration-300">{skill.percentage}%</span>
            </div>

            {/* Background Bar */}
            <div className="w-full h-3.5 bg-[#1a1f2e] rounded-full overflow-hidden border border-white/5 relative shadow-inner">
                {/* Progress Bar */}
                <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 relative overflow-hidden skill-progress shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-300"
                    style={{ width: "0%" }}
                    data-width={`${skill.percentage}%`}
                >
                    {/* Shimmer Effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-shimmer" />
                </div>
            </div>
        </div>
    );
};

const Skills = () => {
    const { t } = useTranslation();
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const midX = rect.width / 2;
        const midY = rect.height / 2;

        const rotateX = ((y - midY) / midY) * -3;
        const rotateY = ((x - midX) / midX) * 3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        }
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#skills",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Ensure initially hidden via GSAP set, to avoid FOUC or permanent invisibility if JS fails
        gsap.set(".skill-item", { y: 20, opacity: 0 });

        tl.to(".skill-item", {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1
        })
            .to(".skill-progress", {
                width: (index, target) => target.dataset.width,
                duration: 1.5,
                ease: "power2.out",
                stagger: 0.1
            }, "-=0.3");

    }, []);

    return (
        <section id="skills" className="section-padding relative">
            <div className="w-full max-w-7xl mx-auto md:px-20 px-5">
                <TitleHeader
                    title={t('nav.skills')}
                    sub={t('skills.sub')}
                />

                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="mt-12 w-full max-w-4xl mx-auto bg-[#0a0f1c]/80 border border-white/5 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_-12px_rgba(0,122,255,0.25)] backdrop-blur-xl relative overflow-hidden transition-all duration-100 ease-linear hover:shadow-[0_0_80px_-12px_rgba(34,211,238,0.3)]"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Background glow effects */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-ai-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-ai-secondary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {Object.entries(skillsProgress).map(([category, skills]) => (
                            <div key={category} className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2 capitalize">
                                    {t(`skills.categories.${category}`)}
                                </h3>
                                {skills.map((skill, index) => (
                                    <SkillBar key={skill.id} skill={skill} index={index} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
