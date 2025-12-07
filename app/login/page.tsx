"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Close Button */}
      <header className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-3 border-b border-gray-200 max-w-md md:max-w-2xl mx-auto">
        <Link
          href="/"
          className="p-2 text-black hover:bg-gray-100 rounded transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-black">Sign In</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-6 lg:px-8 py-8 md:py-12 max-w-md md:max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-black font-medium mb-2"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 md:py-3.5 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-black font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 md:py-3.5 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div>
            <Link
              href="#"
              className="text-black underline text-sm hover:text-gray-600"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Privacy Policy Checkbox */}
          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-gray-800 border-gray-300 rounded focus:ring-gray-800"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-black">
              Privacy policy and terms of service
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 md:py-3.5 px-4 rounded-lg md:rounded-xl font-medium hover:bg-gray-800 active:bg-gray-900 transition-all shadow-sm hover:shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Sign In Button */}
        <button className="w-full bg-white border border-gray-300 text-black py-3 md:py-3.5 px-4 rounded-lg md:rounded-xl font-medium hover:bg-gray-50 active:bg-gray-100 transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <span className="text-black">Already have an account? </span>
          <Link href="#" className="text-black underline hover:text-gray-600">
            Sign up
          </Link>
        </div>
      </main>
    </div>
  );
}
