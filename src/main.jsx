import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WebGLBackground } from './WebGLBackground';
import { KotaverseCta } from './KotaverseCta';
import { HeroDesktopSvg } from './HeroDesktopSvg';
import HeroMobileSvg from './HeroMobileSvg';
import './style.css';

gsap.registerPlugin(ScrollTrigger);
const cdn = 'https://kota-content.b-cdn.net/app/uploads/';

/* ===== ARROW SVG ===== */
function ArrowSvg({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.1 15.17" className={className}>
      <path d="m17.1,7.58s-.01-.04-.01-.06c.01-.22-.06-.45-.24-.61L9.23.19c-.31-.27-.78-.24-1.06.07-.27.31-.24.78.07,1.06l6.26,5.52H.75c-.41,0-.75.34-.75.75s.34.75.75.75h13.74l-6.26,5.52c-.31.27-.34.75-.07,1.06.15.17.35.25.56.25.18,0,.35-.06.5-.19l7.62-6.72c.18-.16.25-.39.24-.61,0-.02.01-.04.01-.06Z" fill="currentColor" />
    </svg>
  );
}

/* ===== KOTA LOGO SVG ===== */
function KotaLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
      <path fill="currentColor" d="M5 5h80v80H5V5zM0 90h90V0H0v90zm64.66-15.67l-5.15-16.61h-.1l-5.35 16.61H47.6l9.49-24.09h4.74l9.39 24.09h-6.56zm-39.77 0V55.67h-6.66v-5.43H37.6v5.43h-6.66v18.66h-6.06zm34.52-59.16c-3.94-.1-7.67 1.74-9.99 4.92-.64.81-1.15 1.7-1.52 2.67-.6 1.64-.9 3.38-.9 5.13v.05c.07 6.78 5.62 12.22 12.4 12.15h.56c6.88-.29 12.22-6.1 11.93-12.97-.28-6.69-5.79-11.96-12.48-11.94m.1 19.48c-3.94 0-6.56-3.38-6.56-7.18s2.62-6.97 6.46-6.97 6.46 3.38 6.46 7.07-2.52 7.08-6.36 7.08m-28.87 5.02l-6.46-10.35h-.1v10.35h-6.06v-24.1h6.06v10.87h.1l6.66-10.87h6.36l-7.87 12 8.38 12.1h-7.06z" />
    </svg>
  );
}

/* ===== DIAGONAL ARROW SVG ===== */
function DiagArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.42 110.66">
      <polygon points="13.65 102.66 109.53 6.67 103.87 1.02 8 97 8 0 0 0 0 110.66 111.42 110.66 111.42 102.66 13.65 102.66" />
    </svg>
  );
}

/* ===== LINK ARROW (small ↗) ===== */
function LinkArrow() {
  return (
    <svg width=".7rem" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ===== PROJECT ARROW SVG ===== */
function ProjectArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.78 14.78" style={{ width: '0.9375rem', height: '0.9375rem', flexShrink: 0 }}>
      <defs>
        <linearGradient id="projGrad" x1="3.54" x2="13.98" y1="3.54" y2="13.99" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7c41f3" />
          <stop offset="1" stopColor="#ff6eff" />
        </linearGradient>
      </defs>
      <path fill="url(#projGrad)" strokeWidth="0" d="M13.25 12.18L13.25 0.23 14.78 0.23 14.78 14.76 14.74 14.76 14.74 14.78 0.21 14.78 0.21 13.25 12.18 13.25 0 1.08 1.08 0 13.25 12.18z" />
    </svg>
  );
}

/* ===== PLUS/CROSS ICON FOR FAQ ===== */
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/* ===== BUTTON COMPONENT ===== */
function Button({ children, href = '#', white = false }) {
  return (
    <div className={`btn ${white ? 'btn-white' : ''}`} data-direction="forwards">
      <a className="btn-inner" href={href}>
        <span className="btn-border" />
        <span className="btn-text">
          <span className="btn-text-inner">{children}</span>
          <ArrowSvg className="btn-arrow" />
        </span>
      </a>
    </div>
  );
}

