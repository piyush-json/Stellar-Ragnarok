import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../../components/ui/TopNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EarningsCard from './components/EarningsCard';
import ProjectCard from './components/ProjectCard';
import ApplicationCard from './components/ApplicationCard';
import JobCard from './components/JobCard';
import CompletedProjectCard from './components/CompletedProjectCard';
import QuickActions from './components/QuickActions';
import NotificationCenter from './components/NotificationCenter';

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active-projects');
  const [user] = useState({
    id: 1,
    name: "Alex Rodriguez",
    email: "alex.rodriguez@email.com",
    role: "freelancer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  // Mock data for earnings
  const earningsData = [
    {
      title: "Total Earnings",
      amount: "2,847",
      currency: "XLM",
      usdEquivalent: "3,421.50",
      icon: "Wallet",
      trend: "up",
      trendValue: "+12.5%"
    },
    {
      title: "This Month",
      amount: "485",
      currency: "XLM",
      usdEquivalent: "582.75",
      icon: "TrendingUp",
      trend: "up",
      trendValue: "+8.2%"
    },
    {
      title: "Pending Payments",
      amount: "156",
      currency: "XLM",
      usdEquivalent: "187.20",
      icon: "Clock",
      trend: null,
      trendValue: null
    },
    {
      title: "Completion Rate",
      amount: "98.5",
      currency: "%",
      usdEquivalent: null,
      icon: "CheckCircle",
      trend: "up",
      trendValue: "+2.1%"
    }
  ];

  // Mock data for active projects
  const activeProjects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      client: {
        id: 1,
        name: "TechCorp Solutions",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
      },
      status: "In Progress",
      progress: 75,
      budget: 1200,
      budgetUsd: "1,440.00",
      deadline: "2025-01-15",
      description: "Building a modern e-commerce platform with React and Node.js"
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      client: {
        id: 2,
        name: "StartupXYZ",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      status: "Review",
      progress: 90,
      budget: 800,
      budgetUsd: "960.00",
      deadline: "2025-01-10",
      description: "Designing user interface for a fitness tracking mobile application"
    },
    {
      id: 3,
      title: "Data Analysis Dashboard",
      client: {
        id: 3,
        name: "Analytics Pro",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      status: "In Progress",
      progress: 45,
      budget: 950,
      budgetUsd: "1,140.00",
      deadline: "2025-01-20",
      description: "Creating interactive dashboard for business intelligence"
    }
  ];

  // Mock data for applications
  const applications = [
    {
      id: 1,
      jobId: 101,
      jobTitle: "Full-Stack Web Development",
      client: "InnovateTech",
      status: "Under Review",
      appliedDate: "2025-01-02",
      proposedBudget: 1500,
      proposedBudgetUsd: "1,800.00",
      proposedDuration: "6 weeks",
      proposal: "I have extensive experience in full-stack development with React, Node.js, and PostgreSQL. I can deliver a high-quality solution within your timeline."
    },
    {
      id: 2,
      jobId: 102,
      jobTitle: "React Native Mobile App",
      client: "MobileFirst Inc",
      status: "Accepted",
      appliedDate: "2024-12-28",
      responseDate: "2025-01-01",
      proposedBudget: 2200,
      proposedBudgetUsd: "2,640.00",
      proposedDuration: "8 weeks",
      proposal: "I specialize in React Native development and have built 15+ mobile apps. I can create a performant, user-friendly application for your needs."
    },
    {
      id: 3,
      jobId: 103,
      jobTitle: "WordPress Theme Customization",
      client: "Creative Agency",
      status: "Declined",
      appliedDate: "2024-12-25",
      responseDate: "2024-12-30",
      proposedBudget: 400,
      proposedBudgetUsd: "480.00",
      proposedDuration: "2 weeks",
      proposal: "I can customize your WordPress theme to match your brand requirements with responsive design and SEO optimization."
    }
  ];

  // Mock data for available jobs
  const availableJobs = [
    {
      id: 201,
      title: "Blockchain DApp Development",
      client: "CryptoVentures",
      location: "Remote",
      budget: 3500,
      budgetUsd: "4,200.00",
      postedDate: "2025-01-03",
      description: "Looking for an experienced blockchain developer to build a decentralized application on Ethereum. Must have experience with Solidity and Web3.js.",
      skills: ["Solidity", "Web3.js", "React", "Node.js", "Smart Contracts"],
      proposals: 8,
      duration: "10-12 weeks",
      experienceLevel: "Expert",
      clientRating: 4.9,
      featured: true
    },
    {
      id: 202,
      title: "AI Chatbot Integration",
      client: "TechSolutions Ltd",
      location: "Remote",
      budget: 1800,
      budgetUsd: "2,160.00",
      postedDate: "2025-01-02",
      description: "Need to integrate an AI chatbot into our existing customer service platform. Experience with OpenAI API and natural language processing required.",
      skills: ["Python", "OpenAI API", "NLP", "Flask", "JavaScript"],
      proposals: 12,
      duration: "4-6 weeks",
      experienceLevel: "Intermediate",
      clientRating: 4.7,
      featured: false
    },
    {
      id: 203,
      title: "E-learning Platform Development",
      client: "EduTech Innovations",
      location: "Remote",
      budget: 2800,
      budgetUsd: "3,360.00",
      postedDate: "2025-01-01",
      description: "Build a comprehensive e-learning platform with video streaming, quizzes, progress tracking, and payment integration.",
      skills: ["React", "Node.js", "MongoDB", "Video Streaming", "Payment Integration"],
      proposals: 15,
      duration: "8-10 weeks",
      experienceLevel: "Intermediate",
      clientRating: 4.8,
      featured: false
    }
  ];

  // Mock data for completed projects
  const completedProjects = [
    {
      id: 301,
      title: "Restaurant Management System",
      client: {
        id: 4,
        name: "FoodTech Solutions",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      completedDate: "2024-12-20",
      earned: 1500,
      earnedUsd: "1,800.00",
      duration: "6 weeks",
      rating: 5,
      review: "Exceptional work! Alex delivered exactly what we needed and went above and beyond our expectations. Highly recommended!",
      description: "Built a comprehensive restaurant management system with inventory tracking, order management, and analytics dashboard.",
      skills: ["React", "Node.js", "PostgreSQL", "Express"],
      inPortfolio: true
    },
    {
      id: 302,
      title: "Social Media Analytics Tool",
      client: {
        id: 5,
        name: "MarketingPro",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      completedDate: "2024-12-10",
      earned: 2200,
      earnedUsd: "2,640.00",
      duration: "8 weeks",
      rating: 4,
      review: "Great technical skills and communication. The tool works perfectly and has helped us improve our social media strategy significantly.",
      description: "Developed a comprehensive social media analytics tool with real-time data visualization and automated reporting.",
      skills: ["Python", "Django", "React", "D3.js", "API Integration"],
      inPortfolio: false
    },
    {
      id: 303,
      title: "Inventory Management App",
      client: {
        id: 6,
        name: "RetailTech Inc",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      completedDate: "2024-11-25",
      earned: 1800,
      earnedUsd: "2,160.00",
      duration: "5 weeks",
      rating: 5,
      review: "Outstanding developer! Delivered on time and the app exceeded our expectations. Will definitely work with Alex again.",
      description: "Created a mobile-first inventory management application with barcode scanning and real-time synchronization.",
      skills: ["React Native", "Firebase", "Barcode Scanning", "Real-time Sync"],
      inPortfolio: true
    }
  ];

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'payment',
      title: 'Payment Received',
      message: 'You received 1,200 XLM for E-commerce Website Development project',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      read: false
    },
    {
      id: 2,
      type: 'project_update',
      title: 'Project Milestone Approved',
      message: 'TechCorp Solutions approved your latest milestone submission',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false
    },
    {
      id: 3,
      type: 'job_match',
      title: 'New Job Match',
      message: 'A new blockchain development job matches your skills',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: true
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message',
      message: 'StartupXYZ sent you a message about the mobile app project',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      read: false
    },
    {
      id: 5,
      type: 'review',
      title: 'New Review Received',
      message: 'FoodTech Solutions left you a 5-star review',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: true
    }
  ]);

  const unreadNotifications = notifications?.filter(n => !n?.read)?.length;

  const handleLogout = () => {
    navigate('/landing-page');
  };

  const handleViewDetails = (projectId) => {
    navigate('/job-details', { state: { projectId } });
  };

  const handleSubmitDeliverable = (projectId) => {
    console.log('Submit deliverable for project:', projectId);
    // Implementation for deliverable submission
  };

  const handleMessageClient = (clientId) => {
    navigate('/chat-interface', { state: { clientId } });
  };

  const handleViewJob = (jobId) => {
    navigate('/job-details', { state: { jobId } });
  };

  const handleWithdrawApplication = (applicationId) => {
    console.log('Withdraw application:', applicationId);
    // Implementation for withdrawing application
  };

  const handleQuickApply = (jobId) => {
    console.log('Quick apply to job:', jobId);
    // Implementation for quick apply
  };

  const handleAddToPortfolio = (projectId) => {
    console.log('Add to portfolio:', projectId);
    // Implementation for adding to portfolio
  };

  const handleBrowseJobs = () => {
    navigate('/job-marketplace');
  };

  const handleUpdateProfile = () => {
    navigate('/profile');
  };

  const handleWithdrawEarnings = () => {
    console.log('Withdraw earnings');
    // Implementation for withdrawing earnings
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev?.map(notification =>
        notification?.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  const tabs = [
    { id: 'active-projects', label: 'Active Projects', icon: 'Briefcase', count: activeProjects?.length },
    { id: 'applications', label: 'Applications', icon: 'Send', count: applications?.length },
    { id: 'available-jobs', label: 'Available Jobs', icon: 'Search', count: availableJobs?.length },
    { id: 'completed-work', label: 'Completed Work', icon: 'CheckCircle', count: completedProjects?.length }
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        user={user} 
        notificationCount={unreadNotifications}
        onLogout={handleLogout} 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
              <p className="text-muted-foreground mt-1">
                Manage your projects and discover new opportunities
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleBrowseJobs}
                iconName="Search"
                iconPosition="left"
              >
                Browse Jobs
              </Button>
              <Button
                onClick={handleUpdateProfile}
                iconName="User"
                iconPosition="left"
              >
                Update Profile
              </Button>
            </div>
          </div>

          {/* Earnings Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {earningsData?.map((earning, index) => (
              <EarningsCard
                key={index}
                title={earning?.title}
                amount={earning?.amount}
                currency={earning?.currency}
                usdEquivalent={earning?.usdEquivalent}
                icon={earning?.icon}
                trend={earning?.trend}
                trendValue={earning?.trendValue}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-border">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span>{tab?.label}</span>
                      <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                        {tab?.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'active-projects' && (
                <div className="space-y-6">
                  {activeProjects?.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="Briefcase" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No Active Projects</h3>
                      <p className="text-muted-foreground mb-4">
                        Start browsing jobs to find your next project
                      </p>
                      <Button onClick={handleBrowseJobs} iconName="Search" iconPosition="left">
                        Browse Jobs
                      </Button>
                    </div>
                  ) : (
                    activeProjects?.map((project) => (
                      <ProjectCard
                        key={project?.id}
                        project={project}
                        onViewDetails={handleViewDetails}
                        onSubmitDeliverable={handleSubmitDeliverable}
                        onMessageClient={handleMessageClient}
                      />
                    ))
                  )}
                </div>
              )}

              {activeTab === 'applications' && (
                <div className="space-y-6">
                  {applications?.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="Send" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No Applications</h3>
                      <p className="text-muted-foreground mb-4">
                        Apply to jobs to start building your project pipeline
                      </p>
                      <Button onClick={handleBrowseJobs} iconName="Search" iconPosition="left">
                        Browse Jobs
                      </Button>
                    </div>
                  ) : (
                    applications?.map((application) => (
                      <ApplicationCard
                        key={application?.id}
                        application={application}
                        onViewJob={handleViewJob}
                        onWithdrawApplication={handleWithdrawApplication}
                      />
                    ))
                  )}
                </div>
              )}

              {activeTab === 'available-jobs' && (
                <div className="space-y-6">
                  {availableJobs?.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No Jobs Available</h3>
                      <p className="text-muted-foreground mb-4">
                        Check back later for new opportunities
                      </p>
                      <Button onClick={handleBrowseJobs} iconName="RefreshCw" iconPosition="left">
                        Refresh Jobs
                      </Button>
                    </div>
                  ) : (
                    availableJobs?.map((job) => (
                      <JobCard
                        key={job?.id}
                        job={job}
                        onViewDetails={handleViewJob}
                        onQuickApply={handleQuickApply}
                      />
                    ))
                  )}
                </div>
              )}

              {activeTab === 'completed-work' && (
                <div className="space-y-6">
                  {completedProjects?.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No Completed Projects</h3>
                      <p className="text-muted-foreground mb-4">
                        Your completed projects will appear here
                      </p>
                    </div>
                  ) : (
                    completedProjects?.map((project) => (
                      <CompletedProjectCard
                        key={project?.id}
                        project={project}
                        onAddToPortfolio={handleAddToPortfolio}
                        onViewDetails={handleViewDetails}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <QuickActions
              onBrowseJobs={handleBrowseJobs}
              onUpdateProfile={handleUpdateProfile}
              onWithdrawEarnings={handleWithdrawEarnings}
              walletBalance={2847}
            />

            {/* Notification Center */}
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          </div>
        </div>
      </div>
      <BottomTabNavigation 
        user={user} 
        notificationCount={unreadNotifications}
      />
    </div>
  );
};

export default FreelancerDashboard;