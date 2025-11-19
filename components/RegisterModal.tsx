import React, { useContext } from 'react';
import { Modal } from './Modal';
import { AppContext } from '../context/AppContext';
import { Button } from './Button';
import { Input } from './Input';
import { Icons } from './icons';

export const RegisterModal: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const { isRegisterModalOpen, closeRegisterModal, switchToLogin, login } = appContext;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form validation and API calls
    login(); // Using mock login from context for demo
  };

  return (
    <Modal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} title="JOIN THE CIRCUIT">
      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-2 block">Email</label>
          <div className="relative">
            <Icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary h-4 w-4" />
            <Input type="email" placeholder="new-operator@zapway.corp" required className="pl-10" />
          </div>
        </div>
        <div>
          <label className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-2 block">Password</label>
           <div className="relative">
            <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary h-4 w-4" />
            <Input type="password" placeholder="Create a secure password" required className="pl-10" />
          </div>
        </div>
        <div>
          <label className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-2 block">Confirm Password</label>
           <div className="relative">
            <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary h-4 w-4" />
            <Input type="password" placeholder="Confirm your password" required className="pl-10" />
          </div>
        </div>

        <p className="text-xs text-text-tertiary">
            By creating an account, you agree to our{' '}
            <button type="button" onClick={() => appContext.setCurrentPage('Terms of Service')} className="font-bold text-neon-surge hover:underline">
                Terms of Service
            </button> and{' '}
            <button type="button" onClick={() => appContext.setCurrentPage('Privacy Policy')} className="font-bold text-neon-surge hover:underline">
                Privacy Policy
            </button>.
        </p>

        <Button type="submit" size="lg" className="w-full uppercase tracking-widest">
          Create Account
        </Button>
        
        <p className="text-center text-sm text-text-tertiary">
          Already have an account?{' '}
          <button type="button" onClick={switchToLogin} className="font-bold text-neon-surge hover:underline">
            Log In
          </button>
        </p>
      </form>
    </Modal>
  );
};