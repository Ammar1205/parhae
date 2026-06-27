'use client';
// Cart Drawer - Framer Motion slide-out sheet animation (animation.md: state transitions)
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQty, subtotal, itemCount } = useCart();

  const shippingCost = itemCount >= 2 ? 0 : 200;
  const total = subtotal + shippingCost;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 1 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <ShoppingCart size={18} className="text-emerald-600" />
                </div>
                <div>
                  <h2 className="font-fredoka text-lg font-bold text-slate-800">Your Cart</h2>
                  <p className="text-xs text-slate-400 font-quicksand">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free shipping banner */}
            {itemCount < 2 && (
              <div className="mx-4 mt-4 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-quicksand font-semibold text-center">
                🚚 Add {2 - itemCount} more item{2 - itemCount !== 1 ? 's' : ''} for FREE shipping!
              </div>
            )}
            {itemCount >= 2 && (
              <div className="mx-4 mt-4 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-quicksand font-semibold text-center">
                🎉 You've unlocked FREE shipping!
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                  <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center">
                    <ShoppingCart size={32} className="text-slate-300" />
                  </div>
                  <div>
                    <p className="font-fredoka text-lg text-slate-600">Your cart is empty!</p>
                    <p className="text-sm text-slate-400 font-quicksand mt-1">Explore our amazing products</p>
                  </div>
                  <button
                    onClick={closeDrawer}
                    className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-semibold text-sm font-quicksand hover:bg-emerald-600 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.productId}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3 p-3 bg-slate-50 rounded-2xl"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">📚</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-700 font-quicksand truncate">{item.name}</h4>
                      <p className="text-emerald-600 font-bold text-sm mt-0.5 font-fredoka">Rs. {item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQty(item.productId, item.qty - 1)}
                          className="w-6 h-6 bg-white rounded-lg border border-slate-200 flex items-center justify-center hover:border-emerald-400 transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-sm font-bold text-slate-700 w-6 text-center font-quicksand">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.productId, item.qty + 1)}
                          className="w-6 h-6 bg-white rounded-lg border border-slate-200 flex items-center justify-center hover:border-emerald-400 transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-1.5 text-slate-300 hover:text-red-400 transition-colors self-start"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-100 px-6 py-5 space-y-3 bg-white">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm text-slate-500 font-quicksand">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 font-quicksand">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? 'text-emerald-500 font-semibold' : ''}>
                      {shippingCost === 0 ? 'FREE' : `Rs. ${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-100">
                    <span className="font-fredoka text-base">Total</span>
                    <span className="font-fredoka text-base text-emerald-600">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="group flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-teal-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-300 transition-all duration-300 shadow-lg shadow-emerald-200 font-quicksand"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={closeDrawer}
                  className="w-full py-2.5 text-sm text-slate-400 hover:text-emerald-600 transition-colors font-quicksand"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
