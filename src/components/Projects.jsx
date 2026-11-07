import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// PROJECT DATA
const projectsData = [
  // EXISTING PROJECTS

  {
    title: "Shopify Pincode Intelligence",
    category: "E-Commerce & Logistics Automation",
    description:
      "A pincode-to-warehouse mapping solution connecting customer locations with dedicated warehouses, shipping costs and delivery operations.",
    tags: ["Next.js", "Node.js", "MongoDB", "Shopify API"],
    status: "EXPERIENCE",
    episode: "S01 E01"
  },
  {
    title: "Loan Application System",
    category: "Java Full Stack Development",
    description:
      "A loan application management platform with REST APIs, database integration and backend services designed to streamline loan processing.",
    tags: ["Java", "Spring Boot", "MySQL", "Docker", "AWS"],
    status: "PROJECT",
    episode: "S01 E02"
  },
  {
    title: "ParamanPatra",
    category: "Blockchain Development",
    description:
      "A blockchain-based project exploring decentralized technology and secure digital information management.",
    tags: ["Blockchain", "JavaScript", "Web3"],
    status: "PROJECT",
    episode: "S01 E03"
  },
  {
    title: "Ubuntu Desktop Hardening",
    category: "Cybersecurity & System Engineering",
    description:
      "A desktop application designed to automate Ubuntu security hardening and simplify system security operations.",
    tags: ["Node.js", "Linux", "Ubuntu", "Security"],
    status: "PROJECT",
    episode: "S01 E04"
  },

  // PROCUREMENT AUTOMATION

  {
    title: "SupplyBridge AI",
    category: "AI Procurement & B2B Marketplace",
    description:
      "An intelligent procurement platform connecting industrial buyers and suppliers with AI-powered supplier discovery, RFQ automation, quotation comparison and sample tracking.",
    tags: ["Next.js", "Python", "FastAPI", "MongoDB", "AI/ML"],
    status: "CONCEPT",
    episode: "S01 E05"
  },
  {
    title: "AI Procurement Automation Agent",
    category: "Enterprise AI & Workflow Automation",
    description:
      "An AI procurement assistant that extracts requirements from purchase requests, analyzes supplier quotations, compares prices and recommends suitable vendors.",
    tags: ["Python", "LLM", "LangChain", "FastAPI", "MongoDB"],
    status: "CONCEPT",
    episode: "S01 E06"
  },

  // LOGISTICS AUTOMATION

  {
    title: "OneTrack - Unified Parcel Tracking",
    category: "Logistics Technology",
    description:
      "A multi-carrier parcel tracking platform designed to provide customers with centralized shipment visibility and delivery updates across courier partners.",
    tags: ["React Native", "Next.js", "Node.js", "MongoDB", "APIs"],
    status: "CONCEPT",
    episode: "S01 E07"
  },
  {
    title: "AI Logistics & Delivery Scheduler",
    category: "AI-Powered Logistics Optimization",
    description:
      "An intelligent delivery scheduling system that predicts delivery times, optimizes delivery routes, assigns shipments and helps reduce operational delays.",
    tags: ["Python", "Machine Learning", "FastAPI", "Maps API", "React"],
    status: "CONCEPT",
    episode: "S01 E08"
  },

  // AI & MACHINE LEARNING

  {
    title: "AI Demand Forecasting Engine",
    category: "Predictive Analytics & Machine Learning",
    description:
      "A predictive analytics platform that forecasts product demand using historical sales data, seasonal trends and machine learning models.",
    tags: ["Python", "Pandas", "Scikit-learn", "XGBoost", "FastAPI"],
    status: "CONCEPT",
    episode: "S01 E09"
  },
  {
    title: "Intelligent Resume & Job Matcher",
    category: "Generative AI & NLP",
    description:
      "An AI-powered recruitment assistant that analyzes resumes, extracts skills, compares job descriptions and generates candidate-job compatibility insights.",
    tags: ["Python", "NLP", "LLM", "FastAPI", "React"],
    status: "CONCEPT",
    episode: "S01 E10"
  },
  {
    title: "AI Business Intelligence Assistant",
    category: "Generative AI & Business Automation",
    description:
      "An AI assistant that converts business data into useful insights, answers natural-language questions and generates automated business reports.",
    tags: ["Python", "LLM", "LangChain", "SQL", "FastAPI"],
    status: "CONCEPT",
    episode: "S01 E11"
  },

  // CLOUD & DEVOPS

  {
    title: "Cloud CI/CD Pipeline",
    category: "DevOps & Cloud Infrastructure",
    description:
      "An automated CI/CD workflow that builds, tests and deploys applications using containerization and modern DevOps practices.",
    tags: ["AWS", "Docker", "Jenkins", "GitHub Actions", "Terraform"],
    status: "PROJECT",
    episode: "S01 E12"
  },

  // PORTFOLIO

  {
    title: "Netflix Developer Portfolio",
    category: "Frontend Engineering & Creative UI",
    description:
      "An interactive Netflix-inspired developer portfolio featuring cinematic animations, responsive layouts and an engaging project showcase.",
    tags: ["React", "GSAP", "Tailwind CSS", "Framer Motion"],
    status: "IN DEVELOPMENT",
    episode: "S01 E13"
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);

  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // INITIAL FOLDER POSITION
      gsap.set(
        [folderBackRef.current, folderFrontRef.current],
        {
          xPercent: -50,
          yPercent: -50
        }
      );

      gsap.set(folderFrontRef.current, {
        transformOrigin: "bottom center"
      });

      // INITIAL DESKTOP CARD POSITION
      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0
        });
      });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)"
        },
        (context) => {

          const { isDesktop, isMobile } = context.conditions;

          // DESKTOP ANIMATION
          if (isDesktop) {

            let floatTween;

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 50%",
                end: "bottom 50%",
                toggleActions: "play reverse play reverse",

                onEnter: () => {
                  if (floatTween) floatTween.kill();
                },

                onEnterBack: () => {
                  if (floatTween) floatTween.kill();
                },

                onLeave: () => {
                  if (floatTween) floatTween.kill();
                },

                onLeaveBack: () => {
                  if (floatTween) floatTween.kill();
                }
              },

              onComplete: () => {
                floatTween = gsap.to(cardsRef.current, {
                  y: "+=12",
                  rotation: "+=1",
                  duration: 3.5,
                  yoyo: true,
                  repeat: -1,
                  ease: "sine.inOut",
                  stagger: {
                    amount: 1.5,
                    from: "random"
                  }
                });
              }
            });

            // STEP 1: OPEN FOLDER
            tl.to(folderFrontRef.current, {
              rotationX: -130,
              duration: 1.2,
              ease: "power3.inOut"
            });

            // STEP 2: PROJECT CARDS RISE
            tl.to(
              cardsRef.current,
              {
                y: -140,
                scale: 0.9,
                zIndex: 70,
                duration: 0.6,
                stagger: 0.04,
                ease: "back.out(1.2)"
              },
              "-=0.6"
            );

            // STEP 3: ARRANGE PROJECT CARDS IN GRID
            tl.to(
              cardsRef.current,
              {
                x: (index) => {
                  const cardWidth =
                    Math.max(
                      ...cardsRef.current.map(
                        (card) => card?.offsetWidth || 0
                      )
                    ) || 360;

                  const columns = 3;
                  const gap = 35;
                  const column = index % columns;

                  return (
                    (column - 1) * (cardWidth + gap)
                  );
                },

                y: (index) => {
                  const cardHeight =
                    Math.max(
                      ...cardsRef.current.map(
                        (card) => card?.offsetHeight || 0
                      )
                    ) || 240;

                  const columns = 3;
                  const rows = Math.ceil(
                    projectsData.length / columns
                  );

                  const gap = 35;
                  const row = Math.floor(index / columns);

                  return (
                    (row - (rows - 1) / 2) *
                    (cardHeight + gap)
                  );
                },

                rotation: () => gsap.utils.random(-3, 3),
                scale: 1,
                duration: 1.4,

                stagger: {
                  amount: 0.5,
                  from: "center"
                },

                ease: "expo.out"
              },
              "-=0.2"
            );

            return () => {
              if (floatTween) floatTween.kill();
            };
          }

          // MOBILE ANIMATION
          if (isMobile) {

            const cardWidth = window.innerWidth * 0.8;
            const gap = 20;

            mobileCardsRef.current.forEach((card, index) => {
              if (!card) return;

              gsap.set(card, {
                x: -(index * (cardWidth + gap)),
                y: 0,
                scale: 0.4,
                opacity: 0,
                rotation: gsap.utils.random(-15, 15)
              });
            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%"
              }
            });

            // OPEN FOLDER
            tl.to(folderFrontRef.current, {
              rotationX: -130,
              duration: 0.8,
              ease: "power3.inOut"
            });

            // SHOW PROJECT CARDS
            tl.to(
              mobileCardsRef.current,
              {
                y: -100,
                opacity: 1,
                scale: 0.85,
                duration: 0.6,
                stagger: 0.05,
                ease: "back.out(1.2)"
              },
              "-=0.4"
            );

            // ENABLE SWIPE CAROUSEL
            tl.to(
              mobileCardsRef.current,
              {
                x: 0,
                y: 0,
                rotation: 0,

                scale: (index) =>
                  index === 0 ? 1 : 0.92,

                opacity: (index) =>
                  index === 0 ? 1 : 0.5,

                duration: 0.8,
                stagger: 0.08,
                ease: "expo.out",

                onComplete: () => {
                  if (mobileCarouselRef.current) {
                    mobileCarouselRef.current.style.overflowX = "auto";
                    mobileCarouselRef.current.style.pointerEvents = "auto";
                  }
                }
              },
              "-=0.2"
            );
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();

  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[190vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-24 md:py-40 select-none"
    >

      {/* BACKGROUND TITLE */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          ORIGINALS
        </h1>
      </div>

      {/* RED GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* MAIN FOLDER CONTAINER */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">

        <div className="relative w-0 h-0 transform-style-3d">

          {/* FOLDER BACK */}
          <div
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#141414] rounded-[24px] border border-red-600/40 shadow-[0_20px_50px_rgba(229,9,20,0.25)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#1f1f1f] rounded-t-xl border-t border-red-600/30" />

            <div className="relative z-10 text-red-600 font-mono font-black text-2xl tracking-widest uppercase opacity-60">
              ARCHIVE_SLOTS
            </div>
          </div>

          {/* DESKTOP PROJECT CARDS */}
          {projectsData.map((project, index) => (
            <div
              key={project.episode}
              ref={(el) => (cardsRef.current[index] = el)}
              className="hidden md:block absolute w-[80vw] md:w-[33vw] max-w-[380px] aspect-[16/10] will-change-transform"
              style={{ zIndex: 10 + index }}
            >
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.04] hover:border-red-600 hover:shadow-[0_35px_80px_rgba(229,9,20,0.35)] hover:-translate-y-2 cursor-pointer relative z-10 p-7 flex flex-col justify-between">

                {/* HEADER */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/20">
                    {project.episode}
                  </span>

                  <span className="text-[10px] font-mono border border-white/30 px-2 py-1 text-white/70">
                    {project.status}
                  </span>
                </div>

                {/* PROJECT INFORMATION */}
                <div className="space-y-2 my-auto">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                    {project.category}
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* TECHNOLOGY TAGS */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-1 rounded group-hover:border-red-600/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* RED ACCENT */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />

              </div>
            </div>
          ))}

          {/* FOLDER FRONT FLAP */}
          <div
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#1c1c1c] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-red-600/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE SWIPEABLE CAROUSEL */}
      <div
        ref={mobileCarouselRef}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
      >

        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {projectsData.map((project, index) => (
          <div
            key={`mobile-${project.episode}`}
            ref={(el) => (mobileCardsRef.current[index] = el)}
            className="shrink-0 w-[78vw] aspect-[16/11] snap-center will-change-transform relative z-10"
          >
            <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414] p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)]">

              {/* HEADER */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 bg-red-600/10 px-2 py-1 rounded">
                  {project.episode}
                </span>

                <span className="text-[9px] font-mono text-white/60">
                  {project.status}
                </span>
              </div>

              {/* PROJECT INFORMATION */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  {project.category}
                </div>

                <h3 className="text-xl font-black text-white">
                  {project.title}
                </h3>

                <p className="text-xs text-white/70 font-light line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* TECHNOLOGIES */}
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}

      </div>

    </section>
  );
};

export default Projects;