import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Image from '../AppImage';

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef?.current && 
        !menuRef?.current?.contains(event.target) &&
        buttonRef?.current &&
        !buttonRef?.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    handleClose();
    onLogout?.();
  };

  const menuItems = [
    {
      label: 'Profile',
      path: '/profile',
      icon: 'User',
      roles: ['client', 'freelancer']
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings',
      roles: ['client', 'freelancer']
    },
    {
      label: 'Wallet',
      path: '/wallet',
      icon: 'Wallet',
      roles: ['client', 'freelancer']
    },
    {
      label: 'Help & Support',
      path: '/help',
      icon: 'HelpCircle',
      roles: ['client', 'freelancer']
    }
  ];

  const filteredMenuItems = menuItems?.filter(item => 
    item?.roles?.includes(user?.role || 'anonymous')
  );

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        className="flex items-center space-x-2 hover:bg-muted/50"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          {user?.avatar ? (
            <Image
              src={user?.avatar}
              alt={user?.name || 'User avatar'}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} className="text-muted-foreground" />
          )}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-foreground truncate max-w-24">
            {user?.name || 'User'}
          </div>
          <div className="text-xs text-muted-foreground capitalize">
            {user?.role || 'Member'}
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </Button>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg elevation-3 animate-scale-in z-50"
        >
          <div className="p-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {user?.avatar ? (
                  <Image
                    src={user?.avatar}
                    alt={user?.name || 'User avatar'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={20} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-popover-foreground truncate">
                  {user?.name || 'User'}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {user?.email || 'user@example.com'}
                </div>
                <div className="text-xs text-primary capitalize font-medium">
                  {user?.role || 'Member'}
                </div>
              </div>
            </div>
          </div>

          <div className="py-2">
            {filteredMenuItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={handleClose}
                className="flex items-center space-x-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
              >
                <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                <span>{item?.label}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-border py-2">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;