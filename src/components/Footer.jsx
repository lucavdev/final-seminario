import { useState } from 'react';
import { Flame, Send, CheckCircle2 } from 'lucide-react';

// Brand icons as inline SVGs (lucide-react v1+ removed brand icons)
const IconInstagram = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IconTwitter = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconFacebook = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconYoutube = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError('Por favor ingresá un email válido.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  const socials = [
    { icon: IconInstagram, href: '#', label: 'Instagram' },
    { icon: IconTwitter,   href: '#',   label: 'Twitter/X'  },
    { icon: IconFacebook,  href: '#',  label: 'Facebook'   },
    { icon: IconYoutube,   href: '#',  label: 'YouTube'    },
  ];

  const links = {
    'Tienda':    ['Novedades', 'Hombre', 'Mujer', 'Niños', 'Ofertas'],
    'Ayuda':     ['Mi cuenta', 'Seguimiento', 'Cambios y devoluciones', 'FAQ'],
    'Empresa':   ['Nosotros', 'Prensa', 'Trabaja con nosotros', 'Franquicias'],
  };

  return (
    <footer className="bg-dark-900 border-t border-dark-700 mt-20">
      {/* Newsletter banner */}
      <div className="bg-gradient-to-r from-dark-800 via-terracotta-900/30 to-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-earth-100 mb-1">
                Suscribite y recibí <span className="text-fire-gradient">10% OFF</span>
              </h3>
              <p className="text-earth-400 text-sm">Ofertas exclusivas, lanzamientos y mucho más directamente en tu email.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold animate-fade-in">
                <CheckCircle2 size={20} />
                ¡Suscripción exitosa!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:min-w-[400px]">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    placeholder="SUSCRÍBETE AQUÍ"
                    className={`input-field text-sm ${error ? 'border-fire-red' : ''}`}
                    required
                  />
                  {error && <p className="text-fire-red text-xs mt-1 animate-fade-in">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="btn-fire flex items-center gap-2 text-sm flex-shrink-0"
                >
                  <Send size={14} />
                  Suscribirse
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Flame size={24} className="text-fire-orange" style={{ filter: 'drop-shadow(0 0 6px #FF6B00)' }} />
              <span className="font-display font-black text-xl text-fire-gradient">FUEGO</span>
              <span className="font-display font-light text-xl text-earth-300 tracking-widest">SPORT</span>
            </div>
            <p className="text-earth-500 text-sm leading-relaxed mb-5">
              Ropa y calzado deportivo de alto rendimiento para quienes nunca se apagan.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-dark-700 border border-dark-600 text-earth-400 hover:text-fire-orange hover:border-fire-orange hover:shadow-fire-sm transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <p className="text-earth-600 text-xs mt-4">@fuegosport</p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-earth-200 font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-earth-500 text-sm hover:text-fire-orange transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-dark-700 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-earth-600">
          <p>© {new Date().getFullYear()} Fuego Sport. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-earth-400 transition-colors">Términos y condiciones</a>
            <a href="#" className="hover:text-earth-400 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-earth-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
