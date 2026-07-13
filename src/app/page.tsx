'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Dispatcher');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);



  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login';
      const body = isSignUp ? { name, email, password, role } : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex w-full min-h-screen">
        <aside className="hidden lg:flex flex-col w-[480px] bg-[#0b1326] border-r border-white/5 p-8 xl:p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-inverse-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-inverse-primary/20">
                  <span className="material-symbols-outlined fill text-[28px]">grid_view</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">TransitOps</h1>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm">
                Smart Transport Operations Platform
              </p>
            </div>

            <div className="flex-grow flex flex-col justify-center">
              <h2 className="font-headline-md text-headline-md mb-8 text-on-surface">One login, four roles:</h2>
              <ul className="space-y-5 font-body-lg text-body-lg text-on-surface-variant">
                <li className="flex items-center gap-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.5)]"></span>
                  Fleet Manager
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(173,198,255,0.5)]"></span>
                  Dispatcher
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-error shadow-[0_0_8px_rgba(255,180,171,0.5)]"></span>
                  Safety Officer
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(192,193,255,0.5)]"></span>
                  Financial Analyst
                </li>
              </ul>
            </div>

            <div className="mt-16 font-label-sm text-label-sm text-outline-variant uppercase tracking-wider">
              TransitOps © 2026 · RBAC ENA
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 bg-[#0e1628]">
          <div className="w-full max-w-[440px]">
            <div className="mb-12 text-center lg:text-left">
              <h2 className="font-headline-lg text-headline-lg mb-3 text-on-surface tracking-tight">
                {isSignUp ? 'Create your account' : 'Sign in to your account'}
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                {isSignUp ? 'Enter your details to get started' : 'Enter your credentials to continue'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              {error && (
                <div className="p-3 bg-error/10 border border-error/50 rounded-lg text-error text-sm font-medium">
                  {error}
                </div>
              )}

              {isSignUp && (
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider" htmlFor="name">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                      <span className="material-symbols-outlined text-[20px]">person</span>
                    </div>
                    <input 
                      className="block w-full pl-11 pr-4 py-3.5 bg-surface-container border border-outline-variant rounded-lg focus:ring-2 focus:ring-inverse-primary focus:border-inverse-primary text-on-surface font-body-lg text-body-lg transition-all placeholder:text-outline-variant shadow-sm" 
                      id="name" 
                      name="name" 
                      required 
                      type="text" 
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider" htmlFor="email">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <input 
                    className="block w-full pl-11 pr-4 py-3.5 bg-surface-container border border-outline-variant rounded-lg focus:ring-2 focus:ring-inverse-primary focus:border-inverse-primary text-on-surface font-body-lg text-body-lg transition-all placeholder:text-outline-variant shadow-sm" 
                    id="email" 
                    name="email" 
                    required 
                    type="email" 
                    placeholder="you@transitops.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider" htmlFor="password">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input 
                    className="block w-full pl-11 pr-11 py-3.5 bg-surface-container border border-outline-variant rounded-lg focus:ring-2 focus:ring-inverse-primary focus:border-inverse-primary text-on-surface font-body-lg text-body-lg transition-all placeholder:text-outline-variant shadow-sm" 
                    id="password" 
                    name="password" 
                    required 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider" htmlFor="role">Select Role</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                      <span className="material-symbols-outlined text-[20px]">work</span>
                    </div>
                    <select 
                      className="block w-full pl-11 pr-11 py-3.5 bg-surface-container border border-outline-variant rounded-lg focus:ring-2 focus:ring-inverse-primary focus:border-inverse-primary text-on-surface font-body-lg text-body-lg appearance-none transition-all shadow-sm cursor-pointer hover:border-outline" 
                      id="role" 
                      name="role" 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="Dispatcher">Dispatcher</option>
                      <option value="Fleet Manager">Fleet Manager</option>
                      <option value="Safety Officer">Safety Officer</option>
                      <option value="Financial Analyst">Financial Analyst</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-outline">
                      <span className="material-symbols-outlined text-[20px]">expand_more</span>
                    </div>
                  </div>
                </div>

              <div className="flex items-center justify-between pt-2">
                {!isSignUp && (
                  <>
                    <div className="flex items-center">
                      <input defaultChecked className="h-4 w-4 rounded border-outline-variant bg-surface-container text-inverse-primary focus:ring-inverse-primary focus:ring-offset-2 transition-colors cursor-pointer" id="remember-me" name="remember-me" type="checkbox" />
                      <label className="ml-2.5 block font-body-md text-body-md text-on-surface-variant cursor-pointer" htmlFor="remember-me">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a className="font-body-md text-body-md text-primary hover:text-primary-fixed transition-colors font-medium" href="#">
                        Forgot password?
                      </a>
                    </div>
                  </>
                )}
              </div>

              <button 
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg bg-inverse-primary text-white font-label-md text-label-md uppercase tracking-widest hover:bg-inverse-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-inverse-primary transition-all btn-primary shadow-lg disabled:opacity-50" 
                type="submit"
              >
                {loading ? (isSignUp ? 'Creating Account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
              </button>

              <div className="text-center mt-4">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                  }} 
                  className="font-body-md text-body-md text-primary hover:text-primary-fixed transition-colors font-medium"
                >
                  {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                </button>
              </div>
            </form>

            <div className="mt-10 pt-8 border-t border-outline-variant/30">
              <p className="font-label-sm text-label-sm text-outline mb-3">Access is scoped by role after login:</p>
              <ul className="font-body-md text-sm text-on-surface-variant space-y-1.5 opacity-80">
                <li>• Fleet Manager → Fleet, Maintenance</li>
                <li>• Dispatcher → Dashboard, Trips</li>
                <li>• Safety Officer → Drivers, Compliance</li>
                <li>• Financial Analyst → Fuel &amp; Expenses</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}