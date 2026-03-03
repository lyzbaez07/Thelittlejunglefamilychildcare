import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, MapPin, ChevronLeft, ChevronRight, Menu, X, GraduationCap, Palette, Sprout, Heart, Shield, Home as HomeIcon, Star, Clock, CheckCircle } from "lucide-react";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  numberOfChildren: z.string().min(1, "Please specify number of children"),
  ages: z.string().min(1, "Please select age group"),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const heroSlides = [
  { image: "/images/hero1.png", title: "Join Our Jungle Family", subtitle: "Where every child's adventure begins", cta: "Apply Today" },
  { image: "/images/hero2.png", title: "The Perfect Place For Growth", subtitle: "Nurturing creativity through nature and play", cta: "Schedule A Tour" },
  { image: "/images/hero3.png", title: "A Jungle of Learning & Fun", subtitle: "Explore, discover, and grow together", cta: "Apply Now" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Tuition", href: "#tuition" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-[#1a2e1a]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          <a href="#" className="flex items-center gap-3" data-testid="link-home">
            <img src="/images/logo.png" alt="The Little Jungle" className="h-14 w-14 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className={`font-bold text-lg leading-tight ${scrolled ? "text-[#1b5e20] dark:text-emerald-400" : "text-white"}`}>
                The Little Jungle
              </span>
              <span className={`text-xs leading-tight ${scrolled ? "text-[#4a7c59] dark:text-emerald-300" : "text-white/80"}`}>
                Family Child Care
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-[#2e5032] dark:text-emerald-300"
                    : "text-white/90"
                }`}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact">
              <Button size="sm" className="bg-[#f9a825] text-[#1b3a1b] font-semibold border-[#e8971f]" data-testid="button-apply-nav">
                Apply Today
              </Button>
            </a>
            <a
              href="tel:8578006951"
              className={`text-sm font-medium ${scrolled ? "text-[#2e5032] dark:text-emerald-300" : "text-white/90"}`}
              data-testid="link-phone-nav"
            >
              (857) 800-6951
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? (
              <X className={scrolled ? "text-[#1b5e20]" : "text-white"} size={24} />
            ) : (
              <Menu className={scrolled ? "text-[#1b5e20]" : "text-white"} size={24} />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-[#1a2e1a] border-t border-[#e0e8e0] dark:border-emerald-900 shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#2e5032] dark:text-emerald-300 font-medium py-2"
                onClick={() => setMobileOpen(false)}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-[#f9a825] text-[#1b3a1b] font-semibold border-[#e8971f]" data-testid="button-apply-mobile">
                Apply Today
              </Button>
            </a>
            <a href="tel:8578006951" className="text-[#2e5032] dark:text-emerald-300 font-medium py-2" data-testid="link-phone-mobile">
              (857) 800-6951
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setCurrent((c) => (c + 1) % heroSlides.length);

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[750px]" data-testid="hero-slider">
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4 max-w-3xl">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg"
            data-testid="text-hero-title"
          >
            {heroSlides[current].title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow" data-testid="text-hero-subtitle">
            {heroSlides[current].subtitle}
          </p>
          <a href="#contact">
            <Button
              size="lg"
              className="bg-[#f9a825] text-[#1b3a1b] font-bold border-[#e8971f]"
              data-testid="button-hero-cta"
            >
              {heroSlides[current].cta}
            </Button>
          </a>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white"
        aria-label="Previous slide"
        data-testid="button-hero-prev"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white"
        aria-label="Next slide"
        data-testid="button-hero-next"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-[#f9a825] scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            data-testid={`button-hero-dot-${i}`}
          />
        ))}
      </div>
    </section>
  );
}

function TopReasons() {
  const reasons = [
    { image: "/images/reason-home.png", title: "A Home Away From Home", icon: HomeIcon },
    { image: "/images/reason-nurture.png", title: "Personalized Nurturing", icon: Heart },
    { image: "/images/reason-trust.png", title: "Trust & Partnership", icon: Shield },
  ];

  return (
    <section className="bg-[#1b5e20] dark:bg-[#0d3311] py-20 px-4" data-testid="section-reasons-overview">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16" data-testid="text-reasons-title">
          Top 3 Reasons For Choosing<br />The Little Jungle Family Child Care
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex flex-col items-center gap-5" data-testid={`card-reason-${reason.title.toLowerCase().replace(/\s/g, '-')}`}>
              <div className="w-48 h-48 rounded-full border-4 border-[#f9a825]/60 p-1">
                <img
                  src={reason.image}
                  alt={reason.title}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <reason.icon className="text-[#f9a825]" size={20} />
                {reason.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailedReasons() {
  return (
    <section id="about" className="py-20 px-4 bg-background" data-testid="section-detailed-reasons">
      <div className="max-w-6xl mx-auto space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <HomeIcon className="text-[#1b5e20] dark:text-emerald-400" size={28} />
              <h2 className="text-3xl md:text-4xl font-bold text-[#1b5e20] dark:text-emerald-400" data-testid="text-reason1-title">
                A Home Away From Home
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-foreground/80" data-testid="text-reason1-desc">
              At The Little Jungle Family Child Care, your child isn't just a number—they are part of our family. 
              As a private, mom-and-pop daycare, we provide the kind of personalized love and attention that only 
              a home-like setting can offer. We ensure every child feels safe, seen, and cherished in a warm 
              environment that feels just like home.
            </p>
            <a href="tel:8578006951">
              <Button className="bg-[#1b5e20] dark:bg-emerald-700 text-white mt-4" data-testid="button-call-us">
                <Phone size={16} className="mr-2" />
                Call Us
              </Button>
            </a>
          </div>
          <div className="rounded-2xl shadow-xl">
            <img
              src="/images/reason-home.png"
              alt="A Home Away From Home"
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 rounded-2xl shadow-xl">
            <img
              src="/images/reason-nurture.png"
              alt="Personalized Nurturing"
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="flex items-center gap-3">
              <Heart className="text-[#1b5e20] dark:text-emerald-400" size={28} />
              <h2 className="text-3xl md:text-4xl font-bold text-[#1b5e20] dark:text-emerald-400" data-testid="text-reason2-title">
                Personalized Nurturing
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-foreground/80" data-testid="text-reason2-desc">
              <strong>Tailored to their unique pace.</strong> We believe that every child deserves a seat at the table, 
              not just a spot in a classroom. Our small group sizes allow us to focus on your child's specific needs, 
              interests, and developmental milestones. From play-based discovery to healthy, home-style snacks, we 
              provide a level of individual care that larger centers simply can't match.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Shield className="text-[#1b5e20] dark:text-emerald-400" size={28} />
              <h2 className="text-3xl md:text-4xl font-bold text-[#1b5e20] dark:text-emerald-400" data-testid="text-reason3-title">
                Trust & Partnership
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-foreground/80" data-testid="text-reason3-desc">
              <strong>Roots in our community.</strong> When you join us, you're gaining more than just childcare; 
              you're gaining a partnership. We take pride in building deep, lasting relationships with our parents. 
              You'll always have a direct line to the people actually caring for your child, giving you the peace of 
              mind that comes from knowing exactly who is helping your little one grow.
            </p>
            <a href="#contact">
              <Button className="bg-[#f9a825] text-[#1b3a1b] font-semibold mt-4 border-[#e8971f]" data-testid="button-apply-reason">
                Apply Today
              </Button>
            </a>
          </div>
          <div className="rounded-2xl shadow-xl">
            <img
              src="/images/reason-trust.png"
              alt="Trust & Partnership"
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function WeAreFamily() {
  return (
    <section className="relative py-24 px-4" data-testid="section-family">
      <div className="absolute inset-0 bg-[#1b5e20] dark:bg-[#0d3311]" />
      <div className="absolute inset-0 bg-[url('/images/hero1.png')] bg-cover bg-center opacity-20" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8" data-testid="text-family-title">
          We Are A Family
        </h2>
        <p className="text-lg text-white/85 mb-10 max-w-2xl mx-auto">
          Every child who walks through our doors becomes part of our jungle family. 
          We nurture, protect, and help them grow into confident, curious explorers.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#contact">
            <Button size="lg" className="bg-[#f9a825] text-[#1b3a1b] font-semibold border-[#e8971f]" data-testid="button-book-tour">
              Book A Tour
            </Button>
          </a>
          <a href="#contact">
            <Button size="lg" variant="outline" className="text-white border-white/50 bg-white/10 backdrop-blur-sm" data-testid="button-apply-family">
              Apply Today
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function LearnPlayGrow() {
  const items = [
    { title: "Learn", icon: GraduationCap, image: "/images/learn.png", desc: "Structured activities that spark curiosity and early development" },
    { title: "Play", icon: Palette, image: "/images/play.png", desc: "Fun-filled adventures that inspire creativity and imagination" },
    { title: "Grow", icon: Sprout, image: "/images/hero2.png", desc: "Nurturing environments that support every milestone" },
  ];

  return (
    <section className="py-20 px-4 bg-background" data-testid="section-learn-play-grow">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1b5e20] dark:text-emerald-400 mb-4" data-testid="text-lpg-title">
          We Are The Perfect Place To:
        </h2>
        <p className="text-center text-muted-foreground mb-14 text-lg">
          Watch your little ones thrive in our jungle-inspired environment
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-2xl shadow-lg bg-white dark:bg-[#1a2e1a]"
              data-testid={`card-${item.title.toLowerCase()}`}
            >
              <div className="relative h-56 rounded-t-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-2xl" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <item.icon className="text-[#f9a825]" size={28} />
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-foreground/75">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-20 px-4 bg-[#f5f9f5] dark:bg-[#0f1f0f]" data-testid="section-about-daycare">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1b5e20] dark:text-emerald-400 mb-4" data-testid="text-about-title">
          The Little Jungle Family Child Care
        </h2>
        <p className="text-center text-foreground/75 max-w-3xl mx-auto mb-16 text-lg">
          The Little Jungle Family Child Care is a home-based daycare created to spark creativity, learning, 
          and growth in a clean, safe, and nurturing environment. We offer structured learning spaces, a cozy 
          nap area, and engaging activity zones designed to support each child's needs.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-white dark:bg-[#1a2e1a] rounded-2xl p-8 shadow-lg" data-testid="card-provider">
            <h3 className="text-2xl font-bold text-[#1b5e20] dark:text-emerald-400 mb-6 flex items-center gap-2">
              <Star className="text-[#f9a825]" size={24} />
              Meet Your Provider
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src="/images/provider.jpeg"
                alt="Dalia Graciela"
                className="w-36 h-44 rounded-xl object-cover shadow-md flex-shrink-0"
              />
              <div className="space-y-3">
                <p className="text-foreground/80">
                  Hello, my name is <strong>Lilly Baez</strong>. With over <strong>20 years of experience</strong>, 
                  I create a loving and supportive environment where children feel safe, confident, and valued.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {["Licensed by MA EEC", "CDA Credential", "Infant & Child CPR", "First Aid Certified"].map((cert) => (
                    <div key={cert} className="flex items-center gap-2 text-sm text-foreground/70">
                      <CheckCircle className="text-[#1b5e20] dark:text-emerald-400 flex-shrink-0" size={16} />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a2e1a] rounded-2xl p-8 shadow-lg" data-testid="card-environment">
            <h3 className="text-2xl font-bold text-[#1b5e20] dark:text-emerald-400 mb-6 flex items-center gap-2">
              <Sprout className="text-[#f9a825]" size={24} />
              Our Learning Environment
            </h3>
            <div className="space-y-6">
              {[
                { title: "Structured Learning Spaces", desc: "Hands-on activities that spark creativity and early development." },
                { title: "Cozy Nap Area", desc: "A peaceful space designed for comfort and healthy routines." },
                { title: "Engaging Activity Zones", desc: "Fun areas that support imagination and growth." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#1b5e20]/10 dark:bg-emerald-400/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-[#1b5e20] dark:text-emerald-400" size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-foreground/65">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TuitionSection() {
  return (
    <section id="tuition" className="py-20 px-4 bg-background" data-testid="section-tuition">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1b5e20] dark:text-emerald-400 mb-4" data-testid="text-tuition-title">
          Tuition & Weekly Investment
        </h2>
        <p className="text-center text-muted-foreground mb-14 text-lg">
          Transparent pricing for exceptional care
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-[#1a2e1a] rounded-2xl p-8 shadow-lg border-t-4 border-[#1b5e20] dark:border-emerald-500" data-testid="card-tuition-infants">
            <h3 className="text-xl font-bold text-[#1b5e20] dark:text-emerald-400 mb-2">
              Infants (3 Months - 2 Years)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Full-Time | 5 Days</p>
            <div className="flex items-center gap-2 text-sm text-foreground/70 mb-6">
              <Clock size={16} className="text-[#f9a825]" />
              <span>6:30 a.m. - 4:30 p.m.</span>
            </div>
            <div className="text-4xl font-bold text-[#1b5e20] dark:text-emerald-400" data-testid="text-price-infants">
              $361 <span className="text-lg font-normal text-muted-foreground">/ week</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a2e1a] rounded-2xl p-8 shadow-lg border-t-4 border-[#f9a825]" data-testid="card-tuition-toddlers">
            <h3 className="text-xl font-bold text-[#1b5e20] dark:text-emerald-400 mb-2">
              Toddlers & Preschool (2 - 5 Years)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Full-Time | 5 Days</p>
            <div className="flex items-center gap-2 text-sm text-foreground/70 mb-6">
              <Clock size={16} className="text-[#f9a825]" />
              <span>6:30 a.m. - 4:30 p.m.</span>
            </div>
            <div className="text-4xl font-bold text-[#1b5e20] dark:text-emerald-400" data-testid="text-price-toddlers">
              $310 <span className="text-lg font-normal text-muted-foreground">/ week</span>
            </div>
          </div>
        </div>

        <div className="text-center bg-[#f9a825]/10 dark:bg-[#f9a825]/5 rounded-xl p-6" data-testid="card-enrollment-info">
          <h3 className="text-xl font-bold text-[#1b5e20] dark:text-emerald-400 mb-3">Enrollment Information</h3>
          <p className="text-foreground/75">
            <strong>Deposit:</strong> $25 | <strong>Registration Fee:</strong> $0
          </p>
          <p className="text-foreground/65 mt-2 text-sm">
            Same day daycare service available: Contact to learn about this program.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      numberOfChildren: "",
      ages: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-[#1b5e20] dark:bg-[#0d3311]" data-testid="section-contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4" data-testid="text-contact-title">
          Book a Tour
        </h2>
        <p className="text-center text-white/80 mb-12 text-lg">
          Come visit our jungle and see why families love us
        </p>

        <div className="bg-white dark:bg-[#1a2e1a] rounded-2xl p-8 md:p-10 shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} data-testid="input-first-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} data-testid="input-last-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} data-testid="input-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(555) 123-4567" {...field} data-testid="input-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="numberOfChildren"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Children</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 1" {...field} data-testid="input-children-count" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ages</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-ages">
                            <SelectValue placeholder="Select age group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="3months-2years">3 months - 2 years</SelectItem>
                          <SelectItem value="2years-5years">2 years - 5 years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your family and any questions you have..."
                        className="min-h-[120px]"
                        {...field}
                        data-testid="input-message"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#1b5e20] dark:bg-emerald-700 text-white font-bold"
                disabled={mutation.isPending}
                data-testid="button-submit-contact"
              >
                {mutation.isPending ? "Sending..." : "Send"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0d3311] dark:bg-[#071a08] text-white py-12 px-4" data-testid="footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo.png" alt="Logo" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-bold text-lg">The Little Jungle</h3>
                <p className="text-white/60 text-sm">Family Child Care</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              A nurturing, jungle-themed home daycare where every child is part of our family.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#f9a825]">Quick Links</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-white/70 text-sm" data-testid="link-footer-about">About Us</a>
              <a href="#tuition" className="block text-white/70 text-sm" data-testid="link-footer-tuition">Tuition</a>
              <a href="#contact" className="block text-white/70 text-sm" data-testid="link-footer-contact">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#f9a825]">Contact Info</h4>
            <div className="space-y-3">
              <a href="tel:8578006951" className="flex items-center gap-2 text-white/70 text-sm" data-testid="link-footer-phone">
                <Phone size={14} />
                (857) 800-6951
              </a>
              <a href="mailto:Thelittlejunglefamilychildcare@gmail.com" className="flex items-center gap-2 text-white/70 text-sm" data-testid="link-footer-email">
                <Mail size={14} />
                Thelittlejunglefamilychildcare@gmail.com
              </a>
              <div className="flex items-center gap-2 text-white/70 text-sm" data-testid="text-footer-location">
                <MapPin size={14} />
                Massachusetts
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/50 text-sm" data-testid="text-copyright">
            &copy; {new Date().getFullYear()} The Little Jungle Family Child Care. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen" data-testid="page-home">
      <Navbar />
      <HeroSlider />
      <TopReasons />
      <DetailedReasons />
      <WeAreFamily />
      <LearnPlayGrow />
      <AboutSection />
      <TuitionSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
