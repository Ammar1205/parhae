'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, User as UserIcon, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getUserProfile, updateUserProfile } from '@/lib/actions/user';
import { toast } from 'react-hot-toast';

export default function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    } else if (user) {
      // Fetch data from Firestore
      getUserProfile(user.uid).then((res) => {
        if (res.success && res.data) {
          setFormData({
            name: res.data.displayName || '',
            phone: res.data.phone || '',
            address: res.data.address || '',
            city: res.data.city || '',
          });
        }
        setIsFetching(false);
      });
    }
  }, [user, authLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    startTransition(async () => {
      const res = await updateUserProfile(user.uid, formData);
      if (res.success) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error(res.error || 'Failed to update profile');
      }
    });
  };

  if (authLoading || isFetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 text-sm font-quicksand font-semibold mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-inner">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <UserIcon size={36} className="text-emerald-600" />
            )}
          </div>
          <h1 className="font-fredoka text-3xl font-bold text-slate-800">My Account</h1>
          <p className="text-slate-500 font-quicksand mt-1">{user.email}</p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-6 sm:p-10"
        >
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="font-fredoka text-xl font-bold text-slate-800">Personal Details</h2>
            <p className="text-sm text-slate-400 font-quicksand mt-1">
              Update your shipping and contact information below. All fields are optional.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 font-quicksand mb-1.5">
                  Full Name
                </label>
                <div className="relative group">
                  <UserIcon className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="E.g., Ahmed Hassan"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-quicksand text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 font-quicksand mb-1.5">
                  Phone Number
                </label>
                <div className="relative group">
                  <Phone className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03XX XXXXXXX"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-quicksand text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-600 font-quicksand mb-1.5">
                  Shipping Address
                </label>
                <div className="relative group">
                  <MapPin className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House / Apartment #, Street Name"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-quicksand text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* City */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-600 font-quicksand mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Lahore, Karachi, Islamabad..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-quicksand text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 25px rgba(5,150,105,0.3)' }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 font-quicksand disabled:opacity-70 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-300"
              >
                <Save size={18} />
                {isPending ? 'Saving...' : 'Save Profile'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
