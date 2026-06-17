import { createContext, useContext, useReducer, useEffect } from 'react';

// ── Types ────────────────────────────────────────────────────
// cartItem: { id, name, price, image, size, quantity, type, category }

const CartContext = createContext(null);
const STORAGE_KEY = 'fuego_sport_cart';

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = `${action.payload.id}-${action.payload.size}`;
      const existing = state.find(i => `${i.id}-${i.size}` === key);
      if (existing) {
        return state.map(i =>
          `${i.id}-${i.size}` === key
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i
        );
      }
      return [...state, { ...action.payload, cartKey: key }];
    }
    case 'REMOVE_ITEM':
      return state.filter(i => i.cartKey !== action.payload);
    case 'UPDATE_QUANTITY':
      return state.map(i =>
        i.cartKey === action.payload.cartKey
          ? { ...i, quantity: Math.max(1, action.payload.quantity) }
          : i
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Silently fail if storage is unavailable
    }
  }, [cart]);

  const addItem = (product, size, quantity = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        type: product.type,
        size,
        quantity,
      },
    });
  };

  const removeItem = (cartKey) => dispatch({ type: 'REMOVE_ITEM', payload: cartKey });

  const updateQuantity = (cartKey, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartKey, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal   = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
