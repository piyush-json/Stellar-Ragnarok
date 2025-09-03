import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import UserMenu from './UserMenu';
import NotificationIndicator from './NotificationIndicator';

const TopNavigation = ({ user = null, notificationCount = 0, onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      label: 'Jobs',
      path: '/job-marketplace',
      icon: 'Briefcase',
      roles: ['client', 'freelancer', 'anonymous']
    },
    {
      label: 'Dashboard',
      path: user?.role === 'client' ? '/client-dashboard' : '/freelancer-dashboard',
      icon: 'LayoutDashboard',
      roles: ['client', 'freelancer']
    },
    {
      label: 'Messages',
      path: '/chat-interface',
      icon: 'MessageSquare',
      roles: ['client', 'freelancer'],
      hasNotification: notificationCount > 0
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    item?.roles?.includes(user?.role || 'anonymous')
  );

  const isActive = (path) => {
    if (path === '/job-marketplace' && location.pathname === '/job-details') {
      return true;
    }
    return location.pathname === path;
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? 'glassmorphism elevation-2' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to={user ? (user?.role === 'client' ? '/client-dashboard' : '/freelancer-dashboard') : '/landing-page'}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8">
                <img 
                  src="/assets/images/starlence_logo_2-removebg-preview.png" 
                  alt="StarLance Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-display font-bold text-foreground">StarLance</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {filteredNavItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-muted/50 ${
                    isActive(item?.path)
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                    {item?.hasNotification && (
                      <NotificationIndicator count={notificationCount} />
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {user ? (
                <UserMenu user={user} onLogout={onLogout} />
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Get Started</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={handleMobileMenuToggle}
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white/95 backdrop-blur-sm">
            <div className="px-4 py-3 space-y-2">
              {filteredNavItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item?.path)
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                  {item?.hasNotification && (
                    <NotificationIndicator count={notificationCount} />
                  )}
                </Link>
              ))}
              
              {!user && (
                <div className="pt-3 border-t border-border space-y-2">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  >
                    <Icon name="LogIn" size={18} />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Icon name="UserPlus" size={18} />
                    <span>Get Started</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16"></div>
    </>
  );
};

export default TopNavigation;