"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
  CSSProperties,
} from "react";

const NAV_LINKS = [
  "About",
  "Services",
  "Facilities",
  "Quality",
  "Clients",
  "Gallery",
  "Contact",
];

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
    icon: "🟠",
    tag: "03",
    title: "Copper Electroplating",
    desc: "Premium copper plating solutions for enhanced conductivity, corrosion resistance, and surface finishing across industrial and electronic components.",
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
  "VMC Machine",
  "Trobe Machine Automatic",
  "DRO-Drilling Machine with Planomiller",
  "Hydraulic Shearing Machine",
  "Arc Welding Machine",
  "CO₂ Welding Machine",
  "Spot Welding Machine",
  "Radial Drilling Machine",
  "Tapping Machine",
  "Electric Weighing Scale",
  "Pag & Profile Gas Cutting Machine",
  "Auto Milling Machine",
  "Silver Plating Line",
  "Tin Plating Line",
  "XRF Machine (Fischer)",
  "Oven (Adhesion Testing)",
  "ETP Plant",
  "DM Water Plant",
];

const QUALITY_PILLARS = [
  {
    abbr: "C",
    color: "#C9A84C",
    title: "Cost Competitive",
    desc: "Lean manufacturing and process automation keep overhead low — savings passed directly to clients.",
  },
  {
    abbr: "Q",
    color: "#C9A84C",
    title: "Uncompromised Quality",
    desc: "XRF verification, rigorous incoming inspection, and ISO-aligned processes at every stage.",
  },
  {
    abbr: "D",
    color: "#C9A84C",
    title: "Delivery Precision",
    desc: "FIFO systems and real-time batch tracking ensure on-time dispatch for every order, every time.",
  },
  {
    abbr: "∞",
    color: "#C9A84C",
    title: "Continuous Improvement",
    desc: "Regular process reviews, team training, and equipment upgrades keep our capabilities ahead of demand.",
  },
];

const CLIENTS = [
  "Electrical OEMs",
  "Automotive Tier-1",
  "Switch Gear Manufacturers",
  "Industrial Fabricators",
  "Engineering Exporters",
  "Pump Manufacturers",
  "Transformer Companies",
  "Control Panel Makers",
  "Defense Contractors",
  "Maharashtra Industries",
];

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

const GALLERY_IMAGES = [
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
];

// ─── SHARED IntersectionObserver for Reveal ───
// One observer for all reveal elements instead of N individual observers
type RevealEntry = { el: HTMLElement; onVisible: () => void };
let sharedObserver: IntersectionObserver | null = null;
const revealMap = new WeakMap<Element, () => void>();