/* ===== HEADER ===== */
function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <>
      <header className="header" data-modal-hide="true">
        <a className="header-logo" href="/">
          <KotaLogo />
        </a>
        <div className="header-right">
          <a className="header-button" href="/start-your-project">
            <span className="header-button-text">
              <span>Hire us</span>
              <ArrowSvg className="header-button-arrow" />
            </span>
          </a>
          <button
            className={`nav-toggle ${open ? 'active' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span className="nav-line" />
            <span className="nav-line" />
          </button>
        </div>
      </header>

      <p className="celebrating" data-modal-hide="true">
        <a href="https://10-years.kota.co.uk/" target="_blank" rel="noreferrer">
          Celebrating 13 years : 2013 - 2026
        </a>
      </p>

      {/* Backdrop for outside click */}
      {open && (
        <div
          className="menu-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating White Card Popup Modal */}
      <aside className={`menu-popup-card ${open ? 'open' : ''}`} aria-hidden={!open}>
        <button
          className="menu-card-close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <nav className="menu-card-nav">
          <a href="/work/" onClick={() => setOpen(false)}>Work</a>
          <a href="/agency/" onClick={() => setOpen(false)}>Agency</a>
          <a href="/services/" onClick={() => setOpen(false)} className="menu-services-link">
            <span>Services</span>
            <span className="menu-plus">+</span>
          </a>
          <a href="/blog/" onClick={() => setOpen(false)}>Blog</a>
          <a href="/culture/" onClick={() => setOpen(false)}>Culture</a>
          <a href="/contact/" onClick={() => setOpen(false)}>Contact</a>
        </nav>

        <div className="menu-card-bottom">
          <a className="menu-start-project-btn" href="/start-your-project" onClick={() => setOpen(false)}>
            <span>Start your project</span>
            <ArrowSvg className="menu-btn-arrow" />
          </a>
        </div>
      </aside>
    </>
  );
}

/* ===== HERO SECTION ===== */
function Hero({ onWatchShowreel }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-split-text">
          {/* Desktop SVG wrap with perfectly positioned circular video */}
          <div className="hero-desktop-wrap">
            <HeroDesktopSvg />
            <div
              className="hero-video"
              onClick={onWatchShowreel}
              title="Click to play showreel"
            >
              <video
                src="/hero-preview-loop.mp4"
                poster="/hero-poster.jpg"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>

          {/* Mobile SVG */}
          <HeroMobileSvg />

          {/* Intro text */}
          <h1 className="hero-intro-text">
            <span>
              A global branding agency and creative web design studio based in London,{' '}
              <strong>where strategic-thinkers give bold brands their edge.</strong>
            </span>
          </h1>
        </div>
      </div>

      <div className="hero-logos" data-modal-hide="true">
        <div className="hero-logos-inner">
          <img src={cdn + '2024/03/Digital-Agency-Network.svg'} alt="Digital Agency Network" />
          <img src={cdn + '2024/02/clutch.svg'} alt="Clutch" />
          <img src={cdn + '2024/02/awwwards.svg'} alt="Awwwards" />
          <img src={cdn + '2024/02/cssda.svg'} alt="CSSDA" />
        </div>
      </div>
    </section>
  );
}

/* ===== APPROACH SECTION ===== */
const approaches = [
  ['01', 'Brand Clarity', 'Decisions that help brands re-position and commit.'],
  ['02', 'Creative Craft', 'Visually confident design built to stand out.'],
  ['03', 'Commercial Momentum', 'Scalable systems with growth in mind.'],
];

function Approach() {
  const headingLines = [
    'Shaping how global',
    'brands are seen, trusted,',
    'and remembered.',
  ];

  return (
    <section className="approach">
      <div className="container">
        <div className="approach-heading-row">
          <h2 className="approach-heading">
            {headingLines.map((line, lineIdx) => (
              <span key={lineIdx} className="approach-heading-line">
                {line.split(' ').map((word, wordIdx) => (
                  <span key={wordIdx} className="approach-word">
                    {word.split('').map((char, charIdx) => (
                      <span key={charIdx} className="approach-char">
                        {char}
                      </span>
                    ))}
                    <span className="approach-space">&nbsp;</span>
                  </span>
                ))}
                {lineIdx < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="approach-desc FadeInUp_container___uxva">
            There are moments of change for every brand, whether it's rapid growth, new goals, or new expectations. That's where our work begins.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="approach-items">
          {approaches.map(([num, title, desc]) => (
            <div key={num} className="approach-item-wrap FadeInUp_container___uxva">
              <div className="approach-item">
                <span className="step-number">{num} —</span>
                <h3 className="approach-card-title">
                  {title.split(' ').map((w, wi) => (
                    <span key={wi} className="approach-card-word">
                      {w.split('').map((c, ci) => (
                        <span key={ci} className="approach-card-char">
                          {c}
                        </span>
                      ))}
                      <span className="approach-space">&nbsp;</span>
                    </span>
                  ))}
                </h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== SERVICES SECTION ===== */
const serviceData = [
  {
    title: 'Brand strategy & identity',
    tags: ['Brand strategy', 'Brand identity design', 'Tone of voice'],
    text: "When growth pulls at it, new audiences dilute it, and good intentions blur it, we'll strengthen your brand with clear decisions that feel inevitable.",
    video: '2026/07/Branding-1.mp4',
    poster: '2023/10/wogan-1.jpg',
    href: 'service/brand-strategy-and-identity',
  },
  {
    title: 'Web design & development',
    tags: ['Creative web design', 'Web development', 'WordPress & CMS'],
    text: 'Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.',
    video: '2026/07/Websites-2026-1.mp4',
    poster: '2023/10/Web-design-Development.jpg',
    href: 'service/web-design-development',
  },
  {
    title: 'Growth marketing',
    tags: ['SiteCare', 'SEO & GEO', 'Copywriting'],
    text: 'SEO & AI search, content creation, copywriting, and ongoing support. Whatever you need, get seen and make it count with work that moves, connects and performs.',
    video: '2023/11/Growth-Marketing.mp4',
    poster: '2023/10/floan.jpg',
    href: 'service/growth-marketing',
  },
];

function Services() {
  return (
    <section className="services-section Services_services__YnZAs" id="services">
      <div className="container">
        <h2 className="services-heading ServicesHeading_heading__w6gAZ">
          <div className="LargeHeading_headingOuter__i9qcd">
            <span className="services-heading-top">
              <span className="split-word">
                {'Our'.split('').map((c, i) => (
                  <span key={i} className="split-char">
                    {c}
                  </span>
                ))}
              </span>
            </span>
            <span className="services-heading-bottom ServicesHeading_bottom__K8yXu">
              <span className="split-word">
                {'Services'.split('').map((c, i) => (
                  <span key={i} className="split-char">
                    {c}
                  </span>
                ))}
              </span>
            </span>
          </div>
          <div className="arrow-wrap AnimatedArrow_animatedArrow__Q4v7Q">
            <div className="arrow-inner AnimatedArrow_innerArrow__6mwTB">
              <DiagArrow />
            </div>
          </div>
        </h2>
      </div>
      <div className="services-panels ServicesPanels_panels__NpKkK">
        <div className="container">
          {serviceData.map((s) => (
            <div className="AnimatedPanel_panel__eAXfR service-panel-wrap" key={s.title}>
              <div>
                <div className="ServicesPanel_panel__YF4OS servicePanel service-panel">
                  <div className="ServicesPanel_panelText__iyjwZ service-panel-text">
                    <h3 className="ServicesPanel_panelHeading__5Sy4s service-panel-heading">{s.title}</h3>
                    <div className="ServicesPanel_tags__6NQOl service-tags">
                      {s.tags.map((t) => (
                        <a className="ServicesPanel_tag__JYwRk service-tag" href={`#${t}`} key={t}>
                          {t}
                        </a>
                      ))}
                    </div>
                    <p className="ServicesPanel_panelMainText__4F0TZ service-panel-main-text">{s.text}</p>
                    <div className="Magnetic_magnetic__LncOy">
                      <Button href={s.href}>Find out more</Button>
                    </div>
                  </div>
                  <div className="ServiceMedia_mediaContainer__WGgZa service-media">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster={cdn + s.poster}
                      src={cdn + s.video}
                    />
                  </div>
                  <div className="ServicesPanel_panelBackground__O9mDV service-panel-bg" />
                </div>
              </div>
              <div className="AnimatedPanel_spacer__w4GTD service-panel-spacer" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== CAROUSEL / FRAMEWORK SECTION ===== */
const carouselSteps = [
  { tab: 'Strategy first. Always', title: 'Strategy first.\nAlways.', text: "It all starts with clear thinking. Through stakeholder interviews and workshops, we immerse ourselves in your world to sharpen your positioning, messaging and direction before anyone touches the visuals.", video: '2026/07/Strategy-Firstv2-compressed.mp4', poster: '2026/07/strategy-first.jpg' },
  { tab: 'Find the bold idea', title: 'Find the\nbold idea.', text: "We'll push you creatively, but we'll always ground our ideas in strategy. From brand identity design to website interactions and immersion, every detail earns its place.", video: '2026/07/Find-The-Bold-Idea-compressed.mp4', poster: '2026/07/find-the-bold-idea.jpg' },
  { tab: 'Nail the process', title: 'Nail the\nprocess.', text: "We're collaborative, decisive, and clear from day one. You'll feel the momentum. You'll know where you stand. You'll have a team that knows when to lead, and when to listen.", video: '2026/07/Nail-The-Process-compressed.mp4', poster: '2026/07/nail-the-process.jpg' },
  { tab: 'Create to convert', title: 'Create to\nconvert.', text: 'We sweat the small stuff. From brand visuals to SEO and UX flow, every creative decision is designed to boost engagement, drive conversions, and build brand equity.', video: '2026/07/Create-To-Convert-compress.mp4', poster: '2026/07/create-to-convert.jpg' },
  { tab: 'Build for scale', title: 'Build for\nscale.', text: "We're ready for your growth. In fact, we're rooting for it. Whether it's a new product, campaign, or pivot, we make sure your digital presence is set up to flex with you.", video: '2026/07/Build-For-Scale-V3-compressed.mp4', poster: '2026/07/build-for-scale-V3.jpg' },
];

