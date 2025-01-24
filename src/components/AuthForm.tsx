'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onSubmit: (data: { fullName: string; email: string; password: string }) => void;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password: string): string => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      const passwordValidationError = validatePassword(formData.password);
      if (passwordValidationError) {
        setPasswordError(passwordValidationError);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }
    }
    setPasswordError('');
    const { confirmPassword, ...submitData } = formData;
    onSubmit(submitData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (mode === 'signup' && (name === 'password' || name === 'confirmPassword')) {
      setPasswordError('');
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-4xl font-bold text-center text-[var(--day-text)] mb-8">
        {mode === 'signin' ? 'Sign Into Your Account' : 'Create Your Account'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'signup' && (
          <div>
            <label htmlFor="fullName" className="block text-[var(--day-text)] font-medium mb-2">
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-[var(--forest-green)] rounded-lg focus:outline-none focus:border-[var(--day-text)]"
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-[var(--day-text)] font-medium mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-[var(--forest-green)] rounded-lg focus:outline-none focus:border-[var(--day-text)]"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-[var(--day-text)] font-medium mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-[var(--forest-green)] rounded-lg focus:outline-none focus:border-[var(--day-text)]"
            required
          />
        </div>
        {mode === 'signup' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-[var(--day-text)] font-medium mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-[var(--forest-green)] rounded-lg focus:outline-none focus:border-[var(--day-text)]"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Password must be at least 8 characters long, contain uppercase and lowercase letters,
              numbers, and special characters.
            </p>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-[var(--forest-green)] text-white py-3 rounded-lg font-medium hover:bg-[var(--day-text)] transition-colors"
        >
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </button>
        {mode === 'signin' ? (
          <p className="text-center mt-4 text-[var(--day-subtext)]">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[var(--forest-green)] hover:underline">
              Sign up here
            </Link>
          </p>
        ) : (
          <p className="text-center mt-4 text-[var(--day-subtext)]">
            Already have an account?{' '}
            <Link href="/signin" className="text-[var(--forest-green)] hover:underline">
              Sign in here
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}