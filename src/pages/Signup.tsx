import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { MailIcon, LockIcon, UserIcon } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email is required';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Demo: auto-login as analyst after signup
    await login('analyst@example.com', 'signup');
    navigate('/dashboard');
  };
  const handleGoogle = async () => {
    await login('analyst@example.com', 'oauth-google');
    navigate('/dashboard');
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create your account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white" required />
          {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white" required />
          {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Password</label>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white" required minLength={6} />
          {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Confirm Password</label>
          <input type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white" required />
          {errors.confirm && <div className="text-xs text-red-500 mt-1">{errors.confirm}</div>}
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">Create account</button>
      </form>
      <div className="mt-3">
        <button onClick={handleGoogle} className="w-full px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-md flex items-center justify-center dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5 mr-2" />
          Sign up with Google
        </button>
      </div>
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?
        <button onClick={() => navigate('/')} className="ml-1 text-blue-600 dark:text-blue-400 hover:underline">Sign in</button>
      </div>
      </div>
    </div>
  );
}


