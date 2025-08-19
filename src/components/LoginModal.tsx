import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
interface LoginModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  defaultEmail?: string;
}
export default function LoginModal({
  onClose,
  onLogin,
  defaultEmail = ''
}: LoginModalProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('password'); // Pre-filled for demo purposes
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onLogin(email, password);
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
      // Would handle error feedback in a real app
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl w-full max-w-md p-6 z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sign In</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                For demo: Use any password
              </p>
            </div>
            <button type="submit" disabled={isLoading} className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 disabled:opacity-50">
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Demo credentials:</p>
            <p className="mt-1">Analyst: analyst@example.com</p>
            <p className="mt-1">Admin: admin@example.com</p>
          </div>
        </div>
      </div>
    </div>;
}