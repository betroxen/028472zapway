import React, { useContext } from 'react';
import { Modal } from './Modal';
import { AppContext } from '../context/AppContext';
import { Button } from './Button';
import { Input } from './Input';
import { Icons } from './icons';

export const LoginModal: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const { isLoginModalOpen, closeLoginModal, switchToRegister, login } = appContext;
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form validation and API calls
    login(); // Using mock login from context
  };

  return (
    <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal} title="LOG IN PROTOCOL">
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-2 block">Email</label>
          <div className="relative">
            <Icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary h-4 w-4" />
            <Input type="email" placeholder="operator@zapway.corp" required className="pl-10" />
          </div>
        </div>
        <div>
          <label className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-2 block">Password</label>
          <div className="relative">
             <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary h-4 w-4" />
             <Input type="password" placeholder="••••••••••••" required className="pl-10" />
          </div>
           <a href="#" className="text-xs text-text-tertiary hover:text-neon-surge mt-2 block text-right">Forgot password?</a>
        </div>
        
        <Button type="submit" size="lg" className="w-full uppercase tracking-widest">
          Authenticate
        </Button>
        
        <p className="text-center text-sm text-text-tertiary">
          No account?{' '}
          <button type="button" onClick={switchToRegister} className="font-bold text-neon-surge hover:underline">
            Join the Circuit
          </button>
        </p>
      </form>
    </Modal>
  );
};