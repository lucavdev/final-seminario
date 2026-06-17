import { useState } from 'react';
import {
  ArrowLeft, CreditCard, Banknote, Building2, Home, MapPin,
  User, Mail, Phone, CheckCircle2, Package, Flame, ChevronRight,
  Lock, Calendar, Hash
} from 'lucide-react';
import { useCart } from '../context/CartContext';

// ── Validation helpers ──────────────────────────────────────────
const validators = {
  required:   v => v.trim().length > 0 ? '' : 'Este campo es obligatorio.',
  email:      v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Ingresá un email válido.',
  phone:      v => /^\+?[\d\s\-()]{7,15}$/.test(v.trim()) ? '' : 'Ingresá un teléfono válido.',
  postalCode: v => /^\d{4,10}$/.test(v.trim()) ? '' : 'Ingresá un código postal válido.',
  number:     v => /^\d+$/.test(v.trim()) ? '' : 'Solo se permiten números.',
  cardNumber: v => /^\d{13,19}$/.test(v.replace(/\s/g, '')) ? '' : 'Número de tarjeta inválido.',
  cardExpiry: v => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v.trim()) ? '' : 'Formato MM/AA requerido.',
  cardCVV:    v => /^\d{3,4}$/.test(v.trim()) ? '' : 'CVV inválido.',
};

function validate(name, value, deliveryMethod, paymentMethod) {
  switch (name) {
    case 'nombre':       return validators.required(value);
    case 'apellido':     return validators.required(value);
    case 'email':        return validators.email(value);
    case 'telefono':     return validators.phone(value);
    case 'calle':        return deliveryMethod === 'domicilio' ? validators.required(value) : '';
    case 'altura':       return deliveryMethod === 'domicilio' ? validators.number(value) : '';
    case 'codigoPostal': return deliveryMethod === 'domicilio' ? validators.postalCode(value) : '';
    case 'cardNumber':   return (paymentMethod === 'debito' || paymentMethod === 'credito') ? validators.cardNumber(value) : '';
    case 'cardName':     return (paymentMethod === 'debito' || paymentMethod === 'credito') ? validators.required(value) : '';
    case 'cardExpiry':   return (paymentMethod === 'debito' || paymentMethod === 'credito') ? validators.cardExpiry(value) : '';
    case 'cardCVV':      return (paymentMethod === 'debito' || paymentMethod === 'credito') ? validators.cardCVV(value) : '';
    default:             return '';
  }
}

const PaymentOption = ({ id, value, current, onChange, icon: Icon, label }) => (
  <label
    htmlFor={id}
    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
      current === value
        ? 'border-fire-orange bg-fire-orange/10 text-earth-100'
        : 'border-dark-600 bg-dark-700 text-earth-300 hover:border-dark-400'
    }`}
  >
    <input
      type="radio"
      id={id}
      name="payment"
      value={value}
      checked={current === value}
      onChange={() => onChange(value)}
      className="sr-only"
    />
    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
      current === value ? 'border-fire-orange' : 'border-dark-500'
    }`}>
      {current === value && <div className="w-2 h-2 rounded-full bg-fire-orange" />}
    </div>
    <Icon size={18} className={current === value ? 'text-fire-orange' : 'text-earth-500'} />
    <span className="text-sm font-medium">{label}</span>
  </label>
);

// Format card number with spaces every 4 digits
function formatCardNumber(value) {
  return value.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim();
}

// Format expiry MM/AA
function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

