import { useState } from 'react';
import { Flame, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login({ onSuccess, onGoToRegister }) {
  const { login } = useAuth();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim())                           e.email    = 'El email es obligatorio.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Ingresá un email válido.';
    if (!form.password)                               e.password = 'La contraseña es obligatoria.';
    return e;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Simulate tiny async delay for UX feedback
    await new Promise(r => setTimeout(r, 400));
    const result = login(form.email, form.password);
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
        style={{ backgroundImage: 'radial-gradient(ellipse at 50% 40%, #FF6B00 0%, transparent 55%)' }}
      />

      <div className="relative w-full max-w-md animate-scale-in">
        {/* Card */}
        <div className="glass-card p-8 sm:p-10">
          {/* Logo */}
          <div className="flex items-center gap-2 justify-center mb-8">
            <Flame size={26} className="text-fire-orange" style={{ filter: 'drop-shadow(0 0 8px #FF6B00)' }} />
            <span className="font-display font-black text-2xl text-fire-gradient" style={{ fontFamily: 'Outfit, sans-serif' }}>FUEGO</span>
            <span className="font-display font-light text-2xl text-earth-200 tracking-widest" style={{ fontFamily: 'Outfit, sans-serif' }}>SPORT</span>
          </div>

          <h1 className="font-display font-bold text-2xl text-earth-100 text-center mb-1">Iniciar sesión</h1>
          <p className="text-earth-500 text-sm text-center mb-8">Bienvenido de nuevo 🔥</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Global error */}
            {errors._global && (
              <div className="bg-fire-red/10 border border-fire-red/30 text-fire-red text-sm px-4 py-3 rounded-xl animate-fade-in">
                ⚠ {errors._global}
              </div>
            )}

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
              <label className="text-xs text-earth-400 block mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="Tu contraseña"
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
                <>Ingresar <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-earth-500 text-sm mt-6">
            ¿No tenés cuenta?{' '}
            <button
              onClick={onGoToRegister}
              className="text-fire-orange hover:text-fire-amber font-semibold transition-colors"
            >
              Registrate
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
