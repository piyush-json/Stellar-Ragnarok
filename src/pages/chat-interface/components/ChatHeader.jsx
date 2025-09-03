import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ 
  conversation, 
  onToggleSidebar, 
  onToggleProjectPanel, 
  showProjectPanel,
  isMobile 
}) => {
  if (!conversation) {
    return (
      <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
              <Icon name="Menu" size={20} />
            </Button>
          )}
          <h2 className="text-lg font-semibold text-card-foreground">Select a conversation</h2>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'completed': return 'text-primary';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active Project';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center space-x-3">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
        )}
        
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
            <Image
              src={conversation?.participant?.avatar}
              alt={conversation?.participant?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {conversation?.participant?.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-card rounded-full"></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-card-foreground truncate">
              {conversation?.participant?.name}
            </h3>
            {conversation?.participant?.isOnline && (
              <span className="text-xs text-success">Online</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-muted-foreground truncate">
              {conversation?.projectTitle}
            </p>
            <span className={`text-xs font-medium ${getStatusColor(conversation?.projectStatus)}`}>
              • {getStatusText(conversation?.projectStatus)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Icon name="Phone" size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <Icon name="Video" size={18} />
        </Button>
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleProjectPanel}
            className={showProjectPanel ? 'bg-muted' : ''}
          >
            <Icon name="Info" size={18} />
          </Button>
        )}
        <Button variant="ghost" size="icon">
          <Icon name="MoreVertical" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;