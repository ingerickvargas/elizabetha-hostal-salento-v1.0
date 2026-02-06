
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.rooms': 'Habitaciones',
    'nav.gallery': 'Galería',
    'nav.location': 'Ubicación',
    'nav.book': 'Reservar',
    'nav.admin': 'Admin',
    
    // Home
    'home.hero.welcome': 'Bienvenidos a',
    'home.hero.title': 'Hostal Elizabetha',
    'home.hero.subtitle': 'Experimenta la magia de Salento entre las colinas de la región cafetera del Quindío.',
    'home.hero.explore': 'Explorar Habitaciones',
    'home.hero.story': 'Nuestra Historia',
    'home.search.checkin': 'Llegada',
    'home.search.checkout': 'Salida',
	'home.search.dates': 'Fechas',
    'home.search.guests': 'Huéspedes',
    'home.search.guest1': '1 Huésped',
    'home.search.guest2': '2 Huéspedes',
    'home.search.guest3': '3 Huéspedes',
    'home.search.check': 'Ver Disponibilidad',
    'home.results.title': 'Resultados de Búsqueda',
    'home.results.available': 'Habitaciones Disponibles',
    'home.results.found': 'Encontramos {count} opciones perfectas para tu estancia en Salento.',
    'home.results.details': 'Ver Detalles y Reservar',
    'home.results.max': 'Máx {count}',
    'home.results.wifi': 'WiFi Gratis',
    'home.heritage.badge': 'Nuestra Herencia',
    'home.heritage.title': 'Hospitalidad Auténtica en el Corazón del Quindío',
    'home.heritage.desc': 'Hostal Elizabetha no es solo un lugar para alojarse; es un santuario diseñado para conectarte con la cultura vibrante y la naturaleza impresionante de Salento. Nombrado en honor a la abuela de nuestro fundador, llevamos adelante una tradición de calidez colombiana genuina.',
    'home.heritage.coffee': 'Café de Finca',
    'home.heritage.tours': 'Tours del Valle',
    'home.heritage.breakfast': 'Desayuno Local',
	'home.heritage.message': '"Calidez en cada taza, hogar en cada habitación."',
    'home.cta.title': '¿Listo para escapar a la región cafetera?',
    'home.cta.desc': 'Reserva directamente con nosotros para obtener las mejores tarifas y un desayuno tradicional complementario cada mañana de tu estancia.',
    'home.cta.book': 'Reserva Segura',
    'home.cta.contact': 'Contáctanos',

    // Rooms
    'rooms.title': 'Nuestras Habitaciones y Suites',
    'rooms.subtitle': 'Cada habitación está cuidadosamente diseñada con materiales naturales y artesanía local para brindar el máximo confort y conexión con la naturaleza.',
    'rooms.highlights': 'Destacados',
    'rooms.amenities.title': 'Comodidades del Hostal',
    'rooms.amenities.subtitle': 'Todo lo que necesitas para una estancia cómoda en Salento.',
    'rooms.amenities.kitchen': 'Cocina Comunal',
    'rooms.amenities.laundry': 'Lavandería',
    'rooms.amenities.tours': 'Tours Locales',
    'rooms.amenities.coffee': 'Café 24/7',

    // Room Details
    'details.back': 'Nuestras Habitaciones',
    'details.size': 'Tamaño',
    'details.bathroom': 'Baño',
    'details.amenity': 'Comodidad',
    'details.included': 'Servicios Incluidos',
    'details.breakfast': 'Desayuno Diario',
    'details.linens': 'Lencería y Toallas',
    'details.book.title': 'Reserva Esta Habitación',
    'details.book.night': '/ noche',
    'details.book.reviews': '(24 reseñas)',
    'details.book.fee': 'Tarifa de servicio',
    'details.book.total': 'Total',
    'details.success.title': '¡Reserva Enviada!',
    'details.success.desc': 'Tu estancia en {room} ha sido solicitada. Confirmaremos pronto.',
    'details.success.modify': 'Modificar Reserva',
    'details.success.back': 'Volver a Habitaciones',

    // Gallery
    'gallery.visual': 'Viaje Visual',
    'gallery.title': 'Galería del Hostal',
    'gallery.subtitle': 'Descubre el alma colonial de Salento. Desde nuestro patio bañado por el sol hasta los picos esmeralda del Valle de Cocora, explora la esencia de Hostal Elizabetha.',
    'gallery.social.title': 'Sigue Nuestra Historia',
    'gallery.all': 'Todas las Fotos',

    // Location
    'location.title': 'Encontrando Elizabetha',
    'location.subtitle': 'Ubicado en el corazón de Salento, Quindío, nuestro hostal es tu puerta de entrada pacífica a los impresionantes paisajes del Eje Cafetero.',
    'location.getting.title': 'Cómo Llegar',
    'location.getting.bus.title': 'Desde Armenia (AXM)',
    'location.getting.bus.desc': 'Los autobuses salen cada 20 minutos desde la Terminal principal. El viaje dura unos 45-60 minutos a través de exuberantes colinas verdes.',
    'location.getting.car.title': 'Desde Pereira (PEI)',
    'location.getting.car.desc': 'Autobuses regulares salen desde la Terminal de Transportes de Pereira. Espera un viaje escénico de 1 hora a través de las montañas.',
    'location.tip.title': 'Consejo Pro',
    'location.tip.desc': 'Salento es un pueblo para caminar. Una vez llegues a la plaza principal, estamos a solo 3 cuadras caminando por la colorida Calle Real.',
    'location.discover.title': 'Descubre Salento',
    'location.discover.subtitle': 'Explora las maravillas de la Región Cafetera justo desde nuestra puerta.',
    'location.poi.cocora': 'Valle de Cocora',
    'location.poi.cocora.desc': 'Hogar de las palmas de cera más altas del mundo. Una caminata obligada a solo 20 minutos.',
    'location.poi.coffee': 'Tours de Café',
    'location.poi.coffee.desc': 'Experimenta el proceso de la semilla a la taza en fincas locales tradicionales.',
    'location.poi.filandia': 'Pueblo de Filandia',
    'location.poi.filandia.desc': 'Pueblo encantador conocido por sus balcones coloridos y artesanías locales.',
    'location.learn': 'Ver Más',

    // Footer
    'footer.desc': 'Hostal Elizabetha ofrece una mezcla única de confort moderno y encanto tradicional. Ubicado en el corazón de Salento, somos tu puerta de entrada al Valle de Cocora y las mejores fincas cafeteras del mundo.',
    'footer.links': 'Enlaces Rápidos',
    'footer.links.rooms': 'Habitaciones',
    'footer.links.guides': 'Guías Locales',
    'footer.links.sust': 'Sostenibilidad',
    'footer.links.policy': 'Política de Reserva',
    'footer.contact': 'Contacto',
    'footer.rights': '© 2026 Hostal Elizabetha. Todos los derechos reservados.',

    // Join / Booking
    'join.back': 'Volver al Inicio',
    'join.title': 'Reserva Rápida',
    'join.subtitle': 'Asegura tu habitación en Salento hoy.',
    'join.room': 'Tipo de Habitación',
    'join.guests': 'Huéspedes',
    'join.button': 'Reservar Ahora',
    'join.confirmed': '¡Estancia Confirmada!',
    'join.confirmed.desc': 'Hemos reservado tu espacio en Hostal Elizabetha. Un correo de confirmación está en camino.',
    'join.another': 'Reservar otra estancia',
    'join.home': 'Ir a la Página Principal',
    'join.hero.title': 'Escápate al Quindío',
    'join.hero.subtitle': 'Comienza tu viaje en el corazón del país cafetero.',
	'join.fullname': 'Nombre Completo',
	'join.email': 'Correo Electrónico',
	'join.phone': 'Número de Teléfono',
	'join.button.confirm': 'Confirmar y Reservar',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.rooms': 'Rooms',
    'nav.gallery': 'Gallery',
    'nav.location': 'Location',
    'nav.book': 'Book Now',
    'nav.admin': 'Admin',
    
    // Home
    'home.hero.welcome': 'Welcome to',
    'home.hero.title': 'Hostal Elizabetha',
    'home.hero.subtitle': 'Experience the magic of Salento amidst the rolling hills of the Quindío coffee region.',
    'home.hero.explore': 'Explore Rooms',
    'home.hero.story': 'Our Story',
    'home.search.checkin': 'Check In',
    'home.search.checkout': 'Check Out',
	'home.search.dates': 'Dates',
    'home.search.guests': 'Guests',
    'home.search.guest1': '1 Guest',
    'home.search.guest2': '2 Guests',
    'home.search.guest3': '3 Guests',
    'home.search.check': 'Check Availability',
    'home.results.title': 'Your Search Results',
    'home.results.available': 'Available Rooms',
    'home.results.found': 'We found {count} perfect options for your stay in Salento.',
    'home.results.details': 'View Details & Book',
    'home.results.max': 'Max {count}',
    'home.results.wifi': 'Free WiFi',
    'home.heritage.badge': 'Our Heritage',
    'home.heritage.title': 'Authentic Hospitality in the Heart of Quindío',
    'home.heritage.desc': 'Hostal Elizabetha isn\'t just a place to stay; it\'s a sanctuary designed to connect you with the vibrant culture and breathtaking nature of Salento. Named after our founder\'s grandmother, we carry forward a tradition of genuine Colombian warmth.',
    'home.heritage.coffee': 'Estate Coffee',
    'home.heritage.tours': 'Valley Tours',
    'home.heritage.breakfast': 'Local Breakfast',
	'home.heritage.message': '"Warmth in every cup, home in every room."',
    'home.cta.title': 'Ready to escape to the coffee region?',
    'home.cta.desc': 'Book directly with us to get the best rates and a complimentary traditional breakfast for every morning of your stay.',
    'home.cta.book': 'Book Securely Now',
    'home.cta.contact': 'Contact Us First',

    // Rooms
    'rooms.title': 'Our Rooms & Suites',
    'rooms.subtitle': 'Each room is thoughtfully designed with natural materials and local craftsmanship to provide ultimate comfort and connection with nature.',
    'rooms.highlights': 'Room Highlights',
    'rooms.amenities.title': 'Hostel Amenities',
    'rooms.amenities.subtitle': 'Everything you need for a comfortable stay in Salento.',
    'rooms.amenities.kitchen': 'Communal Kitchen',
    'rooms.amenities.laundry': 'Laundry Service',
    'rooms.amenities.tours': 'Local Tours',
    'rooms.amenities.coffee': '24/7 Coffee',

    // Room Details
    'details.back': 'Our Rooms',
    'details.size': 'Size',
    'details.bathroom': 'Bathroom',
    'details.amenity': 'Amenity',
    'details.included': 'Included Services',
    'details.breakfast': 'Daily Breakfast',
    'details.linens': 'Linens & Towels',
    'details.book.title': 'Book This Room',
    'details.book.night': '/ night',
    'details.book.reviews': '(24 reviews)',
    'details.book.fee': 'Service fee',
    'details.book.total': 'Total',
    'details.success.title': 'Reservation Sent!',
    'details.success.desc': 'Your stay at {room} has been requested. We\'ll confirm shortly.',
    'details.success.modify': 'Modify Reservation',
    'details.success.back': 'Back to All Rooms',

    // Gallery
    'gallery.visual': 'Visual Journey',
    'gallery.title': 'Hostal Gallery',
    'gallery.subtitle': 'Discover the colonial soul of Salento. From our sun-drenched courtyard to the emerald peaks of the Cocora Valley, explore the essence of Hostal Elizabetha.',
    'gallery.social.title': 'Follow Our Story',
    'gallery.all': 'All Photos',

    // Location
    'location.title': 'Finding Elizabetha',
    'location.subtitle': 'Nestled in the heart of Salento, Quindío, our hostel is your peaceful gateway to the stunning landscapes of the Coffee Axis.',
    'location.getting.title': 'Getting Here',
    'location.getting.bus.title': 'From Armenia (AXM)',
    'location.getting.bus.desc': 'Buses leave every 20 minutes from the main Terminal. The journey takes about 45-60 minutes through lush green hills.',
    'location.getting.car.title': 'From Pereira (PEI)',
    'location.getting.car.desc': 'Regular buses depart from Terminal de Transportes de Pereira. Expect a scenic 1-hour trip through the mountains.',
    'location.tip.title': 'Pro Tip',
    'location.tip.desc': 'Salento is a walking town. Once you arrive at the main plaza, we are just a short 3-block walk up the colorful Calle Real.',
    'location.discover.title': 'Discover Salento',
    'location.discover.subtitle': 'Explore the wonders of the Coffee Region right from our doorstep.',
    'location.poi.cocora': 'Cocora Valley',
    'location.poi.cocora.desc': 'Home of the world\'s tallest wax palms. A must-visit trek just 20 mins away.',
    'location.poi.coffee': 'Coffee Tours',
    'location.poi.coffee.desc': 'Experience the seed-to-cup process at traditional local \'fincas\'.',
    'location.poi.filandia': 'Filandia Village',
    'location.poi.filandia.desc': 'Charming town known for colorful balconies and local crafts.',
    'location.learn': 'Learn More',

    // Footer
    'footer.desc': 'Hostal Elizabetha offers a unique blend of modern comfort and traditional charm. Located in the heart of Salento, we are your gateway to the Cocora Valley and the world\'s finest coffee farms.',
    'footer.links': 'Quick Links',
    'footer.links.rooms': 'Our Rooms',
    'footer.links.guides': 'Local Guides',
    'footer.links.sust': 'Sustainability',
    'footer.links.policy': 'Booking Policy',
    'footer.contact': 'Contact Info',
    'footer.rights': '© 2026 Hostal Elizabetha. All rights reserved. Designed with love in Salento.',

    // Join / Booking
    'join.back': 'Back to Home',
    'join.title': 'Quick Booking',
    'join.subtitle': 'Secure your room in Salento today.',
    'join.room': 'Room Type',
    'join.guests': 'Guests',
    'join.button': 'Book Now',
    'join.confirmed': 'Stay Confirmed!',
    'join.confirmed.desc': 'We\'ve reserved your space at Hostal Elizabetha. A confirmation email is on its way.',
    'join.another': 'Book another stay',
    'join.home': 'Go to Homepage',
    'join.hero.title': 'Escape to Quindío',
    'join.hero.subtitle': 'Begin your journey in the heart of coffee country.',
	'join.fullname': 'Full Name',
	'join.email': 'Email Address',
	'join.phone': 'Phone Number',
	'join.button.confirm': 'Confirm & Book',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es'); // Default to Spanish

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
