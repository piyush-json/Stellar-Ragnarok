import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, onFileUpload, disabled = false, className = '' }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🎉', '🔥', '💯', '👏', '🙌'];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage({
        type: 'text',
        content: message?.trim()
      });
      setMessage('');
      setIsTyping(false);
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e?.target?.value);
    setIsTyping(e?.target?.value?.length > 0);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef?.current?.scrollHeight, 120) + 'px';
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      files?.forEach(file => {
        onFileUpload?.(file);
      });
    }
    // Reset file input
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef?.current?.focus();
  };

  const handleTaskSubmission = () => {
    // This would typically open a modal for task submission
    onSendMessage({
      type: 'task',
      content: 'Task submission dialog would open here'
    });
  };

  return (
    <div className={`border-t border-border bg-card p-4 ${className}`}>
      {/* Typing Indicator */}
      {isTyping && (
        <div className="mb-2 text-xs text-muted-foreground">
          <Icon name="Edit3" size={12} className="inline mr-1" />
          You are typing...
        </div>
      )}
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="mb-3 p-3 bg-muted rounded-lg border">
          <div className="grid grid-cols-6 gap-2">
            {emojis?.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiSelect(emoji)}
                className="text-lg hover:bg-background rounded p-1 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        {/* File Upload */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept="*/*"
        />
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef?.current?.click()}
          disabled={disabled}
          className="flex-shrink-0"
        >
          <Icon name="Paperclip" size={20} />
        </Button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={disabled}
            className="w-full px-4 py-3 pr-12 bg-muted border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm min-h-[48px] max-h-[120px]"
            rows={1}
          />
          
          {/* Emoji Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            disabled={disabled}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
          >
            <Icon name="Smile" size={16} />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleTaskSubmission}
            disabled={disabled}
            className="flex-shrink-0"
            title="Submit Task"
          >
            <Icon name="CheckSquare" size={20} />
          </Button>

          <Button
            type="submit"
            size="icon"
            disabled={!message?.trim() || disabled}
            className="flex-shrink-0"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </form>
      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Calendar" size={14} />
            <span>Schedule Meeting</span>
          </button>
          <button className="flex items-center space-x-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="DollarSign" size={14} />
            <span>Request Payment</span>
          </button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default MessageInput;