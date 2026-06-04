import React, { useState, useEffect, useRef } from "react";
import {
  QrCode,
  ShoppingCart,
  MessageCircle,
  LayoutDashboard,
  Wifi,
  Star,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  ChevronDown,
  Zap,
  Shield,
  Palette,
  TrendingUp,
  Users,
  Clock,
  Coffee,
  Utensils,
  Store,
  Settings,
} from "lucide-react";

/* ============================================================
   REUSABLE COMPONENTS
   ============================================================ */

// ── Android Phone Mockup ─────────────────────────────────
const PhoneMockup = ({ bgColor = "bg-stone-100", label = "Screenshot App", children }) => (
  <div className="flex items-center justify-center w-full">
    <div
      className="
        relative
        w-[220px] sm:w-[240px] md:w-[270px]
        aspect-[9/19]
        bg-[#1a1a1a]
        rounded-[1.25rem]
        overflow-hidden
        flex flex-col
      "
      style={{
        border: "6px solid #1a1a1a",
        boxShadow: "0 30px 80px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      {/* Status bar */}
      <div className="relative bg-[#1a1a1a] flex items-center justify-between px-3 pt-1 pb-0.5 z-10 shrink-0">
        {/* Punch-hole camera */}
        <div className="w-2.5 h-2.5 bg-[#0d0d0d] rounded-full border border-[#333] mx-auto" />
      </div>

      {/* Screen Content */}
      <div className={`flex-1 ${bgColor} flex flex-col items-center justify-center relative overflow-hidden`}>
        {children ? (
          children
        ) : (
          <div className="flex flex-col items-center gap-3 px-4">
            <div className="w-14 h-14 rounded-full bg-amber-200 flex items-center justify-center">
              <QrCode size={28} className="text-amber-800" />
            </div>
            <p className="text-[11px] text-amber-700 font-semibold text-center leading-tight">
              {label}
            </p>
          </div>
        )}
      </div>

      {/* Android gesture bar */}
      <div className="bg-[#1a1a1a] flex items-center justify-center py-1.5 shrink-0">
        <div className="w-14 h-[3px] bg-white/30 rounded-full" />
      </div>
    </div>
  </div>
);

// ── Section Badge ─────────────────────────────────────────────
const SectionBadge = ({ icon: Icon, text }) => (
  <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-semibold px-4 py-1.5 rounded-full border border-amber-200 mb-4">
    {Icon && <Icon size={13} />}
    {text}
  </span>
);

// ── Feature Check Item ────────────────────────────────────────
const CheckItem = ({ text }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 size={18} className="text-amber-600 mt-0.5 shrink-0" />
    <span className="text-stone-600 text-sm leading-relaxed">{text}</span>
  </li>
);

// ── Stat Card ─────────────────────────────────────────────────
const StatCard = ({ value, label, icon: Icon }) => (
  <div className="flex flex-col items-center text-center gap-1">
    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-1">
      <Icon size={18} className="text-amber-700" />
    </div>
    <span className="text-3xl font-black text-amber-900">{value}</span>
    <span className="text-xs text-stone-500 font-medium">{label}</span>
  </div>
);

// ── Testimonial Card ──────────────────────────────────────────
const TestimonialCard = ({ name, role, avatar, quote, rating = 5 }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300">
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
    <p className="text-stone-600 text-sm leading-relaxed italic">"{quote}"</p>
    <div className="flex items-center gap-3 mt-auto">
      <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold text-sm">
        {avatar}
      </div>
      <div>
        <p className="text-sm font-semibold text-stone-800">{name}</p>
        <p className="text-xs text-stone-500">{role}</p>
      </div>
    </div>
  </div>
);

// ── Pricing Card ──────────────────────────────────────────────
const PricingCard = ({ emoji, plan, price, tagline, description, features, cta, highlight = false }) => (
  <div
    className="relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
    style={highlight ? {
      /* Pro — Dark Elite */
      background: "linear-gradient(145deg, #1c0f05 0%, #3d1a06 45%, #1c0f05 100%)",
      boxShadow: "0 32px 80px rgba(120,53,15,0.5), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
      border: "1px solid rgba(217,119,6,0.35)",
    } : {
      /* Basic — Light Luxury */
      background: "linear-gradient(145deg, #fffdf7 0%, #fef9ed 50%, #fdf4e3 100%)",
      boxShadow: "0 20px 60px rgba(120,53,15,0.12), 0 4px 16px rgba(120,53,15,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
      border: "1px solid rgba(217,119,6,0.2)",
    }}
  >
    {/* Decorative orbs */}
    {highlight ? (
      /* Pro orbs — bright gold on dark */
      <>
        <div className="absolute -top-14 -right-14 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 65%)" }} />
        <div className="absolute top-1/2 -right-8 w-24 h-24 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 70%)" }} />
      </>
    ) : (
      /* Basic orbs — soft amber on cream */
      <>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 65%)" }} />
      </>
    )}

    {/* Top accent bar */}
    <div className="h-1 w-full shrink-0"
      style={highlight
        ? { background: "linear-gradient(90deg, #92400e, #f59e0b, #fbbf24, #f59e0b, #92400e)" }
        : { background: "linear-gradient(90deg, #fde68a, #f59e0b, #fbbf24, #f59e0b, #fde68a)" }
      }
    />

    <div className="relative z-10 p-8 flex flex-col gap-6">

      {/* Badge */}
      {highlight ? (
        <div className="self-start">
          <span className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-full tracking-wide"
            style={{ background: "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)", color: "#1c0f05", boxShadow: "0 4px 20px rgba(245,158,11,0.5)" }}>
            🚀 PALING POPULER
          </span>
        </div>
      ) : (
        <div className="self-start">
          <span className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-full tracking-wide"
            style={{ background: "linear-gradient(90deg, #fef3c7, #fde68a)", color: "#78350f", border: "1px solid rgba(217,119,6,0.3)", boxShadow: "0 2px 12px rgba(245,158,11,0.2)" }}>
            📱 MULAI DARI SINI
          </span>
        </div>
      )}

      {/* Plan header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
            style={highlight
              ? { background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.35)", boxShadow: "0 4px 16px rgba(245,158,11,0.2)" }
              : { background: "linear-gradient(135deg, #fef3c7, #fde68a)", border: "1px solid rgba(217,119,6,0.3)", boxShadow: "0 4px 12px rgba(217,119,6,0.15)" }
            }>
            {emoji}
          </span>
          <div>
            <p className={`text-[10px] font-black uppercase tracking-[0.18em] mb-1 ${highlight ? "text-amber-500" : "text-amber-600"}`}>
              Paket
            </p>
            <h3 className={`text-3xl font-black leading-none ${highlight ? "text-white" : "text-stone-800"}`}>
              {plan}
            </h3>
          </div>
        </div>

        <div className="mb-2">
          <span className={`text-[2.8rem] font-black leading-none tracking-tight ${highlight ? "text-white" : "text-amber-900"}`}>
            {price}
          </span>
        </div>
        <p className={`text-sm font-semibold leading-relaxed ${highlight ? "text-amber-300" : "text-amber-700"}`}>
          {tagline}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px"
        style={highlight
          ? { background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)" }
          : { background: "linear-gradient(90deg, transparent, rgba(217,119,6,0.25), transparent)" }
        }
      />

      {/* Description */}
      <p className={`text-sm leading-relaxed ${highlight ? "text-amber-100/80" : "text-stone-600"}`}>
        {description}
      </p>

      {/* Features */}
      <div>
        <p className={`text-[10px] font-black uppercase tracking-[0.18em] mb-4 ${highlight ? "text-amber-400" : "text-amber-700"}`}>
          Yang didapat:
        </p>
        <ul className="flex flex-col gap-3">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={highlight
                  ? { background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.4)" }
                  : { background: "linear-gradient(135deg, #fef3c7, #fde68a)", border: "1px solid rgba(217,119,6,0.35)", boxShadow: "0 2px 6px rgba(217,119,6,0.15)" }
                }>
                <CheckCircle2 size={11} className={highlight ? "text-amber-400" : "text-amber-700"} />
              </span>
              <span className={`text-sm leading-snug ${highlight ? "text-amber-100" : "text-stone-700"}`}>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <a
        href={`https://wa.me/6282258724734?text=Halo%20Resavie%20Labs!%20Saya%20tertarik%20dengan%20paket%20${encodeURIComponent(plan)}%20untuk%20cafe%20saya.%20Boleh%20konsultasi%3F`}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-2 w-full py-4 rounded-2xl font-black text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:opacity-90"
        style={highlight ? {
          background: "linear-gradient(135deg, #d97706, #f59e0b, #fbbf24)",
          color: "#1c0f05",
          boxShadow: "0 10px 36px rgba(245,158,11,0.5), 0 2px 8px rgba(0,0,0,0.2)",
        } : {
          background: "linear-gradient(135deg, #92400e, #b45309, #78350f)",
          color: "#fef3c7",
          boxShadow: "0 10px 32px rgba(120,53,15,0.35), 0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {cta}
        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
      </a>

    </div>
  </div>
);

/* ============================================================
   SECTION COMPONENTS
   ============================================================ */

// ── Navbar ────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Fitur" },
    { href: "#how-it-works", label: "Cara Kerja" },
    { href: "#pricing", label: "Harga" },
    { href: "#testimonials", label: "Testimoni" },
    { href: "#contact", label: "Kontak" },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/95 bg-glass shadow-md border-b border-stone-100"
          : "bg-transparent"
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-amber-900 rounded-lg flex items-center justify-center">
            <QrCode size={16} className="text-amber-100" />
          </div>
          <span className="font-black text-stone-800 text-lg tracking-tight">
            Resavie<span className="text-amber-600">Labs</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-amber-800 transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-amber-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-amber-800 transition-all duration-200 shadow-md hover:shadow-amber-200/50 hover:shadow-lg"
        >
          Mulai Sekarang
          <ArrowRight size={14} />
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden bg-white border-t border-stone-100 shadow-lg
          overflow-hidden transition-all duration-300
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <ul className="flex flex-col px-4 py-3 gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2.5 px-3 text-sm font-medium text-stone-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2 pb-1">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-amber-900 text-white text-sm font-semibold py-3 rounded-xl hover:bg-amber-800 transition-colors"
            >
              Mulai Sekarang
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// ── Hero Section ──────────────────────────────────────────────
const HeroSection = () => (
  <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-50 flex items-center overflow-hidden pt-16">
    {/* Background Decorative Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-stone-100/80 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-amber-50 rounded-full blur-2xl" />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #78350f 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>

    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
      {/* Text Content */}
      <div className="flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold px-4 py-2 rounded-full mb-6">
          <Zap size={12} className="fill-amber-600 text-amber-600" />
          Solusi Digital #1 untuk F&B Indonesia
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-800 leading-tight mb-5">
          Revolusi{" "}
          <span className="relative">
            <span className="text-amber-700">Layanan Cafe</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10C80 2 200 2 298 10"
                stroke="#d97706"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          Anda dengan{" "}
          <span className="text-amber-600">QR Menu Digital</span>
        </h1>

        {/* Subheadline */}
        <p className="text-stone-600 text-lg leading-relaxed mb-4">
          Hadirkan pengalaman memesan yang <strong className="text-amber-800">modern, cepat, dan berkesan</strong> untuk setiap pelanggan Anda — tanpa buku menu fisik yang lusuh dan ribet!
        </p>

        {/* USP Highlight */}
        <div className="bg-amber-900/5 border border-amber-200/60 rounded-2xl p-4 mb-7 text-left">
          <div className="flex items-start gap-3">
            <Palette size={20} className="text-amber-600 mt-0.5 shrink-0" />
            <p className="text-stone-700 text-sm leading-relaxed">
              <strong className="text-amber-900">Sepenuhnya Custom & Fleksibel!</strong>{" "}
              Logo, warna, dan identitas brand Cafe/Restoran Anda bisa disesuaikan penuh — sehingga tampilan menu terasa benar-benar milik Anda, bukan template biasa.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2.5 bg-amber-900 text-white font-bold px-7 py-4 rounded-2xl hover:bg-amber-800 transition-all duration-200 shadow-xl hover:shadow-amber-900/30 text-base group"
          >
            Coba Gratis Sekarang
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 border-2 border-amber-200 text-amber-900 font-semibold px-7 py-4 rounded-2xl hover:bg-amber-50 hover:border-amber-300 transition-all duration-200 text-base"
          >
            Lihat Demo
            <ChevronDown size={16} />
          </a>
        </div>

        {/* Social Proof Mini */}
        <div className="flex items-center gap-4 mt-7 justify-center lg:justify-start">
          <div className="flex -space-x-2">
            {["A", "R", "S", "V"].map((l, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-xs font-bold text-amber-800"
              >
                {l}
              </div>
            ))}
          </div>
          <p className="text-sm text-stone-500">
            Dipercaya <strong className="text-stone-700">50+ Cafe & UMKM</strong> di Indonesia
          </p>
        </div>
      </div>

      {/* Hero Visual */}
      <div className="flex-1 flex items-center justify-center lg:justify-end relative w-full max-w-sm lg:max-w-md">
        {/* Background glow */}
        <div className="absolute inset-0 bg-amber-200/30 rounded-full blur-3xl scale-75" />

        {/* Floating Cards */}
        <div
          className="absolute -top-4 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2.5 border border-stone-100 z-10"
          style={{ animation: "float 3.5s ease-in-out infinite" }}
        >
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <MessageCircle size={14} className="text-green-600" />
          </div>
          <div>
            <p className="text-[10px] text-stone-500">Pesanan Masuk!</p>
            <p className="text-xs font-semibold text-stone-800">via WhatsApp ✓</p>
          </div>
        </div>

        <div
          className="absolute -bottom-2 -right-4 sm:-right-6 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2.5 border border-stone-100 z-10"
          style={{ animation: "float 4s ease-in-out infinite 0.5s" }}
        >
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <TrendingUp size={14} className="text-amber-700" />
          </div>
          <div>
            <p className="text-[10px] text-stone-500">Omset Meningkat</p>
            <p className="text-xs font-semibold text-stone-800">+35% rata-rata</p>
          </div>
        </div>

        {/* Main Phone */}
        <div className="animate-float relative z-0">
          <PhoneMockup bgColor="bg-stone-100">
            <img src="/cust-dashboard.png" alt="Tampilan E-Menu Customer" className="w-full h-full object-cover object-top" />
          </PhoneMockup>
        </div>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
      <span className="text-xs text-stone-400">Scroll ke bawah</span>
      <ChevronDown size={16} className="text-stone-400" />
    </div>
  </section>
);

// ── Stats Section ─────────────────────────────────────────────
const StatsSection = () => (
  <section className="bg-amber-900 py-14">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {[
          { value: "50+", label: "Cafe & UMKM Aktif", icon: Store },
          { value: "5000+", label: "Transaksi Berhasil", icon: ShoppingCart },
          { value: "99%", label: "Uptime Layanan", icon: Shield },
          { value: "< 3 dtk", label: "Waktu Load Menu", icon: Zap },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-1">
            <stat.icon size={20} className="text-amber-300 mb-1" />
            <span className="text-3xl sm:text-4xl font-black text-white">{stat.value}</span>
            <span className="text-xs text-amber-300 font-medium leading-tight text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── How It Works / Customer Flow Section ──────────────────────
const HowItWorksSection = () => {
  const customerScreens = [
    { img: "/qr.png",           label: "Scan QR Code",      desc: "Arahkan kamera ke QR di meja — no install app" },
    { img: "/cust-dashboard.png", label: "Browse E-Menu",    desc: "Semua menu tampil cantik dengan foto & harga" },
    { img: "/checkout.png",     label: "Pilih & Checkout",  desc: "Keranjang pintar, isi nama/nomor meja" },
    { img: "/form-whatsapp.png",label: "Pesan via WhatsApp",desc: "Pesanan terkirim otomatis ke kasir" },
  ];

  return (
    <section id="how-it-works" className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <SectionBadge icon={Users} text="Alur Pelanggan" />
          <h2 className="text-3xl sm:text-4xl font-black text-stone-800 mb-4">
            Pengalaman Memesan yang{" "}
            <span className="text-amber-700">Benar-Benar Mulus</span>
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto leading-relaxed">
            Dari pelanggan datang hingga pesanan masuk ke kasir — semua terjadi dalam hitungan menit, tanpa hambatan, tanpa kebingungan.
          </p>
        </div>

        {/* 4-Step Customer Flow — 2-col grid on mobile, horizontal row on md+ */}
        <div className="grid grid-cols-2 md:flex md:flex-row md:items-start md:justify-center gap-6 md:gap-10 mb-14">
          {customerScreens.map((screen, i) => (
            <div key={i} className="flex md:items-start">
              <div className="flex flex-col items-center gap-3 w-full">
                {/* Step number */}
                <div className="w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-black">{i + 1}</span>
                </div>
                {/* Android Mini Phone Mockup */}
                <div
                  className="relative overflow-hidden flex flex-col"
                  style={{
                    width: "110px",
                    aspectRatio: "9/19",
                    background: "#1a1a1a",
                    border: "5px solid #1a1a1a",
                    borderRadius: "1.1rem",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 6px 20px rgba(0,0,0,0.25)",
                  }}
                >
                  {/* Status bar */}
                  <div className="bg-[#1a1a1a] flex items-center justify-center px-2 pt-0.5 pb-0 z-10 shrink-0">
                    <div className="w-2 h-2 bg-[#0d0d0d] rounded-full border border-[#444]" />
                  </div>
                  {/* Screen */}
                  <div className="flex-1 overflow-hidden">
                    <img
                      src={screen.img}
                      alt={screen.label}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Gesture bar */}
                  <div className="bg-[#1a1a1a] flex items-center justify-center py-1 shrink-0">
                    <div className="w-10 h-[2px] bg-white/25 rounded-full" />
                  </div>
                </div>
                {/* Label */}
                <div className="text-center" style={{ maxWidth: "130px" }}>
                  <p className="text-sm font-bold text-stone-800 leading-tight">{screen.label}</p>
                  <p className="text-xs text-stone-500 leading-tight mt-0.5">{screen.desc}</p>
                </div>
              </div>
              {/* Arrow only visible on md+ */}
              {i < customerScreens.length - 1 && (
                <ArrowRight size={22} className="text-amber-400 shrink-0 mt-14 hidden md:block" />
              )}
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8">
          <h3 className="text-lg font-black text-amber-900 mb-5 text-center">Kenapa Pelanggan Suka?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Tidak perlu install aplikasi — langsung buka di browser",
              "Menu tampil cepat (\u003c 3 detik) dengan foto produk yang menggoda",
              "Desain menu bisa disesuaikan warna & logo brand Anda",
              "Pelanggan bisa filter menu per kategori (Kopi, Makanan, dll)",
              "Pesanan terkirim otomatis ke WhatsApp kasir dalam format rapi",
              "Zero error — tidak ada salah input atau pesanan hilang",
            ].map((h, i) => (
              <CheckItem key={i} text={h} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Admin Features Section ────────────────────────────────────
const AdminFeaturesSection = () => {
  const features = [
    {
      id: 2,
      badge: "Keamanan Akses Admin",
      badgeIcon: Shield,
      title: "Login Admin yang Aman & Eksklusif",
      subtitle: "Hanya Anda yang bisa masuk — tidak ada celah untuk pihak lain",
      description:
        "Setiap dashboard admin dilindungi dengan sistem autentikasi yang kuat. Hanya akun yang terdaftar yang dapat mengakses panel manajemen cafe Anda — sehingga data menu, pengaturan, dan informasi bisnis Anda terlindungi sepenuhnya dari akses tidak sah.",
      highlights: [
        "Halaman login khusus dengan autentikasi aman",
        "Sesi admin terenkripsi — tidak bisa diakses sembarangan",
        "Logout otomatis untuk mencegah akses tidak sah",
        "Credential unik per cafe — tidak ada akun yang dibagikan",
        "Tampilan login branded sesuai identitas Resavie Labs",
      ],
      mockupContent: (
        <img src="/loading-admin.jpeg" alt="Login Admin" className="w-full h-full object-cover object-top" />
      ),
      imageOnLeft: true,
    },
    {
      id: 3,
      badge: "Untuk Pemilik & Admin",
      badgeIcon: LayoutDashboard,
      title: "Dashboard Admin yang Powerful",
      subtitle: "Kelola seluruh bisnis F&B Anda dari genggaman tangan",
      description:
        "Panel admin yang dirancang khusus untuk kemudahan non-teknis. Siapapun di tim Anda bisa menggunakannya — bahkan tanpa latar belakang IT sekalipun. Perbarui menu, ubah harga, atau nonaktifkan item yang habis dalam hitungan detik.",
      highlights: [
        "Login aman dengan autentikasi admin — hanya Anda yang bisa akses",
        "CRUD Menu lengkap: Tambah, Edit, Hapus item dengan mudah",
        "Toggle ketersediaan item — tandai 'Habis' tanpa hapus menu",
        "Upload foto menu langsung dari HP atau komputer",
        "Kelola info cafe: Nama, Alamat, dan Nomor WA Kasir",
        "Atur kategori menu sesuai kebutuhan bisnis Anda",
      ],
      mockupContent: (
        <img src="/crud-admin.png" alt="Admin CRUD Menu" className="w-full h-full object-cover object-top" />
      ),
      imageOnLeft: false,
    },
    {
      id: 4,
      badge: "Fitur Ekstra Eksklusif",
      badgeIcon: Wifi,
      title: "Info Wi-Fi Cerdas untuk Pelanggan",
      subtitle: "Tingkatkan kenyamanan pelanggan, tingkatkan lama kunjungan",
      description:
        "Tahukah Anda? Pelanggan yang tahu password Wi-Fi cenderung 40% lebih lama berada di cafe Anda — dan peluang memesan ulang pun meningkat. Fitur ini menampilkan nama dan password Wi-Fi secara otomatis di tampilan menu pelanggan, langsung dan tanpa kerumitan.",
      highlights: [
        "Popup Info Wi-Fi muncul otomatis saat pelanggan buka menu",
        "Nama & Password Wi-Fi bisa diubah kapan saja dari panel admin",
        "Tombol 'Salin Password' satu ketuk — langsung tersalin di clipboard",
        "Desain popup yang elegant, tidak mengganggu pengalaman browsing menu",
        "Bisa dinonaktifkan jika cafe tidak menyediakan Wi-Fi gratis",
      ],
      mockupContent: (
        <img src="/info-wifi.png" alt="Info WiFi Pelanggan" className="w-full h-full object-cover object-top" />
      ),
      imageOnLeft: false,
    },
    {
      id: 5,
      badge: "Pengaturan Cafe",
      badgeIcon: Settings,
      title: "Pengaturan Cafe yang Fleksibel",
      subtitle: "Ubah info cafe, Wi-Fi, dan konten kapan saja tanpa bantuan teknisi",
      description:
        "Semua informasi penting cafe Anda — nama, alamat, nomor WhatsApp kasir, tagline, hingga password Wi-Fi — bisa diperbarui langsung dari panel pengaturan yang sederhana. Tidak perlu repot menghubungi developer setiap kali ada perubahan.",
      highlights: [
        "Ubah nama, alamat, dan nomor WhatsApp kasir kapan saja",
        "Kelola info Wi-Fi: Nama & Password bisa diperbarui real-time",
        "Atur tagline dan konten banner tampilan menu pelanggan",
        "Toggle aktif/nonaktif fitur Wi-Fi Info sesuai kebutuhan",
        "Perubahan langsung berlaku — tanpa reload atau deploy ulang",
      ],
      mockupContent: (
        <img src="/pengaturan.png" alt="Pengaturan Cafe" className="w-full h-full object-cover object-top" />
      ),
      imageOnLeft: true,
    },
  ];

  return (
    <section id="features" className="bg-stone-50/80 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionBadge icon={LayoutDashboard} text="Fitur Admin" />
          <h2 className="text-3xl sm:text-4xl font-black text-stone-800 mb-4">
            Semua Kendali Ada di{" "}
            <span className="text-amber-700">Tangan Anda</span>
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto leading-relaxed">
            Panel admin yang intuitif dirancang agar siapa pun di tim Anda bisa mengelola menu dan pengaturan cafe — tanpa perlu jago teknologi.
          </p>
        </div>

        {/* Zig-Zag Rows */}
        <div className="flex flex-col gap-20 md:gap-28">
          {features.map((feat) => (
            <div
              key={feat.id}
              className={`
                flex flex-col gap-10 md:gap-16 items-center
                ${feat.imageOnLeft ? "md:flex-row" : "md:flex-row-reverse"}
              `}
            >
              {/* Phone Mockup — always on top on mobile */}
              <div className="w-full md:flex-1 flex items-center justify-center order-first md:order-none">
                <div className="relative">
                  <div className="absolute inset-0 -m-4 bg-amber-100/40 rounded-full blur-2xl" />
                  <PhoneMockup bgColor="bg-stone-100">
                    {feat.mockupContent}
                  </PhoneMockup>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="text-white font-black text-sm">{feat.id}</span>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full md:flex-1">
                <SectionBadge icon={feat.badgeIcon} text={feat.badge} />
                <h3 className="text-2xl sm:text-3xl font-black text-stone-800 mb-2 leading-tight">
                  {feat.title}
                </h3>
                <p className="text-amber-700 font-semibold text-sm mb-4">{feat.subtitle}</p>
                <p className="text-stone-600 leading-relaxed mb-6 text-base">{feat.description}</p>
                <ul className="flex flex-col gap-2.5">
                  {feat.highlights.map((h, i) => (
                    <CheckItem key={i} text={h} />
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Feature Grid Section ──────────────────────────────────────
const FeatureGridSection = () => {
  const features = [
    {
      icon: Palette,
      title: "Fully Customizable Brand",
      desc: "Logo, warna tema, nama cafe — semua bisa disesuaikan 100% sesuai identitas brand Anda.",
    },
    {
      icon: QrCode,
      title: "QR Code Unik per Meja",
      desc: "Setiap meja mendapatkan QR Code unik. Mudah dicetak, mudah dipasang, mudah di-scan.",
    },
    {
      icon: MessageCircle,
      title: "Integrasi WhatsApp Instan",
      desc: "Pesanan terkirim otomatis ke WhatsApp kasir dalam format rapi tanpa aplikasi tambahan.",
    },
    {
      icon: Wifi,
      title: "Info Wi-Fi Otomatis",
      desc: "Tampilkan password Wi-Fi langsung di menu pelanggan — fitur yang customer paling suka!",
    },
    {
      icon: Shield,
      title: "Aman & Terpercaya",
      desc: "Sistem login admin yang aman. Data menu dan informasi cafe Anda terlindungi sepenuhnya.",
    },
    {
      icon: Zap,
      title: "Performa Super Cepat",
      desc: "Menu terbuka dalam < 3 detik bahkan di jaringan lemah sekalipun. Pelanggan tidak perlu menunggu.",
    },
    {
      icon: Clock,
      title: "Update Real-Time",
      desc: "Ubah harga atau nonaktifkan menu yang habis — perubahan langsung terlihat oleh pelanggan.",
    },
    {
      icon: TrendingUp,
      title: "Tingkatkan Omset",
      desc: "Foto menu yang menarik + UX yang mudah = pelanggan lebih banyak pesan. Terbukti meningkatkan rata-rata transaksi.",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <SectionBadge icon={Zap} text="Semua Fitur" />
          <h2 className="text-3xl sm:text-4xl font-black text-stone-800 mb-4">
            Satu Aplikasi,{" "}
            <span className="text-amber-700">Segalanya Lengkap</span>
          </h2>
          <p className="text-stone-500 max-w-lg mx-auto">
            Dirancang khusus untuk kebutuhan nyata cafe dan restoran Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat, i) => (
            <div
              key={i}
              className="group bg-stone-50 hover:bg-amber-50 border border-stone-100 hover:border-amber-200 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
            >
              <div className="w-10 h-10 bg-amber-100 group-hover:bg-amber-200 rounded-xl flex items-center justify-center transition-colors duration-200">
                <feat.icon size={18} className="text-amber-700" />
              </div>
              <h4 className="font-bold text-stone-800 text-sm leading-tight">{feat.title}</h4>
              <p className="text-stone-500 text-xs leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Pricing Section ───────────────────────────────────────────
const PricingSection = () => (
  <section id="pricing" className="bg-stone-50 py-20 md:py-28">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-14">
        <SectionBadge icon={TrendingUp} text="Harga Terjangkau" />
        <h2 className="text-3xl sm:text-4xl font-black text-stone-800 mb-4">
          Investasi Kecil,{" "}
          <span className="text-amber-700">Hasil Berlipat Ganda</span>
        </h2>
        <p className="text-stone-600 max-w-xl mx-auto leading-relaxed">
          Dua paket yang dirancang sesuai skala bisnis Anda — mulai dari yang simpel hingga yang butuh sistem pesanan lebih rapi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <PricingCard
          emoji="📱"
          plan="Basic"
          price="Rp 800.000"
          tagline="Menu digital simpel, order langsung ke WhatsApp"
          description="Cocok buat cafe yang mau tampil modern tanpa ribet. Customer cukup scan QR, pilih menu, dan pesanan langsung masuk ke WhatsApp kasir. Tidak perlu download aplikasi, tidak perlu training panjang."
          features={[
            "Menu digital berbasis web (scan QR langsung buka)",
            "Tampilan elegan sesuai brand cafe",
            "Order via WhatsApp",
            "Info WiFi cafe",
            "Aplikasi admin Android untuk kelola menu & pengaturan",
            "Gratis revisi nama, logo, dan warna tema",
          ]}
          cta="Pesan Paket Basic"
        />
        <PricingCard
          emoji="🚀"
          plan="Pro"
          price="Rp 1.500.000"
          tagline="Semua fitur Basic, plus dashboard pesanan realtime & laporan transaksi"
          description="Buat cafe yang lebih sibuk dan butuh alur pesanan yang lebih rapi. Kasir cukup buka aplikasi di HP — pesanan masuk otomatis, tinggal update status tanpa perlu balas WhatsApp satu per satu."
          features={[
            "Semua fitur Basic",
            "Aplikasi kasir Android — pesanan masuk realtime ke HP kasir",
            "Notifikasi pesanan baru langsung muncul",
            "Status pesanan: Diterima → Sedang Dibuat → Siap",
            "Laporan transaksi harian, mingguan & bulanan",
            "Total pendapatan & menu terlaris",
            "Gratis revisi nama, logo, dan warna tema",
          ]}
          cta="Pesan Paket Pro"
          highlight={true}
        />
      </div>

      <p className="text-center text-xs text-stone-400 mt-8">
        💬 Harga sudah termasuk setup & onboarding — konsultasi gratis sebelum memutuskan!
      </p>
    </div>
  </section>
);

// ── Testimonials Section ──────────────────────────────────────
const TestimonialsSection = () => (
  <section id="testimonials" className="bg-white py-20 md:py-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <SectionBadge icon={Star} text="Testimoni Nyata" />
        <h2 className="text-3xl sm:text-4xl font-black text-stone-800 mb-4">
          Kata Mereka yang Sudah{" "}
          <span className="text-amber-700">Merasakan Bedanya</span>
        </h2>
        <p className="text-stone-500 max-w-lg mx-auto">
          Bukan sekadar klaim — ini adalah cerita nyata dari pemilik cafe dan restoran yang sudah mempercayakan menu digitalnya ke Resavie Labs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <TestimonialCard
          name="Arif Rahman"
          role="Owner, Ar'seven Coffee Corner"
          avatar="AR"
          quote="Awalnya ragu, tapi setelah pakai QR Menu dari Resavie Labs, pelanggan makin betah! Yang paling suka adalah fitur info Wi-Fi — langsung bisa salin password, simple banget."
          rating={5}
        />
        <TestimonialCard
          name="Siti Nurhaliza"
          role="Manager, Kopi Kenangan Cianjur"
          avatar="SN"
          quote="Pesanan via WhatsApp terformat sangat rapi. Staff kami gak bingung lagi baca pesanan, dan salah tulis sudah tidak pernah terjadi sejak pakai ini. Worth it banget!"
          rating={5}
        />
        <TestimonialCard
          name="Budi Santoso"
          role="Owner, Warung Makan Pak Budi"
          avatar="BS"
          quote="Saya kira ribet, ternyata gampang banget! Ganti menu tinggal buka admin panel, upload foto, selesai. Pelanggan senang, saya pun senang karena omset naik lumayan."
          rating={5}
        />
        <TestimonialCard
          name="Dewi Lestari"
          role="Owner, Cafe Rempah & Kopi"
          avatar="DL"
          quote="Desainnya bisa disesuaikan warna brand cafe kami, jadi terasa profesional banget. Banyak pelanggan baru yang compliment tentang menu digital kami!"
          rating={5}
        />
        <TestimonialCard
          name="Hendra Gunawan"
          role="Co-Owner, Restoran Sunda Asli"
          avatar="HG"
          quote="Kami punya 3 meja untuk tamu VIP yang masing-masing punya QR berbeda. Pengelolaan jadi lebih mudah dan terstruktur. Tim Resavie Labs juga sangat responsif!"
          rating={5}
        />
        <TestimonialCard
          name="Rina Susanti"
          role="Owner, Es Kopi Susu Rina"
          avatar="RS"
          quote="Harga yang ditawarkan sangat masuk akal untuk fitur selengkap ini. Dalam sebulan pertama, rata-rata nilai transaksi pelanggan sudah naik. Rekomendasi banget!"
          rating={5}
        />
      </div>
    </div>
  </section>
);

// ── CTA Banner Section ────────────────────────────────────────
const CTABannerSection = () => (
  <section className="bg-amber-900 py-16 md:py-20 relative overflow-hidden">
    {/* Decorative */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-800/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-950/50 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, #fef3c7 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
    />

    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <div className="inline-flex items-center gap-2 bg-amber-800/60 border border-amber-700 text-amber-200 text-xs font-semibold px-4 py-2 rounded-full mb-6">
        <Coffee size={12} />
        Waktunya Upgrade Cafe Anda!
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
        Jangan Biarkan Pesaing Anda{" "}
        <span className="text-amber-300">Selangkah Lebih Maju</span>
      </h2>
      <p className="text-amber-200 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
        Setiap hari yang Anda tunda adalah peluang untuk memberikan pengalaman terbaik kepada pelanggan yang hilang. Mulai transformasi digital cafe Anda hari ini — konsultasi pertama{" "}
        <strong className="text-white">GRATIS</strong>, tanpa tekanan!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2.5 bg-white text-amber-900 font-black px-8 py-4 rounded-2xl hover:bg-amber-50 transition-all duration-200 shadow-xl text-base group"
        >
          Konsultasi Gratis via WhatsApp
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="#how-it-works"
          className="inline-flex items-center justify-center gap-2 border-2 border-amber-600 text-amber-200 font-semibold px-8 py-4 rounded-2xl hover:border-amber-400 hover:text-white transition-all duration-200 text-base"
        >
          Lihat Demo Dulu
        </a>
      </div>
    </div>
  </section>
);

// ── Contact Section ───────────────────────────────────────────
const ContactSection = () => (
  <section id="contact" className="bg-white py-20 md:py-24">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <SectionBadge icon={Phone} text="Hubungi Kami" />
        <h2 className="text-3xl sm:text-4xl font-black text-stone-800 mb-4">
          Siap Memulai? Kami{" "}
          <span className="text-amber-700">Siap Membantu Anda!</span>
        </h2>
        <p className="text-stone-500 max-w-lg mx-auto">
          Tim Resavie Labs siap mendampingi Anda dari konsultasi hingga aplikasi live di cafe Anda. Hubungi kami sekarang!
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Contact Info */}
        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 flex flex-col gap-6">
          <h3 className="font-bold text-stone-800 text-lg">Informasi Kontak</h3>
          <div className="flex flex-col gap-4">
            {[
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: "+62 822-5872-4734",
                sublabel: "Respon cepat, biasanya < 1 jam",
                color: "bg-green-100 text-green-700",
                href: "https://wa.me/6282258724734?text=Halo%20Resavie%20Labs!%20Saya%20tertarik%20dengan%20QR%20Menu%20Digital%20untuk%20cafe%20saya.%20Boleh%20konsultasi?",
              },
              {
                icon: Mail,
                label: "Email",
                value: "resavielabs@gmail.com",
                sublabel: "Untuk pertanyaan detail & proposal",
                color: "bg-blue-100 text-blue-700",
                href: "mailto:resavielabs@gmail.com",
              },
            ].map((contact, i) => (
              <a
                key={i}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group p-4 rounded-xl hover:bg-white hover:shadow-md border border-transparent hover:border-stone-200 transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${contact.color}`}>
                  <contact.icon size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">{contact.label}</p>
                  <p className="text-sm font-bold text-stone-800 mt-0.5 group-hover:text-amber-700 transition-colors">{contact.value}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{contact.sublabel}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Konsultasi CTA */}
        <div
          className="bg-amber-900 rounded-2xl p-8 text-white flex flex-col gap-5"
          style={{ boxShadow: "0 20px 60px rgba(120,53,15,0.3)" }}
        >
          <div>
            <h4 className="font-black text-2xl mb-2">☕ Konsultasi Gratis</h4>
            <p className="text-amber-200 text-sm leading-relaxed">
              Ceritakan kebutuhan cafe Anda kepada kami. Kami bantu pilihkan solusi terbaik sesuai budget — tanpa pressure, tanpa biaya konsultasi!
            </p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {[
              "Gratis setup & onboarding awal",
              "Respons cepat — biasanya dalam 1 jam",
              "Tidak ada kontrak jangka panjang",
              "Revisi nama, logo & warna brand gratis",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-amber-100">
                <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/6282258724734?text=Halo%20Resavie%20Labs!%20Saya%20tertarik%20dengan%20QR%20Menu%20Digital%20untuk%20cafe%20saya.%20Boleh%20konsultasi?"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-2 bg-white text-amber-900 font-black text-sm px-6 py-4 rounded-xl hover:bg-amber-50 transition-colors group w-full"
            style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
          >
            <MessageCircle size={18} />
            Chat via WhatsApp Sekarang
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs text-amber-300/70 text-center">
            🔒 Privasi Anda terjaga — tidak ada spam, tidak ada tekanan
          </p>
        </div>
      </div>
    </div>
  </section>
);


// ── Footer ────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-amber-950 text-amber-200">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-amber-700 rounded-xl flex items-center justify-center">
              <QrCode size={18} className="text-amber-100" />
            </div>
            <span className="font-black text-white text-xl tracking-tight">
              Resavie<span className="text-amber-400">Labs</span>
            </span>
          </div>
          <p className="text-amber-300/80 text-sm leading-relaxed max-w-xs">
            Solusi QR Menu Digital terpercaya untuk Cafe, Restoran, dan UMKM F&B di Indonesia. Kami hadir untuk membantu bisnis kuliner Anda tumbuh di era digital.
          </p>
          <div className="flex items-center gap-3 mt-1">
            {[
              { icon: MessageCircle, href: "#", label: "WhatsApp" },
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Mail, href: "#", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-amber-800/50 hover:bg-amber-700 flex items-center justify-center transition-colors duration-200"
              >
                <Icon size={16} className="text-amber-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wide">Navigasi</h4>
          <ul className="flex flex-col gap-2.5">
            {[
              { href: "#how-it-works", label: "Cara Kerja" },
              { href: "#features", label: "Fitur Admin" },
              { href: "#pricing", label: "Harga" },
              { href: "#testimonials", label: "Testimoni" },
              { href: "#contact", label: "Kontak" },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-amber-300/80 hover:text-amber-200 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wide">Kontak</h4>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2">
              <MessageCircle size={14} className="text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-amber-200/90 font-medium">WhatsApp</p>
                <a href="https://wa.me/6282258724734" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 hover:text-amber-300 transition-colors">+62 822-5872-4734</a>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={14} className="text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-amber-200/90 font-medium">Email</p>
                <a href="mailto:resavielabs@gmail.com" className="text-xs text-amber-400 hover:text-amber-300 transition-colors">resavielabs@gmail.com</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-amber-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-amber-500 text-center sm:text-left">
          © {new Date().getFullYear()} <strong className="text-amber-400">Resavie Labs</strong>. Semua hak dilindungi.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-xs text-amber-500 hover:text-amber-300 transition-colors">
            Kebijakan Privasi
          </a>
          <span className="text-amber-700">•</span>
          <a href="#" className="text-xs text-amber-500 hover:text-amber-300 transition-colors">
            Syarat & Ketentuan
          </a>
        </div>
      </div>
    </div>
  </footer>
);

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <AdminFeaturesSection />
        <FeatureGridSection />
        <PricingSection />
        <TestimonialsSection />
        <CTABannerSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6282258724734?text=Halo%20Resavie%20Labs!%20Saya%20tertarik%20dengan%20QR%20Menu%20Digital."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-110 group"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle size={24} className="text-white" />
        {/* Tooltip */}
        <span className="absolute right-16 bg-white text-stone-700 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-stone-100">
          Chat via WhatsApp!
        </span>
      </a>

      {/* Keyframe animation injected for float */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
