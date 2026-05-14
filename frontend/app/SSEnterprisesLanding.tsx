"use client";

import { useState, useEffect, useRef, useCallback, ReactNode, CSSProperties } from "react";

const NAV_LINKS = ["About", "Services", "Facilities", "Quality", "Clients", "Gallery", "Contact"];

const STATS = [
  { num: "5,000", label: "Sq. Ft. Plant Area" },
  { num: "3,000", label: "Sq. Ft. Built-up" },
  { num: "15+", label: "Expert Employees" },
  { num: "10+", label: "Major Clients" },
  { num: "ISO", label: "9001 Certified" },
];

const SERVICES = [
  {
    icon: "⚡",
    tag: "01",
    title: "Silver Electroplating",
    desc: "High-purity silver plating for electrical contacts, connectors, and precision components. XRF-verified thickness and composition on every batch.",
  },
  {
    icon: "🔩",
    tag: "02",
    title: "Tin Electroplating",
    desc: "Corrosion-resistant tin coatings for ferrous and non-ferrous substrates. Ideal for automotive and electronics applications.",
  },
  {
    icon: "🏗️",
    tag: "03",
    title: "FRP Components",
    desc: "Custom fibre-reinforced plastic fabrication for industrial, electrical, and structural use cases — engineered to spec.",
  },
  {
    icon: "⚙️",
    tag: "04",
    title: "Ferrous & Non-Ferrous Supply",
    desc: "End-to-end supply of raw material, sub-assemblies, and finished components with full traceability.",
  },
  {
    icon: "🔬",
    tag: "05",
    title: "XRF Quality Testing",
    desc: "In-house X-ray fluorescence testing to verify coating thickness and elemental purity — no guesswork, just data.",
  },
  {
    icon: "📦",
    tag: "06",
    title: "Turnkey Delivery",
    desc: "From raw input to packaged, labelled, and delivered — we manage the entire production and logistics chain.",
  },
];

const FACILITIES = [
  "VMC Machine", "Trobe Machine Automatic", "DRO-Drilling Machine with Planomiller",
  "Hydraulic Shearing Machine", "Arc Welding Machine", "CO₂ Welding Machine",
  "Spot Welding Machine", "Radial Drilling Machine", "Tapping Machine",
  "Electric Weighing Scale", "Pag & Profile Gas Cutting Machine", "Auto Milling Machine",
  "Silver Plating Line", "Tin Plating Line", "XRF Machine (Fischer)",
  "Oven (Adhesion Testing)", "ETP Plant", "DM Water Plant"
];

const QUALITY_PILLARS = [
  { abbr: "C", color: "#C9A84C", title: "Cost Competitive", desc: "Lean manufacturing and process automation keep overhead low — savings passed directly to clients." },
  { abbr: "Q", color: "#C9A84C", title: "Uncompromised Quality", desc: "XRF verification, rigorous incoming inspection, and ISO-aligned processes at every stage." },
  { abbr: "D", color: "#C9A84C", title: "Delivery Precision", desc: "FIFO systems and real-time batch tracking ensure on-time dispatch for every order, every time." },
  { abbr: "∞", color: "#C9A84C", title: "Continuous Improvement", desc: "Regular process reviews, team training, and equipment upgrades keep our capabilities ahead of demand." },
];

const CLIENTS = [
  "Electrical OEMs", "Automotive Tier-1", "Switch Gear Manufacturers",
  "Industrial Fabricators", "Engineering Exporters", "Pump Manufacturers",
  "Transformer Companies", "Control Panel Makers", "Defense Contractors",
  "Maharashtra Industries",
];

// Slideshow images
const SLIDESHOW_IMAGES = [
  { src: "/plantouterimg.jpg", caption: "S.S. Enterprises — Nashik" },
  { src: "/sliverplaintingplant.jpg", caption: "Silver Plating Production Line" },
  { src: "/IMG_1080.jpg", caption: "State-of-the-Art Facilities" },
  { src: "/IMG_1090.jpg", caption: "Precision Manufacturing" },
  { src: "/18.jpg", caption: "Manufacturing Facility" },
  { src: "/office.jpg", caption: "Our Office" },
  { src: "/chemicals.jpg", caption: "Electroplating Chemicals" },
  { src: "/IMG_1083.jpg", caption: "Industrial Operations" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "", style = {} }: { children: ReactNode; delay?: number; className?: string; style?: CSSProperties }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    if (animating) return;
    setAnimating(true);
    setPrev(current);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 900);
  }, [current, animating]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      goTo((current + 1) % SLIDESHOW_IMAGES.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current, goTo]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {SLIDESHOW_IMAGES.map((img, i) => (
        <div
          key={i}
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${img.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1)" : "scale(1.04)",
            transition: "opacity 1.1s cubic-bezier(0.4,0,0.2,1), transform 6s ease",
            zIndex: i === current ? 2 : 1,
          }}
        />
      ))}
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,12,20,0.85) 40%, rgba(8,12,20,0.4) 100%)", zIndex: 3 }} />
      {/* Subtle grain */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.4, zIndex: 4, pointerEvents: "none" }} />

      {/* Slide indicators */}
      <div style={{ position: "absolute", bottom: "2.5rem", right: "3rem", zIndex: 10, display: "flex", gap: "0.5rem", alignItems: "center" }}>
        {SLIDESHOW_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? 32 : 8, height: 8,
              background: i === current ? "#C9A84C" : "rgba(255,255,255,0.3)",
              border: "none", cursor: "pointer", padding: 0,
              borderRadius: 4,
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        ))}
      </div>

      {/* Caption */}
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "6rem", zIndex: 10,
        fontSize: "0.72rem", letterSpacing: 3, textTransform: "uppercase",
        color: "rgba(255,255,255,0.5)", fontFamily: "'Cormorant Garamond', serif",
      }}>
        {SLIDESHOW_IMAGES[current].caption}
      </div>
    </div>
  );
}

