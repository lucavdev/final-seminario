import { useState } from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import { tagColors } from '../data/products';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          size={11}
          className={s <= Math.round(rating) ? 'text-fire-amber fill-fire-amber' : 'text-dark-500'}
        />
      ))}
      <span className="text-xs text-earth-500 ml-1">{rating}</span>
    </div>
  );
}

export default function ProductCard({ product, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card-product group animate-fade-in-up"
      onClick={() => onClick(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden h-56 bg-dark-800">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-dark-700 to-dark-800 animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            hovered ? 'scale-110' : 'scale-100'
          } ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Overlay gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-60'}`} />

        {/* Tag */}
        {product.tag && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full border backdrop-blur-sm ${tagColors[product.tag] || ''}`}>
            {product.tag}
          </span>
        )}

        {/* Quick add hint */}
        <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="flex items-center justify-center gap-2 bg-fire-orange/90 backdrop-blur-sm text-dark-900 text-xs font-bold py-2 rounded-lg">
            <ShoppingBag size={13} />
            Ver Detalle
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-earth-100 text-sm leading-tight line-clamp-2 flex-1">
            {product.name}
          </h3>
        </div>

        <span className="inline-block text-xs text-earth-500 bg-dark-600 px-2 py-0.5 rounded-full mb-2">
          {product.category} · {product.type}
        </span>

        <StarRating rating={product.rating} />

        <div className="flex items-center justify-between mt-3">
          <span className="text-fire-orange font-bold text-lg">
            ${product.price.toLocaleString('es-AR')}
          </span>
          <div className="flex gap-1 flex-wrap justify-end max-w-[100px]">
            {product.sizes.slice(0, 3).map(s => (
              <span key={s} className="text-xs text-earth-500 border border-dark-600 px-1 py-0.5 rounded">
                {s}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-xs text-earth-600">+{product.sizes.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
