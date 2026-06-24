import { useState } from "react";
import {
  ArrowLeft,
  Package,
  AlertCircle,
  Check,
  Edit2,
  Trash2,
  Plus,
  X,
} from "lucide-react";

// ── Fake orders data ──────────────────────────────────────
const FAKE_ORDERS = [
  {
    id: "ORD-001",
    customer: "Juan García",
    email: "juan@example.com",
    date: "2024-06-20",
    status: "Pendiente",
    items: [
      { name: "Zapatillas Running Pro", size: "42", quantity: 1, price: 15999 },
      { name: "Medias deportivas", size: "Único", quantity: 2, price: 999 },
    ],
    total: 17997,
    address: "Calle Principal 123, CABA",
  },
  {
    id: "ORD-002",
    customer: "María López",
    email: "maria@example.com",
    date: "2024-06-19",
    status: "En proceso",
    items: [
      { name: "Remera deportiva", size: "M", quantity: 1, price: 4999 },
      { name: "Pantalón deportivo", size: "M", quantity: 1, price: 8999 },
    ],
    total: 13998,
    address: "Av. Secundaria 456, Zona Norte",
  },
  {
    id: "ORD-003",
    customer: "Carlos Rodríguez",
    email: "carlos@example.com",
    date: "2024-06-18",
    status: "Completada",
    items: [
      { name: "Zapatillas Casual", size: "44", quantity: 1, price: 12999 },
    ],
    total: 12999,
    address: "Calle Tercera 789, Sur",
  },
  {
    id: "ORD-004",
    customer: "Ana Martínez",
    email: "ana@example.com",
    date: "2024-06-17",
    status: "Enviada",
    items: [
      { name: "Chaqueta deportiva", size: "L", quantity: 1, price: 19999 },
      { name: "Guantes deportivos", size: "L", quantity: 1, price: 2999 },
    ],
    total: 22998,
    address: "Paseo Central 321, Centro",
  },
  {
    id: "ORD-005",
    customer: "Pedro González",
    email: "pedro@example.com",
    date: "2024-06-16",
    status: "Pendiente",
    items: [
      { name: "Shorts deportivos", size: "XL", quantity: 2, price: 3999 },
    ],
    total: 7998,
    address: "Ruta 5, Zona Industrial",
  },
];

// ── Fake inventory data ────────────────────────────────────
const FAKE_INVENTORY = [
  {
    id: 1,
    name: "Zapatillas Running Pro",
    stock: 25,
    price: 15999,
    category: "Hombre",
  },
  {
    id: 2,
    name: "Zapatillas Casual",
    stock: 18,
    price: 12999,
    category: "Hombre",
  },
  {
    id: 3,
    name: "Remera deportiva",
    stock: 42,
    price: 4999,
    category: "Unisex",
  },
  {
    id: 4,
    name: "Pantalón deportivo",
    stock: 31,
    price: 8999,
    category: "Hombre",
  },
  {
    id: 5,
    name: "Chaqueta deportiva",
    stock: 12,
    price: 19999,
    category: "Unisex",
  },
  {
    id: 6,
    name: "Medias deportivas",
    stock: 67,
    price: 999,
    category: "Unisex",
  },
  {
    id: 7,
    name: "Guantes deportivos",
    stock: 24,
    price: 2999,
    category: "Hombre",
  },
  {
    id: 8,
    name: "Shorts deportivos",
    stock: 39,
    price: 3999,
    category: "Unisex",
  },
  {
    id: 9,
    name: "Zapatillas Mujer Pro",
    stock: 15,
    price: 14999,
    category: "Mujer",
  },
  { id: 10, name: "Top deportivo", stock: 28, price: 5999, category: "Mujer" },
];

const STATUS_OPTIONS = [
  "Pendiente",
  "En proceso",
  "Enviada",
  "Completada",
  "Cancelada",
];
const STATUS_COLORS = {
  Pendiente: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "En proceso": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Enviada: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Completada: "bg-green-500/20 text-green-300 border-green-500/30",
  Cancelada: "bg-red-500/20 text-red-300 border-red-500/30",
};

