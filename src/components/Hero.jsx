import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.png';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);

  // Professional roles and technology areas
  const developerRoles = [
    'FULL STACK DEVELOPER',
    'JAVA DEVELOPER // DSA',
    'AI & MACHINE LEARNING',
    'AWS CLOUD // DEVOPS ENGINEER',
    'GENERATIVE AI // AUTOMATION',
    'FOUNDER // QUANTA BIT SYSTEM'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;

    if (!section || !card || !content) return;

    // GSAP Cinematic Entrance Animation
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' }
    });

    tl.fromTo(
      section.querySelector('header'),
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        content.querySelectorAll('.hero-anim-item'),
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.12
        },
        '-=0.7'
      )
      .fromTo(
        card,
        {
          scale: 0.75,
          opacity: 0,
          rotationY: 35,
          rotationX: -15
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          duration: 1.4,
          ease: 'back.out(1.2)'
        },
        '-=0.9'
      );

    // Custom Cursor Animation
    gsap.set(
      [cursorDotRef.current, cursorRingRef.current],
      {
        scale: 0.5,
        opacity: 0,
        transformOrigin: '50% 50%'
      }
    );

    const xToDot = gsap.quickTo(cursorDotRef.current, 'x', {
      duration: 0.05,
      ease: 'power2.out'
    });

    const yToDot = gsap.quickTo(cursorDotRef.current, 'y', {
      duration: 0.05,
      ease: 'power2.out'
    });

    const xToRing = gsap.quickTo(cursorRingRef.current, 'x', {
      duration: 0.15,
      ease: 'power3.out'
    });

    const yToRing = gsap.quickTo(cursorRingRef.current, 'y', {
      duration: 0.15,
      ease: 'power3.out'
    });

    // 3D Card Tilt
    const xTilt = gsap.quickTo(card, 'rotationY', {
      duration: 0.4,
      ease: 'power3.out'
    });

    const yTilt = gsap.quickTo(card, 'rotationX', {
      duration: 0.4,
      ease: 'power3.out'
    });

    const glareX = gsap.quickTo(glareRef.current, 'x', {
      duration: 0.3,
      ease: 'power2.out'
    });

    const glareY = gsap.quickTo(glareRef.current, 'y', {
      duration: 0.3,
      ease: 'power2.out'
    });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spotlight
      if (spotlightRef.current) {
        spotlightRef.current.style.transform =
          `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      // Cursor
      xToDot(x - 6);
      yToDot(y - 6);

      xToRing(x - 24);
      yToRing(y - 24);

      // Card Tilt
      const cardRect = card.getBoundingClientRect();

      const cardCenterX =
        cardRect.left + cardRect.width / 2 - rect.left;

      const cardCenterY =
        cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX =
        -((y - cardCenterY) / (cardRect.height / 2)) * 16;

      const rotateY =
        ((x - cardCenterX) / (cardRect.width / 2)) * 16;

      xTilt(rotateY);
      yTilt(rotateX);

      // Holographic Glare
      glareX(
        (x - cardRect.left) - cardRect.width / 2
      );

      glareY(
        (y - cardRect.top) - cardRect.height / 2
      );
    };

    const handleMouseEnter = () => {
      gsap.to(
        [cursorDotRef.current, cursorRingRef.current],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        }
      );

      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 1,
          duration: 0.3
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(
        [cursorDotRef.current, cursorRingRef.current],
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: 'power2.inOut'
        }
      );

      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3
        });
      }

      xTilt(0);
      yTilt(0);
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);

      tl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-between select-none cursor-none"
    >

      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
      `}</style>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0">

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">

          <div className="flex whitespace-nowrap animate-marquee">

            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span
                key={idx}
                className="text-[14vw] font-black text-red-600 mx-8 uppercase tracking-tighter"
              >
                {role} &bull;
              </span>
            ))}

          </div>

        </div>
      </div>

      {/* Mouse Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle, rgba(229,9,20,0.35) 0%, rgba(229,9,20,0.1) 40%, transparent 70%)'
        }}
      />

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-between pt-28 pb-12"
      >

        {/* Top Badge */}
        <div className="hero-anim-item flex flex-wrap items-center justify-between gap-4 w-full">

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">

            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />

            <span className="text-red-500 font-bold tracking-wider">
              PRATIK SINGARE // DEVELOPER
            </span>

            <span className="text-white/40">|</span>

            <span className="text-white/80">
              PORTFOLIO 2026
            </span>

          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">

            <span className="px-2 py-1 border border-white/20 rounded bg-black/40">
              FULL STACK
            </span>

            <span className="px-2 py-1 border border-white/20 rounded bg-black/40">
              AI & ML
            </span>

            <span className="px-2 py-1 border border-white/20 rounded bg-black/40">
              CLOUD & DEVOPS
            </span>

          </div>

        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 my-auto py-12">

          {/* LEFT SIDE */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">

            <div className="hero-anim-item flex flex-wrap items-center gap-3">

              <span className="px-2.5 py-1 bg-red-600 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.8)]">
                MCA STUDENT
              </span>

              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">
                Developer & Technology Enthusiast
              </span>

            </div>

            {/* Name */}
            <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">

              PRATIK

              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_35px_rgba(220,38,38,0.5)]">
                SINGARE.
              </span>

            </h1>

            {/* Technology Highlights */}
            <div className="hero-anim-item flex flex-wrap items-center gap-3 text-xs font-mono text-red-400 font-bold">

              <span>JAVA</span>
              <span className="text-white/40">•</span>

              <span>MERN STACK</span>
              <span className="text-white/40">•</span>

              <span>AI / ML</span>
              <span className="text-white/40">•</span>

              <span>AWS & DEVOPS</span>

            </div>

            {/* Introduction */}
            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md">

              I'm Pratik Singare, an MCA student, Full Stack Developer
              and technology enthusiast passionate about Java,
              Cloud Computing, DevOps, Artificial Intelligence
              and Machine Learning.

              I enjoy building scalable applications, exploring
              intelligent systems and transforming ideas into
              practical technology solutions.

            </p>

            {/* Founder Badge */}
            <div className="hero-anim-item flex items-center gap-3 border-l-2 border-red-600 pl-4">

              <div>

                <p className="text-white text-sm font-bold">
                  Founder – Quanta Bit System
                </p>

                <p className="text-white/50 text-xs">
                  Building digital solutions for businesses
                </p>

              </div>

            </div>

            {/* Buttons */}
            <div className="hero-anim-item flex flex-wrap items-center gap-4 pt-3">

              <a
                href="#projects"
                className="px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >

                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>

                View Projects

              </a>

              <a
                href="#contact"
                className="px-8 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >

                Contact Me

              </a>

            </div>

          </div>

          {/* CENTER PROFILE CARD */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">

            <div
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >

              {/* Neon Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-red-600/70 via-rose-600/40 to-purple-600/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000" />

              {/* Profile Card */}
              <div className="relative w-[280px] md:w-[320px] p-3.5 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-red-600/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">

                {/* Holographic Glare */}
                <div
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                />

                {/* Profile Label */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-red-600 text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">
                  SOFTWARE DEVELOPER
                </div>

                <img
                  src={pictureImg}
                  alt="Pratik Singare - Full Stack Developer"
                  className="w-full h-[330px] md:h-[390px] object-cover rounded-xl filter contrast-125 brightness-105 group-hover:scale-[1.02] transition-transform duration-500"
                />

                <div className="mt-3 text-center">

                  <p className="text-white font-bold tracking-widest text-sm">
                    PRATIK SINGARE
                  </p>

                  <p className="text-red-500 text-[10px] font-mono tracking-widest mt-1">
                    CODE • CREATE • INNOVATE
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE: EDUCATION, SKILLS & AI/ML */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">

            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-red-600/30 rounded-xl shadow-2xl max-w-xs w-full">

              <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold mb-4">
                Developer Profile
              </h3>

              <div className="space-y-4">

                {/* Education */}
                <div>

                  <p className="text-white font-bold text-sm">
                    MCA @ DBATU
                  </p>

                  <p className="text-xs text-white/50">
                    2026 – 2028 | Pursuing
                  </p>

                </div>

                {/* Entrepreneurship */}
                <div>

                  <p className="text-white font-bold text-sm">
                    Founder – Quanta Bit System
                  </p>

                  <p className="text-xs text-white/60">
                    Digital products & business solutions
                  </p>

                </div>

                {/* AI and ML */}
                <div>

                  <p className="text-xs text-red-400 font-bold uppercase tracking-wider mb-2">
                    AI & Machine Learning
                  </p>

                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    Python • Machine Learning • Generative AI •
                    LLMs • Prompt Engineering • AI Automation
                  </p>

                </div>

                {/* Cloud and DevOps */}
                <div>

                  <p className="text-xs text-red-400 font-bold uppercase tracking-wider mb-2">
                    Cloud & DevOps
                  </p>

                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    AWS • Docker • Kubernetes • Jenkins •
                    Terraform • GitHub Actions
                  </p>

                </div>

                {/* Full Stack */}
                <div>

                  <p className="text-xs text-red-400 font-bold uppercase tracking-wider mb-2">
                    Full Stack Development
                  </p>

                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    Java • Spring Boot • React • Next.js •
                    Node.js • MongoDB • MySQL
                  </p>

                </div>

              </div>

            </div>

            {/* AI Project Ideas */}
            <div className="p-4 bg-red-950/20 backdrop-blur-xl border border-red-600/20 rounded-xl max-w-xs w-full">

              <h3 className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold mb-3">
                AI / ML Project Interests
              </h3>

              <div className="space-y-2 text-xs text-white/70">

                <p>✦ AI Resume Analyzer</p>

                <p>✦ AI Business Management Assistant</p>

                <p>✦ Predictive Logistics Analytics</p>

              </div>

              <p className="text-[9px] text-white/40 mt-3 uppercase tracking-widest">
                Exploring Intelligent Solutions
              </p>

            </div>

          </div>

        </div>

        {/* Bottom Ticker */}
        <div className="hero-anim-item flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/50 tracking-widest uppercase">

          <span>
            BUILDING THE FUTURE WITH CODE
          </span>

          <span>
            JAVA • MERN • AI • AWS • DEVOPS
          </span>

          <span>
            [ PRATIK SINGARE ]
          </span>

        </div>

      </div>

      {/* Custom Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#E50914]"
      />

      {/* Custom Cursor Ring */}
      <div
        ref={cursorRingRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-red-600/60 rounded-full flex items-center justify-center backdrop-blur-[1px]"
      />

      {/* Netflix Inspired Navbar */}
      <header className="absolute top-0 left-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto">

        <div className="text-2xl font-black text-red-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(229,9,20,0.9)]">

          PRATIK

          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />

        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">

          <a href="#home" className="hover:text-red-500 transition-colors">
            Home
          </a>

          <a href="#about" className="hover:text-red-500 transition-colors">
            About
          </a>

          <a href="#expertise" className="hover:text-red-500 transition-colors">
            Expertise
          </a>

          <a href="#skills" className="hover:text-red-500 transition-colors">
            Skills
          </a>

          <a href="#projects" className="hover:text-red-500 transition-colors">
            Projects
          </a>

          <a href="#contact" className="hover:text-red-500 transition-colors">
            Contact
          </a>

        </nav>

        <a
          href="#contact"
          className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-105 active:scale-95"
        >
          Hire Me
        </a>

      </header>

    </section>
  );
};

export default Hero;