'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail, Lock, Eye, EyeOff, User,
  Phone, Building2, ArrowRight, Check, Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type AccountType = 'retail' | 'wholesale' | 'b2b';

interface FormData {
  fullName:    string;
  email:       string;
  phone:       string;
  company:     string;
  country:     string;
  password:    string;
  confirmPass: string;
  accountType: AccountType;
  agreeTerms:  boolean;
  agreeMarketing: boolean;
}

// ─────────────────────────────────────────────
// ACCOUNT TYPES
// ─────────────────────────────────────────────
const ACCOUNT_TYPES = [
  {
    id: 'retail' as AccountType,
    icon: '👤',
    label: 'Personal / Retail',
    desc: 'Ordering for personal use or small quantities',
    badge: null,
  },
  {
    id: 'wholesale' as AccountType,
    icon: '📦',
    label: 'Wholesale',
    desc: 'Regular bulk orders, 10+ pieces',
    badge: '10% off',
  },
  {
    id: 'b2b' as AccountType,
    icon: '🏢',
    label: 'B2B / Corporate',
    desc: 'Company account, invoicing, dedicated support',
    badge: '30% off',
  },
];

const COUNTRIES = [
  { code: 'DE', name: '🇩🇪 Germany' },
  { code: 'GB', name: '🇬🇧 United Kingdom' },
  { code: 'FR', name: '🇫🇷 France' },
  { code: 'NL', name: '🇳🇱 Netherlands' },
  { code: 'BE', name: '🇧🇪 Belgium' },
  { code: 'AT', name: '🇦🇹 Austria' },
  { code: 'CH', name: '🇨🇭 Switzerland' },
  { code: 'SE', name: '🇸🇪 Sweden' },
  { code: 'IT', name: '🇮🇹 Italy' },
  { code: 'ES', name: '🇪🇸 Spain' },
  { code: 'AE', name: '🇦🇪 UAE' },
  { code: 'SA', name: '🇸🇦 Saudi Arabia' },
  { code: 'KW', name: '🇰🇼 Kuwait' },
  { code: 'QA', name: '🇶🇦 Qatar' },
  { code: 'BH', name: '🇧🇭 Bahrain' },
  { code: 'OM', name: '🇴🇲 Oman' },
];

// ─────────────────────────────────────────────
// PASSWORD STRENGTH
// ─────────────────────────────────────────────
function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8)          score++;
  if (/[A-Z]/.test(password))        score++;
  if (/[0-9]/.test(password))        score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score === 0) return { label: '',         color: '',               width: '0%'   };
  if (score === 1) return { label: 'Weak',     color: 'bg-red-400',     width: '25%'  };
  if (score === 2) return { label: 'Fair',     color: 'bg-yellow-400',  width: '50%'  };
  if (score === 3) return { label: 'Good',     color: 'bg-blue-400',    width: '75%'  };
  return             { label: 'Strong',    color: 'bg-emerald-400', width: '100%' };
}

