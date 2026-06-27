'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUpEmail, signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();

  // After a Google redirect sign-in, Firebase resolves the user here.
  // Redirect to home as soon as the user is available.
  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    try {
      await signUpEmail(email, password, name);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success('Successfully logged in with Google!');
      router.push('/');
    } catch (err: any) {
      toast.error(err.message || 'Failed to login with Google.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 text-sm font-quicksand font-semibold mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus size={28} className="text-emerald-600" />
          </div>
          <h1 className="font-fredoka text-3xl font-bold text-slate-800">Create Account</h1>
          <p className="text-slate-500 font-quicksand mt-2">Join Parhae Likhae today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 font-quicksand mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-quicksand text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 font-quicksand mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-quicksand text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 font-quicksand mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-quicksand text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
                minLength={6}
                required
              />
            </div>
            <p className="text-xs text-slate-400 font-quicksand mt-1">Must be at least 6 characters.</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl font-quicksand shadow-lg shadow-emerald-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed transition-shadow hover:shadow-xl hover:shadow-emerald-300"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </motion.button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <hr className="w-full border-slate-100" />
          <span className="p-2 text-xs text-slate-400 font-quicksand font-semibold bg-white">OR</span>
          <hr className="w-full border-slate-100" />
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="mt-6 w-full flex items-center justify-center gap-3 py-3.5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-200 hover:text-emerald-700 transition-all duration-300 font-quicksand font-semibold text-slate-700"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-slate-500 font-quicksand">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-emerald-600 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
