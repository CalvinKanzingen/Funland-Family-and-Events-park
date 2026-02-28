import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smile, 
  PartyPopper, 
  Users, 
  Sun, 
  Calendar, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  ChevronRight, 
  X, 
  Maximize2,
  Menu,
  Quote
} from 'lucide-react';
import { BUSINESS_INFO, GALLERY_IMAGES, SERVICES, TESTIMONIALS } from './constants';
import WhatsAppButton from './components/WhatsAppButton';

const IconMap: Record<string, any> = {
  Smile: Smile,
  PartyPopper: PartyPopper,
  Users: Users,
  Sun: Sun,
  Calendar: Calendar
};

export default function App() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Location', id: 'location' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-blue/30 selection:text-brand-text">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-2xl font-black text-brand-blue">F</span>
            </div>
            <span className={`text-xl font-bold tracking-tighter ${scrolled ? 'text-brand-text' : 'text-white'}`}>
              FUNLAND
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                  scrolled ? 'text-brand-text/70' : 'text-white/90'
                }`}
              >
                {link.name}
              </button>
            ))}
            <a 
              href={`tel:+${BUSINESS_INFO.phoneRaw}`}
              className="bg-brand-green hover:bg-brand-green/90 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-transform hover:scale-105 shadow-sm"
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 ${scrolled ? 'text-brand-text' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-white p-8 flex flex-col gap-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold text-brand-blue">FUNLAND</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-brand-text">
                <X size={28} />
              </button>
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-2xl font-bold text-brand-text text-left border-b border-brand-bg pb-4"
              >
                {link.name}
              </button>
            ))}
            <a 
              href={`tel:+${BUSINESS_INFO.phoneRaw}`}
              className="mt-auto bg-brand-blue text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-3 text-xl"
            >
              <Phone size={24} />
              {BUSINESS_INFO.phone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.pinimg.com/736x/4a/c6/85/4ac685fbd6f52a315ed773c6d29c1a5c.jpg" 
            alt="Funland Family Park" 
            className="w-full h-full object-cover brightness-[0.65]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-brand-bg/90"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-brand-yellow text-brand-text font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6 inline-block shadow-sm">
              Area 25, Lilongwe
            </span>
            <h1 className="text-5xl md:text-8xl text-white mb-6 leading-[1.1] font-extrabold drop-shadow-sm">
              Funland – Family & <span className="text-brand-yellow">Events</span> Park
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto font-medium drop-shadow-sm">
              Lilongwe’s Ultimate Family Fun & Events Destination. Where every moment becomes a cherished memory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('about')}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white px-10 py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg"
              >
                Explore Our Park <ChevronRight size={20} />
              </button>
              <a 
                href={`tel:${BUSINESS_INFO.phone}`}
                className="bg-white hover:bg-stone-50 text-brand-text px-10 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 shadow-lg"
              >
                Call Us Today
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 lg:py-40 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-widest mb-6">
              <div className="w-12 h-[2px] bg-brand-blue"></div>
              About Funland
            </div>
            <h2 className="mb-8">
              A Vibrant Space for <span className="text-brand-green">Family Fun</span> and Celebration
            </h2>
            <p className="text-brand-text/70 text-lg mb-8">
              Located in the heart of Area 25, Funland is more than just a park—it's a community hub designed for families to connect and children to grow through play. We offer a safe, beautifully maintained environment featuring diverse play zones and spacious event grounds.
            </p>
            <p className="text-brand-text/70 text-lg mb-10">
              Whether you're planning a child's birthday party, a school outing, or simply looking for a weekend escape, our park provides the perfect backdrop for joy and entertainment.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="text-4xl font-extrabold text-brand-blue">Safe</div>
                <p className="text-sm text-brand-text/60 font-medium">Fully fenced and monitored grounds for peace of mind.</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-extrabold text-brand-green">Spacious</div>
                <p className="text-sm text-brand-text/60 font-medium">Large outdoor areas perfect for any event size.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-yellow/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl"></div>
            <img 
              src="https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/496151836_1237851608351266_228094284050371004_n.jpg?stp=c320.0.640.640a_dst-jpg_s206x206_tt6&_nc_cat=101&ccb=1-7&_nc_sid=5df8b4&_nc_eui2=AeEUvRkI4LZ_2DG8LHAcUvDpE1feppK-hFcTV96mkr6EV-0aFC1epkRS1D67HLwa-OiqKKt4UQr24QQKVYVJhTfQ&_nc_ohc=RiJVSjivW1oQ7kNvwEefOIR&_nc_oc=Adm7oGKtc9B6d6iN1mDJ6z_mudFdIbeb4Iwo59TqUc6T_C664rnS4xbG1CiUJTg6QKo&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=X1l5ddelGu4UytWWIuk_zQ&oh=00_AftZZVPM_FbJRej9iL0eWjpQ-51rTeixJliMClOMOl9NkQ&oe=69A51A82" 
              alt="Children playing at Funland" 
              className="relative z-10 rounded-[3rem] shadow-2xl w-full aspect-square object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 lg:py-40 px-6 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-widest mb-4">
              Our Services
            </div>
            <h2 className="mb-6">What We Offer</h2>
            <p className="text-brand-text/60 max-w-2xl mx-auto text-lg">
              From daily play to grand celebrations, we provide high-quality services tailored for family entertainment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {SERVICES.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ 
                  y: -12,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                className="bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] transition-shadow duration-500 group flex flex-col h-full border border-brand-bg/50"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Gradient Overlay for integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  {/* Floating Icon - Integrated between image and text */}
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -bottom-7 left-8 w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center text-white shadow-xl z-10 group-hover:bg-brand-yellow group-hover:text-brand-text transition-colors duration-300"
                  >
                    {(() => {
                      const Icon = IconMap[service.icon] || Smile;
                      return <Icon size={32} />;
                    })()}
                  </motion.div>
                </div>

                {/* Content Area */}
                <div className="p-10 pt-14 flex-grow flex flex-col">
                  <h3 className="text-2xl mb-4 font-extrabold tracking-tight group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-text/60 leading-relaxed text-lg">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 md:py-32 lg:py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-widest mb-4">
              Gallery
            </div>
            <h2 className="mb-6">Moments of Joy</h2>
            <p className="text-brand-text/60 max-w-2xl mx-auto text-lg">
              A glimpse into the fun and excitement that awaits you at Funland.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((img) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-[2rem] bg-brand-bg aspect-[4/3] cursor-pointer shadow-sm"
                onClick={() => setSelectedImage(img.id)}
              >
                <img 
                  src={img.url} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-brand-blue/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white">
                    <Maximize2 size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-text/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-brand-yellow transition-colors">
              <X size={40} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={GALLERY_IMAGES.find(img => img.id === selectedImage)?.url} 
                alt="Gallery Preview" 
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
              <p className="mt-6 text-center text-white/80 text-lg font-medium">
                {GALLERY_IMAGES.find(img => img.id === selectedImage)?.alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Experience Section */}
      <section className="py-24 md:py-32 lg:py-40 px-6 bg-white overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-20 left-10 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-brand-yellow/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-widest mb-4">
                Experience Funland
              </div>
              <h2 className="mb-6">Watch Our Experience</h2>
              <p className="text-brand-text/60 max-w-2xl mx-auto text-lg">
                See the fun and excitement at our park! Get a glimpse of the joy and memories being made every day at Funland.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[900px] mx-auto"
          >
            <div className="relative aspect-video w-full overflow-hidden shadow-2xl group">
              <iframe 
                src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F873929033343558%2F&show_text=0&t=0&width=900" 
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none', overflow: 'hidden' }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
                title="Funland Experience Reel"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-24 md:py-32 lg:py-40 px-6 bg-brand-bg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6">Connect With Us</h2>
            <p className="text-brand-text/60 text-lg mb-10">
              Follow us for updates, events, and special offers.
            </p>
            <div className="flex justify-center gap-8">
              <a 
                href={BUSINESS_INFO.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-blue shadow-md hover:scale-110 hover:bg-brand-blue hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={32} />
              </a>
              <a 
                href={BUSINESS_INFO.socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-text shadow-md hover:scale-110 hover:bg-brand-yellow hover:text-brand-text transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={32} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 lg:py-40 px-6 bg-white overflow-hidden relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -ml-32"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-brand-yellow/5 rounded-full blur-3xl -mr-32"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-widest mb-4">
              Testimonials
            </div>
            <h2 className="mb-6">What Our Visitors Say</h2>
            <p className="text-brand-text/60 max-w-2xl mx-auto text-lg">
              We take pride in creating happy memories. Here's what some of our wonderful guests have to say about their experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-brand-bg p-10 rounded-[2.5rem] relative group hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute top-8 right-10 text-brand-blue/10 group-hover:text-brand-blue/20 transition-colors">
                  <Quote size={60} fill="currentColor" />
                </div>
                
                <p className="text-brand-text/70 text-lg leading-relaxed mb-10 relative z-10 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm border-2 border-white">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-brand-text/50 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section id="location" className="py-24 md:py-32 lg:py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-10"
            >
              <div>
                <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-widest mb-4">
                  Find Us
                </div>
                <h2 className="mb-6">Visit Our Park</h2>
                <p className="text-brand-text/60 text-lg">
                  We are conveniently located in Area 25, Lilongwe. Come and experience the best family entertainment in the city.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-blue shadow-sm shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Location</h4>
                    <p className="text-brand-text/60">{BUSINESS_INFO.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-green shadow-sm shrink-0">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Phone</h4>
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="text-brand-blue font-bold text-xl hover:underline">
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="bg-brand-blue text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
                >
                  <Phone size={20} /> Call Now
                </a>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Funland+Area+25+Lilongwe+Malawi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
                >
                  <MapPin size={20} /> Get Directions
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-brand-bg"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15448.33642398555!2d33.7431113!3d-13.8941667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d30000000001%3A0x0!2sArea%2025%2C%20Lilongwe%2C%20Malawi!5e0!3m2!1sen!2smw!4v1708512345678!5m2!1sen!2smw" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Funland Location Map"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Opening Hours Section */}
      <section id="contact" className="py-24 md:py-32 lg:py-40 px-6 bg-brand-bg relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>

        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-widest mb-4">
              Plan Your Visit
            </div>
            <h2 className="mb-6">Opening Hours</h2>
            
            {/* Live Status Indicator */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-brand-bg mb-8"
            >
              <div className={`w-3 h-3 rounded-full animate-pulse ${
                new Date().getHours() >= 8 && new Date().getHours() < 17 ? 'bg-brand-green' : 'bg-red-500'
              }`}></div>
              <span className="font-bold text-brand-text">
                {new Date().getHours() >= 8 && new Date().getHours() < 17 
                  ? "Open Now – Come Join the Fun!" 
                  : "Currently Closed – See You Tomorrow!"}
              </span>
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekdays Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-white/20 flex flex-col items-center text-center group hover:bg-brand-blue transition-all duration-500"
            >
              <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue mb-8 group-hover:bg-white/20 group-hover:text-white transition-colors">
                <Clock size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">Weekdays</h3>
              <p className="text-brand-text/60 mb-6 group-hover:text-white/80 transition-colors">Monday – Friday</p>
              <div className="text-3xl font-black text-brand-blue group-hover:text-brand-yellow transition-colors">
                {BUSINESS_INFO.hours.weekdays}
              </div>
            </motion.div>

            {/* Saturday Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-white/20 flex flex-col items-center text-center group hover:bg-brand-yellow transition-all duration-500"
            >
              <div className="w-16 h-16 bg-brand-yellow/10 rounded-2xl flex items-center justify-center text-brand-yellow mb-8 group-hover:bg-white/20 group-hover:text-brand-text transition-colors">
                <Sun size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-text transition-colors">Saturday</h3>
              <p className="text-brand-text/60 mb-6 group-hover:text-brand-text/80 transition-colors">Weekend Blast</p>
              <div className="text-3xl font-black text-brand-yellow group-hover:text-brand-blue transition-colors">
                {BUSINESS_INFO.hours.saturday}
              </div>
            </motion.div>

            {/* Sunday Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-white/20 flex flex-col items-center text-center group hover:bg-brand-green transition-all duration-500"
            >
              <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green mb-8 group-hover:bg-white/20 group-hover:text-white transition-colors">
                <Smile size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">Sunday</h3>
              <p className="text-brand-text/60 mb-6 group-hover:text-white/80 transition-colors">Family Funday</p>
              <div className="text-3xl font-black text-brand-green group-hover:text-brand-yellow transition-colors">
                {BUSINESS_INFO.hours.sunday}
              </div>
            </motion.div>
          </div>

          {/* Quick Info Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 bg-brand-text text-white p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brand-yellow">
                <PartyPopper size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold">Planning a Special Event?</h4>
                <p className="text-white/60">We host birthdays, school trips, and corporate days!</p>
              </div>
            </div>
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white px-10 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg whitespace-nowrap"
            >
              Inquire Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-text text-white/60 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-black text-brand-blue">F</span>
                </div>
                <span className="text-2xl font-bold text-white tracking-tighter">FUNLAND</span>
              </div>
              <p className="max-w-sm text-lg leading-relaxed">
                Lilongwe’s ultimate family fun and events destination. Dedicated to creating joyful experiences for families and communities in Malawi.
              </p>
              <div className="flex gap-4">
                <a 
                  href={BUSINESS_INFO.socials.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href={BUSINESS_INFO.socials.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-yellow hover:text-brand-text transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-8">Explore</h4>
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.id}>
                    <button onClick={() => scrollToSection(link.id)} className="hover:text-white transition-colors text-lg">
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-8">Contact</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin size={20} className="text-brand-blue shrink-0 mt-1" />
                  <span className="text-lg">{BUSINESS_INFO.location}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone size={20} className="text-brand-green shrink-0" />
                  <a href={`tel:+${BUSINESS_INFO.phoneRaw}`} className="hover:text-white text-lg">{BUSINESS_INFO.phone}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <p>&copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
            <div className="flex gap-8">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