export default function Checkout({ onBack, onSuccess }) {
  const { cart, subtotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '',
    telefono: '', calle: '', altura: '', codigoPostal: '',
    cardNumber: '', cardName: '', cardExpiry: '', cardCVV: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const shippingCost = deliveryMethod === 'domicilio' ? 2500 : 0;
  const total = subtotal + shippingCost;

  const handleChange = (field, value) => {
    // Format card fields on the fly
    let formatted = value;
    if (field === 'cardNumber') formatted = formatCardNumber(value);
    if (field === 'cardExpiry') formatted = formatExpiry(value);
    if (field === 'cardCVV')    formatted = value.replace(/\D/g, '').slice(0, 4);

    setForm(prev => ({ ...prev, [field]: formatted }));
    if (touched[field]) {
      const err = validate(field, formatted, deliveryMethod, paymentMethod);
      setErrors(prev => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validate(field, form[field], deliveryMethod, paymentMethod);
    setErrors(prev => ({ ...prev, [field]: err }));
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
    // Clear card errors if switching away from card
    if (method !== 'debito' && method !== 'credito') {
      setErrors(prev => {
        const { cardNumber, cardName, cardExpiry, cardCVV, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateAll = () => {
    const fields = ['nombre', 'apellido', 'email', 'telefono'];
    if (deliveryMethod === 'domicilio') fields.push('calle', 'altura', 'codigoPostal');
    if (paymentMethod === 'debito' || paymentMethod === 'credito') {
      fields.push('cardNumber', 'cardName', 'cardExpiry', 'cardCVV');
    }

    const newErrors = {};
    const newTouched = {};

    fields.forEach(f => {
      newTouched[f] = true;
      const err = validate(f, form[f], deliveryMethod, paymentMethod);
      if (err) newErrors[f] = err;
    });

    if (!paymentMethod)  newErrors._payment  = 'Seleccioná un método de pago.';
    if (!deliveryMethod) newErrors._delivery = 'Seleccioná un método de entrega.';

    setErrors(newErrors);
    setTouched(newTouched);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateAll()) return;
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-scale-in">
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-emerald-400" />
          </div>
          <h2 className="font-display font-black text-3xl text-earth-100 mb-3">¡Compra exitosa!</h2>
          <p className="text-earth-400 mb-2">
            Tu pedido fue recibido correctamente. Te enviaremos la confirmación a
          </p>
          <p className="text-fire-orange font-semibold mb-6">{form.email}</p>
          <div className="glass-card p-4 mb-8 text-left">
            <div className="flex items-center gap-2 mb-3">
              <Package size={16} className="text-fire-orange" />
              <span className="text-sm font-semibold text-earth-200">Detalle de tu pedido</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-earth-400">Método de pago</span>
                <span className="text-earth-200 capitalize">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-earth-400">Entrega</span>
                <span className="text-earth-200">{deliveryMethod === 'domicilio' ? 'Envío a domicilio' : 'Retiro por local'}</span>
              </div>
              <div className="flex justify-between text-sm font-bold mt-2 pt-2 border-t border-dark-600">
                <span className="text-earth-200">Total</span>
                <span className="text-fire-orange">${total.toLocaleString('es-AR')}</span>
              </div>
            </div>
          </div>
          <button onClick={onBack} className="btn-fire flex items-center gap-2 mx-auto">
            <Flame size={16} />
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  const isCard = paymentMethod === 'debito' || paymentMethod === 'credito';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in-up">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-earth-400 hover:text-earth-100 transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="text-sm font-medium">Volver al carrito</span>
      </button>

      <h1 className="font-display font-black text-3xl text-earth-100 mb-8">
        Finalizar <span className="text-fire-gradient">Compra</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ── Left: Form ── */}
        <div className="lg:col-span-2 space-y-8">
          {/* Payment Method */}
          <section className="glass-card p-6">
            <h2 className="font-semibold text-earth-100 mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-fire-orange" />
              Método de Pago
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <PaymentOption id="pay-transfer" value="transferencia" current={paymentMethod} onChange={handlePaymentChange} icon={Banknote} label="Transferencia" />
              <PaymentOption id="pay-debit"    value="debito"        current={paymentMethod} onChange={handlePaymentChange} icon={CreditCard} label="Tarjeta de Débito" />
              <PaymentOption id="pay-credit"   value="credito"       current={paymentMethod} onChange={handlePaymentChange} icon={Building2}  label="Tarjeta de Crédito" />
            </div>
            {errors._payment && <p className="text-fire-red text-xs mt-3 animate-fade-in">⚠ {errors._payment}</p>}

            {/* Card Fields */}
            {isCard && (
              <div className="mt-6 animate-fade-in-up border-t border-dark-600 pt-6 space-y-4">
                <h3 className="font-medium text-earth-200 text-sm flex items-center gap-2">
                  <Lock size={15} className="text-fire-orange" />
                  Datos de la tarjeta
                </h3>
                <div className="grid gap-4">
                  {/* Card Number */}
                  <div>
                    <label className="text-xs text-earth-400 block mb-1.5">Número de tarjeta <span className="text-fire-red">*</span></label>
                    <div className="relative">
                      <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                      <input
                        type="text"
                        value={form.cardNumber}
                        onChange={e => handleChange('cardNumber', e.target.value)}
                        onBlur={() => handleBlur('cardNumber')}
                        placeholder="1234 5678 9012 3456"
                        maxLength={23}
                        className={`input-field pl-9 font-mono tracking-widest ${errors.cardNumber ? 'border-fire-red' : ''}`}
                      />
                    </div>
                    {errors.cardNumber && <p className="text-fire-red text-xs mt-1">{errors.cardNumber}</p>}
                  </div>

                  {/* Card Name */}
                  <div>
                    <label className="text-xs text-earth-400 block mb-1.5">Nombre en la tarjeta <span className="text-fire-red">*</span></label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                      <input
                        type="text"
                        value={form.cardName}
                        onChange={e => handleChange('cardName', e.target.value)}
                        onBlur={() => handleBlur('cardName')}
                        placeholder="JUAN GARCIA"
                        className={`input-field pl-9 uppercase ${errors.cardName ? 'border-fire-red' : ''}`}
                      />
                    </div>
                    {errors.cardName && <p className="text-fire-red text-xs mt-1">{errors.cardName}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Expiry */}
                    <div>
                      <label className="text-xs text-earth-400 block mb-1.5">Vencimiento <span className="text-fire-red">*</span></label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                        <input
                          type="text"
                          value={form.cardExpiry}
                          onChange={e => handleChange('cardExpiry', e.target.value)}
                          onBlur={() => handleBlur('cardExpiry')}
                          placeholder="MM/AA"
                          maxLength={5}
                          className={`input-field pl-9 font-mono ${errors.cardExpiry ? 'border-fire-red' : ''}`}
                        />
                      </div>
                      {errors.cardExpiry && <p className="text-fire-red text-xs mt-1">{errors.cardExpiry}</p>}
                    </div>

                    {/* CVV */}
                    <div>
                      <label className="text-xs text-earth-400 block mb-1.5">CVV <span className="text-fire-red">*</span></label>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                        <input
                          type="password"
                          value={form.cardCVV}
                          onChange={e => handleChange('cardCVV', e.target.value)}
                          onBlur={() => handleBlur('cardCVV')}
                          placeholder="•••"
                          maxLength={4}
                          className={`input-field pl-9 font-mono ${errors.cardCVV ? 'border-fire-red' : ''}`}
                        />
                      </div>
                      {errors.cardCVV && <p className="text-fire-red text-xs mt-1">{errors.cardCVV}</p>}
                    </div>
                  </div>
                </div>

                {/* Security note */}
                <div className="flex items-center gap-2 text-xs text-earth-500 bg-dark-700/50 rounded-lg px-3 py-2">
                  <Lock size={12} className="text-emerald-500 flex-shrink-0" />
                  Tus datos están protegidos con encriptación SSL de 256 bits.
                </div>
              </div>
            )}
          </section>

          {/* Delivery Method */}
          <section className="glass-card p-6">
            <h2 className="font-semibold text-earth-100 mb-4 flex items-center gap-2">
              <Package size={18} className="text-fire-orange" />
              Método de Entrega
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <label
                htmlFor="del-local"
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  deliveryMethod === 'local' ? 'border-fire-orange bg-fire-orange/10' : 'border-dark-600 bg-dark-700 hover:border-dark-400'
                }`}
              >
                <input type="radio" id="del-local" name="delivery" className="sr-only" onChange={() => setDeliveryMethod('local')} checked={deliveryMethod === 'local'} />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${deliveryMethod === 'local' ? 'border-fire-orange' : 'border-dark-500'}`}>
                  {deliveryMethod === 'local' && <div className="w-2 h-2 rounded-full bg-fire-orange" />}
                </div>
                <Building2 size={18} className={deliveryMethod === 'local' ? 'text-fire-orange' : 'text-earth-500'} />
                <div>
                  <p className="text-sm font-medium text-earth-100">Retiro por local</p>
                  <p className="text-xs text-earth-500">Sin costo adicional</p>
                </div>
              </label>

              <label
                htmlFor="del-domicilio"
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  deliveryMethod === 'domicilio' ? 'border-fire-orange bg-fire-orange/10' : 'border-dark-600 bg-dark-700 hover:border-dark-400'
                }`}
              >
                <input type="radio" id="del-domicilio" name="delivery" className="sr-only" onChange={() => setDeliveryMethod('domicilio')} checked={deliveryMethod === 'domicilio'} />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${deliveryMethod === 'domicilio' ? 'border-fire-orange' : 'border-dark-500'}`}>
                  {deliveryMethod === 'domicilio' && <div className="w-2 h-2 rounded-full bg-fire-orange" />}
                </div>
                <Home size={18} className={deliveryMethod === 'domicilio' ? 'text-fire-orange' : 'text-earth-500'} />
                <div>
                  <p className="text-sm font-medium text-earth-100">Envío a domicilio</p>
                  <p className="text-xs text-earth-500">+$2.500</p>
                </div>
              </label>
            </div>
            {errors._delivery && <p className="text-fire-red text-xs mt-3 animate-fade-in">⚠ {errors._delivery}</p>}

            {/* Shipping form – condicional */}
            {deliveryMethod === 'domicilio' && (
              <div className="mt-6 animate-fade-in-up space-y-4 border-t border-dark-600 pt-6">
                <h3 className="font-medium text-earth-200 text-sm flex items-center gap-2">
                  <MapPin size={15} className="text-fire-orange" />
                  Datos personales y dirección
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div>
                    <label className="text-xs text-earth-400 block mb-1.5">Nombre <span className="text-fire-red">*</span></label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                      <input
                        type="text"
                        value={form.nombre}
                        onChange={e => handleChange('nombre', e.target.value)}
                        onBlur={() => handleBlur('nombre')}
                        placeholder="Juan"
                        className={`input-field pl-9 ${errors.nombre ? 'border-fire-red' : ''}`}
                      />
                    </div>
                    {errors.nombre && <p className="text-fire-red text-xs mt-1">{errors.nombre}</p>}
                  </div>

                  {/* Apellido */}
                  <div>
                    <label className="text-xs text-earth-400 block mb-1.5">Apellido <span className="text-fire-red">*</span></label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                      <input
                        type="text"
                        value={form.apellido}
                        onChange={e => handleChange('apellido', e.target.value)}
                        onBlur={() => handleBlur('apellido')}
                        placeholder="García"
                        className={`input-field pl-9 ${errors.apellido ? 'border-fire-red' : ''}`}
                      />
                    </div>
                    {errors.apellido && <p className="text-fire-red text-xs mt-1">{errors.apellido}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs text-earth-400 block mb-1.5">Email <span className="text-fire-red">*</span></label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="juan@ejemplo.com"
                        className={`input-field pl-9 ${errors.email ? 'border-fire-red' : ''}`}
                      />
                    </div>
                    {errors.email && <p className="text-fire-red text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="text-xs text-earth-400 block mb-1.5">Teléfono <span className="text-fire-red">*</span></label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                      <input
                        type="tel"
                        value={form.telefono}
                        onChange={e => handleChange('telefono', e.target.value)}
                        onBlur={() => handleBlur('telefono')}
                        placeholder="+54 11 1234-5678"
                        className={`input-field pl-9 ${errors.telefono ? 'border-fire-red' : ''}`}
                      />
                    </div>
                    {errors.telefono && <p className="text-fire-red text-xs mt-1">{errors.telefono}</p>}
                  </div>

                  {/* Calle */}
                  <div>
                    <label className="text-xs text-earth-400 block mb-1.5">Calle <span className="text-fire-red">*</span></label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                      <input
                        type="text"
                        value={form.calle}
                        onChange={e => handleChange('calle', e.target.value)}
                        onBlur={() => handleBlur('calle')}
                        placeholder="Av. Corrientes"
                        className={`input-field pl-9 ${errors.calle ? 'border-fire-red' : ''}`}
                      />
                    </div>
                    {errors.calle && <p className="text-fire-red text-xs mt-1">{errors.calle}</p>}
                  </div>

                  {/* Altura */}
                  <div>
                    <label className="text-xs text-earth-400 block mb-1.5">Altura <span className="text-fire-red">*</span></label>
                    <input
                      type="text"
                      value={form.altura}
                      onChange={e => handleChange('altura', e.target.value)}
                      onBlur={() => handleBlur('altura')}
                      placeholder="1234"
                      className={`input-field ${errors.altura ? 'border-fire-red' : ''}`}
                    />
                    {errors.altura && <p className="text-fire-red text-xs mt-1">{errors.altura}</p>}
                  </div>

                  {/* Código Postal */}
                  <div>
                    <label className="text-xs text-earth-400 block mb-1.5">Código Postal <span className="text-fire-red">*</span></label>
                    <input
                      type="text"
                      value={form.codigoPostal}
                      onChange={e => handleChange('codigoPostal', e.target.value)}
                      onBlur={() => handleBlur('codigoPostal')}
                      placeholder="1000"
                      className={`input-field ${errors.codigoPostal ? 'border-fire-red' : ''}`}
                    />
                    {errors.codigoPostal && <p className="text-fire-red text-xs mt-1">{errors.codigoPostal}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Email/Phone for local pickup */}
            {deliveryMethod === 'local' && (
              <div className="mt-6 animate-fade-in-up space-y-4 border-t border-dark-600 pt-6">
                <h3 className="font-medium text-earth-200 text-sm flex items-center gap-2">
                  <User size={15} className="text-fire-orange" />
                  Datos de contacto
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-earth-400 block mb-1.5">Nombre <span className="text-fire-red">*</span></label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                      <input type="text" value={form.nombre} onChange={e => handleChange('nombre', e.target.value)} onBlur={() => handleBlur('nombre')} placeholder="Juan" className={`input-field pl-9 ${errors.nombre ? 'border-fire-red' : ''}`} />
                    </div>
                    {errors.nombre && <p className="text-fire-red text-xs mt-1">{errors.nombre}</p>}
                  </div>
                  <div>
                    <label className="text-xs text-earth-400 block mb-1.5">Apellido <span className="text-fire-red">*</span></label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                      <input type="text" value={form.apellido} onChange={e => handleChange('apellido', e.target.value)} onBlur={() => handleBlur('apellido')} placeholder="García" className={`input-field pl-9 ${errors.apellido ? 'border-fire-red' : ''}`} />
                    </div>
                    {errors.apellido && <p className="text-fire-red text-xs mt-1">{errors.apellido}</p>}
                  </div>
                  <div>
                    <label className="text-xs text-earth-400 block mb-1.5">Email <span className="text-fire-red">*</span></label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                      <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} onBlur={() => handleBlur('email')} placeholder="juan@ejemplo.com" className={`input-field pl-9 ${errors.email ? 'border-fire-red' : ''}`} />
                    </div>
                    {errors.email && <p className="text-fire-red text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-xs text-earth-400 block mb-1.5">Teléfono <span className="text-fire-red">*</span></label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                      <input type="tel" value={form.telefono} onChange={e => handleChange('telefono', e.target.value)} onBlur={() => handleBlur('telefono')} placeholder="+54 11 1234-5678" className={`input-field pl-9 ${errors.telefono ? 'border-fire-red' : ''}`} />
                    </div>
                    {errors.telefono && <p className="text-fire-red text-xs mt-1">{errors.telefono}</p>}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* ── Right: Order summary ── */}
        <div className="space-y-4">
          <div className="glass-card p-5 sticky top-24">
            <h3 className="font-semibold text-earth-100 mb-4 flex items-center gap-2">
              <Package size={16} className="text-fire-orange" />
              Resumen del pedido
            </h3>

            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto scrollbar-hide">
              {cart.map(item => (
                <div key={item.cartKey} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-earth-200 text-xs font-medium line-clamp-1">{item.name}</p>
                    <p className="text-earth-500 text-xs">T: {item.size} × {item.quantity}</p>
                  </div>
                  <span className="text-earth-200 text-xs font-semibold flex-shrink-0">
                    ${(item.price * item.quantity).toLocaleString('es-AR')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-dark-600 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-earth-400">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-sm text-earth-400">
                <span>Envío</span>
                <span>{deliveryMethod === 'domicilio' ? '$2.500' : deliveryMethod === 'local' ? 'Gratis' : '-'}</span>
              </div>
              <div className="flex justify-between font-bold text-earth-100 text-base border-t border-dark-600 pt-2 mt-2">
                <span>Total</span>
                <span className="text-fire-orange">${total.toLocaleString('es-AR')}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="btn-fire w-full mt-5 flex items-center justify-center gap-2"
            >
              <Flame size={16} />
              Finalizar Compra
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
