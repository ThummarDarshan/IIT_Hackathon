import React, { useState } from 'react';
import { XIcon } from 'lucide-react';

interface SignupModalProps {
  onClose: () => void;
  onSignup: (name: string, email: string, password: string) => Promise<void>;
  defaultEmail?: string;
  onSwitchToLogin?: () => void;
}

export default function SignupModal({
  onClose,
  onSignup,
  defaultEmail = '',
  onSwitchToLogin
}: SignupModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email is required';
    if (password.length < 6) e.password = 'Password must be at least 6 characters';
    if (password !== confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await onSignup(name, email, password);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      await onSignup('Analyst', 'analyst@example.com', 'oauth-google');
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl w-full max-w-md p-6 z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Account</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">For demo: Use any password</p>
            </div>
            <div className="mb-6">
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input id="confirm" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              {errors.confirm && <div className="text-xs text-red-500 mt-1">{errors.confirm}</div>}
            </div>
            <button type="submit" disabled={isLoading} className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 disabled:opacity-50">
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <div className="mt-3">
            <button onClick={handleGoogle} disabled={isLoading} className="w-full px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-md flex items-center justify-center dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5 mr-2" />
              Sign up with Google
            </button>
          </div>
          {onSwitchToLogin && (
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              <span>Already have an account?</span>
              <button onClick={onSwitchToLogin} className="ml-1 text-blue-600 dark:text-blue-400 hover:underline">Sign in</button>
            </div>
          )}
        </div>
      </div>
    </div>;
}


