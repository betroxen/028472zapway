import React, { createContext, useState, ReactNode } from 'react';

export interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
  
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;

  isRegisterModalOpen: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  
  isReviewModalOpen: boolean;
  openReviewModal: () => void;
  closeReviewModal: () => void;
  
  switchToRegister: () => void;
  switchToLogin: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to logged out
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  
  const login = () => {
    setIsLoggedIn(true);
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
    setCurrentPage('Dashboard');
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    setCurrentPage('Home');
  };

  const switchToRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };
  
  const switchToLogin = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };


  return (
    <AppContext.Provider 
      value={{ 
        currentPage, setCurrentPage,
        isLoggedIn, login, logout,
        isCollapsed, setIsCollapsed,
        isMobileOpen, setIsMobileOpen,
        isLoginModalOpen,
        openLoginModal: () => setLoginModalOpen(true),
        closeLoginModal: () => setLoginModalOpen(false),
        isRegisterModalOpen,
        openRegisterModal: () => setRegisterModalOpen(true),
        closeRegisterModal: () => setRegisterModalOpen(false),
        isReviewModalOpen,
        openReviewModal: () => setReviewModalOpen(true),
        closeReviewModal: () => setReviewModalOpen(false),
        switchToRegister,
        switchToLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};