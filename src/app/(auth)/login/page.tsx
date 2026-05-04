'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();

  const [email,      setEmail]      = useState('');
  const [password,   setPassword]   = useState('');
  const [showPass,   setShowPass]   = useState(false);
  const [remember,   setRemember]   = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [success,    setSuccess]    = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (email === 'test@smartstitch.online' && password === 'password123') {
        setSuccess(true);
        setTimeout(() => router.push('/'), 1500);
      } else {
        setError('Invalid email or password. Try test@smartstitch.online / password123');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-smoke flex">

      {/* ── Left: Brand panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-darkest flex-col items-center justify-center p-12 relative overflow-hidden">

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy/40 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center"
        >
          {/* Logo */}
          <div className="font-display text-5xl font-bold text-white mb-3">
            Smart<span className="text-gold">Stitch</span>
          </div>
          <p className="text-gold text-sm italic mb-12">Wear Your Identity</p>

          {/* 3D shirt emoji */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[120px] mb-12"
          >
            👕
          </motion.div>

          {/* Features */}
          <div className="space-y-4 text-left max-w-xs">
            {[
              'Design custom T-shirts in 3D',
              'Ship to Europe & Middle East',
              'Bulk discounts up to 30% off',
              'Track orders in real-time',
            ].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={11} className="text-gold" />
                </div>
                <span className="text-navy-soft text-sm">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right: Login form ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="font-display text-3xl font-bold text-navy-darkest">
              Smart<span className="text-gold">Stitch</span>
            </div>
          </div>

          <h1 className="font-display text-3xl font-bold text-navy-darkest mb-2">
            Welcome back
          </h1>
          <p className="text-neutral-silver text-sm mb-8">
            Sign in to your account to continue
          </p>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm mb-6"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm mb-6 flex items-center gap-2"
              >
                <Check size={16} /> Login successful! Redirecting...
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-navy-darkest uppercase tracking-wide block mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-silver" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent placeholder:text-neutral-silver transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-navy-darkest uppercase tracking-wide">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-navy hover:text-navy-dark underline underline-offset-2">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-silver" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent placeholder:text-neutral-silver transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-silver hover:text-navy transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRemember(r => !r)}
                className={cn(
                  'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0',
                  remember ? 'bg-navy border-navy' : 'border-gray-300 hover:border-navy'
                )}
              >
                {remember && <Check size={11} className="text-white" />}
              </button>
              <span className="text-sm text-neutral-text">Remember me for 30 days</span>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              disabled={loading || success}
              className={cn(
                'w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base transition-all',
                loading || success
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-neutral-silver">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl text-sm font-medium text-neutral-text hover:border-navy hover:bg-navy-soft transition-all">
              <span className="text-lg">🌐</span> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl text-sm font-medium text-neutral-text hover:border-navy hover:bg-navy-soft transition-all">
              <span className="text-lg">💼</span> LinkedIn
            </button>
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-neutral-silver mt-8">
            Don't have an account?{' '}
            <Link href="/register" className="text-navy font-semibold hover:text-navy-dark transition-colors">
              Create account →
            </Link>
          </p>

          {/* B2B link */}
          <div className="mt-4 p-4 bg-gold-cream border border-gold-light rounded-2xl text-center">
            <p className="text-xs text-gold-dark">
              Looking for <strong>B2B / Wholesale</strong> account?{' '}
              <Link href="/b2b" className="underline font-semibold">Apply here →</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}