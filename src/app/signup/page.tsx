"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signUp.email({ name, email, password });
      if (result.error) {
        setError(result.error.message || 'Failed to create account');
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
    <main className="min-h-screen bg-[#F7F5F2] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-[#004D3F] font-black text-4xl uppercase">
            Chloe
          </Link>
          <p className="text-[#004D3F]/70 mt-2">Create your account</p>
        </div>

        <div className="bg-white rounded-[40px] border-2 border-[#004D3F] p-8 shadow-[4px_4px_0px_0px_#004D3F]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-[#004D3F] font-bold text-sm mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-[#004D3F]/20 focus:border-[#004D3F] focus:outline-none text-[#004D3F]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[#004D3F] font-bold text-sm mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-[#004D3F]/20 focus:border-[#004D3F] focus:outline-none text-[#004D3F]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#004D3F] font-bold text-sm mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#004D3F]/20 focus:border-[#004D3F] focus:outline-none text-[#004D3F]"
                placeholder="Min. 8 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#004D3F] text-white font-bold py-3 rounded-xl hover:bg-[#004D3F]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Account
            </button>
          </form>

          <p className="text-center text-[#004D3F]/70 mt-6 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-[#004D3F] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
