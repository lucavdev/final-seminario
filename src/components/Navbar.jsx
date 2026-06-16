import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Flame, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ searchQuery, setSearchQuery, activeCategory, setActiveCategory, onCartOpen, onLoginOpen }) {
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);

  const categories = ['Todos', 'Hombre', 'Mujer', 'Niños'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-900/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-dark-700'
          : 'bg-dark-900/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* ── Logo ── */}
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer group" onClick={() => { setActiveCategory('Todos'); setSearchQuery(''); }}>
            <div className="relative">
              <Flame
                size={28}
                className="text-fire-orange transition-all duration-300 group-hover:scale-110"
                style={{ filter: 'drop-shadow(0 0 8px #FF6B00)' }}
              />
            </div>
            <span
              className="font-display font-black text-2xl text-fire-gradient tracking-tight animate-pulse-fire"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              FUEGO
            </span>
            <span className="font-display font-light text-2xl text-earth-200 tracking-widest" style={{ fontFamily: 'Outfit, sans-serif' }}>
              SPORT
            </span>
          </div>

          {/* ── Desktop Navigation ── */}
          <div className="hidden lg:flex items-center gap-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-fire-orange/20 text-fire-orange'
                    : 'text-earth-300 hover:text-earth-100 hover:bg-dark-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2">
            {/* Search bar desktop */}
            <div className="hidden sm:flex items-center">
              <div className={`flex items-center gap-2 bg-dark-700 border rounded-full transition-all duration-300 ${
                searchOpen ? 'border-fire-orange w-52 px-4 py-2' : 'border-dark-500 w-10 h-10 justify-center cursor-pointer hover:border-dark-400'
              }`}
                onClick={() => !searchOpen && setSearchOpen(true)}
              >
                <Search size={16} className="text-earth-400 flex-shrink-0" />
                {searchOpen && (
                  <>
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Buscar productos..."
                      className="bg-transparent text-earth-100 text-sm outline-none placeholder-earth-500 w-full"
                    />
                    <button
                      onClick={e => { e.stopPropagation(); setSearchOpen(false); setSearchQuery(''); }}
                      className="text-earth-500 hover:text-earth-300 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Auth button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(o => !o)}
                  title={currentUser.name}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-fire-orange/20 border border-fire-orange/40 text-fire-orange hover:bg-fire-orange/30 transition-all duration-200"
                >
                  <User size={18} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-12 bg-dark-800 border border-dark-600 rounded-xl p-3 min-w-[160px] shadow-xl animate-fade-in z-50">
                    <p className="text-earth-300 text-xs font-medium px-2 mb-2 truncate">Hola, {currentUser.name}</p>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm text-earth-400 hover:text-fire-red hover:bg-dark-700 transition-all duration-200"
                    >
                      <LogOut size={14} /> Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginOpen}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-fire-orange/10 border border-fire-orange/30 text-fire-orange text-sm font-semibold hover:bg-fire-orange/20 transition-all duration-200"
              >
                <User size={14} />
                Iniciar sesión
              </button>
            )}

            {/* Cart button */}
            <button
              onClick={onCartOpen}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-dark-700 border border-dark-600 text-earth-300 hover:text-fire-orange hover:border-fire-orange transition-all duration-200 hover:shadow-fire-sm"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="badge animate-scale-in">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-dark-700 border border-dark-600 text-earth-300 hover:text-fire-orange transition-all duration-200"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-72 pb-4' : 'max-h-0'}`}>
          {/* Mobile search */}
          <div className="flex items-center gap-2 bg-dark-700 border border-dark-600 rounded-xl px-4 py-2.5 mb-3">
            <Search size={16} className="text-earth-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="bg-transparent text-earth-100 text-sm outline-none placeholder-earth-500 w-full"
            />
          </div>
          {/* Mobile categories */}
          <div className="grid grid-cols-2 gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setMenuOpen(false); }}
                className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-fire-orange text-dark-900 font-bold'
                    : 'bg-dark-700 text-earth-300 hover:bg-dark-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
