import { useState, useMemo } from 'react';
import './index.css';

import { CartProvider } from './context/CartContext';
import { AuthProvider }  from './context/AuthContext';
import { products }      from './data/products';

import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Sidebar      from './components/Sidebar';
import ProductCard  from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer   from './components/CartDrawer';
import Checkout     from './components/Checkout';
import Footer       from './components/Footer';
import Login        from './components/Login';
import Register     from './components/Register';

// ── Views ────────────────────────────────────────────────────
// 'catalog' | 'checkout' | 'login' | 'register'

function CatalogSection({ searchQuery, activeCategory, setActiveCategory }) {
  const [filters, setFilters]               = useState({ types: [], sizes: [] });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCategory = activeCategory === 'Todos' || p.category === activeCategory;
      const matchSearch   = searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filters.types.length === 0 || filters.types.includes(p.type);
      const matchSize = filters.sizes.length === 0 || p.sizes.some(s => filters.sizes.includes(s));
      return matchCategory && matchSearch && matchType && matchSize;
    });
  }, [searchQuery, activeCategory, filters]);

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <p className="text-fire-orange text-xs font-semibold uppercase tracking-widest mb-1">Catálogo</p>
        <h2 className="font-display font-bold text-3xl text-earth-100" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {activeCategory === 'Todos' ? 'Todos los Productos' : activeCategory}
        </h2>
        {(searchQuery || filters.types.length > 0 || filters.sizes.length > 0) && (
          <p className="text-earth-500 text-sm mt-1">
            {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="flex gap-8 items-start">
        <Sidebar filters={filters} setFilters={setFilters} />

        <div className="flex-1 min-w-0">
          {/* Mobile filter + category row */}
          <div className="flex items-center gap-3 mb-6 lg:hidden">
            <Sidebar filters={filters} setFilters={setFilters} />
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 flex-1">
              {['Todos', 'Hombre', 'Mujer', 'Niños'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-chip flex-shrink-0 ${activeCategory === cat ? 'filter-chip-active' : 'filter-chip-inactive'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-earth-200 font-semibold text-lg mb-2">Sin resultados</h3>
              <p className="text-earth-500 text-sm max-w-xs">
                No encontramos productos con esos filtros. Probá con otra búsqueda o limpiá los filtros.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product, i) => (
                <div key={product.id} style={{ animationDelay: `${Math.min(i, 12) * 0.05}s` }}>
                  <ProductCard product={product} onClick={setSelectedProduct} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}

// ── Root App ─────────────────────────────────────────────────
function AppContent() {
  const [view, setView]               = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [cartOpen, setCartOpen]       = useState(false);

  const scrollToCatalog = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const sharedNavbarProps = {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory: (cat) => { setActiveCategory(cat); if (view !== 'catalog') setView('catalog'); },
    onCartOpen: () => setCartOpen(true),
    onLoginOpen: () => setView('login'),
  };

  // ── Auth views (no hero, no catalog, no cart) ────────────
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar {...sharedNavbarProps} />
        <Login
          onSuccess={() => setView('catalog')}
          onGoToRegister={() => setView('register')}
        />
        <Footer />
      </div>
    );
  }

  if (view === 'register') {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar {...sharedNavbarProps} />
        <Register
          onSuccess={() => setView('catalog')}
          onGoToLogin={() => setView('login')}
        />
        <Footer />
      </div>
    );
  }

  // ── Checkout view ────────────────────────────────────────
  if (view === 'checkout') {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar {...sharedNavbarProps} />
        <div className="pt-16">
          <Checkout
            onBack={() => setView('catalog')}
            onSuccess={() => setView('catalog')}
          />
        </div>
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={() => setView('checkout')} />
        <Footer />
      </div>
    );
  }

  // ── Main catalog view ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar {...sharedNavbarProps} />

      {searchQuery === '' && activeCategory === 'Todos' && (
        <Hero onShopNow={scrollToCatalog} />
      )}

      <CatalogSection
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => { setView('checkout'); setCartOpen(false); }}
      />

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
