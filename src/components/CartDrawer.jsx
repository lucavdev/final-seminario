import { X, Minus, Plus, Trash2, ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const { cart, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-dark-800 border-l border-dark-600 flex flex-col shadow-2xl transition-transform duration-400 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-600">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-fire-orange" />
            <h2 className="font-display font-bold text-earth-100 text-lg">Mi Carrito</h2>
            {totalItems > 0 && (
              <span className="bg-fire-orange text-dark-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-700 border border-dark-600 text-earth-400 hover:text-earth-100 transition-all duration-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-dark-700 flex items-center justify-center">
                <ShoppingBag size={36} className="text-dark-500" />
              </div>
              <div>
                <p className="text-earth-300 font-medium mb-1">Tu carrito está vacío</p>
                <p className="text-earth-500 text-sm">Agregá productos para comenzar</p>
              </div>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.cartKey}
                className="flex gap-3 bg-dark-700 border border-dark-600 rounded-xl p-3 animate-fade-in group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-earth-100 text-sm font-medium line-clamp-1">{item.name}</h4>
                  <p className="text-earth-500 text-xs mt-0.5">Talle: {item.size} · {item.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-fire-orange font-bold text-sm">
                      ${(item.price * item.quantity).toLocaleString('es-AR')}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-dark-600 border border-dark-500 text-earth-400 hover:text-fire-orange hover:border-fire-orange transition-all duration-200 disabled:opacity-30"
                        disabled={item.quantity === 1}
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-earth-200 text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-dark-600 border border-dark-500 text-earth-400 hover:text-fire-orange hover:border-fire-orange transition-all duration-200"
                      >
                        <Plus size={10} />
                      </button>
                      <button
                        onClick={() => removeItem(item.cartKey)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-dark-600 border border-dark-500 text-earth-500 hover:text-fire-red hover:border-fire-red transition-all duration-200 ml-1"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-dark-600 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-earth-400 text-sm">Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
              <span className="text-earth-100 font-bold text-lg">${subtotal.toLocaleString('es-AR')}</span>
            </div>
            <div className="text-xs text-earth-500 -mt-2">
              Envío calculado en el checkout
            </div>

            {/* CTA */}
            <button
              onClick={() => { onCheckout(); onClose(); }}
              className="btn-fire w-full flex items-center justify-center gap-2 text-sm"
            >
              Realizar Compra
              <ChevronRight size={16} />
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-sm text-earth-400 hover:text-earth-200 transition-colors"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
