import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";
import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

const Contact = () => {
  const { t } = useTranslation();
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Francesco",
          from_email: form.email,
          to_email: "fconforti97@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: t('contact.success'),
            type: "success",
          });

          setTimeout(() => {
            hideAlert();
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            show: true,
            text: t('contact.error'),
            type: "danger",
          });
        }
      );
  };

  return (
    <section id="contact" className="section-padding">
      <div className="w-full h-full md:px-20 px-5 max-w-7xl mx-auto">
        {alert.show && <Alert {...alert} />}

        <TitleHeader
          title={t('contact.title')}
          sub={t('contact.sub')}
        />

        <div className="mt-16 flex flex-col lg:flex-row gap-10">
          {/* Enhanced Form with Glassmorphism */}
          <div className="flex-1 min-w-[50%] relative">
            <div className="relative bg-black-200/60 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-ai-primary/50 hover:shadow-[0_0_40px_rgba(0,212,255,0.15),inset_0_0_20px_rgba(0,212,255,0.05)] transition-all duration-500">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-7"
              >
                {/* Name Field with Floating Label */}
                <div className="relative overflow-visible">
                  <label className="block overflow-visible">
                    <span
                      className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${focusedField === 'name' || form.name
                        ? '-top-2.5 text-xs text-ai-primary bg-black-200 px-2 rounded'
                        : 'top-4 text-sm text-white-500'
                        }`}
                    >
                      {t('contact.name')}
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-4 bg-black-300/50 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-ai-primary focus:outline-none focus:ring-2 focus:ring-ai-primary/20 transition-all duration-300"
                      placeholder="ex., John Doe"
                    />
                  </label>
                </div>

                {/* Email Field with Floating Label */}
                <div className="relative overflow-visible">
                  <label className="block overflow-visible">
                    <span
                      className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${focusedField === 'email' || form.email
                        ? '-top-2.5 text-xs text-ai-primary bg-black-200 px-2 rounded'
                        : 'top-4 text-sm text-white-500'
                        }`}
                    >
                      {t('contact.email')}
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-4 bg-black-300/50 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-ai-primary focus:outline-none focus:ring-2 focus:ring-ai-primary/20 transition-all duration-300"
                      placeholder="ex., johndoe@gmail.com"
                    />
                  </label>
                </div>

                {/* Message Field with Floating Label */}
                <div className="relative overflow-visible">
                  <label className="block overflow-visible">
                    <span
                      className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${focusedField === 'message' || form.message
                        ? '-top-2.5 text-xs text-ai-primary bg-black-200 px-2 rounded'
                        : 'top-4 text-sm text-white-500'
                        }`}
                    >
                      {t('contact.message')}
                    </span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-4 py-4 bg-black-300/50 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-ai-primary focus:outline-none focus:ring-2 focus:ring-ai-primary/20 transition-all duration-300 resize-none"
                      placeholder={t('contact.message')}
                    />
                  </label>
                </div>

                {/* Enhanced Gradient Button */}
                <button
                  className="relative group/btn overflow-hidden px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #00d4ff 0%, #667eea 100%)',
                    boxShadow: '0 4px 15px rgba(0,212,255,0.4)',
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,212,255,0.6)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,212,255,0.4)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />

                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.send')}
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* 3D Model Section with Enhanced Border */}
          <div className="flex-1 min-h-[400px] lg:min-h-auto relative">
            <div className="relative bg-[#cd7c2e] w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-ai-primary/50 hover:shadow-[0_0_40px_rgba(0,212,255,0.15),inset_0_0_20px_rgba(0,212,255,0.05)] transition-all duration-500">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