function Carousel() {
  const [active, setActive] = useState(0);

  const prevSlide = () => {
    setActive((curr) => (curr > 0 ? curr - 1 : carouselSteps.length - 1));
  };

  const nextSlide = () => {
    setActive((curr) => (curr < carouselSteps.length - 1 ? curr + 1 : 0));
  };

  return (
    <section className="carousel-section Carousel_carousel__tZbXT" id="carousel">
      <div className="container">
        <h2 className="carousel-heading Carousel_heading__kEfF1">
          <span className="MaskInUp_container__0AW5i">
            <div>{'Our brand-to-build\nframework.'}</div>
          </span>
        </h2>
      </div>
      <div className="carousel-nav CarouselSlides_carouselNavigation__PT0fb">
        {carouselSteps.map((s, i) => (
          <button
            key={s.tab}
            className={`carousel-nav-btn CarouselSlides_carouselNavigationButton__PEeuA ${active === i ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            {s.tab}
          </button>
        ))}
      </div>
      <div className="container">
        <div className="carousel-slides CarouselSlides_carouselSlides__H1J6i">
          <div className="swiper-prev" onClick={prevSlide} role="button" aria-label="Previous slide">
            <div className="Magnetic_magnetic__LncOy">
              <svg xmlns="http://www.w3.org/2000/svg" width="71.563" height="71.242" viewBox="0 0 71.563 71.242">
                <g id="Group_52822" data-name="Group 52822" transform="translate(37.625 2.12) rotate(45)">
                  <line id="Line_19" data-name="Line 19" y1="45.507" x2="45.455" transform="translate(0 1.7)" fill="none" stroke="#000" strokeWidth="6" />
                  <path id="Path_118" data-name="Path 118" d="M47.544,47.207,0,47.209V0" transform="translate(0 0)" fill="none" stroke="#000" strokeWidth="6" />
                </g>
              </svg>
            </div>
          </div>

          <div className="swiper-root CarouselSlides_swiperRoot__bWt6k">
            {carouselSteps.map((s, i) => (
              <div key={s.tab} style={{ display: active === i ? 'block' : 'none' }}>
                <div className="carousel-slide CarouselSlides_carouselSlide__gJ_Hz">
                  <div className="carousel-slide-media CarouselSlides_carouselMedia__aqYWx">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster={cdn + s.poster}
                      src={cdn + s.video}
                    />
                  </div>
                  <div className="carousel-slide-content CarouselSlides_carouselContent__bcvJC">
                    <h2>{s.title}</h2>
                    <p>{s.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="swiper-next" onClick={nextSlide} role="button" aria-label="Next slide">
            <div className="Magnetic_magnetic__LncOy">
              <svg xmlns="http://www.w3.org/2000/svg" width="71.563" height="71.242" viewBox="0 0 71.563 71.242">
                <g id="Group_56283" data-name="Group 56283" transform="translate(33.939 69.122) rotate(-135)">
                  <line id="Line_19" data-name="Line 19" y1="45.507" x2="45.455" transform="translate(0 1.7)" fill="none" stroke="#000" strokeWidth="6" />
                  <path id="Path_118" data-name="Path 118" d="M47.544,47.207,0,47.209V0" transform="translate(0 0)" fill="none" stroke="#000" strokeWidth="6" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== WORK / PROJECTS SECTION ===== */
const projectsData = [
  {
    client: 'UPP',
    year: '2025',
    headline: 'A cinematic web experience for a Hollywood powerhouse.',
    tags: ['Web design & development', 'Agencies'],
    image: 'https://kota-content.b-cdn.net/app/uploads/2025/04/upp-featured-mobile.jpg',
    video: 'https://kota-content.b-cdn.net/app/uploads/2025/04/Featured2-Compressed.mp4',
    href: '/work/upp',
    isLarge: true,
  },
  {
    client: 'Copper',
    year: '2026',
    headline: 'A new brand for the technology behind always-on markets.',
    tags: ['Branding', 'Web design & development', 'Brand strategy', 'Tone of voice', 'Brand identity', 'Finance'],
    image: 'https://kota-content.b-cdn.net/app/uploads/2026/07/Copper-Feature-2560x1440.png',
    video: 'https://kota-content.b-cdn.net/app/uploads/2026/07/Copper-Feature-V3.mp4',
    href: '/work/copper',
    isLarge: false,
  },
  {
    client: 'Bucher + Suter',
    year: '2026',
    headline: 'How Bucher + Suter found brand clarity through a new strategy with KOTA',
    tags: ['Branding', 'Web design & development', 'Brand strategy', 'Tone of voice', 'Brand identity', 'B2B tech, software & SaaS'],
    image: 'https://kota-content.b-cdn.net/app/uploads/2026/06/Featured-Image.png',
    video: 'https://kota-content.b-cdn.net/app/uploads/2026/06/Featured-Video.mp4',
    href: '/work/bucher-suter',
    isLarge: false,
  },
  {
    client: 'Finura',
    year: '2025',
    headline: 'A new vision for modern wealth management',
    tags: ['Web design & development', 'Brand strategy', 'Tone of voice', 'Brand identity', 'Finance'],
    image: 'https://kota-content.b-cdn.net/app/uploads/2026/01/finura-logo-still.png',
    video: 'https://kota-content.b-cdn.net/app/uploads/2026/01/Finura_Logo_Animation.mp4',
    href: '/work/finura',
    isLarge: false,
  },
  {
    client: 'The Goat Agency',
    year: '2025',
    headline: 'Influence everywhere: a future-ready website for The Goat Agency.',
    tags: ['Web design & development', 'Agencies'],
    image: 'https://kota-content.b-cdn.net/app/uploads/2025/08/GOAT-FeaturedImage.png',
    video: 'https://kota-content.b-cdn.net/app/uploads/2025/08/GOAT-FeatureVideo.mp4',
    href: '/work/the-goat-agency',
    isLarge: false,
  },
];

function Work() {
  return (
    <section className="Work_work__rSI8c work-section" id="work">
      <div className="DarkThemeSwitch_cover__hn_xc" />
      <div className="container">
        <div className="Work_text__WI9A4 work-heading">
          <h2 className="Work_heading__pbv4g">
            <div className="LargeHeading_headingOuter__i9qcd">
              <span className="Work_heading__pbv4g">Our</span>
              <span className="Work_heading__pbv4g Work_bottom__rzrzH">Work</span>
            </div>
          </h2>
          <div className="Work_rightText__zx_Y0 work-heading-right">
            <h3><span className="FadeInUp_container___uxva">Making brands a damn site better.</span></h3>
            <p><span className="FadeInUp_container___uxva">Dive into our projects and the decisions that shaped them.</span></p>
          </div>
        </div>
      </div>

      <div className="Work_projects__A5q77">
        <div className="AnimatedGrid_grid__otAMD">
          <div className="container">
            {projectsData.map((project) => (
              <a
                key={project.client}
                className={`ProjectCard_project__d1wbY ${project.isLarge ? 'ProjectCard_large__JOQbv' : 'ProjectCard_small__xsL92'}`}
                data-animation="grid-item"
                href={project.href}
              >
                <div className="ProjectCard_projectText__o770X">
                  <h3>
                    <ProjectArrow />
                    <span>{project.client}</span>
                  </h3>
                  <p>{project.year}</p>
                </div>
                <div className="ProjectCard_projectImage__Nfx9I">
                  <div className="ProjectCard_imageOverlay__OCawr">
                    <p className="ProjectCard_heading__1csIW">{project.headline}</p>
                    <ul className="ProjectCard_tags__XdVcf">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="Image_image__RAAdZ Image_fill__EiIzS">
                    <img src={project.image} alt={project.client} loading="lazy" />
                  </span>
                  <video
                    src={project.video}
                    className="ProjectCard_video__AheFz"
                    muted
                    loop
                    preload="none"
                    playsInline
                  />
                </div>
              </a>
            ))}

            <div className="Work_buttonContainer__Owbmu">
              <span className="FadeInUp_container___uxva">
                <div className="Magnetic_magnetic__LncOy">
                  <Button href="/work" white>View all projects</Button>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== STATISTICS / RESULTS SECTION ===== */
const statsData = [
  {
    pct: '67.6%',
    desc: 'rise in engaged sessions per user after 1 month.',
    client: 'Pison',
    img: 'Pison-Image.png',
    logo: 'Pison-Logo-White.svg',
    link: 'https://kota.co.uk/work/pison/',
    bg: 'https://kota-content.b-cdn.net/app/uploads/2024/05/Statistics-bg-black.jpeg',
  },
  {
    pct: '70.8%',
    desc: 'increase in average engagement time after 3 months.',
    client: 'DKA',
    img: 'DKA-Image.png',
    logo: 'DKA-Logo-White.svg',
    link: 'https://kota.co.uk/work/dka/',
    bg: 'https://kota-content.b-cdn.net/app/uploads/2024/05/Statistics-bg-black.jpeg',
  },
  {
    pct: '83.14%',
    desc: 'increase in sales after 1 year.',
    client: 'Wogan Coffee',
    img: 'Wogan-Image.png',
    logo: 'Wogan-Logo-White.svg',
    link: 'https://kota.co.uk/work/wogan-coffee/',
    bg: 'https://kota-content.b-cdn.net/app/uploads/2024/05/Statistics-bg-black.jpeg',
  },
  {
    pct: '104.9%',
    desc: 'increase in organic visits after 1 month',
    client: 'ISI Global',
    img: 'ISI-Image-WhiteOutline.png',
    logo: 'ISI-Logo-White.svg',
    link: 'https://kota.co.uk/work/isi-global/',
    bg: 'https://kota-content.b-cdn.net/app/uploads/2024/05/Statistics-bg-black.jpeg',
  },
];

/* ===== SWIPE & DRAG DECK HOOK ===== */
function useSwipeDeck(count, active, setActive) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontal = useRef(null);
  const dragStartTime = useRef(0);
  const hasDragged = useRef(false);
  const wheelLock = useRef(false);

  const onPointerDown = (e) => {
    if (e.target.closest('a, button, .btn')) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
    startX.current = e.clientX;
    startY.current = e.clientY;
    dragStartTime.current = Date.now();
    isHorizontal.current = null;
    hasDragged.current = false;
    setIsDragging(true);
    setDragOffset(0);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    if (isHorizontal.current === null) {
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        isHorizontal.current = Math.abs(dx) > Math.abs(dy);
      }
    }

    if (isHorizontal.current) {
      if (Math.abs(dx) > 8) {
        hasDragged.current = true;
      }
      let clampedDx = dx;
      if (active === 0 && dx > 0) {
        clampedDx = dx * 0.35;
      }
      setDragOffset(clampedDx);
    }
  };

  const onPointerUp = (e) => {
    if (!isDragging) return;
    try {
      if (e?.currentTarget && e?.pointerId !== undefined && e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
    setIsDragging(false);

    if (isHorizontal.current && hasDragged.current) {
      const dt = Date.now() - dragStartTime.current;
      const velocity = Math.abs(dragOffset) / (dt || 1);
      if (dragOffset < -40 || (dragOffset < -15 && velocity > 0.2)) {
        setActive((prev) => (prev + 1) % count);
      } else if (dragOffset > 40 || (dragOffset > 15 && velocity > 0.2)) {
        setActive((prev) => (prev - 1 + count) % count);
      }
    }
    setDragOffset(0);
    isHorizontal.current = null;
    setTimeout(() => { hasDragged.current = false; }, 60);
  };

  const onWheel = (e) => {
    if (Math.abs(e.deltaX) > 25 && Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5) {
      if (wheelLock.current) return;
      wheelLock.current = true;
      if (e.deltaX > 25) {
        setActive((prev) => (prev + 1) % count);
      } else if (e.deltaX < -25) {
        setActive((prev) => (prev - 1 + count) % count);
      }
      setTimeout(() => { wheelLock.current = false; }, 400);
    }
  };

  return {
    isDragging,
    dragOffset,
    hasDragged,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onWheel,
    },
  };
}

function Statistics() {
  const [active, setActive] = useState(3); // Start on card 4 (ISI Global) with 4 cards stacked at a time
  const { isDragging, dragOffset, hasDragged, handlers } = useSwipeDeck(statsData.length, active, setActive);
  const headingRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 1, color: '#ffffff' },
        {
          opacity: 0,
          color: '#222222',
          ease: 'none',
          scrollTrigger: {
            trigger: '#statistics',
            start: 'top 20%',
            end: 'top -25%',
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="Statistics_statistics__vWlOY" id="statistics">
      <div className="container StatisticsHeading_wrap">
        <h2 className="StatisticsHeading_heading__3C_3F" ref={headingRef}>
          <span>
            <div className="LargeHeading_headingOuter__i9qcd">
              <span className="StatisticsHeading_heading__3C_3F">Our</span>
              <span className="StatisticsHeading_heading__3C_3F StatisticsHeading_bottom__WtLQC">Results</span>
            </div>
          </span>
        </h2>
      </div>

      <div className="StatisticsCarousel_panels__pxnru">
        <div className="StatisticsCarousel_container__2XA6W">
          <div className="StatisticsCarousel_swiper__PGdj6">
            <div className={`stats-stack-deck ${isDragging ? 'is-dragging' : ''}`} {...handlers}>
              {statsData.map((item, idx) => {
                const diff = active - idx;
                let cardStyle = {};
                const transitionStyle = isDragging ? 'none' : 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease';

                if (idx < active) {
                  const offsetPct = -diff * 3.5;
                  const offsetPx = -diff * 26;
                  const dragShift = isDragging && dragOffset > 0 && idx === active - 1 ? (dragOffset * 0.5) : 0;
                  cardStyle = {
                    transform: `translate3d(calc(${offsetPct}% + ${offsetPx + dragShift}px), 0, ${-diff * 60}px)`,
                    zIndex: idx + 1,
                    opacity: 1,
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    transition: transitionStyle,
                  };
                } else if (idx === active) {
                  const currentX = isDragging ? dragOffset : 0;
                  cardStyle = {
                    transform: `translate3d(${currentX}px, 0, 0)`,
                    zIndex: 10,
                    opacity: 1,
                    pointerEvents: 'auto',
                    transition: transitionStyle,
                  };
                } else {
                  const isNext = idx === active + 1 || (active === statsData.length - 1 && idx === 0);
                  const peekX = isDragging && dragOffset < 0 && isNext ? `calc(100% + ${dragOffset}px)` : '100%';
                  cardStyle = {
                    transform: `translate3d(${peekX}, 0, 0)`,
                    zIndex: isNext ? 9 : 0,
                    opacity: isDragging && isNext ? 1 : 0,
                    pointerEvents: 'none',
                    transition: transitionStyle,
                  };
                }

                return (
                  <div
                    key={item.client}
                    className="stats-stack-slide"
                    style={cardStyle}
                    onClick={() => {
                      if (!hasDragged.current && idx < active) {
                        setActive(idx);
                      }
                    }}
                    title={idx < active ? `Switch to ${item.client}` : undefined}
                  >
                    <div className="StatisticsPanel_panel__5YHtR statisticPanel">
                      <figure className="StatisticsPanel_backgroundImage___Dgsu">
                        <img src={item.bg} alt="" className="lazyload" draggable="false" />
                      </figure>
                      <div className="StatisticsPanel_panelWrap__XLJZs">
                        <figure className="StatisticsPanel_logo__Y5wQT">
                          <img src={cdn + `2025/04/${item.logo}`} alt={item.client} draggable="false" />
                        </figure>
                        <figure className="StatisticsPanel_visualMobile__NTMW2">
                          <img src={cdn + `2025/04/${item.img}`} alt={item.client} draggable="false" />
                        </figure>
                        <h3 className="StatisticsPanel_heading__UrLlt">{item.pct}</h3>
                        <span className="StatisticsPanel_description__csS74">{item.desc}</span>
                        <div className="StatisticsPanel_buttons__FwZUj">
                          <div className="Magnetic_magnetic__LncOy" data-fill="false">
                            <Button href={item.link} white>View project</Button>
                          </div>
                        </div>
                      </div>
                      <figure className="StatisticsPanel_visual__W0d30">
                        <img src={cdn + `2025/04/${item.img}`} alt={item.client} draggable="false" />
                      </figure>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="StatisticsCarousel_swiperNav__Pi054">
              <button
                className="StatisticsCarousel_swiperNavNext__sdg5A"
                aria-label="Next result"
                onClick={() => setActive((prev) => (prev + 1) % statsData.length)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== PARTNERS SECTION ===== */
const partnerLogos = [
  'Jamie-oliver.svg', 'comptoir-libanais-1.svg', 'british-red-cross.svg',
  'sym.svg', 'penguin.svg', 'raw.svg', 'penhaligons.svg', 'stoli.svg',
  'bounce.svg', 'tangerine.svg', 'tribepad.svg', 'matchroom.svg',
  'diageo.svg', 'sonovate.svg', 'saatchi.svg',
];

function Partners() {
  return (
    <section className="partners-section" id="partners">
      <div className="container">
        <div className="partners-heading-inner">
          <div className="partners-heading">
            <span>Our</span>
            <span className="partners-heading-bottom">Partners</span>
          </div>
        </div>
        <div className="partners-intro">
          <p>We team up with brands that want to be bolder, clearer, and better positioned for growth. Here are some of the ambitious companies we've worked with.</p>
        </div>
        <div className="partners-logos Partners_logos__7QiB4">
          <div className="partners-logos-inner AnimatedLogoGrid_grid__3n0at">
            {partnerLogos.map((l) => (
              <div className="partner-logo Partners_logo__eDI8e" key={l}>
                <img src={cdn + '2023/10/' + l} alt={l.replace('.svg', '')} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== TESTIMONIALS SECTION ===== */
const quotes = [
  {
    quote: '"It was our brand positioning work that really made everything click. KOTA were empathetic, patient, flexible, quick, and, most importantly, incredibly talented with brand positioning, visual identity, and digital experiences. I\'ve already recommended them twice!"',
    name: 'Shanice Daeche',
    role: 'CMO',
    logo: '2025/05/Florence-Logo-White.svg',
    color: '#a8e1ec',
    link: 'https://kota.co.uk/work/florence/',
  },
  {
    quote: '"Beyond the aesthetics, the website is incredibly functional. The CMS gives us the flexibility and control we need to keep our content fresh and relevant, and they have significantly improved the website’s UX. We couldn\'t be happier!"',
    name: 'Jenny Frame',
    role: 'Marketing Manager',
    logo: '2024/06/incentive-games.png',
    color: '#c4b5f3',
    link: 'https://kota.co.uk/work/incentive-games/',
  },
  {
    quote: '"We needed something that would blur the lines between web, technology, and cinema, and reflect who we are: an artist-led, tech-forward company creating work at the highest level. From the very first conversations, KOTA understood that vision. They transformed the brief beyond what we had imagined."',
    name: 'Shaun Obanion',
    role: 'PR Manager',
    logo: '2025/08/UPP-logo.svg',
    color: '#f8e5cb',
    link: 'https://kota.co.uk/work/upp/',
  },
  {
    quote: '"Beyond the initial launch, KOTA have continued to support us over the past 12 months with ongoing SEO, helping us build visibility and performance in a really strategic, considered way. Their team are creative, knowledgeable, responsive, and genuinely invested in delivering long-term value, not just a one-off project."',
    name: 'Bianca Cristescu',
    role: 'Key Account Director',
    logo: '2025/04/ISI-Logo-White.svg',
    color: '#d7e1d3',
    link: 'https://kota.co.uk/work/isi-global/',
  },
  {
    quote: '"As a design agency ourselves, handing responsibility for our web re-design to another creative agency needed to be well considered. We were immediately impressed by their designs and their interpretation of our brief. Nice bunch of people to work with too!"',
    name: 'Laurie Bushe',
    role: 'Head of Marketing',
    logo: '2023/11/tangerine-logo.svg',
    color: '#efb2d9',
    link: 'https://kota.co.uk/work/tangerine/',
  },
  {
    quote: '"KOTA\'s ideas were fresh and exciting, and their ability as a one-stop-shop for Branding, Tone of Voice, Copywriting, Website design and Development meant we were able to do the whole process with them. Amazing creative agency."',
    name: 'Finn Bruce',
    role: 'Floan',
    logo: '2023/11/Floan-Logo-Black.svg',
    color: '#a8e1ec',
    link: 'https://kota.co.uk/work/floan/',
  },
];

function Testimonials() {
  const [active, setActive] = useState(quotes.length - 1); // Start on Floan with 4 boxes stacked
  const { isDragging, dragOffset, hasDragged, handlers } = useSwipeDeck(quotes.length, active, setActive);
  const headingColRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    if (!headingColRef.current || !line1Ref.current || !line2Ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [line1Ref.current, line2Ref.current],
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.16, // "What our" is seen 1st, then instantly "clients say"
          scrollTrigger: {
            trigger: headingColRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials-section Testimonials_testimonials__AMUEx" id="testimonials">
      <div className="DarkThemeSwitch_cover__hn_xc" />
      <div className="container">
        <div className="Testimonials_headingCol" ref={headingColRef}>
          <h2 className="Testimonials_heading__k0Yyf">
            <span className="LineByLine_headingOuter__JmusT">
              <span className="split-line">
                <span className="split-line-inner" ref={line1Ref}>What our</span>
              </span>
              <span className="split-line">
                <span className="split-line-inner" ref={line2Ref}>clients say</span>
              </span>
            </span>
          </h2>
        </div>

        <div className="TestimonialsCarousel_panels__qHnSA">
          <div className="TestimonialsCarousel_container__YAjHa">
            <div className="TestimonialsCarousel_swiper__AMmtm">
              <div className={`testimonials-stack-deck ${isDragging ? 'is-dragging' : ''}`} {...handlers}>
                {quotes.map((q, idx) => {
                  const diff = (active - idx + quotes.length) % quotes.length;
                  let cardStyle = {};
                  const transitionStyle = isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease';

                  if (diff === 0) {
                    const currentX = isDragging ? dragOffset : 0;
                    cardStyle = {
                      transform: `translate3d(${currentX}px, 0, 0)`,
                      zIndex: 10,
                      opacity: 1,
                      pointerEvents: 'auto',
                      transition: transitionStyle,
                    };
                  } else if (diff >= 1 && diff <= 3) {
                    const offsetPx = -diff * 18;
                    const dragShift = isDragging && dragOffset > 0 && diff === 1 ? (dragOffset * 0.4) : 0;
                    cardStyle = {
                      transform: `translate3d(${offsetPx + dragShift}px, 0, ${-diff * 25}px)`,
                      zIndex: 10 - diff,
                      opacity: 1,
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      transition: transitionStyle,
                    };
                  } else {
                    const isNext = (idx === (active + 1) % quotes.length);
                    const peekX = isDragging && dragOffset < 0 && isNext ? `calc(100% + ${dragOffset}px)` : '100%';
                    cardStyle = {
                      transform: `translate3d(${peekX}, 0, 0)`,
                      zIndex: isNext ? 9 : 0,
                      opacity: isDragging && isNext ? 1 : 0,
                      pointerEvents: 'none',
                      transition: transitionStyle,
                    };
                  }

                  return (
                    <div
                      key={q.name}
                      className="testimonials-stack-slide"
                      style={cardStyle}
                      onClick={() => {
                        if (!hasDragged.current && diff >= 1 && diff <= 3) {
                          setActive(idx);
                        }
                      }}
                      title={diff >= 1 && diff <= 3 ? `Switch to ${q.name}` : undefined}
                    >
                      <div
                        className="TestimonialsPanel_panel__QSk4x"
                        style={{ backgroundColor: q.color }}
                      >
                        <div className="TestimonialsPanel_panelWrap__Lm7Hv">
                          <figure className="TestimonialsPanel_logo__m6tmz">
                            <img src={cdn + q.logo} alt={q.name} draggable="false" />
                          </figure>
                          <p className="TestimonialsPanel_description__njfi8">{q.quote}</p>
                          <div className="TestimonialsPanel_details__ijkyr">
                            <span className="TestimonialsPanel_name__Spm5c"><strong>{q.name}</strong></span>
                            <span className="TestimonialsPanel_name__Spm5c">{q.role}</span>
                          </div>
                          <div className="TestimonialsPanel_buttons__fOECn">
                            <div className="Magnetic_magnetic__LncOy" data-fill="false">
                              <Button href={q.link} white={false}>View Project</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="TestimonialsCarousel_swiperNav__hRE1L">
                <button
                  className="TestimonialsCarousel_swiperNavNext__Aabsb"
                  aria-label="Next testimonial"
                  onClick={() => setActive((prev) => (prev + 1) % quotes.length)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== ARTICLES SECTION (ALL 9 ARTICLES) ===== */
const allArticles = [
  {
    href: '/blog/branding-inspiration-brand-design-trends-for-2026',
    img: 'https://kota-content.b-cdn.net/app/uploads/2025/11/brand-trend-2026.png',
    tags: 'Expertise, Inspiration',
    title: 'Branding inspiration: design trends for 2026',
  },
  {
    href: '/blog/design-with-guts-kotas-manifesto-for-creative-bravery',
    img: 'https://kota-content.b-cdn.net/app/uploads/2025/12/Design-with-guts.png',
    tags: 'Expertise, Inspiration',
    title: 'Design with guts: KOTA’s manifesto for creative bravery',
  },
  {
    href: '/blog/kota-wins-a-lovie-award-for-best-web-design-aesthetic',
    img: 'https://kota-content.b-cdn.net/app/uploads/2025/11/Lovie-awards.png',
    tags: 'Culture, Our work',
    title: 'KOTA wins a Lovie award for Best Web Design – Aesthetic!',
  },
  {
    href: '/blog/brand-first-vs-dev-first-what-actually-sets-kota-apart-and-why-it-matters',
    img: 'https://kota-content.b-cdn.net/app/uploads/2025/10/Rebel-against-boring.png',
    tags: 'Expertise',
    title: 'Brand-First vs Dev-First: What actually sets KOTA apart (and why it matters)',
  },
  {
    href: '/blog/10-creative-websites-to-inspire-your-next-web-design-2025-update',
    img: 'https://kota-content.b-cdn.net/app/uploads/2025/01/creative-web-design-inspo-2025.png',
    tags: 'Inspiration',
    title: '10 creative websites to inspire your next design (2025 update)',
  },
  {
    href: '/blog/web-design-inspiration-50-sites-to-bookmark',
    img: 'https://kota-content.b-cdn.net/app/uploads/2025/08/website-design-inspo.png',
    tags: 'Inspiration',
    title: 'Web design inspiration: 50 sites to bookmark',
  },
  {
    href: '/blog/clutch-names-kota-a-2024-global-winner-clutch-champion-and-top-branding-company',
    img: 'https://kota-content.b-cdn.net/app/uploads/2024/06/clutch-top-branding-company-2024-1.png',
    tags: 'Culture, Our work',
    title: 'Clutch names KOTA a 2024 Global Winner, Clutch Champion & Top Branding Company',
  },
  {
    href: '/blog/kota-earns-2025-great-place-to-work-certification',
    img: 'https://kota-content.b-cdn.net/app/uploads/2024/12/Great-place-to-work-KOTA.png',
    tags: 'Culture',
    title: 'KOTA earns 2025 Great Place to Work Certification™ 🎉',
  },
  {
    href: '/blog/what-your-2026-website-brief-should-include',
    img: 'https://kota-content.b-cdn.net/app/uploads/2025/11/2026-brief-template.png',
    tags: 'Expertise',
    title: 'What your 2026 website brief should include',
  },
];

function Articles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('[data-animation="grid-item"]');
      if (!items || items.length === 0) return;

      // Set initial hidden state so cards never flash
      gsap.set(items, { opacity: 0, y: 50 });

      // Staggered batch entrance: reveals each article card one at a time on scroll
      ScrollTrigger.batch(items, {
        start: 'top 86%',
        interval: 0.1,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power2.out',
            stagger: 0.18,
            overwrite: 'auto',
          });
        },
        once: true,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="Articles_articles__Wcz2C articles-section" id="articles">
      <div className="DarkThemeSwitch_cover__hn_xc" />
      <div className="container">
        <div className="Articles_heading__zNRl8 articles-heading">
          <p><span className="FadeInUp_container___uxva">Latest articles</span></p>
          <span className="FadeInUp_container___uxva">
            <div className="Magnetic_magnetic__LncOy">
              <Button href="/blog" white>View our blog</Button>
            </div>
          </span>
        </div>

        <div className="AnimatedGrid_grid__otAMD">
          <div className="Articles_articlesList__CXW8a">
            {allArticles.map((article) => (
              <a
                data-animation="grid-item"
                href={article.href}
                key={article.title}
              >
                <article className="Articles_article__3ZS4Y article-card">
                  <figure className="Articles_image__Cvgsi article-card-image">
                    <span className="Image_image__RAAdZ Image_fill__EiIzS">
                      <img src={article.img} alt={article.title} loading="lazy" />
                    </span>
                  </figure>
                  <div className="Articles_text__HhO2L article-card-text">
                    <p className="Articles_filterNames__mCWt8 article-card-tags">{article.tags}</p>
                    <h3 className="Articles_title__h86PB article-card-title">{article.title}</h3>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>

        <div className="Articles_mobileButton__Df7CF">
          <Button href="/blog" white>View our blog</Button>
        </div>
      </div>
    </section>
  );
}

/* ===== FAQ SECTION ===== */
const faqs = [
  ['How much does web design and development typically cost?', 'The majority of our projects sit between £30k and £150k, but project costs will depend on the final scope of work and vary from project to project. We generally prefer to agree a fixed cost with agreed milestone payments.'],
  ['How long does a project usually take?', 'A web design and build project can last around 12-14 weeks, whereas brand-into-website-and-marketing can take 6 months or more.'],
  ["Can your creative agency accommodate tight deadlines?", "Sure thing! We're ready to mobilise our design and development teams, prioritising the essentials to turn your dream site from a fast-approaching deadline into a reality."],
  ['What ongoing support and maintenance do you offer post-launch?', 'SiteCare is a huge part of what we offer here at KOTA. Think of us as the guardians of your digital home, offering a suite of post-launch support and maintenance services.'],
  ['How do you handle revisions and feedback during the design process?', 'Your feedback is the secret sauce in our design process. We welcome your thoughts, tweaks, and "aha" moments, incorporating them into each iteration.'],
  ['Are there additional costs for digital marketing services integrated into web projects?', 'Integrating our digital marketing services into your web project is like adding rocket fuel to your online presence. We offer clear, upfront pricing for any add-on services.'],
];

function FAQ() {
  const [active, setActive] = useState(-1);
  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-heading">
          <p>FAQ's</p>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <div className={`faq-item ${active === i ? 'open' : ''}`} key={q}>
              <button className="faq-question" onClick={() => setActive(active === i ? -1 : i)}>
                <span className="faq-icon"><PlusIcon /></span>
                <span>{q}</span>
              </button>
              <div className="faq-answer">
                <div><p>{a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== FOOTER ===== */
function Footer() {
  return (
    <footer className="Footer_footer__pQtti" id="footer">
      <div className="container">
        <div className="Footer_top__YBhK_">
          <a className="Footer_logo__fUEOF" href="/" aria-label="KOTA Home">
            <KotaLogo />
          </a>
          <a className="Footer_email__nLajh" href="mailto:hello@kota.co.uk">
            hello@kota.co.uk
          </a>
        </div>

        <div className="Footer_bottom__wxP7Z">
          <div className="Footer_socialLinks__tA7gt">
            {[
              ['LinkedIn', 'https://www.linkedin.com/company/kota-creative/'],
              ['Facebook', 'https://www.facebook.com/kotacreative'],
              ['Instagram', 'https://www.instagram.com/kotacreative/'],
              ['Bluesky', 'https://bsky.app/profile/kota.co.uk'],
            ].map(([name, url]) => (
              <a href={url} key={name} target="_blank" rel="noreferrer">
                <span>{name}</span>
                <LinkArrow />
              </a>
            ))}
          </div>

          <div className="Footer_logos__jFNys">
            <img src={cdn + '2024/03/Digital-Agency-Network.svg'} alt="Digital Agency Network" />
            <img src={cdn + '2024/02/clutch.svg'} alt="Clutch" />
            <img src={cdn + '2024/02/awwwards.svg'} alt="Awwwards" />
            <img src={cdn + '2024/02/cssda.svg'} alt="CSSDA" />
          </div>
        </div>

        <div className="Footer_last__auU9C">
          <ul className="Footer_lastNav__at6Kh">
            {['Contact', 'FAQs', 'Privacy Policy'].map((n) => (
              <li key={n}>
                <a href={`/${n.toLowerCase().replace(' ', '-')}/`}>{n}</a>
              </li>
            ))}
          </ul>
          <a href="#" className="Footer_newsletterButton__wp2hz">
            Sign up to our newsletter
          </a>
        </div>

        <div className="Footer_copyright__j4atB">
          <div className="Footer_sectorsWrap__UM4Zx">
            <span className="Footer_sectorTitle__yEZhb">Our sectors :</span>
            <ul className="Footer_sectorMenu__GX7QZ">
              {['Agencies', 'SaaS and Tech', 'B2B Transformation', 'Healthcare', 'Media & Entertainment', 'Retail'].map((s) => (
                <li key={s}>
                  <a className="Footer_sectorItem__0Cx14" href="#">{s}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="Footer_copyrightTextWrap__uhQWh">
            <div className="Footer_copyrightText__f_Lte">© KOTA 2026</div>
            <div className="Footer_cyberEssestials__2qh89">
              <img src="/cyber-essentials.svg" alt="Cyber Essentials Certified" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===== FLOATING START BUTTON ===== */
function FloatingStart({ visible }) {
  return (
    <div className={`floating-start ${visible ? 'visible' : ''}`}>
      <a className="floating-start-btn" href="/start-your-project">
        <span className="floating-text">
          <span>Start your project</span>
          <ArrowSvg className="floating-arrow" />
        </span>
      </a>
    </div>
  );
}

/* ===== APP ===== */
function App() {
  const [showFloat, setShowFloat] = useState(false);
  const [fullscreenVideo, setFullscreenVideo] = useState(false);

  useEffect(() => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.lenis = lenis;
    const updateFloat = (scrollPos = window.scrollY) => {
      const kotaverseEl = document.getElementById('kotaverceCta');
      const isBelowFaqs = kotaverseEl ? (kotaverseEl.getBoundingClientRect().top <= window.innerHeight * 0.85) : false;
      setShowFloat(scrollPos > 350 && !isBelowFaqs);
    };

    lenis.on('scroll', ({ scroll }) => {
      ScrollTrigger.update();
      updateFloat(scroll);
    });
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Clean up any rogue custom cursor element
    const rogueCursor = document.getElementById('kota-custom-cursor');
    if (rogueCursor && rogueCursor.parentNode) {
      rogueCursor.parentNode.removeChild(rogueCursor);
    }

    // 3. Magnetic Button Physics
    const magneticItems = document.querySelectorAll('.Magnetic_magnetic__LncOy');
    magneticItems.forEach((mag) => {
      const btn = mag.querySelector('.btn, .Button_button__JJiqJ, a, button');
      if (!btn) return;
      const onMagMove = (e) => {
        const rect = mag.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
      };
      const onMagLeave = () => {
        btn.style.transform = 'translate(0px, 0px)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        setTimeout(() => {
          btn.style.transition = '';
        }, 400);
      };
      mag.addEventListener('mousemove', onMagMove);
      mag.addEventListener('mouseleave', onMagLeave);
    });

    // 4. Hero SVG Entrance Animation (letters stay rock-solid after reveal, no cursor movement)
    const ctx = gsap.context(() => {
      const rebel = document.querySelector('.rebelLetters');
      const against = document.querySelector('.againstLetters');
      const boring = document.querySelector('.boringLetters');

      const t = rebel?.getBBox?.()?.height || 166.8;
      const n = against?.getBBox?.()?.height || 231;
      const r = boring?.getBBox?.()?.height || 231.7;

      // Set initial state: letters shifted down by height, masks shifted up by height
      gsap.set('.rebelLetters', { y: t, opacity: 1 });
      gsap.set('.rebelMask', { y: -t });
      gsap.set('.againstLetters', { y: n, opacity: 1 });
      gsap.set('.againstMask', { y: -n });
      gsap.set('.boringLetters', { y: r, opacity: 1 });
      gsap.set('.boringMask', { y: -r });

      // Precise mask-lift wipe reveal
      const heroTl = gsap.timeline({
        delay: 0.15,
        defaults: { ease: 'power3.out', duration: 1.15 }
      });

      heroTl
        .to('.rebelLetters', { y: 0 })
        .to('.rebelMask', { y: 0 }, '<')
        .to('.againstLetters', { y: 0 }, '<+=0.125')
        .to('.againstMask', { y: 0 }, '<')
        .to('.boringLetters', { y: 0 }, '<+=0.125')
        .to('.boringMask', { y: 0 }, '<')
        .fromTo('.hero-video', { scale: 0.35, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.5)' }, '-=0.45')
        .from('.hero-intro-text', { y: 25, opacity: 0, duration: 0.75, ease: 'power2.out' }, '-=0.35')
        .from('.hero-logos-inner img', { y: 20, opacity: 0, stagger: 0.06, duration: 0.55, ease: 'power2.out' }, '-=0.25');

      // 4b. Approach Section: Heading Letters entrance animation with smooth stagger
      gsap.set('.approach-heading .approach-char', {
        y: '100%',
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: '.approach-heading',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to('.approach-heading .approach-char', {
            y: '0%',
            opacity: 1,
            stagger: 0.018,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      });

      // 4c. Approach Cards: Stagger entrance and card letters animation
      gsap.set('.approach-card-title .approach-card-char', {
        y: '100%',
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: '.approach-items',
        start: 'top 82%',
        once: true,
        onEnter: () => {
          // Animate cards up with stagger
          gsap.fromTo(
            '.approach-item-wrap',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out' }
          );

          // Animate card letters up with stagger
          gsap.to('.approach-card-title .approach-card-char', {
            y: '0%',
            opacity: 1,
            stagger: 0.02,
            duration: 0.85,
            delay: 0.1,
            ease: 'power3.out',
          });
        },
      });

      // 5a. Services Heading Entrance: characters wipe in ONCE on first view
      gsap.set('.services-heading .split-char', {
        y: '110%',
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: '.services-heading',
        start: 'top 88%',
        once: true,
        onEnter: () => {
          const words = document.querySelectorAll('.services-heading .split-word');
          words.forEach((word) => {
            const chars = word.querySelectorAll('.split-char');
            gsap.to(chars, {
              y: '0%',
              opacity: 1,
              stagger: 0.05,
              duration: 0.85,
              ease: 'power3.out',
            });
          });
        },
      });

      // 5b. Services Arrow Continuous Rotation with Scroll (always syncs with scroll)
      gsap.fromTo(
        '.services-heading .arrow-inner',
        { rotate: 50 },
        {
          rotate: -55,
          ease: 'none',
          scrollTrigger: {
            trigger: '.services-section',
            start: 'top bottom',
            endTrigger: '.services-panels',
            end: 'top 15%',
            scrub: true,
          },
        }
      );

      // 5c. Services Stacking Panels (Card Pin & Scale on scroll)
      const mm = gsap.matchMedia();
      mm.add('(min-width: 850px)', () => {
        // Services Heading & Arrow pin and fade as panels slide over
        gsap.to('.services-heading', {
          autoAlpha: 0,
          scale: 0.75,
          ease: 'sine.in',
          scrollTrigger: {
            trigger: '.services-heading',
            start: 'center center',
            endTrigger: '.services-panels',
            end: 'top 15%',
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
        });

        const animatedPanels = document.querySelectorAll('.AnimatedPanel_panel__eAXfR');
        animatedPanels.forEach((panelContainer) => {
          const panel = panelContainer.querySelector('.servicePanel');
          const spacer = panelContainer.querySelector('.AnimatedPanel_spacer__w4GTD');
          if (panel && spacer) {
            gsap.to(panel, {
              scrollTrigger: {
                trigger: panel,
                start: 'center center',
                endTrigger: spacer,
                end: 'bottom top',
                scrub: true,
                pin: true,
                pinSpacing: false,
              },
              ease: 'sine.in',
            });

            gsap.to(panel, {
              autoAlpha: 0,
              scale: 0.8,
              ease: 'sine.in',
              scrollTrigger: {
                trigger: spacer,
                start: 'bottom bottom',
                end: 'center top',
                scrub: true,
              },
            });
          }
        });
      });

      // 6. Dynamic Header Theme Switching on Scroll (switches to dark theme when entering Work section)
      ScrollTrigger.create({
        trigger: '.Work_work__rSI8c',
        start: 'top 60px',
        endTrigger: '#footer',
        end: 'bottom top',
        onEnter: () => {
          document.documentElement.style.setProperty('--theme-primary', '#fff');
          document.documentElement.style.setProperty('--theme-secondary', '#000');
        },
        onLeave: () => {
          document.documentElement.style.setProperty('--theme-primary', '#000');
          document.documentElement.style.setProperty('--theme-secondary', '#fff');
        },
        onEnterBack: () => {
          document.documentElement.style.setProperty('--theme-primary', '#fff');
          document.documentElement.style.setProperty('--theme-secondary', '#000');
        },
        onLeaveBack: () => {
          document.documentElement.style.setProperty('--theme-primary', '#000');
          document.documentElement.style.setProperty('--theme-secondary', '#fff');
        },
      });

      // 7. Work Project Cards Scroll Entrance & Video Hover
      const projectCards = document.querySelectorAll('.ProjectCard_project__d1wbY');
      projectCards.forEach((card) => {
        const video = card.querySelector('video');
        if (video) {
          card.addEventListener('mouseenter', () => {
            video.play().catch(() => {});
          });
          card.addEventListener('mouseleave', () => {
            video.pause();
          });
        }

        gsap.from(card, {
          opacity: 0,
          y: 35,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            once: true,
          },
        });
      });

      // 8. FadeInUp / Scroll reveal for headings
      const fadeElements = document.querySelectorAll('.FadeInUp_container___uxva');
      fadeElements.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 25,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            once: true,
          },
        });
      });

      ScrollTrigger.refresh();
      setTimeout(() => ScrollTrigger.refresh(), 300);
      setTimeout(() => ScrollTrigger.refresh(), 1000);
    });

    return () => {
      ctx.revert();
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      {/* 1. Light WebGL background for top sections (Hero, Approach, Services, Framework) */}
      <WebGLBackground
        scrollTrigger={true}
        scrollTarget="#work"
        variation={0}
        scrollTriggerOpacity={0.58}
        darkBackground={false}
      />
      {/* 2. Dark WebGL background for bottom dark sections */}
      <WebGLBackground
        scrollTrigger={true}
        scrollTarget="#work"
        variation={4}
        scrollTriggerOpacity={0}
        darkBackground={true}
      />
      <div className="home_backgroundBlurFilter__p3EL0" />
      <Header />
      <main>
        <Hero onWatchShowreel={() => setFullscreenVideo(true)} />
        <Approach />
        <Services />
        <Carousel />
        <Work />
        <Statistics />
        <Partners />
        <Testimonials />
        <Articles />
        <FAQ />
        <KotaverseCta onWatchShowreel={() => setFullscreenVideo(true)} />
      </main>
      <Footer />
      <FloatingStart visible={showFloat} />

      {fullscreenVideo && (
        <div className="fullscreen-video-modal" onClick={() => setFullscreenVideo(false)}>
          <button
            className="close-video-btn"
            aria-label="Close showreel"
            onClick={() => setFullscreenVideo(false)}
          >
            <span />
            <span />
          </button>
          <video
            src="https://kota-content.b-cdn.net/app/uploads/2025/10/00-Kota-Showreel-2025-Final.mp4"
            autoPlay
            controls
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
