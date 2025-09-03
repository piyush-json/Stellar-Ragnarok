import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../../components/ui/TopNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import MetricsCard from './components/MetricsCard';

import JobsTable from './components/JobsTable';
import ApplicationCard from './components/ApplicationCard';
import ProjectCard from './components/ProjectCard';
import QuickActions from './components/QuickActions';
import PaymentSection from './components/PaymentSection';

import Icon from '../../components/AppIcon';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active-jobs');
  const [user] = useState({
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "client",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });

  // Mock data for metrics
  const metrics = [
    {
      title: "Active Projects",
      value: "12",
      subtitle: "3 new this week",
      icon: "Briefcase",
      trend: "up",
      trendValue: "+25%",
      color: "primary"
    },
    {
      title: "Total Spent",
      value: "45,280",
      subtitle: "XLM this month",
      icon: "DollarSign",
      trend: "up",
      trendValue: "+12%",
      color: "success"
    },
    {
      title: "Pending Applications",
      value: "28",
      subtitle: "Awaiting review",
      icon: "Users",
      trend: "neutral",
      trendValue: "0%",
      color: "warning"
    },
    {
      title: "Completed Jobs",
      value: "156",
      subtitle: "All time",
      icon: "CheckCircle",
      trend: "up",
      trendValue: "+8%",
      color: "accent"
    }
  ];

  // Mock data for active jobs
  const activeJobs = [
    {
      id: 1,
      title: "React Native Mobile App Development",
      description: "Looking for an experienced React Native developer to build a cross-platform mobile application with modern UI/UX design.",
      applications: 24,
      budget: 5000,
      postedDate: new Date('2025-01-15'),
      status: "active"
    },
    {
      id: 2,
      title: "E-commerce Website Design",
      description: "Need a professional web designer to create a modern e-commerce website with responsive design and user-friendly interface.",
      applications: 18,
      budget: 3500,
      postedDate: new Date('2025-01-20'),
      status: "active"
    },
    {
      id: 3,
      title: "Content Writing for Tech Blog",
      description: "Seeking a skilled content writer to create engaging articles about emerging technologies and software development trends.",
      applications: 12,
      budget: 1200,
      postedDate: new Date('2025-01-25'),
      status: "pending"
    },
    {
      id: 4,
      title: "Logo Design and Branding",
      description: "Looking for a creative designer to develop a complete brand identity including logo, color scheme, and brand guidelines.",
      applications: 31,
      budget: 800,
      postedDate: new Date('2025-01-28'),
      status: "active"
    }
  ];

  // Mock data for applications
  const applications = [
    {
      id: 1,
      jobId: 1,
      freelancer: {
        name: "Alex Rodriguez",
        title: "Senior React Native Developer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        reviews: 127,
        location: "San Francisco, CA",
        skills: ["React Native", "JavaScript", "TypeScript", "Redux", "Firebase", "iOS", "Android"]
      },
      proposedRate: 4800,
      coverLetter: `I'm excited to work on your React Native mobile app project. With over 6 years of experience in mobile development, I've successfully delivered 50+ apps to the App Store and Google Play.\n\nI specialize in creating high-performance, user-friendly mobile applications using the latest React Native technologies. My approach includes thorough planning, regular communication, and delivering clean, maintainable code.\n\nI'm confident I can deliver exactly what you're looking for within your timeline and budget.`,
      appliedDate: new Date('2025-01-16'),
      estimatedDelivery: "6-8 weeks"
    },
    {
      id: 2,
      jobId: 1,
      freelancer: {
        name: "Maria Garcia",
        title: "Mobile App Developer",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        reviews: 89,
        location: "Austin, TX",
        skills: ["React Native", "Flutter", "JavaScript", "Node.js", "MongoDB"]
      },
      proposedRate: 4500,
      coverLetter: `Hello! I'm Maria, a passionate mobile developer with 5 years of experience building cross-platform applications. I've worked with startups and established companies to bring their mobile visions to life.\n\nWhat sets me apart is my attention to detail and commitment to delivering pixel-perfect designs with smooth user experiences. I believe in transparent communication and providing regular updates throughout the development process.`,
      appliedDate: new Date('2025-01-17'),
      estimatedDelivery: "7-9 weeks"
    },
    {
      id: 3,
      jobId: 2,
      freelancer: {
        name: "David Chen",
        title: "UI/UX Designer & Frontend Developer",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        reviews: 156,
        location: "Seattle, WA",
        skills: ["UI/UX Design", "React", "Vue.js", "Figma", "Adobe Creative Suite", "Shopify"]
      },
      proposedRate: 3200,
      coverLetter: `I'm David, a designer-developer hybrid with a passion for creating beautiful, functional e-commerce experiences. I understand that great design isn't just about aesthetics—it's about driving conversions and creating seamless user journeys.\n\nI'll work closely with you to understand your brand, target audience, and business goals to create a website that not only looks amazing but also performs exceptionally well.`,
      appliedDate: new Date('2025-01-21'),
      estimatedDelivery: "4-6 weeks"
    }
  ];

  // Mock data for in-progress projects
  const inProgressProjects = [
    {
      id: 1,
      title: "SaaS Dashboard Development",
      description: "Building a comprehensive dashboard for a SaaS platform with real-time analytics, user management, and billing integration.",
      freelancer: {
        name: "John Smith",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        rating: 4.9
      },
      budget: 8500,
      progress: 75,
      status: "in-progress",
      deadline: new Date('2025-02-15'),
      timeRemaining: "3 weeks",
      canReleaseFunds: true,
      milestones: [
        { title: "UI/UX Design", completed: true, amount: 2000 },
        { title: "Frontend Development", completed: true, amount: 3000 },
        { title: "Backend Integration", completed: false, amount: 2500 },
        { title: "Testing & Deployment", completed: false, amount: 1000 }
      ]
    },
    {
      id: 2,
      title: "Mobile App UI Redesign",
      description: "Complete redesign of existing mobile application with modern design principles and improved user experience.",
      freelancer: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        rating: 4.8
      },
      budget: 4200,
      progress: 45,
      status: "in-progress",
      deadline: new Date('2025-02-28'),
      timeRemaining: "6 weeks",
      canReleaseFunds: false,
      milestones: [
        { title: "Research & Analysis", completed: true, amount: 800 },
        { title: "Wireframes & Prototypes", completed: true, amount: 1200 },
        { title: "Visual Design", completed: false, amount: 1500 },
        { title: "Design System", completed: false, amount: 700 }
      ]
    }
  ];

  // Mock data for completed projects
  const completedProjects = [
    {
      id: 1,
      title: "Corporate Website Development",
      description: "Modern corporate website with CMS integration and SEO optimization.",
      freelancer: {
        name: "Michael Brown",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
        rating: 4.9
      },
      budget: 3500,
      progress: 100,
      status: "completed",
      deadline: new Date('2025-01-10'),
      timeRemaining: "Completed",
      canReleaseFunds: false,
      milestones: [
        { title: "Design & Planning", completed: true, amount: 800 },
        { title: "Development", completed: true, amount: 2000 },
        { title: "Testing & Launch", completed: true, amount: 700 }
      ]
    }
  ];

  // Mock data for escrow and transactions
  const escrowBalance = 12750;
  const transactions = [
    {
      id: 1,
      type: "deposit",
      description: "Escrow deposit for SaaS Dashboard",
      amount: 8500,
      date: new Date('2025-01-10'),
      projectTitle: "SaaS Dashboard Development",
      txHash: "GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37"
    },
    {
      id: 2,
      type: "deposit",
      description: "Escrow deposit for Mobile App Redesign",
      amount: 4200,
      date: new Date('2025-01-15'),
      projectTitle: "Mobile App UI Redesign",
      txHash: "GCKFBEIYTKQZPYFA622N63CZCMJDQZN5BNQMJJVFDLTVQX4RAJNI4PWW"
    },
    {
      id: 3,
      type: "release",
      description: "Payment released to Michael Brown",
      amount: 3500,
      date: new Date('2025-01-12'),
      projectTitle: "Corporate Website Development",
      txHash: "GBVFTZL5HZJKQZPYFA622N63CZCMJDQZN5BNQMJJVFDLTVQX4RAJNI"
    }
  ];

  const tabs = [
    { id: 'active-jobs', label: 'Active Jobs', icon: 'Briefcase', count: activeJobs?.length },
    { id: 'applications', label: 'Applications', icon: 'Users', count: applications?.length },
    { id: 'in-progress', label: 'In Progress', icon: 'Clock', count: inProgressProjects?.length },
    { id: 'completed', label: 'Completed', icon: 'CheckCircle', count: completedProjects?.length }
  ];

  const handleJobAction = (action, jobId) => {
    console.log(`${action} job:`, jobId);
    // Handle job actions
  };

  const handleApplicationAction = (action, applicationId) => {
    console.log(`${action} application:`, applicationId);
    if (action === 'message') {
      navigate('/chat-interface');
    }
  };

  const handleProjectAction = (action, projectId) => {
    console.log(`${action} project:`, projectId);
    if (action === 'message') {
      navigate('/chat-interface');
    }
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action:`, action);
    if (action === 'post-job') {
      navigate('/job-marketplace');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'active-jobs':
        return (
          <JobsTable
            jobs={activeJobs}
            onView={(id) => handleJobAction('view', id)}
            onEdit={(id) => handleJobAction('edit', id)}
            onCancel={(id) => handleJobAction('cancel', id)}
          />
        );
      
      case 'applications':
        return (
          <div className="space-y-6">
            {applications?.map((application) => (
              <ApplicationCard
                key={application?.id}
                application={application}
                onAccept={(id) => handleApplicationAction('accept', id)}
                onDecline={(id) => handleApplicationAction('decline', id)}
                onMessage={(id) => handleApplicationAction('message', id)}
              />
            ))}
            {applications?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground">Applications will appear here when freelancers apply to your jobs.</p>
              </div>
            )}
          </div>
        );
      
      case 'in-progress':
        return (
          <div className="space-y-6">
            {inProgressProjects?.map((project) => (
              <ProjectCard
                key={project?.id}
                project={project}
                onReleaseFunds={(id) => handleProjectAction('release-funds', id)}
                onMessage={(id) => handleProjectAction('message', id)}
                onViewDetails={(id) => handleProjectAction('view-details', id)}
              />
            ))}
            {inProgressProjects?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">No Active Projects</h3>
                <p className="text-muted-foreground">Your ongoing projects will appear here.</p>
              </div>
            )}
          </div>
        );
      
      case 'completed':
        return (
          <div className="space-y-6">
            {completedProjects?.map((project) => (
              <ProjectCard
                key={project?.id}
                project={project}
                onReleaseFunds={(id) => handleProjectAction('release-funds', id)}
                onMessage={(id) => handleProjectAction('message', id)}
                onViewDetails={(id) => handleProjectAction('view-details', id)}
              />
            ))}
            {completedProjects?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">No Completed Projects</h3>
                <p className="text-muted-foreground">Your completed projects will appear here.</p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation user={user} notificationCount={5} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Client Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your projects, review applications, and track progress
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics?.map((metric, index) => (
            <MetricsCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-card rounded-lg border border-border mb-6">
              <div className="border-b border-border">
                <div className="flex overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span>{tab?.label}</span>
                      {tab?.count > 0 && (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {tab?.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <QuickActions
              onPostJob={() => handleQuickAction('post-job')}
              onReleaseFunds={() => handleQuickAction('release-funds')}
              onDownloadReports={() => handleQuickAction('download-reports')}
            />
            
            <PaymentSection
              escrowBalance={escrowBalance}
              transactions={transactions}
              onViewAllTransactions={() => console.log('View all transactions')}
            />
          </div>
        </div>
      </div>
      <BottomTabNavigation user={user} notificationCount={5} />
    </div>
  );
};

export default ClientDashboard;