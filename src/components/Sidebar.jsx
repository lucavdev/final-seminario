import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';

const TYPES = ['Calzado', 'Indumentaria'];
const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const SHOE_SIZES = ['28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

export default function Sidebar({ filters, setFilters }) {
  const [typeOpen, setTypeOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleType = (type) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type],
    }));
  };

  const toggleSize = (size) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const clearFilters = () => setFilters({ types: [], sizes: [] });
  const hasFilters = filters.types.length > 0 || filters.sizes.length > 0;

  const filterContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-fire-orange" />
          <span className="font-semibold text-earth-100 text-sm">Filtros</span>
          {hasFilters && (
            <span className="bg-fire-orange text-dark-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
              {filters.types.length + filters.sizes.length}
            </span>
          )}
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-earth-400 hover:text-fire-orange transition-colors flex items-center gap-1"
          >
            <X size={12} />
            Limpiar
          </button>
        )}
      </div>

      {/* Tipo de producto */}
      <div>
        <button
          onClick={() => setTypeOpen(o => !o)}
          className="flex items-center justify-between w-full mb-3 group"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-earth-400 group-hover:text-earth-200 transition-colors">
            Tipo
          </span>
          {typeOpen ? <ChevronUp size={14} className="text-earth-500" /> : <ChevronDown size={14} className="text-earth-500" />}
        </button>
        {typeOpen && (
          <div className="space-y-2 animate-fade-in">
            {TYPES.map(type => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => toggleType(type)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    filters.types.includes(type)
                      ? 'bg-fire-orange border-fire-orange'
                      : 'border-dark-500 group-hover:border-fire-orange/50'
                  }`}
                >
                  {filters.types.includes(type) && (
                    <svg className="w-2.5 h-2.5 text-dark-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm transition-colors ${
                    filters.types.includes(type) ? 'text-earth-100' : 'text-earth-400 group-hover:text-earth-200'
                  }`}
                  onClick={() => toggleType(type)}
                >
                  {type}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="h-px bg-dark-600" />

      {/* Talles */}
      <div>
        <button
          onClick={() => setSizeOpen(o => !o)}
          className="flex items-center justify-between w-full mb-3 group"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-earth-400 group-hover:text-earth-200 transition-colors">
            Talles
          </span>
          {sizeOpen ? <ChevronUp size={14} className="text-earth-500" /> : <ChevronDown size={14} className="text-earth-500" />}
        </button>
        {sizeOpen && (
          <div className="animate-fade-in">
            <p className="text-xs text-earth-500 mb-2 font-medium">Indumentaria</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {CLOTHING_SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`filter-chip ${filters.sizes.includes(size) ? 'filter-chip-active' : 'filter-chip-inactive'}`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="text-xs text-earth-500 mb-2 font-medium">Calzado</p>
            <div className="flex flex-wrap gap-1.5">
              {SHOE_SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`filter-chip ${filters.sizes.includes(size) ? 'filter-chip-active' : 'filter-chip-inactive'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-56 flex-shrink-0">
        <div className="sticky top-24 glass-card p-5">
          {filterContent}
        </div>
      </aside>

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-dark-700 border border-dark-600 rounded-xl text-sm text-earth-300 hover:border-fire-orange hover:text-fire-orange transition-all duration-200"
        >
          <Filter size={14} />
          Filtros
          {hasFilters && (
            <span className="bg-fire-orange text-dark-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
              {filters.types.length + filters.sizes.length}
            </span>
          )}
        </button>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-dark-800 border-r border-dark-600 p-6 overflow-y-auto animate-slide-in-left">
              <div className="flex justify-end mb-4">
                <button onClick={() => setMobileOpen(false)} className="text-earth-400 hover:text-earth-200 transition-colors">
                  <X size={20} />
                </button>
              </div>
              {filterContent}
              <button
                onClick={() => setMobileOpen(false)}
                className="btn-fire w-full mt-6 text-center block"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
