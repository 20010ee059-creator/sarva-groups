import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProductsPage } from './pages/ProductsPage';
import { SubsidyPage } from './pages/SubsidyPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { BlogPage } from './pages/BlogPage';
import { GalleryPage } from './pages/GalleryPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

import {
  AppSettings,
  ServiceItem,
  Project,
  Product,
  BlogArticle,
  SubsidyDetail,
  FAQItem,
  Testimonial,
  GalleryItem,
  User,
  HeroSlide
} from './types';

import {
  fetchSettings,
  fetchServices,
  fetchProjects,
  fetchProducts,
  fetchBlogs,
  fetchSubsidies,
  fetchFaqs,
  fetchTestimonials,
  fetchGallery,
  fetchCurrentUser,
  fetchHeroSlides,
  logVisitor
} from './services/api';

const defaultFallbackSettings: AppSettings = {
  companyName: 'Sarva Solar',
  tagline: 'Empowering Homes & Businesses with Clean Solar Energy',
  phone1: '+91 8985430100',
  phone2: '+91 9160513161',
  email: 'solarsarva@gmail.com',
  address: "SARVA GROUP of Company's, Brodipet 5/15 Guntur Andhra Pradesh pincode:-522002, India",
  whatsappNumber: '918985430100',
  workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
  announcementBarText: '⚡ Govt Subsidy under PM Surya Ghar Scheme up to ₹78,000 available! Book your free site survey today.',
  showAnnouncementBar: true,
  metaTitle: 'Sarva Solar - Leading Solar Energy EPC Solutions in AP, Telangana & WB',
  metaDescription: 'Sarva Solar provides premium residential, commercial & industrial solar rooftop solutions with government subsidy assistance and zero EMI options.',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.418294719208!2d80.4328!3d16.3067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a755d55555555%3A0x1111111111111111!2sGuntur%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin'
};

export function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);

  // Loaded API Data
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [subsidies, setSubsidies] = useState<SubsidyDetail[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Initialize Dark Mode Class on <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Track customer site visits
  useEffect(() => {
    logVisitor(currentView);
  }, [currentView]);

  // Load All Site Data
  useEffect(() => {
    const loadAll = async () => {
      try {
        const [set, serv, proj, prod, b, sub, f, t, g, usr, hs] = await Promise.all([
          fetchSettings().catch(() => null),
          fetchServices().catch(() => []),
          fetchProjects().catch(() => []),
          fetchProducts().catch(() => []),
          fetchBlogs().catch(() => []),
          fetchSubsidies().catch(() => []),
          fetchFaqs().catch(() => []),
          fetchTestimonials().catch(() => []),
          fetchGallery().catch(() => []),
          fetchCurrentUser().catch(() => null),
          fetchHeroSlides().catch(() => [])
        ]);
        setSettings(set || defaultFallbackSettings);
        if (serv && serv.length > 0) setServices(serv);
        if (proj && proj.length > 0) setProjects(proj);
        if (prod && prod.length > 0) setProducts(prod);
        if (b && b.length > 0) setBlogs(b);
        if (sub && sub.length > 0) setSubsidies(sub);
        if (f && f.length > 0) setFaqs(f);
        if (t && t.length > 0) setTestimonials(t);
        if (g && g.length > 0) setGallery(g);
        if (hs && hs.length > 0) setHeroSlides(hs);
        if (usr) setCurrentUser(usr);
      } catch (err) {
        console.warn('Error fetching site data:', err);
        setSettings(defaultFallbackSettings);
      }
    };
    loadAll();
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!settings) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 font-poppins">
          Loading Sarva Solar Cleantech Platform...
        </p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-inter`}>
      {/* Header */}
      <Header
        settings={settings}
        currentView={currentView}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            settings={settings}
            projects={projects}
            services={services}
            testimonials={testimonials}
            faqs={faqs}
            blogs={blogs}
            heroSlides={heroSlides}
            onNavigate={handleNavigate}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          />
        )}

        {currentView === 'services' && (
          <ServicesPage
            services={services}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          />
        )}

        {currentView === 'projects' && (
          <ProjectsPage
            projects={projects}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          />
        )}

        {currentView === 'products' && (
          <ProductsPage
            products={products}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          />
        )}

        {currentView === 'subsidy' && (
          <SubsidyPage
            subsidies={subsidies}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          />
        )}

        {currentView === 'calculators' && <CalculatorsPage />}

        {currentView === 'blog' && (
          <BlogPage
            blogs={blogs}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          />
        )}

        {currentView === 'gallery' && <GalleryPage gallery={gallery} />}

        {currentView === 'careers' && <CareersPage />}

        {currentView === 'contact' && <ContactPage settings={settings} />}

        {currentView === 'admin' && (
          <AdminPage
            user={currentUser}
            onLoginSuccess={(u) => setCurrentUser(u)}
            onLogout={() => {
              localStorage.removeItem('sarva_solar_token');
              setCurrentUser(null);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer settings={settings} onNavigate={handleNavigate} />

      {/* Live Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}

export default App;
