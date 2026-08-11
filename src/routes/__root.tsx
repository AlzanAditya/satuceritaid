import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from '../lib/tanstack-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { MobileDrawer } from '../components/MobileDrawer';

export function RootLayout() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isAuthPage = ['/login', '/signin', '/register', '/signup', '/otp'].includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on path change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  if (isAuthPage) {
    return (
      <div className="auth-standalone-layout min-h-screen bg-gray-50/90">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Navbar Header Component */}
      <Navbar scrolled={scrolled} onOpenDrawer={() => setDrawerOpen(true)} />

      {/* Main Content Router Outlet */}
      <main>
        <Outlet />
      </main>

      {/* Footer Component */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileNav onOpenDrawer={() => setDrawerOpen(true)} />

      {/* Mobile Navigation Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
