import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current;

    if (!section) return;

    // Cinematic stagger entrance animation
    const tween = gsap.fromTo(
      cards,
      {
        y: 80,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Interactive mouse spotlight
    const listeners = [];

    cards.forEach((card) => {
      if (!card) return;

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      };

      card.addEventListener('mousemove', handleMouseMove);

      listeners.push({
        card,
        handleMouseMove,
      });
    });

    // Cleanup animations and event listeners
    return () => {
      listeners.forEach(({ card, handleMouseMove }) => {
        card.removeEventListener('mousemove', handleMouseMove);
      });

      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-32 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background Cinematic Red Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">

        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">

            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>

            <span className="text-red-500 font-bold">
              EPISODE 01
            </span>

            <span className="text-white/40">|</span>

            <span>ABOUT THE ENGINEER</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            EPISODE SYNOPSIS <br />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              ORIGIN & VISION.
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* CARD 1: BIO & ACADEMIC CORE */}
          <div
            ref={addToRefs}
            className="md:col-span-7 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-red-600/60 transition-all duration-500 overflow-hidden"
          >

            {/* Mouse Spotlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)',
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              01
            </div>

            <div className="space-y-5 relative z-10">

              <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
                Cast & Background
              </h3>

              <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
                I am{' '}
                <span className="text-white font-bold drop-shadow">
                  Pratik Singare
                </span>
                , an MCA student at Dr. Babasaheb Ambedkar Technological University, passionate about Full-Stack Development, Artificial Intelligence, Machine Learning, and Cloud & DevOps. I build scalable digital solutions by combining modern technologies with innovative problem-solving.
              </p>

              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                My technical journey combines algorithmic problem-solving,
                modern software development, and cloud technologies to
                create practical, scalable, and user-focused applications.
              </p>
            </div>

            <div className="pt-8 flex flex-wrap gap-2 relative z-10">

              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                AI & ML
              </span>

              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                Full-Stack Development
              </span>

              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                Cloud & DevOps
              </span>

            </div>
          </div>

          {/* CARD 2: EXPERIENCE & PROFESSIONAL HIGHLIGHTS */}
          <div
            ref={addToRefs}
            className="md:col-span-5 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-red-600/60 transition-all duration-500 overflow-hidden"
          >

            {/* Mouse Spotlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)',
              }}
            ></div>

            <div className="relative z-10">

              <span className="text-red-500 text-xs tracking-[0.3em] uppercase font-bold">
                My Journey
              </span>

              <h3 className="text-3xl md:text-4xl font-black text-white mt-4 mb-8">
                EXPERIENCE &{' '}
                <span className="text-red-600">
                  HIGHLIGHTS.
                </span>
              </h3>

              <div className="space-y-8">

                {/* Education */}
                <div>
                  <p className="text-red-500 text-xs tracking-widest uppercase mb-2">
                    01 / Education
                  </p>

                  <h4 className="text-white text-xl font-bold">
                    Master of Computer Applications (MCA)
                  </h4>

                  <p className="text-gray-400 text-sm mt-1">
                    Dr. Babasaheb Ambedkar Technological University
                  </p>

                  <p className="text-gray-500 text-xs mt-1">
                    2026 – 2028
                  </p>
                </div>

                {/* Professional Experience */}
                <div>
                  <p className="text-red-500 text-xs tracking-widest uppercase mb-2">
                    02 / Professional Experience
                  </p>

                  <h4 className="text-white text-xl font-bold">
                    Varroc Engineering Ltd.
                  </h4>

                  <p className="text-gray-400 text-sm mt-1">
                    Shopify Website Operations & Pincode Mapping System
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    Worked on product management, order operations,
                    shipping workflows, and website improvements.
                  </p>
                </div>

                {/* Entrepreneurship */}
                <div>
                  <p className="text-red-500 text-xs tracking-widest uppercase mb-2">
                    03 / Entrepreneurship
                  </p>

                  <h4 className="text-white text-xl font-bold">
                    Founder – Quanta Bit System
                  </h4>

                  <p className="text-gray-400 text-sm mt-1">
                    Building modern websites, scalable applications,
                    and digital solutions for businesses.
                  </p>
                </div>

                {/* Technical Skills */}
                <div>
                  <p className="text-red-500 text-xs tracking-widest uppercase mb-3">
                    04 / Technical Focus
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {[
                      'Java',
                      'DSA',
                      'MERN Stack',
                      'React.js',
                      'Next.js',
                      'Spring Boot',
                      'Python',
                      'Artificial Intelligence',
                      'Machine Learning',
                      'AWS',
                      'Docker',
                      'Kubernetes',
                      'Terraform',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-2 text-xs text-gray-300 bg-white/5 border border-white/10 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* CARD 3: TECHNICAL ECOSYSTEM */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-red-600/60 transition-all duration-500 overflow-hidden relative group"
          >

            {/* Mouse Spotlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)',
              }}
            ></div>

            <div className="space-y-2 text-left relative z-10">

              <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
                Production Tech Stack
              </h3>

              <p className="text-base md:text-lg font-semibold text-white">
                Equipped with modern technologies to build scalable digital solutions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 relative z-10">
              {[
                'Java',
                'Spring Boot',
                'React',
                'Next.js',
                'Node.js',
                'Express',
                'MongoDB',
                'MySQL',
                'AWS',
                'Docker',
                'Kubernetes',
                'Terraform',
                'GitHub Actions',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-wider text-white shadow-inner hover:bg-red-600/20 hover:border-red-600/40 hover:scale-105 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;