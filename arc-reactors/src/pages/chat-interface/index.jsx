import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavigation from '../../components/ui/TopNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ConversationList from './components/ConversationList';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import ProjectPanel from './components/ProjectPanel';
import Icon from '../../components/AppIcon';


const ChatInterface = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showProjectPanel, setShowProjectPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState([]);

  // Mock current user
  const currentUser = {
    id: "user-1",
    name: "Alex Johnson",
    email: "alex@stellarlance.com",
    role: "client",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Mock conversations data
  const conversations = [
    {
      id: "conv-1",
      participant: {
        id: "user-2",
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        isOnline: true,
        role: "freelancer"
      },
      projectTitle: "E-commerce Website Development",
      projectStatus: "in-progress",
      lastMessage: {
        id: "msg-1",
        content: "I\'ve completed the homepage design. Please review and let me know your thoughts.",
        timestamp: new Date(Date.now() - 300000),
        type: "text"
      },
      unreadCount: 2
    },
    {
      id: "conv-2",
      participant: {
        id: "user-3",
        name: "Michael Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        isOnline: false,
        role: "freelancer"
      },
      projectTitle: "Mobile App UI/UX Design",
      projectStatus: "active",
      lastMessage: {
        id: "msg-2",
        content: "Thanks for the feedback! I\'ll implement the changes by tomorrow.",
        timestamp: new Date(Date.now() - 3600000),
        type: "text"
      },
      unreadCount: 0
    },
    {
      id: "conv-3",
      participant: {
        id: "user-4",
        name: "Emily Watson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        isOnline: true,
        role: "freelancer"
      },
      projectTitle: "Content Writing & SEO",
      projectStatus: "completed",
      lastMessage: {
        id: "msg-3",
        content: "Project completed successfully! Thank you for working with me.",
        timestamp: new Date(Date.now() - 86400000),
        type: "text"
      },
      unreadCount: 0
    },
    {
      id: "conv-4",
      participant: {
        id: "user-5",
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        isOnline: false,
        role: "freelancer"
      },
      projectTitle: "Blockchain Smart Contract Development",
      projectStatus: "pending",
      lastMessage: {
        id: "msg-4",
        content: "I\'m interested in your project. Can we discuss the requirements?",
        timestamp: new Date(Date.now() - 172800000),
        type: "text"
      },
      unreadCount: 1
    }
  ];

  // Mock messages for active conversation
  const mockMessages = [
    {
      id: "msg-1",
      sender: {
        id: "user-2",
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      type: "text",
      content: "Hi Alex! I\'m excited to work on your e-commerce project. I\'ve reviewed the requirements and have some initial questions.",
      timestamp: new Date(Date.now() - 86400000),
      status: "read"
    },
    {
      id: "msg-2",
      sender: {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      type: "text",
      content: "Great! I'm looking forward to working with you. What questions do you have?",
      timestamp: new Date(Date.now() - 86340000),
      status: "read"
    },
    {
      id: "msg-3",
      sender: {
        id: "user-2",
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      type: "text",
      content: "I'd like to clarify the payment structure and timeline. Also, do you have any specific design preferences or brand guidelines?",
      timestamp: new Date(Date.now() - 86280000),
      status: "read"
    },
    {
      id: "msg-4",
      sender: {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      type: "file",
      fileName: "Brand_Guidelines.pdf",
      fileSize: "2.4 MB",
      timestamp: new Date(Date.now() - 86220000),
      status: "read"
    },
    {
      id: "msg-5",
      sender: {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      type: "text",
      content: "Here are our brand guidelines. For the payment structure, I've set up the escrow with 3 milestones as discussed. The timeline looks good - 6 weeks total.",
      timestamp: new Date(Date.now() - 86160000),
      status: "read"
    },
    {
      id: "msg-6",
      sender: {
        id: "user-2",
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      type: "system",
      content: "Escrow deposit of 2,500 XLM has been confirmed. Project milestone tracking is now active.",
      timestamp: new Date(Date.now() - 86100000),
      transactionId: "stellar-tx-abc123"
    },
    {
      id: "msg-7",
      sender: {
        id: "user-2",
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      type: "text",
      content: "Perfect! I\'ve received the brand guidelines and the escrow is set up. I\'ll start with the wireframes and initial design concepts. Expect the first milestone deliverables by Friday.",
      timestamp: new Date(Date.now() - 86040000),
      status: "read"
    },
    {
      id: "msg-8",
      sender: {
        id: "user-2",
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      type: "task",
      content: "I've completed the homepage design and initial wireframes for the product catalog. Please review the deliverables and let me know if any changes are needed.",
      deliverables: [
        { name: "Homepage_Design_v1.fig", size: "15.2 MB" },
        { name: "Wireframes_ProductCatalog.pdf", size: "8.7 MB" },
        { name: "Design_System_Components.fig", size: "12.1 MB" }
      ],
      timestamp: new Date(Date.now() - 1800000),
      status: "pending"
    },
    {
      id: "msg-9",
      sender: {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      type: "text",
      content: "This looks fantastic! The design perfectly captures our brand identity. I love the clean layout and the user flow is intuitive.",
      timestamp: new Date(Date.now() - 900000),
      status: "read"
    },
    {
      id: "msg-10",
      sender: {
        id: "user-2",
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      type: "text",
      content: "I'm so glad you like it! Should I proceed with the development phase, or would you like any modifications to the current design?",
      timestamp: new Date(Date.now() - 300000),
      status: "delivered"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setShowSidebar(false);
        setShowProjectPanel(false);
      } else {
        setShowSidebar(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (activeConversation) {
      setMessages(mockMessages);
    }
  }, [activeConversation]);

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      ...messageData,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev?.map(msg => 
          msg?.id === newMessage?.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);
  };

  const handleFileUpload = (file) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      type: 'file',
      fileName: file?.name,
      fileSize: `${(file?.size / (1024 * 1024))?.toFixed(1)} MB`,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleTaskAction = (messageId, action) => {
    setMessages(prev =>
      prev?.map(msg =>
        msg?.id === messageId
          ? { ...msg, status: action === 'approve' ? 'approved' : 'changes_requested' }
          : msg
      )
    );

    if (action === 'approve') {
      // Add system message for milestone completion
      const systemMessage = {
        id: `msg-${Date.now()}`,
        sender: { id: 'system', name: 'System' },
        type: 'system',
        content: 'Milestone 1 approved! 500 XLM has been released from escrow.',
        timestamp: new Date(),
        transactionId: `stellar-tx-${Date.now()}`
      };
      setMessages(prev => [...prev, systemMessage]);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleProjectPanel = () => {
    setShowProjectPanel(!showProjectPanel);
  };

  const totalUnreadCount = conversations?.reduce((sum, conv) => sum + conv?.unreadCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        user={currentUser} 
        notificationCount={totalUnreadCount}
        onLogout={() => console.log('Logout')}
      />
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Conversations List */}
        <AnimatePresence>
          {(showSidebar || !isMobile) && (
            <motion.div
              initial={isMobile ? { x: -300 } : false}
              animate={{ x: 0 }}
              exit={isMobile ? { x: -300 } : {}}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`${
                isMobile 
                  ? 'fixed left-0 top-16 bottom-0 z-40 w-80 shadow-lg' 
                  : 'relative w-80'
              }`}
            >
              <ConversationList
                conversations={conversations}
                activeConversation={activeConversation}
                onConversationSelect={handleConversationSelect}
                className="h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatHeader
            conversation={activeConversation}
            onToggleSidebar={toggleSidebar}
            onToggleProjectPanel={toggleProjectPanel}
            showProjectPanel={showProjectPanel}
            isMobile={isMobile}
          />

          {activeConversation ? (
            <>
              <MessageList
                messages={messages}
                currentUser={currentUser}
                onTaskAction={handleTaskAction}
                className="flex-1"
              />
              <MessageInput
                onSendMessage={handleSendMessage}
                onFileUpload={handleFileUpload}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageSquare" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  Welcome to StarLance Chat
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Select a conversation from the sidebar to start messaging with your clients or freelancers.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Project Panel */}
        <AnimatePresence>
          {showProjectPanel && !isMobile && activeConversation && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-80"
            >
              <ProjectPanel
                conversation={activeConversation}
                onClose={() => setShowProjectPanel(false)}
                isMobile={false}
                className="h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Mobile Project Panel */}
      <AnimatePresence>
        {showProjectPanel && isMobile && activeConversation && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 top-16 z-50 bg-card"
          >
            <ProjectPanel
              conversation={activeConversation}
              onClose={() => setShowProjectPanel(false)}
              isMobile={true}
              className="h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Mobile Sidebar Overlay */}
      {showSidebar && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 top-16"
          onClick={() => setShowSidebar(false)}
        />
      )}
      <BottomTabNavigation 
        user={currentUser} 
        notificationCount={totalUnreadCount}
      />
    </div>
  );
};

export default ChatInterface;