export default function Admin({ onBack }) {
  const [tab, setTab] = useState("orders"); // 'orders' | 'inventory'
  const [orders, setOrders] = useState(FAKE_ORDERS);
  const [inventory, setInventory] = useState(FAKE_INVENTORY);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' | 'info'
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Modal states
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Hombre",
    price: "",
    stock: "",
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
    setMessage("Estado de la orden actualizado con éxito");
    setMessageType("success");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleReturn = (orderId) => {
    setMessage("Stock restaurado al inventario");
    setMessageType("info");
    setTimeout(() => setMessage(""), 3000);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: "", category: "Hombre", price: "", stock: "" });
    setShowProductModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = () => {
    if (!formData.name.trim() || !formData.price || !formData.stock) {
      setMessage("Completa todos los campos");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (editingProduct) {
      // Editar producto existente
      setInventory((prev) =>
        prev.map((item) =>
          item.id === editingProduct.id
            ? {
                ...item,
                name: formData.name,
                category: formData.category,
                price: parseInt(formData.price),
                stock: parseInt(formData.stock),
              }
            : item,
        ),
      );
      setMessage("Producto actualizado con éxito");
    } else {
      // Agregar nuevo producto
      const newProduct = {
        id: Math.max(...inventory.map((p) => p.id), 0) + 1,
        name: formData.name,
        category: formData.category,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
      };
      setInventory((prev) => [...prev, newProduct]);
      setMessage("Producto agregado con éxito");
    }

    setMessageType("success");
    setShowProductModal(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setInventory((prev) => prev.filter((item) => item.id !== productId));
      setMessage("Producto eliminado con éxito");
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-earth-300 hover:text-fire-orange transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Volver al catálogo
          </button>
          <h1 className="text-4xl font-bold text-earth-100 mb-2">
            Panel Administrativo
          </h1>
          <p className="text-earth-500">Gestiona órdenes e inventario</p>
        </div>

        {/* ── Message notification ── */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border flex items-center gap-3 animate-fade-in ${
              messageType === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-300"
                : "bg-blue-500/10 border-blue-500/30 text-blue-300"
            }`}
          >
            <Check size={20} />
            <span className="font-medium">{message}</span>
          </div>
        )}

        {/* ── Tabs ── */}
        <div className="flex gap-3 mb-8 border-b border-dark-700">
          <button
            onClick={() => setTab("orders")}
            className={`pb-4 px-4 font-semibold border-b-2 transition-all duration-200 ${
              tab === "orders"
                ? "border-fire-orange text-fire-orange"
                : "border-transparent text-earth-400 hover:text-earth-300"
            }`}
          >
            Órdenes
          </button>
          <button
            onClick={() => setTab("inventory")}
            className={`pb-4 px-4 font-semibold border-b-2 transition-all duration-200 ${
              tab === "inventory"
                ? "border-fire-orange text-fire-orange"
                : "border-transparent text-earth-400 hover:text-earth-300"
            }`}
          >
            Inventario
          </button>
        </div>

        {/* ── Orders Tab ── */}
        {tab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle
                  size={40}
                  className="mx-auto text-earth-500 mb-3"
                />
                <p className="text-earth-400">No hay órdenes</p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden hover:border-dark-600 transition-all duration-200"
                >
                  {/* ── Order header ── */}
                  <div
                    className="p-6 cursor-pointer hover:bg-dark-750 transition-colors"
                    onClick={() =>
                      setExpandedOrder(
                        expandedOrder === order.id ? null : order.id,
                      )
                    }
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        <p className="text-earth-100 font-semibold">
                          {order.id} - {order.customer}
                        </p>
                        <p className="text-earth-500 text-sm">{order.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-earth-100 font-semibold">
                            ${order.total.toLocaleString()}
                          </p>
                          <p className="text-earth-500 text-sm">{order.date}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${STATUS_COLORS[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── Expanded details ── */}
                  {expandedOrder === order.id && (
                    <div className="border-t border-dark-700 p-6 bg-dark-750/50">
                      {/* Items */}
                      <div className="mb-6">
                        <h4 className="text-earth-100 font-semibold mb-3">
                          Artículos
                        </h4>
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center p-3 bg-dark-800 rounded-lg"
                            >
                              <div>
                                <p className="text-earth-200">{item.name}</p>
                                <p className="text-earth-500 text-sm">
                                  Tamaño: {item.size} | Cantidad:{" "}
                                  {item.quantity}
                                </p>
                              </div>
                              <p className="text-earth-100 font-semibold">
                                ${item.price.toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Address */}
                      <div className="mb-6">
                        <h4 className="text-earth-100 font-semibold mb-2">
                          Dirección de entrega
                        </h4>
                        <p className="text-earth-300 bg-dark-800 p-3 rounded-lg">
                          {order.address}
                        </p>
                      </div>

                      {/* Status update */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-earth-300 text-sm font-medium mb-2">
                            Actualizar estado
                          </label>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-earth-100 hover:border-fire-orange transition-colors focus:outline-none focus:border-fire-orange"
                          >
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Return button */}
                        <div className="flex flex-col justify-end">
                          <button
                            onClick={() => handleReturn(order.id)}
                            className="px-4 py-2 bg-fire-red/20 border border-fire-red/40 text-fire-red rounded-lg font-semibold hover:bg-fire-red/30 transition-all duration-200"
                          >
                            Devolución
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* ── Inventory Tab ── */}
        {tab === "inventory" && (
          <div>
            <div className="mb-6">
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 px-4 py-2 bg-fire-orange/20 border border-fire-orange/40 text-fire-orange rounded-lg font-semibold hover:bg-fire-orange/30 transition-all duration-200"
              >
                <Plus size={18} />
                Agregar Producto
              </button>
            </div>

            <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700 bg-dark-750">
                      <th className="px-6 py-4 text-left text-earth-300 font-semibold">
                        Producto
                      </th>
                      <th className="px-6 py-4 text-left text-earth-300 font-semibold">
                        Categoría
                      </th>
                      <th className="px-6 py-4 text-left text-earth-300 font-semibold">
                        Precio
                      </th>
                      <th className="px-6 py-4 text-left text-earth-300 font-semibold">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-left text-earth-300 font-semibold">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-left text-earth-300 font-semibold">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item, i) => (
                      <tr
                        key={item.id}
                        className={`border-b border-dark-700 hover:bg-dark-750 transition-colors ${
                          i % 2 === 0 ? "bg-dark-800" : "bg-dark-750"
                        }`}
                      >
                        <td className="px-6 py-4 text-earth-100 font-medium flex items-center gap-2">
                          <Package size={16} className="text-fire-orange" />
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-earth-300">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 text-earth-100 font-semibold">
                          ${item.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-earth-100 font-semibold">
                          {item.stock} unidades
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              item.stock > 20
                                ? "bg-green-500/20 text-green-300"
                                : item.stock > 10
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {item.stock > 20
                              ? "Buen stock"
                              : item.stock > 10
                                ? "Stock bajo"
                                : "Crítico"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditModal(item)}
                              className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                              title="Editar producto"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(item.id)}
                              className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                              title="Eliminar producto"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Modal: Add/Edit Product ── */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-800 border border-dark-700 rounded-xl max-w-md w-full p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-earth-100">
                  {editingProduct ? "Editar Producto" : "Agregar Producto"}
                </h3>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="p-1 hover:bg-dark-700 rounded transition-colors"
                >
                  <X size={20} className="text-earth-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-earth-300 text-sm font-medium mb-1">
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ej: Zapatillas Running"
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-earth-100 placeholder-earth-500 focus:border-fire-orange outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-earth-300 text-sm font-medium mb-1">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-earth-100 focus:border-fire-orange outline-none transition-colors"
                  >
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                    <option value="Niños">Niños</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-earth-300 text-sm font-medium mb-1">
                      Precio ($)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="Ej: 15999"
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-earth-100 placeholder-earth-500 focus:border-fire-orange outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-earth-300 text-sm font-medium mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      placeholder="Ej: 25"
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-earth-100 placeholder-earth-500 focus:border-fire-orange outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowProductModal(false)}
                    className="flex-1 px-4 py-2 bg-dark-700 border border-dark-600 text-earth-300 rounded-lg font-semibold hover:bg-dark-600 transition-all duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveProduct}
                    className="flex-1 px-4 py-2 bg-fire-orange/20 border border-fire-orange/40 text-fire-orange rounded-lg font-semibold hover:bg-fire-orange/30 transition-all duration-200"
                  >
                    {editingProduct ? "Actualizar" : "Agregar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
