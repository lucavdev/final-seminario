import { useState } from 'react';
import { X, Minus, Plus, Star, ShoppingBag, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { tagColors } from '../data/products';

export default function ProductModal({ product, onClose }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Por favor seleccioná un talle antes de agregar al carrito.');
      return;
    }
    setError('');
    addItem(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" />

      <div
        className="relative bg-dark-800 border border-dark-600 rounded-2xl overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-dark-700/90 backdrop-blur-sm border border-dark-500 rounded-full text-earth-400 hover:text-earth-100 hover:bg-dark-600 transition-all duration-200"
        >
          <X size={16} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative h-72 md:h-full min-h-72 bg-dark-900 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent" />
            {product.tag && (
              <span className={`absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${tagColors[product.tag] || ''}`}>
                {product.tag}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col gap-4">
            {/* Category */}
            <span className="text-xs text-earth-500 bg-dark-700 px-3 py-1 rounded-full self-start">
              {product.category} · {product.type}
            </span>

            {/* Name */}
            <h2 className="font-display font-bold text-xl text-earth-100 leading-tight">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star
                    key={s}
                    size={14}
                    className={s <= Math.round(product.rating) ? 'text-fire-amber fill-fire-amber' : 'text-dark-500'}
                  />
                ))}
              </div>
              <span className="text-sm text-earth-500">{product.rating} / 5</span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-fire-orange">
              ${product.price.toLocaleString('es-AR')}
            </div>

            {/* Description */}
            <p className="text-earth-400 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Size selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-earth-400">
                  Talle <span className="text-fire-red">*</span>
                </label>
                {selectedSize && (
                  <span className="text-xs text-fire-orange font-medium">
                    Seleccionado: {selectedSize}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setError(''); }}
                    className={`min-w-[2.5rem] px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-fire-orange border-fire-orange text-dark-900 font-bold shadow-fire-sm'
                        : 'bg-dark-700 border-dark-500 text-earth-300 hover:border-fire-orange hover:text-fire-orange'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && (
                <p className="text-fire-red text-xs mt-2 flex items-center gap-1 animate-fade-in">
                  <span>⚠</span> {error}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-earth-400 block mb-2">
                Cantidad
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-700 border border-dark-500 text-earth-300 hover:border-fire-orange hover:text-fire-orange transition-all duration-200 disabled:opacity-40"
                  disabled={quantity === 1}
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-bold text-earth-100">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-700 border border-dark-500 text-earth-300 hover:border-fire-orange hover:text-fire-orange transition-all duration-200"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                added
                  ? 'bg-emerald-600 text-white scale-95'
                  : !selectedSize
                  ? 'bg-dark-600 text-earth-500 cursor-not-allowed'
                  : 'bg-fire-gradient text-dark-900 hover:shadow-fire hover:scale-105 active:scale-95'
              }`}
            >
              {added ? (
                <>
                  <Package size={16} />
                  ¡Agregado al carrito!
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  Agregar al carrito
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
