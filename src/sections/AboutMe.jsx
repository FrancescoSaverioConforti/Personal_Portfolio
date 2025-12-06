import { useTranslation } from "react-i18next";
import TitleHeader from "../components/TitleHeader";

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="flex-center section-padding">
      <div className="w-full h-full md:px-20 px-5 max-w-7xl mx-auto">

        <TitleHeader
          title={t('about.title')}
          sub={t('about.sub')}
        />

        {/* Two-column layout: Text + Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16 items-center">

          {/* LEFT: Text Content */}
          <div className="space-y-6">
            <p className="text-white-50 text-lg leading-relaxed">
              {t('about.p1')}
            </p>

            <p className="text-white-50 text-lg leading-relaxed">
              {t('about.p2')}
            </p>

            <p className="text-white-50 text-lg leading-relaxed">
              {t('about.p3')}
            </p>
          </div>

          {/* RIGHT: Photo with futuristic styling */}
          <div className="relative group flex justify-center lg:justify-end">
            {/* Glow effect background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-60" />

            {/* Photo container */}
            <div className="relative w-full max-w-md aspect-square">
              {/* Border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/50 via-blue-500/30 to-purple-500/50 p-[2px]">
                <div className="w-full h-full bg-black-200 rounded-2xl overflow-hidden">
                  <img
                    src="/images/me.png"
                    alt="Francesco Saverio Conforti"
                    className="w-full h-full object-contain object-center"
                  />
                </div>
              </div>

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-5 pointer-events-none rounded-2xl" />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-400/60 rounded-br-2xl" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutMe;