function GallerySlideshow() {
  const galleryImages = [
    { src: "/sliverplaintingplant.jpg", label: "Silver Plating Plant" },
    { src: "/silverplaintinoutput.jpg", label: "Silver Plating Output" },
    { src: "/sliverplaintingoutput.jpg", label: "Plating Output Samples" },
    { src: "/finished product.jpg", label: "Finished Products" },
    { src: "/chemicals.jpg", label: "Process Chemicals" },
    { src: "/IMG_1071.jpg", label: "Facility View" },
    { src: "/IMG_1072.jpg", label: "Production Line" },
    { src: "/IMG_1077.jpg", label: "Workshop Area" },
    { src: "/IMG_1078.jpg", label: "Machinery" },
    { src: "/IMG_1079.jpg", label: "Equipment" },
    { src: "/IMG_1080.jpg", label: "Plant Interior" },
    { src: "/IMG_1083.jpg", label: "Operations" },
    { src: "/IMG_1084.jpg", label: "Assembly" },
    { src: "/IMG_1088.jpg", label: "Processing Unit" },
    { src: "/IMG_1089.jpg", label: "Components" },
    { src: "/IMG_1090.jpg", label: "Production" },
    { src: "/IMG_1091.jpg", label: "Fabrication" },
    { src: "/IMG_1092.jpg", label: "Workshop" },
    { src: "/IMG_1095.jpg", label: "Plating Line" },
    { src: "/IMG_1097.jpg", label: "Quality Check" },
    { src: "/IMG_1098.jpg", label: "Inspection" },
    { src: "/IMG_1099.jpg", label: "Finishing" },
    { src: "/IMG_1100.jpg", label: "Output" },
    { src: "/IMG_1102.jpg", label: "Full Plant" },
    { src: "/IMG_1104.jpg", label: "Details" },
    { src: "/IMG_1105.jpg", label: "Final Products" },
    { src: "/10.jpg", label: "Electroplating Line" },
    { src: "/11.jpg", label: "Precision Parts" },

    { src: "/13.jpg", label: "CNC Operations" },

    { src: "/15.jpg", label: "Finished Products" },
    { src: "/16.jpg", label: "Packaging Unit" },
  ];

  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setActive(a => (a + 1) % galleryImages.length), 3500);
    return () => clearInterval(t);
  }, [auto]);

  const prev = () => { setAuto(false); setActive(a => (a - 1 + galleryImages.length) % galleryImages.length); };
  const next = () => { setAuto(false); setActive(a => (a + 1) % galleryImages.length); };

  return (
    <div style={{ position: "relative" }}>
      {/* Main display */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#0d1117" }}>
        {galleryImages.map((img, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            opacity: i === active ? 1 : 0,
            transform: i === active ? "scale(1)" : "scale(1.05)",
            transition: "opacity 0.8s ease, transform 5s ease",
            zIndex: i === active ? 2 : 1,
          }}>
            <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(8,12,20,0.7) 0%, transparent 50%)",
            }} />
            <div style={{
              position: "absolute", bottom: "1.5rem", left: "1.5rem",
              color: "#fff", fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem", fontStyle: "italic", letterSpacing: 1,
            }}>
              {img.label}
            </div>
          </div>
        ))}

        {/* Nav arrows */}
        {[
          { dir: "left", action: prev, symbol: "‹" },
          { dir: "right", action: next, symbol: "›" },
        ].map(({ dir, action, symbol }) => (
          <button key={dir} onClick={action} style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            [dir]: "1rem", zIndex: 10,
            width: 44, height: 44,
            background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.5)",
            color: "#C9A84C", fontSize: "1.8rem", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(4px)",
            transition: "background 0.2s",
            lineHeight: 1,
          }}>
            {symbol}
          </button>
        ))}
      </div>

      {/* Thumbnails */}
      <div style={{
        display: "flex", gap: "0.5rem", marginTop: "0.75rem",
        overflowX: "auto", paddingBottom: "0.25rem",
        scrollbarWidth: "none",
      }}>
        {galleryImages.map((img, i) => (
          <div
            key={i}
            onClick={() => { setAuto(false); setActive(i); }}
            style={{
              flexShrink: 0, width: 72, height: 52,
              cursor: "pointer", overflow: "hidden",
              border: i === active ? "2px solid #C9A84C" : "2px solid transparent",
              opacity: i === active ? 1 : 0.5,
              transition: "all 0.25s",
            }}
          >
            <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SSEnterprisesLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_LINKS.map(l => l.toLowerCase());
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#080C14", color: "#E8EDF2", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080C14; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 2px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 60px; }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        @keyframes rotateGold {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .nav-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(232,237,242,0.6);
          padding: 0.4rem 0;
          position: relative;
          transition: color 0.3s;
        }
        .nav-btn::after {
          content: '';
          position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: #C9A84C;
          transition: width 0.3s ease;
        }
        .nav-btn:hover, .nav-btn.active { color: #C9A84C; }
        .nav-btn:hover::after, .nav-btn.active::after { width: 100%; }

        .gold-btn {
          background: linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%);
          background-size: 200% auto;
          color: #080C14;
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 0.72rem;
          letter-spacing: 2.5px; text-transform: uppercase;
          padding: 1rem 2.4rem;
          transition: background-position 0.4s, transform 0.2s;
        }
        .gold-btn:hover { background-position: right center; transform: translateY(-1px); }

        .outline-btn {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.5);
          color: rgba(232,237,242,0.8);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 0.72rem;
          letter-spacing: 2.5px; text-transform: uppercase;
          padding: 1rem 2.4rem;
          transition: all 0.3s;
        }
        .outline-btn:hover { background: rgba(201,168,76,0.08); border-color: #C9A84C; color: #C9A84C; }

        .service-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 2.8rem 2.4rem;
          position: relative; overflow: hidden;
          transition: border-color 0.4s, background 0.4s, transform 0.3s;
          cursor: default;
        }
        .service-card::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .service-card:hover {
          border-color: rgba(201,168,76,0.2);
          background: rgba(201,168,76,0.04);
          transform: translateY(-3px);
        }
        .service-card:hover::before { transform: translateX(100%); }

        .stat-item {
          text-align: center; flex: 1; min-width: 120px;
          padding: 2.5rem 1.5rem;
          position: relative;
          transition: background 0.3s;
        }
        .stat-item::after {
          content: ''; position: absolute; right: 0; top: 25%; bottom: 25%;
          width: 1px; background: rgba(255,255,255,0.08);
        }
        .stat-item:last-child::after { display: none; }

        .facility-item {
          display: flex; align-items: center; gap: 1rem;
          padding: 0.9rem 1.4rem;
          font-size: 0.85rem; font-weight: 500;
          color: rgba(232,237,242,0.75);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: all 0.25s;
          cursor: default;
          letter-spacing: 0.3px;
        }
        .facility-item:last-child { border-bottom: none; }
        .facility-item:hover { background: rgba(201,168,76,0.05); color: #C9A84C; padding-left: 1.8rem; }
        .facility-item:hover .facility-dot { background: #C9A84C; }

        .facility-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(201,168,76,0.5); flex-shrink: 0;
          transition: background 0.25s;
        }

        .client-tag {
          padding: 0.65rem 1.6rem;
          border: 1px solid rgba(232,237,242,0.1);
          color: rgba(232,237,242,0.5);
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 1.5px; text-transform: uppercase;
          transition: all 0.3s; cursor: default;
          font-family: 'DM Sans', sans-serif;
        }
        .client-tag:hover {
          border-color: #C9A84C;
          color: #C9A84C;
          background: rgba(201,168,76,0.04);
        }

        .contact-input {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #E8EDF2;
          padding: 1rem 1.3rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          width: 100%;
          transition: border-color 0.3s;
        }
        .contact-input:focus { outline: none; border-color: #C9A84C; background: rgba(201,168,76,0.03); }
        .contact-input::placeholder { color: rgba(232,237,242,0.3); font-style: italic; }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 4px; text-transform: uppercase;
          color: #C9A84C;
          display: flex; align-items: center; gap: 0.8rem;
          margin-bottom: 1rem;
        }
        .section-label::before {
          content: '';
          display: inline-block; width: 24px; height: 1px;
          background: #C9A84C; flex-shrink: 0;
        }

        .section-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5vw, 5rem);
          font-weight: 300;
          color: #E8EDF2;
          line-height: 1;
          letter-spacing: -0.5px;
        }
        .section-heading span { color: #C9A84C; font-style: italic; }

        .quality-pillar {
          display: flex; gap: 1.4rem; align-items: flex-start;
          padding: 2rem;
          border: 1px solid rgba(255,255,255,0.05);
          transition: border-color 0.3s, background 0.3s;
          background: rgba(255,255,255,0.02);
        }
        .quality-pillar:hover {
          border-color: rgba(201,168,76,0.2);
          background: rgba(201,168,76,0.04);
        }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hero-content { padding: 6rem 1.5rem 3rem !important; }
          .section-pad { padding: 5rem 1.5rem !important; }
          .two-col { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .stats-bar { padding: 0 1rem !important; }
          .stat-item::after { display: none; }
          .footer-pad { padding: 3rem 1.5rem !important; }
        }
        @media (max-width: 1024px) {
          .section-pad { padding: 6rem 3rem !important; }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 68,
        background: scrolled ? "rgba(8,12,20,0.97)" : "rgba(8,12,20,0.6)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "1px solid transparent",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 4rem",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          <div style={{
            width: 34, height: 34,
            border: "1px solid rgba(201,168,76,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", width: 26, height: 26,
              border: "1px solid rgba(201,168,76,0.3)",
              transform: "rotate(45deg)",
            }} />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", color: "#C9A84C", zIndex: 1, lineHeight: 1 }}>SS</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 600, color: "#E8EDF2", lineHeight: 1, letterSpacing: 1 }}>
              S.S. <span style={{ color: "#C9A84C" }}>Enterprises</span>
            </div>
            <div style={{ fontSize: "0.55rem", letterSpacing: 3, textTransform: "uppercase", color: "rgba(232,237,242,0.35)", marginTop: 2 }}>
              MIDC Ambad · Nashik
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <ul className="nav-links-desktop" style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l.toLowerCase())}
                className={`nav-btn${activeSection === l.toLowerCase() ? " active" : ""}`}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button onClick={() => scrollTo("contact")} className="gold-btn" style={{ padding: "0.65rem 1.5rem", fontSize: "0.65rem" }}>
          Get Quote
        </button>
      </nav>

      {/* ─── HERO ─── */}
      <section id="home" style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
        <HeroSlideshow />

        {/* Content */}
        <div className="hero-content" style={{
          position: "absolute", inset: 0, zIndex: 5,
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "8rem 6rem",
        }}>
          <div style={{ animation: "fadeUp 0.8s ease both", animationDelay: "0.2s" }}>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>
              Established · ISO Certified · Nashik
            </div>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
            fontWeight: 300,
            color: "#E8EDF2",
            lineHeight: 0.95,
            letterSpacing: -1,
            marginBottom: "1.5rem",
            animation: "fadeUp 0.8s ease both",
            animationDelay: "0.35s",
          }}>
            Precision<br />
            <span style={{ color: "#C9A84C", fontStyle: "italic" }}>Electroplating</span><br />
            & Fabrication
          </h1>

          <p style={{
            color: "rgba(232,237,242,0.55)",
            fontWeight: 300,
            maxWidth: 480,
            lineHeight: 1.85,
            marginBottom: "3rem",
            fontStyle: "italic",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem",
            animation: "fadeUp 0.8s ease both",
            animationDelay: "0.5s",
          }}>
            "Cost, Quality & Delivery — the three pillars on which every client relationship is built."
          </p>

          <div style={{
            display: "flex", gap: "1rem", flexWrap: "wrap",
            animation: "fadeUp 0.8s ease both",
            animationDelay: "0.65s",
          }}>
            <button onClick={() => scrollTo("services")} className="gold-btn">
              Our Capabilities
            </button>
            <button onClick={() => scrollTo("gallery")} className="outline-btn">
              View Gallery
            </button>
          </div>

          {/* Vertical text */}
          <div style={{
            position: "absolute", right: "3rem", top: "50%",
            transform: "translateY(-50%) rotate(90deg)",
            fontSize: "0.6rem", letterSpacing: 4, textTransform: "uppercase",
            color: "rgba(232,237,242,0.25)",
            fontFamily: "'DM Sans', sans-serif",
            animation: "fadeUp 0.8s ease both", animationDelay: "0.8s",
          }}>
            Scroll to Explore
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
          background: "linear-gradient(to bottom, transparent, #080C14)",
          zIndex: 6,
        }} />
      </section>

      {/* ─── STATS BAR ─── */}
      <div style={{
        background: "rgba(201,168,76,0.06)",
        borderTop: "1px solid rgba(201,168,76,0.15)",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
        display: "flex", justifyContent: "space-between",
        flexWrap: "wrap",
      }}>
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="stat-item">
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "3.2rem", fontWeight: 300,
                color: "#C9A84C",
                lineHeight: 1, marginBottom: "0.4rem",
                letterSpacing: -1,
              }}>
                {s.num}
              </div>
              <div style={{
                fontSize: "0.65rem", fontWeight: 600,
                letterSpacing: 2.5, textTransform: "uppercase",
                color: "rgba(232,237,242,0.4)",
              }}>
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ─── ABOUT ─── */}
      <section id="about" className="section-pad" style={{ padding: "9rem 6rem", background: "#080C14" }}>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "6rem", alignItems: "center" }}>
          {/* Left: Images */}
          <Reveal>
            <div style={{ position: "relative", paddingBottom: "3rem" }}>
              {/* Main image */}
              <div style={{
                position: "relative",
                width: "85%",
                aspectRatio: "4/3",
                overflow: "hidden",
                boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
              }}>
                <img src="/18.jpg" alt="Plating Facility" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, rgba(201,168,76,0.1) 0%, transparent 60%)",
                }} />
              </div>

              {/* Overlapping secondary image */}
              <div style={{
                position: "absolute",
                bottom: 0, right: 0,
                width: "52%", aspectRatio: "1/1",
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                border: "4px solid #080C14",
              }}>
                <img src="/2.jpg" alt="Components" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              {/* Gold accent bar */}
              <div style={{
                position: "absolute", top: "2rem", left: "-1.5rem",
                width: 4, height: "50%",
                background: "linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0))",
              }} />

              {/* ISO badge */}
              <div style={{
                position: "absolute", top: "1.5rem", right: "16%",
                background: "#C9A84C",
                padding: "1.2rem 1.5rem",
                textAlign: "center",
                boxShadow: "0 15px 40px rgba(201,168,76,0.3)",
              }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", color: "#080C14", letterSpacing: 2, lineHeight: 1 }}>ISO</div>
                <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: 2, color: "rgba(8,12,20,0.7)", marginTop: 3 }}>CERTIFIED</div>
              </div>
            </div>
          </Reveal>

          {/* Right: Text */}
          <Reveal delay={150}>
            <div>
              <div className="section-label">Who We Are</div>
              <h2 className="section-heading" style={{ marginBottom: "2rem" }}>
                Precision &<br /><span>Quality</span> in Every<br />Component
              </h2>

              {[
                "S.S. Enterprises is a multi-capability industrial manufacturer based in MIDC Ambad, Nashik — specialising in electroplating, fabrication, FRP components, and supply of ferrous and non-ferrous assemblies.",
                "Founded on a commitment to precision and reliability, we serve clients across automotive, electrical, and engineering sectors with a holistic approach: from raw material supply through to finished, packaged products.",
                "Our in-house Silver & Tin electroplating lines, FRP component manufacturing, and XRF-verified quality testing make us a one-stop industrial partner trusted by leading names across Maharashtra.",
              ].map((text, i) => (
                <p key={i} style={{
                  fontSize: "0.92rem",
                  color: "rgba(232,237,242,0.55)",
                  lineHeight: 1.95,
                  marginBottom: "1.2rem",
                  fontWeight: 300,
                }}>
                  {text}
                </p>
              ))}

              <div style={{
                marginTop: "2.5rem",
                paddingLeft: "1.5rem",
                borderLeft: "2px solid #C9A84C",
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.15rem", fontStyle: "italic",
                  color: "rgba(232,237,242,0.7)",
                  lineHeight: 1.8,
                }}>
                  "Committed to CQD — Cost, Quality & Delivery — we use lean manufacturing and FIFO systems to ensure every batch meets the highest standards."
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="section-pad" style={{
        padding: "9rem 6rem",
        background: "linear-gradient(180deg, #0D1220 0%, #080C14 100%)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <Reveal>
          <div style={{ marginBottom: "4rem" }}>
            <div className="section-label">What We Do</div>
            <h2 className="section-heading">
              Industrial<br /><span>Capabilities</span>
            </h2>
          </div>
        </Reveal>

        <div className="services-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.04)",
        }}>
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="service-card">
                {/* Tag */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.7rem", fontWeight: 400,
                  color: "rgba(201,168,76,0.4)",
                  letterSpacing: 3,
                  marginBottom: "1.5rem",
                }}>
                  {s.tag}
                </div>
                <div style={{ fontSize: "2rem", marginBottom: "1.2rem" }}>{s.icon}</div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem", fontWeight: 600,
                  color: "#E8EDF2",
                  marginBottom: "0.8rem",
                  letterSpacing: 0.3,
                }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(232,237,242,0.45)", lineHeight: 1.85, fontWeight: 300 }}>
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── FACILITIES ─── */}
      <section id="facilities" className="section-pad" style={{ padding: "9rem 6rem", background: "#080C14" }}>
        <Reveal>
          <div style={{ marginBottom: "4rem" }}>
            <div className="section-label">Infrastructure</div>
            <h2 className="section-heading">
              Our <span>Facilities</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "5rem", alignItems: "start" }}>
            {/* Machine list */}
            <div>
              <p style={{ fontSize: "0.92rem", color: "rgba(232,237,242,0.45)", lineHeight: 1.9, marginBottom: "2rem", fontWeight: 300 }}>
                Our plant houses a comprehensive range of modern fabrication and processing machinery — enabling complex projects with speed and precision.
              </p>
              <div style={{
                border: "1px solid rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}>
                {FACILITIES.map((f, i) => (
                  <div key={i} className="facility-item">
                    <div className="facility-dot" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Plant details + gallery */}
            <div>
              <p style={{ fontSize: "0.92rem", color: "rgba(232,237,242,0.45)", lineHeight: 1.9, marginBottom: "2.5rem", fontWeight: 300 }}>
                A 5,000 sq.ft. plant with 3,000 sq.ft. built-up space, 2 owned vehicles, and a technically sound team of 15 professionals working across departments.
              </p>

              {/* Mini gallery grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
                <div style={{ gridColumn: "span 2", aspectRatio: "16/10", overflow: "hidden", position: "relative" }}>
                  <img src="/3.jpg" alt="Silver Plating Line" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(8,12,20,0.6), transparent)" }} />
                </div>
                {["/4.jpg", "/5.jpg", "/6.jpg"].map((src, i) => (
                  <div key={i} style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.08)"; }}
                      onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── QUALITY ─── */}
      <section id="quality" className="section-pad" style={{
        padding: "9rem 6rem",
        background: "linear-gradient(180deg, #0D1220 0%, #080C14 100%)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <Reveal>
          <div style={{ marginBottom: "4rem" }}>
            <div className="section-label">Standards</div>
            <h2 className="section-heading">
              Quality at<br /><span>Every Step</span>
            </h2>
          </div>
        </Reveal>

        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          <Reveal delay={100}>
            <div style={{ display: "grid", gap: "1px", border: "1px solid rgba(255,255,255,0.04)" }}>
              {QUALITY_PILLARS.map((p, i) => (
                <div key={i} className="quality-pillar">
                  <div style={{
                    width: 52, height: 52,
                    border: "1px solid rgba(201,168,76,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.6rem", color: "#C9A84C",
                    flexShrink: 0,
                    fontStyle: i === 3 ? "italic" : "normal",
                  }}>
                    {p.abbr}
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.2rem", fontWeight: 600,
                      color: "#E8EDF2", marginBottom: "0.4rem",
                    }}>
                      {p.title}
                    </h4>
                    <p style={{ fontSize: "0.83rem", color: "rgba(232,237,242,0.45)", lineHeight: 1.75 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}>
                <img src="/7.jpg" alt="Quality" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(8,12,20,0.2)" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {["/8.jpg", "/9.jpg"].map((src, i) => (
                  <div key={i} style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.06)"; }}
                      onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section id="certifications" className="section-pad" style={{
        padding: "7rem 6rem", background: "#080C14",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <Reveal>
            <div style={{ display: "grid", gap: "3rem" }}>
              {[
                { icon: "🎓", title: "Employee Development", text: "Competence mapping through regular classroom and on-the-job training ensures a technically sound and motivated workforce. We believe our people are our strongest asset." },
                { icon: "🛡️", title: "Safety First", text: "Metal detectors, CCTV surveillance, and mandatory PPE — we ensure the safety of both our employees and materials at all times." },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "1.8rem" }}>{item.icon}</span>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: "#E8EDF2" }}>{item.title}</h4>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "rgba(232,237,242,0.45)", lineHeight: 1.9, fontWeight: 300 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
              <img src="/9.jpg" alt="Safety" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 70%)",
              }} />
              {/* Gold corner */}
              <div style={{ position: "absolute", top: 0, left: 0, width: 60, height: 60, borderTop: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 60, height: 60, borderBottom: "2px solid #C9A84C", borderRight: "2px solid #C9A84C" }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CLIENTS ─── */}
      <section id="clients" className="section-pad" style={{
        padding: "9rem 6rem", textAlign: "center",
        background: "linear-gradient(180deg, #0D1220 0%, #080C14 100%)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Trusted By</div>
            <h2 className="section-heading" style={{ marginBottom: "0.5rem" }}>
              Industry <span>Leaders</span>
            </h2>
            <p style={{ color: "rgba(232,237,242,0.35)", marginBottom: "3.5rem", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>
              Serving the backbone of Maharashtra's industrial sector
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem", maxWidth: 900 }}>
              {CLIENTS.map((c, i) => (
                <div key={i} className="client-tag">{c}</div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── GALLERY (SLIDESHOW) ─── */}
      <section id="gallery" className="section-pad" style={{ padding: "9rem 6rem", background: "#080C14", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <Reveal>
          <div style={{ marginBottom: "3rem" }}>
            <div className="section-label">Our Work</div>
            <h2 className="section-heading">
              Plant & <span>Process</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <GallerySlideshow />
        </Reveal>
      </section>

      {/* ─── PHOTO SHOWCASE ─── */}
      <section id="photos" className="section-pad" style={{
        padding: "9rem 6rem",
        background: "linear-gradient(180deg, #0D1220 0%, #080C14 100%)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <Reveal>
          <div style={{ marginBottom: "4rem" }}>
            <div className="section-label">Inside Our Plant</div>
            <h2 className="section-heading">
              A Glimpse of Our <span>World</span>
            </h2>
            <p style={{ marginTop: "1.2rem", fontSize: "0.92rem", color: "rgba(232,237,242,0.4)", fontWeight: 300, maxWidth: 560, lineHeight: 1.85 }}>
              Step inside S.S. Enterprises — from electroplating lines and fabrication bays to quality labs and finished products.
            </p>
          </div>
        </Reveal>

        {/* Feature row: Plant exterior (large) + Office shots */}
        <Reveal delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "280px 200px", gap: "0.6rem", marginBottom: "0.6rem" }}>
            <div style={{ gridRow: "span 2", overflow: "hidden", position: "relative" }}>
              <img src="/plantouterimg.jpg" alt="Plant Exterior" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,12,20,0.7) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem" }}>
                <div style={{ color: "#C9A84C", fontSize: "0.65rem", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.3rem" }}>Our Facility</div>
                <div style={{ color: "#E8EDF2", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 300 }}>Plant Exterior</div>
              </div>
            </div>
            <div style={{ overflow: "hidden", position: "relative" }}>
              <img src="/office.jpg" alt="Office" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.08)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,12,20,0.6) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: "0.7rem", left: "0.7rem", color: "rgba(232,237,242,0.8)", fontSize: "0.62rem", letterSpacing: 2, textTransform: "uppercase" }}>Office</div>
            </div>
            <div style={{ overflow: "hidden", position: "relative" }}>
              <img src="/office2.jpg" alt="Administration" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.08)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,12,20,0.6) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: "0.7rem", left: "0.7rem", color: "rgba(232,237,242,0.8)", fontSize: "0.62rem", letterSpacing: 2, textTransform: "uppercase" }}>Administration</div>
            </div>
            <div style={{ overflow: "hidden", position: "relative" }}>
              <img src="/chemicals.jpg" alt="Chemicals" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.08)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,12,20,0.6) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: "0.7rem", left: "0.7rem", color: "rgba(232,237,242,0.8)", fontSize: "0.62rem", letterSpacing: 2, textTransform: "uppercase" }}>Process Chemicals</div>
            </div>
            <div style={{ overflow: "hidden", position: "relative" }}>
              <img src="/sliverplaintingplant.jpg" alt="Silver Plating Plant" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.08)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,12,20,0.6) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: "0.7rem", left: "0.7rem", color: "rgba(232,237,242,0.8)", fontSize: "0.62rem", letterSpacing: 2, textTransform: "uppercase" }}>Plating Plant</div>
            </div>
          </div>
        </Reveal>

        {/* Output row: wide silver output + two smaller */}
        <Reveal delay={150}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem", marginBottom: "0.6rem" }}>
            <div style={{ height: 220, overflow: "hidden", position: "relative", gridColumn: "span 2" }}>
              <img src="/silverplaintinoutput.jpg" alt="Silver Plating Output" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,12,20,0.65) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
                <div style={{ color: "#C9A84C", fontSize: "0.62rem", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Product Output</div>
                <div style={{ color: "#E8EDF2", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 300 }}>Silver Plating Output</div>
              </div>
            </div>
            <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
              <img src="/sliverplaintingoutput.jpg" alt="Plating Output" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.08)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,12,20,0.6) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: "0.7rem", left: "0.7rem", color: "rgba(232,237,242,0.8)", fontSize: "0.62rem", letterSpacing: 2, textTransform: "uppercase" }}>Plating Output</div>
            </div>
          </div>
        </Reveal>

        {/* Finished products wide banner */}
        <Reveal delay={180}>
          <div style={{ height: 260, overflow: "hidden", position: "relative", marginBottom: "0.6rem" }}>
            <img src="/finished product.jpg" alt="Finished Products" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
              onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,12,20,0.75) 30%, transparent 100%)" }} />
            <div style={{ position: "absolute", top: "50%", left: "2.5rem", transform: "translateY(-50%)" }}>
              <div style={{ color: "#C9A84C", fontSize: "0.65rem", letterSpacing: 4, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.5rem" }}>End Result</div>
              <div style={{ color: "#E8EDF2", fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, lineHeight: 1.1 }}>Finished <span style={{ color: "#C9A84C", fontStyle: "italic" }}>Products</span></div>
            </div>
          </div>
        </Reveal>

        {/* Uniform 4-col grid: all IMG_* photos */}
        <Reveal delay={200}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem" }}>
            {[
              { src: "/IMG_1071.jpg", label: "Facility View" },
              { src: "/IMG_1072.jpg", label: "Production Line" },
              { src: "/IMG_1077.jpg", label: "Workshop" },
              { src: "/IMG_1078.jpg", label: "Machinery" },
              { src: "/IMG_1079.jpg", label: "Equipment" },
              { src: "/IMG_1080.jpg", label: "Plant Interior" },
              { src: "/IMG_1083.jpg", label: "Operations" },
              { src: "/IMG_1084.jpg", label: "Assembly" },
              { src: "/IMG_1088.jpg", label: "Processing Unit" },
              { src: "/IMG_1089.jpg", label: "Components" },
              { src: "/IMG_1090.jpg", label: "Production" },
              { src: "/IMG_1091.jpg", label: "Fabrication" },
              { src: "/IMG_1092.jpg", label: "Workshop Floor" },
              { src: "/IMG_1095.jpg", label: "Plating Line" },
              { src: "/IMG_1097.jpg", label: "Quality Check" },
              { src: "/IMG_1098.jpg", label: "Inspection" },
              { src: "/IMG_1099.jpg", label: "Finishing" },
              { src: "/IMG_1100.jpg", label: "Output" },
              { src: "/IMG_1102.jpg", label: "Full Plant" },
              { src: "/17.jpg", label: "Facility" },
            ].map((item, i) => (
              <div key={i} style={{ height: 190, overflow: "hidden", position: "relative" }}>
                <img src={item.src} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                  onMouseEnter={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1.1)"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => { e.currentTarget.style.transform = "scale(1)"; }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(8,12,20,0.75) 0%, transparent 55%)",
                  opacity: 0, transition: "opacity 0.3s",
                }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.opacity = "0"; }}
                />
                <div style={{
                  position: "absolute", bottom: "0.6rem", left: "0.7rem",
                  color: "rgba(232,237,242,0.8)", fontSize: "0.58rem",
                  letterSpacing: 2, textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif", pointerEvents: "none",
                }}>{item.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="section-pad" style={{
        padding: "9rem 6rem",
        background: "linear-gradient(160deg, #0D1220 0%, #080C14 100%)",
        borderTop: "1px solid rgba(201,168,76,0.1)",
      }}>
        <Reveal>
          <div style={{ marginBottom: "4rem" }}>
            <div className="section-label">Reach Us</div>
            <h2 className="section-heading">
              Let's <span>Connect</span>
            </h2>
          </div>
        </Reveal>

        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem" }}>
          <Reveal delay={100}>
            <div>
              {[
                { icon: "📍", label: "Address", value: "Plot No. XX, MIDC Ambad, Nashik, Maharashtra – 422010" },
                { icon: "📞", label: "Phone", value: "+91 XXXXX XXXXX" },
                { icon: "✉️", label: "Email", value: "info@ssenterprises.in" },
                { icon: "🕐", label: "Working Hours", value: "Monday – Saturday  ·  9:00 AM – 6:00 PM" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: "1.2rem", alignItems: "flex-start",
                  marginBottom: "2rem",
                  paddingBottom: "2rem",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}>
                  <div style={{
                    width: 42, height: 42,
                    border: "1px solid rgba(201,168,76,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: "0.62rem", fontWeight: 600,
                      letterSpacing: 2.5, textTransform: "uppercase",
                      color: "rgba(201,168,76,0.6)",
                      marginBottom: "0.3rem",
                    }}>
                      {item.label}
                    </div>
                    <p style={{ fontSize: "0.92rem", color: "rgba(232,237,242,0.7)", fontWeight: 300, lineHeight: 1.6 }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                type="text" placeholder="Your Name"
                className="contact-input"
                value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              />
              <input
                type="email" placeholder="Email Address"
                className="contact-input"
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
              />
              <textarea
                placeholder="Your Message"
                className="contact-input"
                value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                style={{ minHeight: 130, resize: "vertical" }}
              />
              <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "0.5rem" }}>
                <button type="submit" className="gold-btn">
                  Send Message
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer-pad" style={{
        padding: "4rem 6rem",
        background: "#05080F",
        borderTop: "1px solid rgba(201,168,76,0.15)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: "#E8EDF2", marginBottom: "0.3rem", letterSpacing: 0.5 }}>
              S.S. <span style={{ color: "#C9A84C" }}>Enterprises</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "rgba(232,237,242,0.3)", letterSpacing: 1 }}>
              C-2/6 MIDC Ambad, Nashik 422010 · ISO Certified
            </p>
          </div>

          <ul style={{ display: "flex", gap: "2rem", listStyle: "none", flexWrap: "wrap" }}>
            {NAV_LINKS.map(l => (
              <li key={l}>
                <button
                  onClick={() => scrollTo(l.toLowerCase())}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "rgba(232,237,242,0.35)",
                    fontSize: "0.68rem", letterSpacing: 2, textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#C9A84C"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "rgba(232,237,242,0.35)"; }}
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>

          <p style={{ fontSize: "0.7rem", color: "rgba(232,237,242,0.2)", letterSpacing: 0.5 }}>
            © 2025 S.S. Enterprises. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}