function getSharedObserver() {
  if (typeof window === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const cb = revealMap.get(e.target);
            if (cb) {
              cb();
              sharedObserver?.unobserve(e.target);
              revealMap.delete(e.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
  }
  return sharedObserver;
}

function Reveal({
  children,
  delay = 0,
  className = "",
  style = {},
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getSharedObserver();
    if (!obs) return;
    revealMap.set(el, () => setVisible(true));
    obs.observe(el);
    return () => {
      obs.unobserve(el);
      revealMap.delete(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        // GPU-composited properties only (opacity + transform) — no layout triggers
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── HERO SLIDESHOW ───
// Key fix: use refs for DOM opacity instead of React state re-renders.
// Slides are always mounted; we toggle CSS classes for transitions.
// No setState inside the animation loop → zero React reconciliation during slides.
function HeroSlideshow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [dotIndex, setDotIndex] = useState(0); // dots still use state (lightweight)
  const [caption, setCaption] = useState(SLIDESHOW_IMAGES[0].caption);

  // Pre-render all slides; toggle opacity via direct DOM writes
  const goTo = useCallback((next: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slides = container.querySelectorAll<HTMLElement>(".hero-slide");
    slides[currentRef.current].style.opacity = "0";
    slides[currentRef.current].style.zIndex = "1";
    slides[next].style.opacity = "1";
    slides[next].style.zIndex = "2";
    currentRef.current = next;
    setDotIndex(next);
    setCaption(SLIDESHOW_IMAGES[next].caption);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      goTo((currentRef.current + 1) % SLIDESHOW_IMAGES.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goTo]);

  const handleDot = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(i);
    timerRef.current = setInterval(() => {
      goTo((currentRef.current + 1) % SLIDESHOW_IMAGES.length);
    }, 5000);
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
    >
      {SLIDESHOW_IMAGES.map((img, i) => (
        <div
          key={i}
          className="hero-slide"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${img.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === 0 ? 1 : 0,
            zIndex: i === 0 ? 2 : 1,
            // GPU layer — transition only opacity, no layout properties
            transition: "opacity 1.1s cubic-bezier(0.4,0,0.2,1)",
            willChange: "opacity",
            // Force GPU composite layer from the start
            transform: "translateZ(0)",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(8,12,20,0.85) 40%, rgba(8,12,20,0.4) 100%)",
          zIndex: 3,
          // Static overlay — no animation, no will-change needed
        }}
      />
      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "3rem",
          zIndex: 10,
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        {SLIDESHOW_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            style={{
              width: i === dotIndex ? 32 : 8,
              height: 8,
              background:
                i === dotIndex ? "#C9A84C" : "rgba(255,255,255,0.3)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              borderRadius: 4,
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "6rem",
          zIndex: 10,
          fontSize: "0.72rem",
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'Cormorant Garamond', serif",
          transition: "opacity 0.5s ease",
        }}
      >
        {caption}
      </div>
    </div>
  );
}

// ─── GALLERY SLIDESHOW ───
// Same DOM-ref pattern for the main image; thumbnails are windowed.
function GallerySlideshow() {
  const total = GALLERY_IMAGES.length;
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Update DOM directly for slide change — no re-render of the full component
  const goToDOM = useCallback((i: number) => {
    activeRef.current = i;
    setActive(i); // still need for thumbnails + dots
    if (imgRef.current) {
      imgRef.current.style.opacity = "0";
      // Small delay so fade-out is visible before src swap
      setTimeout(() => {
        if (imgRef.current) {
          imgRef.current.src = GALLERY_IMAGES[i].src;
          imgRef.current.alt = GALLERY_IMAGES[i].label;
          imgRef.current.style.opacity = "1";
        }
        if (labelRef.current) labelRef.current.textContent = GALLERY_IMAGES[i].label;
        if (counterRef.current)
          counterRef.current.textContent = `${i + 1} / ${total}`;
      }, 220);
    }
  }, [total]);

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (autoRef.current) goToDOM((activeRef.current + 1) % total);
    }, 3500);
  }, [goToDOM, total]);

  useEffect(() => {
    startAuto();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAuto]);

  const go = (i: number) => {
    autoRef.current = false;
    goToDOM(i);
    startAuto();
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Main slide */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          background: "#0d1117",
        }}
      >
        <img
          ref={imgRef}
          src={GALLERY_IMAGES[0].src}
          alt={GALLERY_IMAGES[0].label}
          fetchPriority="high"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // GPU layer; opacity transition instead of keyed remount
            transition: "opacity 0.4s ease",
            willChange: "opacity",
            transform: "translateZ(0)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(8,12,20,0.7) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
        <div
          ref={labelRef}
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "1.5rem",
            color: "#fff",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.1rem",
            fontStyle: "italic",
            letterSpacing: 1,
            pointerEvents: "none",
          }}
        >
          {GALLERY_IMAGES[0].label}
        </div>
        <div
          ref={counterRef}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(8,12,20,0.6)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(201,168,76,0.3)",
            color: "rgba(232,237,242,0.7)",
            fontSize: "0.7rem",
            letterSpacing: 1,
            padding: "0.3rem 0.7rem",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          1 / {total}
        </div>
        {(
          [
            { dir: "left", action: () => go((activeRef.current - 1 + total) % total), symbol: "‹" },
            { dir: "right", action: () => go((activeRef.current + 1) % total), symbol: "›" },
          ] as const
        ).map(({ dir, action, symbol }) => (
          <button
            key={dir}
            onClick={action}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              [dir]: "1rem",
              zIndex: 10,
              width: 44,
              height: 44,
              background: "rgba(201,168,76,0.2)",
              border: "1px solid rgba(201,168,76,0.5)",
              color: "#C9A84C",
              fontSize: "1.8rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
              lineHeight: 1,
            }}
          >
            {symbol}
          </button>
        ))}
      </div>

      {/* Thumbnails — windowed: only render ±6 around active */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginTop: "0.75rem",
          overflowX: "auto",
          paddingBottom: "0.25rem",
          scrollbarWidth: "none",
        }}
      >
        {GALLERY_IMAGES.map((img, i) => {
          const dist = Math.min(
            Math.abs(i - active),
            total - Math.abs(i - active)
          );
          const shouldRender = dist <= 6;
          return (
            <div
              key={i}
              onClick={() => go(i)}
              style={{
                flexShrink: 0,
                width: 72,
                height: 52,
                cursor: "pointer",
                overflow: "hidden",
                border:
                  i === active
                    ? "2px solid #C9A84C"
                    : "2px solid transparent",
                opacity: i === active ? 1 : 0.5,
                transition: "opacity 0.25s, border-color 0.25s",
                background: "#0d1117",
              }}
            >
              {shouldRender ? (
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "rgba(255,255,255,0.05)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SSEnterprisesLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      // rAF throttle — reads offsetTop once per frame, not on every scroll event
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 60);

        const sections = NAV_LINKS.map((l) => l.toLowerCase());
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && y >= el.offsetTop - 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
        ticking = false;
      });
      ticking = true;
    };

    // passive: true — never blocks scroll compositing
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#080C14",
        color: "#E8EDF2",
        overflowX: "hidden",
      }}
    >
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

        /*
         * PERFORMANCE: All hover effects use CSS only (no JS).
         * transform + opacity transitions stay on the GPU compositor thread.
         * We avoid any property that triggers layout (width, height, padding, margin,
         * top, left, font-size, etc.) in transitions.
         */

        .img-zoom {
          transition: transform 0.7s ease;
          will-change: transform;
          transform: translateZ(0); /* promote to GPU layer immediately */
        }
        .img-zoom:hover { transform: scale(1.05) translateZ(0); }
        .img-zoom-sm:hover { transform: scale(1.08) translateZ(0); }

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
          /* GPU only: background-position + transform — no layout triggers */
          transition: background-position 0.4s, transform 0.2s;
          will-change: transform;
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
          /* Use background + color only — avoid border-width changes (layout) */
          transition: background 0.3s, color 0.3s, border-color 0.3s;
        }
        .outline-btn:hover {
          background: rgba(201,168,76,0.08);
          border-color: #C9A84C;
          color: #C9A84C;
        }

        .service-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 2.8rem 2.4rem;
          position: relative; overflow: hidden;
          /* transform instead of margin/position for the hover lift */
          transition: border-color 0.4s, background 0.4s, transform 0.3s;
          will-change: transform;
          transform: translateZ(0);
          cursor: default;
        }
        .service-card::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          transform: translateX(-100%) translateZ(0);
          transition: transform 0.6s ease;
          will-change: transform;
        }
        .service-card:hover {
          border-color: rgba(201,168,76,0.2);
          background: rgba(201,168,76,0.04);
          transform: translateY(-3px) translateZ(0);
        }
        .service-card:hover::before { transform: translateX(100%) translateZ(0); }

        .stat-item {
          text-align: center; flex: 1; min-width: 120px;
          padding: 2.5rem 1.5rem;
          position: relative;
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
          /* Use transform for indent instead of padding-left (layout trigger) */
          transition: background 0.25s, color 0.25s, transform 0.25s;
          transform: translateZ(0);
          cursor: default;
          letter-spacing: 0.3px;
        }
        .facility-item:last-child { border-bottom: none; }
        .facility-item:hover {
          background: rgba(201,168,76,0.05);
          color: #C9A84C;
          transform: translateX(0.4rem) translateZ(0);
        }
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
          transition: border-color 0.3s, color 0.3s, background 0.3s;
          cursor: default;
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
          transition: border-color 0.3s, background 0.3s;
        }
        .contact-input:focus {
          outline: none;
          border-color: #C9A84C;
          background: rgba(201,168,76,0.03);
        }
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

        /* Photo grid: CSS-only scale on GPU layer */
        .photo-tile {
          height: 190px; overflow: hidden; position: relative;
          /* Establish GPU layer so child scale doesn't repaint neighbours */
          transform: translateZ(0);
          isolation: isolate;
        }
        .photo-tile img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s ease;
          will-change: transform;
          transform: translateZ(0);
        }
        .photo-tile:hover img { transform: scale(1.1) translateZ(0); }
        .photo-tile-label {
          position: absolute; bottom: 0.6rem; left: 0.7rem;
          color: rgba(232,237,242,0.8); font-size: 0.58rem;
          letter-spacing: 2px; text-transform: uppercase;
          font-family: 'DM Sans', sans-serif; pointer-events: none;
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
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 68,
          background: scrolled
            ? "rgba(8,12,20,0.97)"
            : "rgba(8,12,20,0.6)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(201,168,76,0.2)"
            : "1px solid transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 4rem",
          // GPU-composited transition (background is an exception — uses compositor in modern browsers)
          transition: "background 0.4s ease, border-color 0.4s ease",
          willChange: "background",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          <img
            src="/logo.png"
            alt="S.S. Enterprises Logo"
            style={{
              width: 45,
              height: 45,
              objectFit: "contain",
              filter: "drop-shadow(0 0 8px rgba(201,168,76,0.3))",
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.15rem",
                fontWeight: 600,
                color: "#E8EDF2",
                lineHeight: 1,
                letterSpacing: 1,
              }}
            >
              S.S. <span style={{ color: "#C9A84C" }}>Enterprises</span>
            </div>
            <div
              style={{
                fontSize: "0.55rem",
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "rgba(232,237,242,0.35)",
                marginTop: 2,
              }}
            >
              MIDC Ambad · Nashik
            </div>
          </div>
        </div>

        <ul
          className="nav-links-desktop"
          style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}
        >
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l.toLowerCase())}
                className={`nav-btn${activeSection === l.toLowerCase() ? " active" : ""
                  }`}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => scrollTo("contact")}
          className="gold-btn"
          style={{ padding: "0.65rem 1.5rem", fontSize: "0.65rem" }}
        >
          Get Quote
        </button>
      </nav>

      {/* ─── HERO ─── */}
      <section
        id="home"
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 600,
          overflow: "hidden",
        }}
      >
        <HeroSlideshow />
        <div
          className="hero-content"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "8rem 6rem",
          }}
        >
          <div
            style={{
              animation: "fadeUp 0.8s ease both",
              animationDelay: "0.2s",
            }}
          >
            <div
              className="section-label"
              style={{ marginBottom: "1.5rem" }}
            >
              Established · ISO Certified · Nashik
            </div>
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              fontWeight: 300,
              color: "#E8EDF2",
              lineHeight: 0.95,
              letterSpacing: -1,
              marginBottom: "1.5rem",
              animation: "fadeUp 0.8s ease both",
              animationDelay: "0.35s",
            }}
          >
            Precision
            <br />
            <span style={{ color: "#C9A84C", fontStyle: "italic" }}>
              Electroplating
            </span>

          </h1>

          <p
            style={{
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
            }}
          >
            "Cost, Quality & Delivery — the three pillars on which every client
            relationship is built."
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              animation: "fadeUp 0.8s ease both",
              animationDelay: "0.65s",
            }}
          >
            <button
              onClick={() => scrollTo("services")}
              className="gold-btn"
            >
              Our Capabilities
            </button>
            <button
              onClick={() => scrollTo("gallery")}
              className="outline-btn"
            >
              View Gallery
            </button>
          </div>

          <div
            style={{
              position: "absolute",
              right: "3rem",
              top: "50%",
              transform: "translateY(-50%) rotate(90deg)",
              fontSize: "0.6rem",
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(232,237,242,0.25)",
              fontFamily: "'DM Sans', sans-serif",
              animation: "fadeUp 0.8s ease both",
              animationDelay: "0.8s",
            }}
          >
            Scroll to Explore
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: "linear-gradient(to bottom, transparent, #080C14)",
            zIndex: 6,
          }}
        />
      </section>

      {/* ─── STATS BAR ─── */}
      <div
        style={{
          background: "rgba(201,168,76,0.06)",
          borderTop: "1px solid rgba(201,168,76,0.15)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="stat-item">
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3.2rem",
                  fontWeight: 300,
                  color: "#C9A84C",
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                  letterSpacing: -1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  color: "rgba(232,237,242,0.4)",
                }}
              >
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ─── ABOUT ─── */}
      <section
        id="about"
        className="section-pad"
        style={{ padding: "9rem 6rem", background: "#080C14" }}
      >
        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "6rem",
            alignItems: "center",
          }}
        >
          <Reveal>
            <div style={{ position: "relative", paddingBottom: "3rem" }}>
              <div
                style={{
                  position: "relative",
                  width: "85%",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                  transform: "translateZ(0)", // promote the container
                }}
              >
                <img
                  src="/18.jpg"
                  alt="Plating Facility"
                  loading="lazy"
                  decoding="async"
                  className="img-zoom"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(201,168,76,0.1) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "52%",
                  aspectRatio: "1/1",
                  overflow: "hidden",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                  border: "4px solid #080C14",
                  transform: "translateZ(0)",
                }}
              >
                <img
                  src="/2.jpg"
                  alt="Components"
                  loading="lazy"
                  decoding="async"
                  className="img-zoom"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "2rem",
                  left: "-1.5rem",
                  width: 4,
                  height: "50%",
                  background:
                    "linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0))",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "16%",
                  background: "#C9A84C",
                  padding: "1.2rem 1.5rem",
                  textAlign: "center",
                  boxShadow: "0 15px 40px rgba(201,168,76,0.3)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.4rem",
                    color: "#080C14",
                    letterSpacing: 2,
                    lineHeight: 1,
                  }}
                >
                  ISO
                </div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: 2,
                    color: "rgba(8,12,20,0.7)",
                    marginTop: 3,
                  }}
                >
                  CERTIFIED
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div>
              <div className="section-label">Who We Are</div>
              <h2
                className="section-heading"
                style={{ marginBottom: "2rem" }}
              >
                Precision &<br />
                <span>Quality</span> in Every
                <br />
                Component
              </h2>
              {[
                "S.S. Enterprises is a multi-capability industrial manufacturer based in MIDC Ambad, Nashik — specialising in electroplating, FRP components, and supply of ferrous and non-ferrous assemblies.",
                "Founded on a commitment to precision and reliability, we serve clients across automotive, electrical, and engineering sectors with a holistic approach: from raw material supply through to finished, packaged products.",
                "Our in-house Silver & Tin electroplating lines, FRP component manufacturing, and XRF-verified quality testing make us a one-stop industrial partner trusted by leading names across Maharashtra.",
              ].map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "0.92rem",
                    color: "rgba(232,237,242,0.55)",
                    lineHeight: 1.95,
                    marginBottom: "1.2rem",
                    fontWeight: 300,
                  }}
                >
                  {text}
                </p>
              ))}
              <div
                style={{
                  marginTop: "2.5rem",
                  paddingLeft: "1.5rem",
                  borderLeft: "2px solid #C9A84C",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.15rem",
                    fontStyle: "italic",
                    color: "rgba(232,237,242,0.7)",
                    lineHeight: 1.8,
                  }}
                >
                  "Committed to CQD — Cost, Quality & Delivery — we use lean
                  manufacturing and FIFO systems to ensure every batch meets
                  the highest standards."
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section
        id="services"
        className="section-pad"
        style={{
          padding: "9rem 6rem",
          background: "linear-gradient(180deg, #0D1220 0%, #080C14 100%)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Reveal>
          <div style={{ marginBottom: "4rem" }}>
            <div className="section-label">What We Do</div>
            <h2 className="section-heading">
              Industrial
              <br />
              <span>Capabilities</span>
            </h2>
          </div>
        </Reveal>
        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="service-card">
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.7rem",
                    fontWeight: 400,
                    color: "rgba(201,168,76,0.4)",
                    letterSpacing: 3,
                    marginBottom: "1.5rem",
                  }}
                >
                  {s.tag}
                </div>
                <div style={{ fontSize: "2rem", marginBottom: "1.2rem" }}>
                  {s.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#E8EDF2",
                    marginBottom: "0.8rem",
                    letterSpacing: 0.3,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(232,237,242,0.45)",
                    lineHeight: 1.85,
                    fontWeight: 300,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── FACILITIES ─── */}
      <section
        id="facilities"
        className="section-pad"
        style={{ padding: "9rem 6rem", background: "#080C14" }}
      >
        <Reveal>
          <div style={{ marginBottom: "4rem" }}>
            <div className="section-label">Infrastructure</div>
            <h2 className="section-heading">
              Our <span>Facilities</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div
            className="two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "0.8fr 1.2fr",
              gap: "5rem",
              alignItems: "start",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "rgba(232,237,242,0.45)",
                  lineHeight: 1.9,
                  marginBottom: "2rem",
                  fontWeight: 300,
                }}
              >
                Our plant houses a comprehensive range of modern fabrication
                and processing machinery — enabling complex projects with speed
                and precision.
              </p>
              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  overflow: "hidden",
                }}
              >
                {FACILITIES.map((f, i) => (
                  <div key={i} className="facility-item">
                    <div className="facility-dot" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "rgba(232,237,242,0.45)",
                  lineHeight: 1.9,
                  marginBottom: "2.5rem",
                  fontWeight: 300,
                }}
              >
                A 5,000 sq.ft. plant with 3,000 sq.ft. built-up space, 2
                owned vehicles, and a technically sound team of 15
                professionals working across departments.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    gridColumn: "span 2",
                    aspectRatio: "16/10",
                    overflow: "hidden",
                    position: "relative",
                    transform: "translateZ(0)",
                  }}
                >
                  <img
                    src="/3.jpg"
                    alt="Silver Plating Line"
                    loading="lazy"
                    decoding="async"
                    className="img-zoom"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "40%",
                      background:
                        "linear-gradient(to top, rgba(8,12,20,0.6), transparent)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
                {["/4.jpg", "/5.jpg", "/6.jpg"].map((src, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "4/3",
                      overflow: "hidden",
                      transform: "translateZ(0)",
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="img-zoom img-zoom-sm"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── QUALITY ─── */}
      <section
        id="quality"
        className="section-pad"
        style={{
          padding: "9rem 6rem",
          background: "linear-gradient(180deg, #0D1220 0%, #080C14 100%)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Reveal>
          <div style={{ marginBottom: "4rem" }}>
            <div className="section-label">Standards</div>
            <h2 className="section-heading">
              Quality at
              <br />
              <span>Every Step</span>
            </h2>
          </div>
        </Reveal>
        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          <Reveal delay={100}>
            <div
              style={{
                display: "grid",
                gap: "1px",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {QUALITY_PILLARS.map((p, i) => (
                <div key={i} className="quality-pillar">
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      border: "1px solid rgba(201,168,76,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.6rem",
                      color: "#C9A84C",
                      flexShrink: 0,
                      fontStyle: i === 3 ? "italic" : "normal",
                    }}
                  >
                    {p.abbr}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: "#E8EDF2",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {p.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.83rem",
                        color: "rgba(232,237,242,0.45)",
                        lineHeight: 1.75,
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              <div
                style={{
                  aspectRatio: "16/9",
                  overflow: "hidden",
                  position: "relative",
                  transform: "translateZ(0)",
                }}
              >
                <img
                  src="/7.jpg"
                  alt="Quality"
                  loading="lazy"
                  decoding="async"
                  className="img-zoom"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(8,12,20,0.2)",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                }}
              >
                {["/8.jpg", "/9.jpg"].map((src, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "4/3",
                      overflow: "hidden",
                      transform: "translateZ(0)",
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="img-zoom"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section
        id="certifications"
        className="section-pad"
        style={{
          padding: "7rem 6rem",
          background: "#080C14",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <Reveal>
            <div style={{ display: "grid", gap: "3rem" }}>
              {[
                {
                  icon: "🎓",
                  title: "Employee Development",
                  text: "Competence mapping through regular classroom and on-the-job training ensures a technically sound and motivated workforce. We believe our people are our strongest asset.",
                },
                {
                  icon: "🛡️",
                  title: "Safety First",
                  text: "Metal detectors, CCTV surveillance, and mandatory PPE — we ensure the safety of both our employees and materials at all times.",
                },
              ].map((item, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span style={{ fontSize: "1.8rem" }}>{item.icon}</span>
                    <h4
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        color: "#E8EDF2",
                      }}
                    >
                      {item.title}
                    </h4>
                  </div>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "rgba(232,237,242,0.45)",
                      lineHeight: 1.9,
                      fontWeight: 300,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div
              style={{
                position: "relative",
                aspectRatio: "4/3",
                overflow: "hidden",
                transform: "translateZ(0)",
              }}
            >
              <img
                src="/9.jpg"
                alt="Safety"
                className="img-zoom"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 60,
                  height: 60,
                  borderTop: "2px solid #C9A84C",
                  borderLeft: "2px solid #C9A84C",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 60,
                  height: 60,
                  borderBottom: "2px solid #C9A84C",
                  borderRight: "2px solid #C9A84C",
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CLIENTS ─── */}
      <section
        id="clients"
        className="section-pad"
        style={{
          padding: "9rem 6rem",
          textAlign: "center",
          background: "linear-gradient(180deg, #0D1220 0%, #080C14 100%)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Reveal>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className="section-label"
              style={{ justifyContent: "center" }}
            >
              Trusted By
            </div>
            <h2
              className="section-heading"
              style={{ marginBottom: "0.5rem" }}
            >
              Industry <span>Leaders</span>
            </h2>
            <p
              style={{
                color: "rgba(232,237,242,0.35)",
                marginBottom: "3.5rem",
                fontStyle: "italic",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Serving the backbone of Maharashtra's industrial sector
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.75rem",
                maxWidth: 900,
              }}
            >
              {CLIENTS.map((c, i) => (
                <div key={i} className="client-tag">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── GALLERY (SLIDESHOW) ─── */}
      <section
        id="gallery"
        className="section-pad"
        style={{
          padding: "9rem 6rem",
          background: "#080C14",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
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
      <section
        id="photos"
        className="section-pad"
        style={{
          padding: "9rem 6rem",
          background: "linear-gradient(180deg, #0D1220 0%, #080C14 100%)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Reveal>
          <div style={{ marginBottom: "4rem" }}>
            <div className="section-label">Inside Our Plant</div>
            <h2 className="section-heading">
              A Glimpse of Our <span>World</span>
            </h2>
            <p
              style={{
                marginTop: "1.2rem",
                fontSize: "0.92rem",
                color: "rgba(232,237,242,0.4)",
                fontWeight: 300,
                maxWidth: 560,
                lineHeight: 1.85,
              }}
            >
              Step inside S.S. Enterprises — from electroplating lines and
              fabrication bays to quality labs and finished products.
            </p>
          </div>
        </Reveal>

        {/* Feature row */}
        <Reveal delay={100}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gridTemplateRows: "280px 200px",
              gap: "0.6rem",
              marginBottom: "0.6rem",
            }}
          >
            <div
              style={{
                gridRow: "span 2",
                overflow: "hidden",
                position: "relative",
                transform: "translateZ(0)",
              }}
            >
              <img
                src="/plantouterimg.jpg"
                alt="Plant Exterior"
                loading="lazy"
                decoding="async"
                className="img-zoom"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(8,12,20,0.7) 0%, transparent 55%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "1.2rem",
                  left: "1.2rem",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    color: "#C9A84C",
                    fontSize: "0.65rem",
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: "0.3rem",
                  }}
                >
                  Our Facility
                </div>
                <div
                  style={{
                    color: "#E8EDF2",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.4rem",
                    fontWeight: 300,
                  }}
                >
                  Plant Exterior
                </div>
              </div>
            </div>
            {[
              { src: "/office.jpg", label: "Office" },
              { src: "/office2.jpg", label: "Administration" },
              { src: "/chemicals.jpg", label: "Process Chemicals" },
              { src: "/sliverplaintingplant.jpg", label: "Plating Plant" },
            ].map(({ src, label }, i) => (
              <div
                key={i}
                style={{
                  overflow: "hidden",
                  position: "relative",
                  transform: "translateZ(0)",
                }}
              >
                <img
                  src={src}
                  alt={label}
                  loading="lazy"
                  decoding="async"
                  className="img-zoom img-zoom-sm"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(8,12,20,0.6) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "0.7rem",
                    left: "0.7rem",
                    color: "rgba(232,237,242,0.8)",
                    fontSize: "0.62rem",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    pointerEvents: "none",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Output row */}
        <Reveal delay={150}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0.6rem",
              marginBottom: "0.6rem",
            }}
          >
            <div
              style={{
                height: 220,
                overflow: "hidden",
                position: "relative",
                gridColumn: "span 2",
                transform: "translateZ(0)",
              }}
            >
              <img
                src="/silverplaintinoutput.jpg"
                alt="Silver Plating Output"
                loading="lazy"
                decoding="async"
                className="img-zoom"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(8,12,20,0.65) 0%, transparent 55%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    color: "#C9A84C",
                    fontSize: "0.62rem",
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Product Output
                </div>
                <div
                  style={{
                    color: "#E8EDF2",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.25rem",
                    fontWeight: 300,
                  }}
                >
                  Silver Plating Output
                </div>
              </div>
            </div>
            <div
              style={{
                height: 220,
                overflow: "hidden",
                position: "relative",
                transform: "translateZ(0)",
              }}
            >
              <img
                src="/sliverplaintingoutput.jpg"
                alt="Plating Output"
                loading="lazy"
                decoding="async"
                className="img-zoom img-zoom-sm"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(8,12,20,0.6) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "0.7rem",
                  left: "0.7rem",
                  color: "rgba(232,237,242,0.8)",
                  fontSize: "0.62rem",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  pointerEvents: "none",
                }}
              >
                Plating Output
              </div>
            </div>
          </div>
        </Reveal>

        {/* Finished products banner */}
        <Reveal delay={180}>
          <div
            style={{
              height: 260,
              overflow: "hidden",
              position: "relative",
              marginBottom: "0.6rem",
              transform: "translateZ(0)",
            }}
          >
            <img
              src="/finished product.jpg"
              alt="Finished Products"
              loading="lazy"
              decoding="async"
              className="img-zoom"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(8,12,20,0.75) 30%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2.5rem",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  color: "#C9A84C",
                  fontSize: "0.65rem",
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "0.5rem",
                }}
              >
                End Result
              </div>
              <div
                style={{
                  color: "#E8EDF2",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.2rem",
                  fontWeight: 300,
                  lineHeight: 1.1,
                }}
              >
                Finished{" "}
                <span style={{ color: "#C9A84C", fontStyle: "italic" }}>
                  Products
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4-col photo grid — contentVisibility skips off-screen paint */}
        <Reveal delay={200}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.6rem",
              contentVisibility: "auto" as React.CSSProperties["contentVisibility"],
              containIntrinsicSize: "0 1200px",
            }}
          >
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
              <div key={i} className="photo-tile">
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  decoding="async"
                />
                <div className="photo-tile-label">{item.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ─── CONTACT ─── */}
      <section
        id="contact"
        className="section-pad"
        style={{
          padding: "9rem 6rem",
          background: "linear-gradient(160deg, #0D1220 0%, #080C14 100%)",
          borderTop: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <Reveal>
          <div style={{ marginBottom: "4rem" }}>
            <div className="section-label">Reach Us</div>
            <h2 className="section-heading">
              Let's <span>Connect</span>
            </h2>
          </div>
        </Reveal>
        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
          }}
        >
          <Reveal delay={100}>
            <div>
              {[
                {
                  icon: "📍",
                  label: "Address",
                  value:
                    "Plot No. XX, MIDC Ambad, Nashik, Maharashtra – 422010",
                },
                { icon: "📞", label: "Phone", value: "+91 XXXXX XXXXX" },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "info@ssenterprises.in",
                },
                {
                  icon: "🕐",
                  label: "Working Hours",
                  value: "Monday – Saturday  ·  9:00 AM – 6:00 PM",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "1.2rem",
                    alignItems: "flex-start",
                    marginBottom: "2rem",
                    paddingBottom: "2rem",
                    borderBottom:
                      i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      border: "1px solid rgba(201,168,76,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.62rem",
                        fontWeight: 600,
                        letterSpacing: 2.5,
                        textTransform: "uppercase",
                        color: "rgba(201,168,76,0.6)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {item.label}
                    </div>
                    <p
                      style={{
                        fontSize: "0.92rem",
                        color: "rgba(232,237,242,0.7)",
                        fontWeight: 300,
                        lineHeight: 1.6,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <input
                type="text"
                placeholder="Your Name"
                className="contact-input"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
              />
              <input
                type="email"
                placeholder="Email Address"
                className="contact-input"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
              />
              <textarea
                placeholder="Your Message"
                className="contact-input"
                value={formData.message}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, message: e.target.value }))
                }
                style={{ minHeight: 130, resize: "vertical" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginTop: "0.5rem",
                }}
              >
                <button type="submit" className="gold-btn">
                  Send Message
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="footer-pad"
        style={{
          padding: "4rem 6rem",
          background: "#05080F",
          borderTop: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#E8EDF2",
                marginBottom: "0.3rem",
                letterSpacing: 0.5,
              }}
            >
              S.S. <span style={{ color: "#C9A84C" }}>Enterprises</span>
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "rgba(232,237,242,0.3)",
                letterSpacing: 1,
              }}
            >
              C-2/6 MIDC Ambad, Nashik 422010 · ISO Certified
            </p>
          </div>
          <ul
            style={{
              display: "flex",
              gap: "2rem",
              listStyle: "none",
              flexWrap: "wrap",
            }}
          >
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <button
                  onClick={() => scrollTo(l.toLowerCase())}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(232,237,242,0.35)",
                    fontSize: "0.68rem",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.color = "#C9A84C";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.color = "rgba(232,237,242,0.35)";
                  }}
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>
          <p
            style={{
              fontSize: "0.7rem",
              color: "rgba(232,237,242,0.2)",
              letterSpacing: 0.5,
            }}
          >
            © 2025 S.S. Enterprises. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}