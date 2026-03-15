import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Phone, MapPin, Clock, ChevronRight, 
  Star, Facebook, Instagram, FerrisWheel, Waves, 
  Utensils, PartyPopper, Gamepad2, Ticket, Smile,
  Armchair, Table, Speaker, Tent, Castle, Activity, Users
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES, GALLERY_IMAGES, TESTIMONIALS } from './constants';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      // Get time in Malawi (CAT, UTC+2)
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Blantyre',
        hour: 'numeric',
        hour12: false
      });
      const hour = parseInt(formatter.format(now), 10);
      
      // Open between 8:00 AM (8) and 5:00 PM (17)
      setIsOpen(hour >= 8 && hour < 17);
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Location', id: 'location' },
    { name: 'Contact', id: 'contact' },
  ];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'FerrisWheel': return <FerrisWheel size={32} />;
      case 'Waves': return <Waves size={32} />;
      case 'Utensils': return <Utensils size={32} />;
      case 'PartyPopper': return <PartyPopper size={32} />;
      case 'Gamepad2': return <Gamepad2 size={32} />;
      case 'Ticket': return <Ticket size={32} />;
      default: return <Smile size={32} />;
    }
  };

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
            
            <div className="flex items-center gap-4 border-l border-white/20 pl-4">
              <a 
                href={BUSINESS_INFO.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors hover:text-brand-blue ${scrolled ? 'text-brand-text/70' : 'text-white/90'}`}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href={BUSINESS_INFO.socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors hover:text-brand-yellow ${scrolled ? 'text-brand-text/70' : 'text-white/90'}`}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>

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
            
            <div className="flex items-center gap-6 pt-4">
              <a 
                href={BUSINESS_INFO.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-brand-bg rounded-full flex items-center justify-center text-brand-blue"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href={BUSINESS_INFO.socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-brand-bg rounded-full flex items-center justify-center text-brand-text"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>

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
            src="/image/480269293_1159799439489817_2429231014074237391_n.jpg" 
            alt="Funland – Family & Events Park" 
            className="w-full h-full object-cover brightness-[0.65]"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto mt-12 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-2xl sm:rounded-full text-xs sm:text-sm font-bold mb-6 md:mb-8 border border-white/30 text-center mx-auto max-w-[90%] sm:max-w-none">
              <Star size={16} className="text-brand-yellow fill-brand-yellow shrink-0 hidden sm:block" />
              <span>Creating magical memories for families and communities since 2019.</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-6 leading-tight tracking-tighter">
              Where Lilongwe Comes to <br className="hidden sm:block" />
              <span className="text-brand-yellow">Play & Celebrate.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto font-medium px-2">
              Step into a world of endless laughter, thrilling activities, and unforgettable moments. From weekend family outings to spectacular private events, Funland is your perfect escape in the heart of Area 25c.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 md:mb-8 w-full max-w-md sm:max-w-none mx-auto">
              <button 
                onClick={() => scrollToSection('about')}
                className="w-full sm:w-auto bg-brand-yellow hover:bg-yellow-400 text-brand-text px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-transform hover:scale-105 shadow-xl"
              >
                Explore Our Park
              </button>
              <a 
                href={`tel:+${BUSINESS_INFO.phoneRaw}`}
                className="w-full sm:w-auto bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/50 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Contact us
              </a>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-white/80 font-medium tracking-wide px-4">
              Trusted by thousands of families and event planners since 2019.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="hidden sm:flex absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-white/70 flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-widest mb-4">
                Welcome to Funland
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-text mb-6 leading-tight">
                Lilongwe's Premier Family Destination
              </h2>
              <p className="text-lg text-brand-text/70 mb-6 leading-relaxed">
                Located in the heart of Area 25c, Lilongwe, Funland is more than just an events park—it's a vibrant community hub where unforgettable memories are made. Proudly welcoming guests since 2019.
              </p>
              <p className="text-lg text-brand-text/70 mb-10 leading-relaxed">
                Whether you're looking for a relaxing weekend with the family, an exciting venue for your next big celebration, or an energetic space for group activities, we provide a safe, welcoming, and beautifully maintained environment for all ages. Come discover the perfect blend of joy, relaxation, and connection.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-black text-brand-blue mb-2">100%</div>
                  <div className="font-bold text-brand-text/80">Family Friendly</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-brand-yellow mb-2">350+</div>
                  <div className="font-bold text-brand-text/80">Happy Visitors</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/image/490256881_1205566018246492_2410681126448273193_n.jpg" 
                  alt="Kids having fun" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-yellow rounded-full -z-10 blur-3xl opacity-50"></div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-blue rounded-full -z-10 blur-3xl opacity-50"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 px-6 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-widest mb-4">
                Our Offerings
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-text mb-6">
                Crafting Perfect Moments for Everyone
              </h2>
              <p className="text-brand-text/60 text-lg">
                From thrilling outdoor activities to expertly hosted private events, our premium facilities are designed to bring smiles to faces of all ages.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-bg"
              >
                <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-blue mb-6">
                  {getServiceIcon(service.icon)}
                </div>
                <h3 className="text-2xl font-bold text-brand-text mb-4">{service.title}</h3>
                <p className="text-brand-text/70 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Hire Services Section */}
      <section className="py-24 md:py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-widest mb-4">
                Event Hire Services
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-text mb-6">
                Everything You Need for a Perfect Event
              </h2>
              <p className="text-brand-text/70 text-lg mb-8 leading-relaxed">
                Planning a party, wedding, or corporate gathering? You can hire various event materials at Funland at affordable prices. We provide high-quality equipment to make your special day seamless and memorable.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { name: 'Plastic Chairs', icon: Armchair },
                  { name: 'Folding Tables', icon: Table },
                  { name: 'Full Sound System', icon: Speaker },
                  { name: 'Tents', icon: Tent },
                  { name: 'Jumping Castles', icon: Castle }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-brand-bg p-4 rounded-2xl hover:bg-brand-yellow/10 transition-colors duration-300">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-blue shrink-0 shadow-sm">
                      <item.icon size={20} />
                    </div>
                    <span className="font-bold text-brand-text">{item.name}</span>
                  </div>
                ))}
              </div>

              <div className="bg-brand-yellow/20 border border-brand-yellow/50 p-6 rounded-3xl">
                <h3 className="font-bold text-brand-text text-xl mb-2">Ready to book?</h3>
                <p className="text-brand-text/70 mb-4">Call us today for prices and availability inquiries.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:+265998895292" className="flex items-center justify-center gap-2 bg-brand-text text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-blue transition-colors">
                    <Phone size={18} />
                    0998 89 52 92
                  </a>
                  <a href="tel:+265993476152" className="flex items-center justify-center gap-2 bg-white text-brand-text border border-brand-text/10 px-6 py-3 rounded-xl font-bold hover:bg-brand-bg transition-colors">
                    <Phone size={18} />
                    0993 47 61 52
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/image/469938255_1128625858654280_4528220363706228469_n.jpg" 
                  alt="Event Setup at Funland" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-blue rounded-full -z-10 blur-3xl opacity-30"></div>
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand-yellow rounded-full -z-10 blur-3xl opacity-30"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Aerobics Sessions Section */}
      <section className="py-24 md:py-32 px-6 bg-brand-blue text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-4 border-white/20">
                <img 
                  src="/image/469980332_1128627675320765_8972459575015369654_n.jpg" 
                  alt="Aerobics Session at Funland" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/30">
                <Activity size={16} className="text-brand-yellow" />
                Fitness & Community
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Massive <span className="text-brand-yellow">Aerobics</span> Sessions
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Funland is not only for family fun and events—we are also a hub for group fitness and community activities! Join our massive, high-energy aerobics sessions designed to keep you fit, active, and connected. 
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  'High-energy group workouts',
                  'Professional fitness instructors',
                  'Great music and vibrant atmosphere',
                  'Open to all fitness levels'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/90 font-medium">
                    <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow shrink-0">
                      <Users size={16} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <a 
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-yellow-400 text-brand-text px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-xl"
              >
                Join the Next Session
                <ChevronRight size={20} />
              </a>
            </motion.div>
          </div>
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
            <h2 className="text-4xl md:text-5xl font-black text-brand-text mb-6">What Our Visitors Say</h2>
            <p className="text-brand-text/60 max-w-2xl mx-auto text-lg">
              We take pride in creating happy memories. Here's what some of our wonderful guests have to say about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-bg p-8 rounded-3xl relative"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-brand-yellow fill-brand-yellow" />
                  ))}
                </div>
                <p className="text-brand-text/80 text-lg mb-8 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-brand-text">{testimonial.name}</div>
                  <div className="text-sm text-brand-text/60">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 md:py-32 px-6 bg-brand-text text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 text-brand-yellow font-bold text-sm uppercase tracking-widest mb-4">
                Gallery
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Moments of Joy</h2>
              <p className="text-white/70 text-lg">
                Take a look at some of the magical moments captured at Funland.
              </p>
            </motion.div>
            <motion.a
              href={BUSINESS_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-brand-yellow font-bold hover:text-white transition-colors"
            >
              View Facebook <ChevronRight size={20} />
            </motion.a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {GALLERY_IMAGES.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative"
                onClick={() => setSelectedImage(image.id)}
              >
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-bold text-lg">{image.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={GALLERY_IMAGES.find(img => img.id === selectedImage)?.url}
              alt="Gallery Preview"
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location & Contact Section */}
      <section id="location" className="py-24 md:py-32 px-6 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-widest mb-4">
                Visit Us
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-text mb-4">Plan Your Visit</h2>
              <p className="text-lg text-brand-text/70 mb-10">
                Serving families and communities in Lilongwe since 2019.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-text mb-2">Location</h3>
                    <p className="text-brand-text/70 text-lg mb-3">{BUSINESS_INFO.address}</p>
                    <a 
                      href="https://www.google.com/maps/place/Funland+-+Family+%26+Events+Park/@-13.8706585,33.7667626,815m/data=!3m2!1e3!4b1!4m6!3m5!1s0x1921d582f0e495c5:0x8ec2e37b6c39afe4!8m2!3d-13.8706585!4d33.7667626!16s%2Fg%2F11j4j_4181?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-text transition-colors"
                    >
                      Get Directions <ChevronRight size={16} />
                    </a>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-yellow shadow-sm shrink-0">
                    <Clock size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-bold text-brand-text">Opening Hours</h3>
                      {isOpen ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200">
                          Open Now
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-red-200">
                          Closed
                        </span>
                      )}
                    </div>
                    <div className="text-brand-text/70 text-lg">
                      <p><span className="font-bold w-24 inline-block">Every Day:</span> {BUSINESS_INFO.hours.all}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6" id="contact">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-green shadow-sm shrink-0">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-text mb-2">Contact</h3>
                    <div className="space-y-2 text-brand-text/70 text-lg">
                      <p><a href={`tel:+${BUSINESS_INFO.phoneRaw}`} className="hover:text-brand-blue transition-colors">{BUSINESS_INFO.phone}</a></p>
                      <p><a href={`tel:+${BUSINESS_INFO.phone2Raw}`} className="hover:text-brand-blue transition-colors">{BUSINESS_INFO.phone2}</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="h-[500px] bg-gray-200 rounded-3xl overflow-hidden shadow-xl relative"
            >
              <iframe 
                src="https://maps.google.com/maps?q=-13.8706585,33.7667626&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Funland Location"
              ></iframe>
              <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-auto">
                <a 
                  href="https://www.google.com/maps/place/Funland+-+Family+%26+Events+Park/@-13.8706585,33.7667626,815m/data=!3m2!1e3!4b1!4m6!3m5!1s0x1921d582f0e495c5:0x8ec2e37b6c39afe4!8m2!3d-13.8706585!4d33.7667626!16s%2Fg%2F11j4j_4181?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-brand-blue text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 transition-colors"
                >
                  <MapPin size={20} />
                  Get Directions
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-text text-white py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center">
                <span className="text-2xl font-black text-brand-blue">F</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter">FUNLAND</span>
            </div>
            <p className="text-white/60 text-lg max-w-md mb-8">
              Lilongwe’s Ultimate Family Fun & Events Destination. Creating magical memories and endless fun for families since 2019.
            </p>
            <div className="flex gap-4">
              <a href={BUSINESS_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href={BUSINESS_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-text transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/60">
              {navLinks.map(link => (
                <li key={link.id}>
                  <button onClick={() => scrollToSection(link.id)} className="hover:text-white transition-colors">
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0 text-brand-yellow mt-1" />
                <span>{BUSINESS_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0 text-brand-yellow" />
                <div className="flex flex-col">
                  <a href={`tel:+${BUSINESS_INFO.phoneRaw}`} className="hover:text-white transition-colors">{BUSINESS_INFO.phone}</a>
                  <a href={`tel:+${BUSINESS_INFO.phone2Raw}`} className="hover:text-white transition-colors">{BUSINESS_INFO.phone2}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-white/40">
          <p>&copy; {new Date().getFullYear()} Funland – Family & Events Park. All rights reserved.</p>
          <p className="mt-4 text-xs text-brand-yellow/80 max-w-2xl mx-auto">
            This is a sample website design created to demonstrate how this business could appear online. All images belong to the business owner.
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}

export default App;
