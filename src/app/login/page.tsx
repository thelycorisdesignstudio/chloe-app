"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/sections/Navigation';
import { signIn } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn.email({ email, password });
      if (result.error) {
        setError(result.error.message || 'Invalid email or password');
      } else {
        window.location.href = '/explore';
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F1F8] flex items-center justify-center px-6 pt-28 pb-12">
      <Navigation />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-[#3C2364] font-black text-4xl uppercase">
            Chloe
          </Link>
          <p className="text-[#3C2364]/70 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-[40px] border-2 border-[#3C2364] p-8 shadow-[4px_4px_0px_0px_#3C2364]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-[#3C2364] font-bold text-sm mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-[#3C2364]/20 focus:border-[#3C2364] focus:outline-none text-[#3C2364]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#3C2364] font-bold text-sm mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#3C2364]/20 focus:border-[#3C2364] focus:outline-none text-[#3C2364]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3C2364] text-white font-bold py-3 rounded-xl hover:bg-[#3C2364]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Sign In
            </button>
          </form>

          <p className="text-center text-[#3C2364]/70 mt-6 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#3C2364] font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
