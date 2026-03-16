import img1 from './assets/images/gallery1.jpg';
import img2 from './assets/images/gallery2.jpg';
import img3 from './assets/images/gallery3.jpg';
import img4 from './assets/images/gallery4.jpg';
import img5 from './assets/images/gallery5.jpg';
import img6 from './assets/images/gallery6.jpg';

export const BUSINESS_INFO = {
  name: "Funland – Family & Events Park",
  phone: "+265 998 895 292",
  phoneRaw: "265998895292",
  phone2: "+265 993 476 152",
  phone2Raw: "265993476152",
  address: "Funland, Area 25c, Lilongwe, Malawi",
  socials: {
    facebook: "https://web.facebook.com/profile.php?id=100063793165608",
    instagram: "https://www.instagram.com/explore/locations/102413474608862/funland-family-and-events-park/"
  },
  hours: {
    all: "8:00 AM - 5:00 PM"
  }
};

export const SERVICES = [
  {
    id: "kids-play-area",
    title: "Kids Play Area",
    description: "A vibrant, secure, and endlessly entertaining wonderland where your little ones can safely explore, play, and make new friends.",
    icon: "Smile"
  },
  {
    id: "birthday-parties",
    title: "Birthday Parties",
    description: "Turn their special day into a magical celebration with our all-inclusive, stress-free birthday packages tailored for maximum joy.",
    icon: "PartyPopper"
  },
  {
    id: "family-events",
    title: "Family Events",
    description: "Spacious, beautifully landscaped areas perfect for family reunions, picnics, and creating cherished moments together.",
    icon: "FerrisWheel"
  },
  {
    id: "outdoor-fun",
    title: "Outdoor Fun Activities",
    description: "Engaging outdoor games and recreational spaces designed to keep the whole family active, entertained, and smiling.",
    icon: "Waves"
  },
  {
    id: "private-events",
    title: "Private Event Hosting",
    description: "Exclusive venue hire with premium amenities, providing the perfect backdrop for corporate gatherings, weddings, and private celebrations.",
    icon: "Ticket"
  }
];

export const GALLERY_IMAGES = [
  {
    id: 1,
    url: img1,
    title: "Kids Play Area"
  },
  {
    id: 2,
    url: img2,
    title: "Family Events"
  },
  {
    id: 3,
    url: img3,
    title: "Outdoor Fun"
  },
  {
    id: 4,
    url: img4,
    title: "Birthday Parties"
  },
  {
    id: 5,
    url: img5,
    title: "Private Events"
  },
  {
    id: 6,
    url: img6,
    title: "Funland Memories"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Mother of two",
    text: "We had an absolute blast at Funland! The kids couldn't get enough of the water park, and the staff was incredibly friendly and helpful.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Birthday Party Guest",
    text: "Hosted my daughter's 8th birthday here. The party package was fantastic, taking all the stress off us. Highly recommended!",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Weekend Visitor",
    text: "Great variety of rides and the food was surprisingly good for a theme park. We'll definitely be coming back next summer.",
    rating: 4
  }
];
