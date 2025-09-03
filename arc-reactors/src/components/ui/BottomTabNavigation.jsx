import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import NotificationIndicator from './NotificationIndicator';

const BottomTabNavigation = ({ user = null, notificationCount = 0 }) => {
  const location = useLocation();

  if (!user) return null;

  const navigationItems = [
    {
      label: 'Jobs',
      path: '/job-marketplace',
      icon: 'Briefcase',
      roles: ['client', 'freelancer']
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
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: 'User',
      roles: ['client', 'freelancer']
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

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around px-2 py-2">
        {filteredNavItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            className={`relative flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
              isActive(item?.path)
                ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="relative">
              <Icon name={item?.icon} size={20} />
              {item?.hasNotification && (
                <div className="absolute -top-1 -right-1">
                  <NotificationIndicator count={notificationCount} size="sm" />
                </div>
              )}
            </div>
            <span className="text-xs font-medium mt-1 truncate">{item?.label}</span>
          </Link>
        ))}
      </div>
      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white/95"></div>
    </nav>
  );
};

export default BottomTabNavigation;