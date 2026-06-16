import { Flame, ChevronDown, Zap, Shield, Truck } from 'lucide-react';

const features = [
  { icon: Zap,    label: 'Alto Rendimiento', desc: 'Tecnología deportiva de élite' },
  { icon: Shield, label: 'Garantía Total',   desc: '30 días de devolución gratis'  },
  { icon: Truck,  label: 'Envío Rápido',     desc: 'Recibilo en 48 h hábiles'      },
];

export default function Hero({ onShopNow }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-terracotta-900/20" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(ellipse at 30% 50%, #FF6B00 0%, transparent 60%),
                            radial-gradient(ellipse at 70% 20%, #FFA500 0%, transparent 40%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4ae82' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-fire-orange/10 border border-fire-orange/30 text-fire-orange text-xs font-semibold px-4 py-1.5 rounded-full mb-8 animate-fade-in">
          <Flame size={12} />
          Nueva Colección Invierno 2025
          <Flame size={12} />
        </div>

        {/* Headline */}
        <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl leading-none mb-6 animate-fade-in-up" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <span className="text-earth-100 block">VISTE</span>
          <span className="text-fire-gradient block">EL FUEGO</span>
          <span className="text-earth-100 block">QUE LLEVÁS</span>
        </h1>

        {/* Subheadline */}
        <p className="text-earth-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Ropa y calzado deportivo diseñado para los que no tienen límites.
          Performance, estilo y durabilidad en cada pieza.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onShopNow}
            className="btn-fire text-base px-8 py-3.5 flex items-center gap-2 rounded-xl w-full sm:w-auto"
          >
            <Flame size={18} />
            Ver Catálogo
          </button>
          <button
            onClick={onShopNow}
            className="btn-outline-fire text-base px-8 py-3.5 rounded-xl w-full sm:w-auto"
          >
            Nuevos Ingresos
          </button>
        </div>

        {/* Feature badges */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {features.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-fire-orange/15 border border-fire-orange/30 flex items-center justify-center">
                <Icon size={16} className="text-fire-orange" />
              </div>
              <p className="text-earth-200 text-xs font-semibold">{label}</p>
              <p className="text-earth-500 text-xs hidden sm:block">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={onShopNow}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-earth-600 hover:text-earth-400 transition-colors animate-bounce"
      >
        <span className="text-xs tracking-widest uppercase">Explorar</span>
        <ChevronDown size={18} />
      </button>
    </section>
  );
}
