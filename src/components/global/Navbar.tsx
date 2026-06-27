'use client';
// Sticky Navigation - Framer Motion micro-interactions (animation.md)
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingCart, Menu, X, BookOpen, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/category/islamic-cards', label: 'Islamic Cards' },
  { href: '/category/prophet-stories', label: 'Prophet Stories' },
  { href: '/category/sentence-series', label: 'Sentence Series' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { itemCount, toggleDrawer } = useCart();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,1)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.06)',
        }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-40 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200"
              >
                <BookOpen size={18} className="text-white" />
              </motion.div>
              <div>
                <span className="font-fredoka text-xl font-bold text-emerald-700 leading-none">Parhae</span>
                <span className="font-fredoka text-xl font-bold text-teal-500 leading-none"> Likhae</span>
              </div>
            </Link>

            {/* Center Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    whileHover={{ scale: 1.1, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-300 cursor-pointer font-quicksand block"
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <Link href="/search">
                <motion.button
                  whileHover={{ scale: 1.15, y: -1, backgroundColor: '#f0fdf4', boxShadow: '0 4px 12px rgba(5,150,105,0.1)' }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 transition-all duration-300"
                  aria-label="Search products"
                >
                  <Search size={20} />
                </motion.button>
              </Link>

              {/* Profile */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1, y: -1, boxShadow: '0 4px 12px rgba(5,150,105,0.1)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-1.5 p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                  aria-label="User account"
                >
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <User size={20} />
                  )}
                  <ChevronDown size={14} />
                </motion.button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
                    >
                      {user ? (
                        <>
                          <div className="px-4 py-3 border-b border-slate-100">
                            <p className="text-xs text-slate-400 font-quicksand">Signed in as</p>
                            <p className="text-sm font-semibold text-slate-700 truncate font-quicksand">{user.email}</p>
                          </div>
                          <Link href="/account" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 font-quicksand border-b border-slate-50">My Account</Link>
                          <Link href="/orders" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 font-quicksand">My Orders</Link>
                          <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-quicksand">Sign Out</button>
                        </>
                      ) : (
                        <>
                          <Link href="/auth/login" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 font-quicksand">Sign In</Link>
                          <Link href="/auth/register" className="block px-4 py-2.5 text-sm text-emerald-600 font-semibold hover:bg-emerald-50 font-quicksand">Create Account</Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.15, y: -1, boxShadow: '0 4px 12px rgba(5,150,105,0.1)' }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDrawer}
                className="relative p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                aria-label={`Shopping cart, ${itemCount} items`}
              >
                <ShoppingCart size={22} />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {itemCount > 9 ? '9+' : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile hamburger */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileOpen(v => !v)}
                className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t border-slate-100"
            >
              <div className="px-4 py-4 flex flex-col gap-1 bg-white">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-semibold text-slate-600 hover:text-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors font-quicksand"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
