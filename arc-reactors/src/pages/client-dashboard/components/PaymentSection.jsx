import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentSection = ({ escrowBalance, transactions, onViewAllTransactions }) => {
  const formatBudget = (amount) => {
    return `${amount?.toLocaleString()} XLM`;
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit': return 'ArrowDownCircle';
      case 'release': return 'ArrowUpCircle';
      case 'refund': return 'RotateCcw';
      default: return 'DollarSign';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'deposit': return 'text-accent';
      case 'release': return 'text-success';
      case 'refund': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Payment Management</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          onClick={onViewAllTransactions}
        >
          View All
        </Button>
      </div>
      {/* Escrow Balance */}
      <div className="bg-primary/5 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Escrow Balance</p>
            <p className="text-2xl font-bold text-card-foreground">
              {formatBudget(escrowBalance)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ≈ ${(escrowBalance * 0.12)?.toFixed(2)} USD
            </p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={24} className="text-primary" />
          </div>
        </div>
      </div>
      {/* Recent Transactions */}
      <div>
        <h4 className="font-medium text-card-foreground mb-3">Recent Transactions</h4>
        <div className="space-y-3">
          {transactions?.slice(0, 5)?.map((transaction) => (
            <div key={transaction?.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getTransactionColor(transaction?.type)}`}>
                  <Icon name={getTransactionIcon(transaction?.type)} size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    {transaction?.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction?.date)} • {transaction?.projectTitle}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`text-sm font-semibold ${
                  transaction?.type === 'deposit' ? 'text-destructive' : 'text-success'
                }`}>
                  {transaction?.type === 'deposit' ? '-' : '+'}{formatBudget(transaction?.amount)}
                </p>
                <div className="flex items-center space-x-1">
                  <Icon name="ExternalLink" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {transaction?.txHash?.slice(0, 8)}...
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {transactions?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Receipt" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No transactions yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSection;