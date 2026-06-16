import { useState } from 'react';
import { Flame, Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register({ onSuccess, onGoToLogin }) {
  const { register } = useAuth();
  const [form, setForm]     = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                                   e.name     = 'El nombre es obligatorio.';
    if (!form.email.trim())                                  e.email    = 'El email es obligatorio.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email  = 'Ingresá un email válido.';
    if (!form.password)                                      e.password = 'La contraseña es obligatoria.';
    else if (form.password.length < 6)                       e.password = 'Mínimo 6 caracteres.';
    return e;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const result = register(form.name, form.email, form.password);
    setLoading(false);
    if (result.success) {
      onSuccess();
    } else {
      setErrors({ _global: result.error });
    }
  };

  const set = (field, val) => {
    setForm(p => ({ ...p, [field]: val }));
    setErrors(p => ({ ...p, [field]: '', _global: '' }));
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'radial-gradient(ellipse at 50% 40%, #FFA500 0%, transparent 55%)' }}
      />

      <div className="relative w-full max-w-md animate-scale-in">
        <div className="glass-card p-8 sm:p-10">
          {/* Logo */}
          <div className="flex items-center gap-2 justify-center mb-8">
            <Flame size={26} className="text-fire-orange" style={{ filter: 'drop-shadow(0 0 8px #FF6B00)' }} />
            <span className="font-display font-black text-2xl text-fire-gradient" style={{ fontFamily: 'Outfit, sans-serif' }}>FUEGO</span>
            <span className="font-display font-light text-2xl text-earth-200 tracking-widest" style={{ fontFamily: 'Outfit, sans-serif' }}>SPORT</span>
          </div>

          <h1 className="font-display font-bold text-2xl text-earth-100 text-center mb-1">Crear cuenta</h1>
          <p className="text-earth-500 text-sm text-center mb-8">Unite a la comunidad Fuego Sport 🔥</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Global error */}
            {errors._global && (
              <div className="bg-fire-red/10 border border-fire-red/30 text-fire-red text-sm px-4 py-3 rounded-xl animate-fade-in">
                ⚠ {errors._global}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="text-xs text-earth-400 block mb-1.5">Nombre</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                <input
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="Tu nombre"
                  className={`input-field pl-9 ${errors.name ? 'border-fire-red' : ''}`}
                />
              </div>
              {errors.name && <p className="text-fire-red text-xs mt-1 animate-fade-in">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-earth-400 block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="tu@email.com"
                  className={`input-field pl-9 ${errors.email ? 'border-fire-red' : ''}`}
                />
              </div>
              {errors.email && <p className="text-fire-red text-xs mt-1 animate-fade-in">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-earth-400 block mb-1.5">Contraseña <span className="text-earth-600">(mín. 6 caracteres)</span></label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="Elegí una contraseña"
                  className={`input-field pl-9 pr-10 ${errors.password ? 'border-fire-red' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-500 hover:text-earth-300 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-fire-red text-xs mt-1 animate-fade-in">{errors.password}</p>}

              {/* Password strength bar */}
              {form.password.length > 0 && (
                <div className="mt-2 flex gap-1">
                  {[3, 6, 10].map((threshold, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      form.password.length >= threshold
                        ? i === 0 ? 'bg-fire-red' : i === 1 ? 'bg-fire-amber' : 'bg-emerald-500'
                        : 'bg-dark-600'
                    }`} />
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-fire w-full flex items-center justify-center gap-2 text-sm py-3 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-dark-900/40 border-t-dark-900 rounded-full animate-spin" />
              ) : (
                <>Crear cuenta <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-earth-500 text-sm mt-6">
            ¿Ya tenés cuenta?{' '}
            <button
              onClick={onGoToLogin}
              className="text-fire-orange hover:text-fire-amber font-semibold transition-colors"
            >
              Iniciá sesión
            </button>
          </p>

          {/* Back to catalog */}
          <p className="text-center mt-3">
            <button onClick={onSuccess} className="text-earth-600 hover:text-earth-400 text-xs transition-colors">
              Continuar sin cuenta →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
