import React from 'react';
import Icon from '../../../components/AppIcon';

const EarningsCard = ({ title, amount, currency, usdEquivalent, icon, trend, trendValue, className = '' }) => {
  return (
    <div className={`glassmorphism p-6 rounded-xl ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-xs font-medium ${
            trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'
          }`}>
            <Icon 
              name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
              size={14} 
            />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-foreground">{amount}</span>
          <span className="text-sm font-medium text-primary">{currency}</span>
        </div>
        {usdEquivalent && (
          <p className="text-sm text-muted-foreground">≈ ${usdEquivalent} USD</p>
        )}
      </div>
    </div>
  );
};

export default EarningsCard;