// ─────────────────────────────────────────────
// MAIN REGISTER PAGE
// ─────────────────────────────────────────────
export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    fullName: '', email: '', phone: '', company: '',
    country: '', password: '', confirmPass: '',
    accountType: 'retail', agreeTerms: false, agreeMarketing: false,
  });

  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [success,     setSuccess]     = useState(false);
  const [errors,      setErrors]      = useState<Record<string, string>>({});

  const passwordStrength = getPasswordStrength(form.password);

  const update = (key: keyof FormData, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName)                          e.fullName    = 'Name is required';
    if (!form.email)                             e.email       = 'Email is required';
    if (!form.password)                          e.password    = 'Password is required';
    if (form.password.length < 8)                e.password    = 'Minimum 8 characters';
    if (form.password !== form.confirmPass)      e.confirmPass = 'Passwords do not match';
    if (!form.country)                           e.country     = 'Please select your country';
    if (!form.agreeTerms)                        e.agreeTerms  = 'You must agree to the terms';
    if (form.accountType !== 'retail' && !form.company) e.company = 'Company name is required';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.push('/'), 2000);
    }, 2000);
  };

  // ── Success Screen ──
  if (success) {
    return (
      <div className="min-h-screen bg-neutral-smoke flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check size={36} className="text-emerald-600" />
          </motion.div>
          <h2 className="font-display text-2xl font-bold text-navy-darkest mb-3">
            Account Created! 🎉
          </h2>
          <p className="text-neutral-silver text-sm mb-2">
            Welcome, <strong>{form.fullName}</strong>!
          </p>
          <p className="text-neutral-silver text-sm">
            Redirecting you to the homepage...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-smoke flex">

      {/* ── Left: Brand panel ── */}
      <div className="hidden lg:flex lg:w-5/12 bg-navy-darkest flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy/40 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center"
        >
          <div className="font-display text-5xl font-bold text-white mb-2">
            Smart<span className="text-gold">Stitch</span>
          </div>
          <p className="text-gold text-sm italic mb-10">Wear Your Identity</p>

          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[100px] mb-10"
          >
            🎨
          </motion.div>

          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Join 10,000+ businesses
          </h2>
          <p className="text-navy-soft text-sm mb-8 max-w-xs mx-auto leading-relaxed">
            Create your account and start designing custom T-shirts for Europe and the Middle East.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '10K+', label: 'Customers' },
              { value: '30+',  label: 'Countries' },
              { value: '4.9★', label: 'Rating' },
            ].map(stat => (
              <div key={stat.label} className="text-center p-3 bg-white/5 rounded-2xl">
                <div className="font-display font-bold text-gold text-xl">{stat.value}</div>
                <div className="text-navy-soft text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right: Register form ── */}
      <div className="flex-1 flex items-start justify-center p-6 lg:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg py-6"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="font-display text-3xl font-bold text-navy-darkest">
              Smart<span className="text-gold">Stitch</span>
            </div>
          </div>

          <h1 className="font-display text-3xl font-bold text-navy-darkest mb-1">
            Create Account
          </h1>
          <p className="text-neutral-silver text-sm mb-8">
            Already have an account?{' '}
            <Link href="/login" className="text-navy font-semibold hover:underline">Sign in →</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ── Account Type ── */}
            <div>
              <label className="text-xs font-semibold text-navy-darkest uppercase tracking-wide block mb-3">
                Account Type
              </label>
              <div className="grid grid-cols-1 gap-2">
                {ACCOUNT_TYPES.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => update('accountType', type.id)}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left',
                      form.accountType === type.id
                        ? 'border-navy bg-navy-soft'
                        : 'border-gray-200 bg-white hover:border-navy-light'
                    )}
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-navy-darkest text-sm">{type.label}</span>
                        {type.badge && (
                          <span className="px-2 py-0.5 bg-gold/10 text-gold-dark text-xs font-bold rounded-full border border-gold/20">
                            {type.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-silver">{type.desc}</span>
                    </div>
                    {form.accountType === type.id && (
                      <div className="w-5 h-5 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Personal Info ── */}
            <div className="space-y-4">
              <label className="text-xs font-semibold text-navy-darkest uppercase tracking-wide block">
                Personal Information
              </label>

              {/* Full name */}
              <div>
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-silver" />
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={e => update('fullName', e.target.value)}
                    placeholder="Full Name *"
                    className={cn(
                      'w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-navy transition-all placeholder:text-neutral-silver',
                      errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    )}
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-silver" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    placeholder="Email Address *"
                    className={cn(
                      'w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-navy transition-all placeholder:text-neutral-silver',
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    )}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-silver" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => update('phone', e.target.value)}
                  placeholder="Phone Number (optional)"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy transition-all placeholder:text-neutral-silver"
                />
              </div>

              {/* Company (for wholesale + b2b) */}
              {form.accountType !== 'retail' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="relative">
                    <Building2 size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-silver" />
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => update('company', e.target.value)}
                      placeholder="Company Name *"
                      className={cn(
                        'w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-navy transition-all placeholder:text-neutral-silver',
                        errors.company ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      )}
                    />
                  </div>
                  {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                </motion.div>
              )}

              {/* Country */}
              <div>
                <div className="relative">
                  <Globe size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-silver" />
                  <select
                    value={form.country}
                    onChange={e => update('country', e.target.value)}
                    className={cn(
                      'w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-navy transition-all bg-white appearance-none',
                      form.country ? 'text-neutral-text' : 'text-neutral-silver',
                      errors.country ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    )}
                  >
                    <option value="">Select Country *</option>
                    <optgroup label="🇪🇺 Europe">
                      {COUNTRIES.filter(c => !['AE','SA','KW','QA','BH','OM'].includes(c.code)).map(c => (
                        <option key={c.code} value={c.code}>{c.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="🌙 Middle East">
                      {COUNTRIES.filter(c => ['AE','SA','KW','QA','BH','OM'].includes(c.code)).map(c => (
                        <option key={c.code} value={c.code}>{c.name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
            </div>

            {/* ── Password ── */}
            <div className="space-y-4">
              <label className="text-xs font-semibold text-navy-darkest uppercase tracking-wide block">
                Password
              </label>

              {/* Password input */}
              <div>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-silver" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => update('password', e.target.value)}
                    placeholder="Create password *"
                    className={cn(
                      'w-full pl-11 pr-12 py-3.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-navy transition-all placeholder:text-neutral-silver',
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-silver hover:text-navy transition-colors"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                {/* Strength bar */}
                {form.password && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: passwordStrength.width }}
                        className={cn('h-full rounded-full transition-all', passwordStrength.color)}
                      />
                    </div>
                    <p className={cn(
                      'text-xs mt-1',
                      passwordStrength.label === 'Strong' ? 'text-emerald-600' :
                      passwordStrength.label === 'Good'   ? 'text-blue-600'    :
                      passwordStrength.label === 'Fair'   ? 'text-yellow-600'  : 'text-red-500'
                    )}>
                      {passwordStrength.label && `Password strength: ${passwordStrength.label}`}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-silver" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirmPass}
                    onChange={e => update('confirmPass', e.target.value)}
                    placeholder="Confirm password *"
                    className={cn(
                      'w-full pl-11 pr-12 py-3.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-navy transition-all placeholder:text-neutral-silver',
                      errors.confirmPass ? 'border-red-300 bg-red-50' :
                      form.confirmPass && form.confirmPass === form.password ? 'border-emerald-300' : 'border-gray-200'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-silver hover:text-navy transition-colors"
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                  {form.confirmPass && form.confirmPass === form.password && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                      <Check size={15} className="text-emerald-500" />
                    </div>
                  )}
                </div>
                {errors.confirmPass && <p className="text-red-500 text-xs mt-1">{errors.confirmPass}</p>}
              </div>
            </div>

            {/* ── Checkboxes ── */}
            <div className="space-y-3">
              {/* Terms */}
              <div>
                <button
                  type="button"
                  onClick={() => update('agreeTerms', !form.agreeTerms)}
                  className="flex items-start gap-3 text-left w-full"
                >
                  <div className={cn(
                    'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all',
                    form.agreeTerms ? 'bg-navy border-navy' : 'border-gray-300 hover:border-navy'
                  )}>
                    {form.agreeTerms && <Check size={11} className="text-white" />}
                  </div>
                  <span className="text-sm text-neutral-text">
                    I agree to the{' '}
                    <Link href="/terms" className="text-navy underline" onClick={e => e.stopPropagation()}>Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-navy underline" onClick={e => e.stopPropagation()}>Privacy Policy</Link>
                    <span className="text-red-400"> *</span>
                  </span>
                </button>
                {errors.agreeTerms && <p className="text-red-500 text-xs mt-1 ml-8">{errors.agreeTerms}</p>}
              </div>

              {/* Marketing */}
              <button
                type="button"
                onClick={() => update('agreeMarketing', !form.agreeMarketing)}
                className="flex items-start gap-3 text-left w-full"
              >
                <div className={cn(
                  'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all',
                  form.agreeMarketing ? 'bg-navy border-navy' : 'border-gray-300 hover:border-navy'
                )}>
                  {form.agreeMarketing && <Check size={11} className="text-white" />}
                </div>
                <span className="text-sm text-neutral-text">
                  Send me offers, new arrivals, and bulk discount alerts via email
                </span>
              </button>
            </div>

            {/* ── Submit ── */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className={cn(
                'w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base transition-all',
                loading
                  ? 'bg-navy/60 text-white cursor-not-allowed'
                  : 'bg-navy-darkest hover:bg-navy-dark text-white hover:-translate-y-0.5 hover:shadow-navy'
              )}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-neutral-silver">or sign up with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl text-sm font-medium text-neutral-text hover:border-navy hover:bg-navy-soft transition-all"
              >
                <span className="text-lg">🌐</span> Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl text-sm font-medium text-neutral-text hover:border-navy hover:bg-navy-soft transition-all"
              >
                <span className="text-lg">💼</span> LinkedIn
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}