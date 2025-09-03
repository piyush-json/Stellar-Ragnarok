import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ConversationList = ({ conversations, activeConversation, onConversationSelect, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations?.filter(conv =>
    conv?.participant?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    conv?.projectTitle?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const formatLastMessageTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return messageTime?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'in-progress': return 'bg-warning';
      case 'completed': return 'bg-primary';
      case 'pending': return 'bg-muted-foreground';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <div className={`flex flex-col h-full bg-card border-r border-border ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-card-foreground mb-3">Messages</h2>
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center px-4">
            <Icon name="MessageSquare" size={32} className="text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No conversations found</p>
          </div>
        ) : (
          filteredConversations?.map((conversation) => (
            <div
              key={conversation?.id}
              onClick={() => onConversationSelect(conversation)}
              className={`flex items-start p-4 hover:bg-muted/50 cursor-pointer transition-colors border-b border-border/50 ${
                activeConversation?.id === conversation?.id ? 'bg-primary/10 border-r-2 border-r-primary' : ''
              }`}
            >
              <div className="relative flex-shrink-0 mr-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={conversation?.participant?.avatar}
                    alt={conversation?.participant?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {conversation?.participant?.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-card rounded-full"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-card-foreground truncate">
                    {conversation?.participant?.name}
                  </h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatLastMessageTime(conversation?.lastMessage?.timestamp)}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground truncate">
                    {conversation?.projectTitle}
                  </p>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(conversation?.projectStatus)}`}></div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate flex-1 mr-2">
                    {conversation?.lastMessage?.type === 'file' ? (
                      <span className="flex items-center">
                        <Icon name="Paperclip" size={12} className="mr-1" />
                        File attachment
                      </span>
                    ) : conversation?.lastMessage?.type === 'task' ? (
                      <span className="flex items-center">
                        <Icon name="CheckSquare" size={12} className="mr-1" />
                        Task submission
                      </span>
                    ) : (
                      conversation?.lastMessage?.content
                    )}
                  </p>
                  {conversation?.unreadCount > 0 && (
                    <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                      {conversation?.unreadCount > 9 ? '9+' : conversation?.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;