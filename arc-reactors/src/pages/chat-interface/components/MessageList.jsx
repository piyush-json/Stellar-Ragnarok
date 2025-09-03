import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageList = ({ messages, currentUser, onTaskAction, className = '' }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDateHeader = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (messageDate?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (messageDate?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate?.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  const shouldShowDateHeader = (currentMessage, previousMessage) => {
    if (!previousMessage) return true;
    
    const currentDate = new Date(currentMessage.timestamp)?.toDateString();
    const previousDate = new Date(previousMessage.timestamp)?.toDateString();
    
    return currentDate !== previousDate;
  };

  const shouldShowAvatar = (currentMessage, nextMessage) => {
    if (!nextMessage) return true;
    if (currentMessage?.sender?.id !== nextMessage?.sender?.id) return true;
    
    const currentTime = new Date(currentMessage.timestamp);
    const nextTime = new Date(nextMessage.timestamp);
    const timeDiff = (nextTime - currentTime) / (1000 * 60); // minutes
    
    return timeDiff > 5;
  };

  const renderMessage = (message, index) => {
    const isCurrentUser = message?.sender?.id === currentUser?.id;
    const previousMessage = index > 0 ? messages?.[index - 1] : null;
    const nextMessage = index < messages?.length - 1 ? messages?.[index + 1] : null;
    const showDateHeader = shouldShowDateHeader(message, previousMessage);
    const showAvatar = shouldShowAvatar(message, nextMessage);

    return (
      <React.Fragment key={message?.id}>
        {showDateHeader && (
          <div className="flex justify-center my-4">
            <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
              {formatDateHeader(message?.timestamp)}
            </div>
          </div>
        )}
        <div className={`flex items-end space-x-2 mb-2 ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <div className={`w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src={message?.sender?.avatar}
              alt={message?.sender?.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'items-end' : 'items-start'} flex flex-col`}>
            {message?.type === 'text' && (
              <div className={`px-4 py-2 rounded-2xl ${
                isCurrentUser 
                  ? 'bg-primary text-primary-foreground rounded-br-md' 
                  : 'bg-muted text-card-foreground rounded-bl-md'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
              </div>
            )}

            {message?.type === 'file' && (
              <div className={`p-3 rounded-2xl border ${
                isCurrentUser 
                  ? 'bg-primary/10 border-primary/20 rounded-br-md' :'bg-muted border-border rounded-bl-md'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Icon name="File" size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">
                      {message?.fileName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {message?.fileSize}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Icon name="Download" size={16} />
                  </Button>
                </div>
              </div>
            )}

            {message?.type === 'task' && (
              <div className={`p-4 rounded-2xl border ${
                isCurrentUser 
                  ? 'bg-success/10 border-success/20 rounded-br-md' :'bg-muted border-border rounded-bl-md'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckSquare" size={20} className="text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-card-foreground mb-1">
                      Task Submission
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {message?.content}
                    </p>
                    {message?.deliverables && message?.deliverables?.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {message?.deliverables?.map((deliverable, idx) => (
                          <div key={idx} className="flex items-center space-x-2 p-2 bg-card rounded-lg border">
                            <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                            <span className="text-xs text-card-foreground truncate flex-1">
                              {deliverable?.name}
                            </span>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Icon name="Download" size={12} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    {!isCurrentUser && message?.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => onTaskAction?.(message?.id, 'approve')}
                        >
                          <Icon name="Check" size={14} className="mr-1" />
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onTaskAction?.(message?.id, 'request_changes')}
                        >
                          <Icon name="MessageSquare" size={14} className="mr-1" />
                          Request Changes
                        </Button>
                      </div>
                    )}
                    {message?.status === 'approved' && (
                      <div className="flex items-center space-x-2 text-success">
                        <Icon name="CheckCircle" size={14} />
                        <span className="text-xs font-medium">Approved</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {message?.type === 'system' && (
              <div className="bg-accent/10 border border-accent/20 rounded-2xl p-3 max-w-full">
                <div className="flex items-center space-x-2">
                  <Icon name="Info" size={16} className="text-accent flex-shrink-0" />
                  <p className="text-sm text-card-foreground">{message?.content}</p>
                </div>
                {message?.transactionId && (
                  <div className="mt-2 pt-2 border-t border-accent/20">
                    <Button variant="link" size="sm" className="p-0 h-auto text-accent">
                      <Icon name="ExternalLink" size={12} className="mr-1" />
                      View on Stellar Explorer
                    </Button>
                  </div>
                )}
              </div>
            )}

            <div className={`flex items-center space-x-2 mt-1 ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <span className="text-xs text-muted-foreground">
                {formatMessageTime(message?.timestamp)}
              </span>
              {isCurrentUser && (
                <div className="flex items-center space-x-1">
                  {message?.status === 'sent' && <Icon name="Check" size={12} className="text-muted-foreground" />}
                  {message?.status === 'delivered' && <Icon name="CheckCheck" size={12} className="text-muted-foreground" />}
                  {message?.status === 'read' && <Icon name="CheckCheck" size={12} className="text-primary" />}
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className={`flex-1 overflow-y-auto p-4 space-y-1 ${className}`}>
      {messages?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Icon name="MessageSquare" size={48} className="text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">No messages yet</h3>
          <p className="text-sm text-muted-foreground">Start the conversation by sending a message</p>
        </div>
      ) : (
        messages?.map((message, index) => renderMessage(message, index))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;