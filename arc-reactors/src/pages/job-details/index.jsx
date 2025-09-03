import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TopNavigation from '../../components/ui/TopNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import JobHeader from './components/JobHeader';
import JobDescription from './components/JobDescription';
import SkillsSection from './components/SkillsSection';
import ClientInfo from './components/ClientInfo';
import ApplicationPanel from './components/ApplicationPanel';
import SimilarJobs from './components/SimilarJobs';

const JobDetailsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobId = searchParams?.get('id') || '1';
  
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    // Mock user authentication check
    const mockUser = {
      id: 'user123',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      role: 'freelancer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    };
    setUser(mockUser);
  }, []);

  // Mock job data
  const jobData = {
    id: jobId,
    title: 'Full-Stack Web Application Development with React & Node.js',
    category: 'web-development',
    budget: 15000,
    postedDate: '2025-01-28T10:00:00Z',
    deadline: '2025-02-15T23:59:59Z',
    status: 'open',
    featured: true,
    clientId: 'client456',
    applicationCount: 12,
    averageBid: 13500,
    viewCount: 156,
    description: `We are looking for an experienced full-stack developer to build a comprehensive web application for our growing e-commerce business. The project involves creating a modern, responsive platform that will serve both our customers and internal team.

The application should include:
- User authentication and authorization system
- Product catalog with advanced search and filtering
- Shopping cart and checkout functionality
- Payment integration with multiple gateways
- Admin dashboard for inventory management
- Real-time notifications and messaging
- Analytics and reporting features
- Mobile-responsive design

We value clean, maintainable code and expect the developer to follow best practices for security, performance, and scalability. The project timeline is flexible, but we're looking to launch within 6-8 weeks.

This is a great opportunity to work with a forward-thinking team and contribute to a product that will impact thousands of users. We're open to discussing the technical stack and architecture based on your expertise and recommendations.`,
    requirements: [
      'Minimum 3 years of experience with React and Node.js',
      'Strong knowledge of database design (PostgreSQL or MongoDB)',
      'Experience with payment gateway integration',
      'Understanding of RESTful API design principles',
      'Familiarity with cloud deployment (AWS, Google Cloud, or Azure)',
      'Knowledge of security best practices',
      'Experience with version control (Git) and agile development'
    ],
    deliverables: [
      'Complete source code with documentation',
      'Deployed application on cloud platform',
      'User manual and technical documentation',
      'Basic training session for the admin team',
      '30 days of post-launch support and bug fixes'
    ],
    skills: [
      { name: 'React', level: 'advanced' },
      { name: 'Node.js', level: 'advanced' },
      { name: 'JavaScript', level: 'expert' },
      { name: 'PostgreSQL', level: 'intermediate' },
      { name: 'AWS', level: 'intermediate' },
      { name: 'REST APIs', level: 'advanced' },
      { name: 'Payment Integration', level: 'intermediate' },
      { name: 'Responsive Design', level: 'advanced' }
    ],
    client: {
      id: 'client456',
      name: 'TechCorp Solutions',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 47,
      totalJobs: 23,
      hireRate: 92,
      memberSince: '2022-03-15T00:00:00Z',
      lastActive: '2 hours ago',
      verified: true,
      walletAddress: 'GCKFBEIYTKP...XLMWALLET',
      location: 'San Francisco, CA',
      bio: 'We are a growing technology company focused on creating innovative solutions for small and medium businesses. Our team values quality, creativity, and long-term partnerships with talented freelancers.'
    },
    applicants: []
  };

  // Mock similar jobs data
  const similarJobsData = [
    {
      id: '2',
      title: 'E-commerce Mobile App Development',
      category: 'mobile-development',
      budget: 12000,
      status: 'open',
      applicationCount: 8,
      postedDate: '2025-01-26T14:30:00Z',
      client: {
        name: 'Digital Ventures',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: true,
        location: 'New York, NY'
      },
      skills: [
        { name: 'React Native' },
        { name: 'Firebase' },
        { name: 'Payment APIs' }
      ]
    },
    {
      id: '3',
      title: 'WordPress Custom Theme Development',
      category: 'web-development',
      budget: 5000,
      status: 'open',
      applicationCount: 15,
      postedDate: '2025-01-25T09:15:00Z',
      client: {
        name: 'Creative Agency',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        verified: false,
        location: 'Austin, TX'
      },
      skills: [
        { name: 'WordPress' },
        { name: 'PHP' },
        { name: 'CSS' }
      ]
    },
    {
      id: '4',
      title: 'API Integration & Backend Development',
      category: 'backend-development',
      budget: 8000,
      status: 'open',
      applicationCount: 6,
      postedDate: '2025-01-24T16:45:00Z',
      client: {
        name: 'StartupXYZ',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        verified: true,
        location: 'Seattle, WA'
      },
      skills: [
        { name: 'Python' },
        { name: 'Django' },
        { name: 'REST APIs' }
      ]
    }
  ];

  const handleBack = () => {
    navigate('/job-marketplace');
  };

  const handleApply = (applicationData) => {
    console.log('Application submitted:', applicationData);
    // Mock application submission
    alert('Application submitted successfully!');
  };

  const handleSaveJob = (jobId, saved) => {
    console.log(`Job ${jobId} ${saved ? 'saved' : 'unsaved'}`);
  };

  const handleShareJob = () => {
    alert('Job link copied to clipboard!');
  };

  const handleEditJob = (jobId) => {
    console.log('Edit job:', jobId);
    navigate(`/edit-job?id=${jobId}`);
  };

  const handleViewApplications = (jobId) => {
    console.log('View applications for job:', jobId);
    navigate(`/job-applications?id=${jobId}`);
  };

  const handleCancelJob = (jobId) => {
    if (window.confirm('Are you sure you want to cancel this job posting?')) {
      console.log('Cancel job:', jobId);
      alert('Job posting cancelled successfully!');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/landing-page');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        user={user} 
        notificationCount={notificationCount}
        onLogout={handleLogout}
      />
      <JobHeader job={jobData} onBack={handleBack} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <JobDescription job={jobData} />
            <SkillsSection skills={jobData?.skills} />
            <ClientInfo client={jobData?.client} />
            
            {/* Mobile Application Panel */}
            <div className="lg:hidden">
              <ApplicationPanel
                job={jobData}
                user={user}
                onApply={handleApply}
                onSave={handleSaveJob}
                onShare={handleShareJob}
                onEdit={handleEditJob}
                onViewApplications={handleViewApplications}
                onCancel={handleCancelJob}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <ApplicationPanel
              job={jobData}
              user={user}
              onApply={handleApply}
              onSave={handleSaveJob}
              onShare={handleShareJob}
              onEdit={handleEditJob}
              onViewApplications={handleViewApplications}
              onCancel={handleCancelJob}
            />
          </div>
        </div>

        {/* Similar Jobs */}
        <div className="mt-12">
          <SimilarJobs jobs={similarJobsData} />
        </div>
      </div>
      <BottomTabNavigation user={user} notificationCount={notificationCount} />
    </div>
  );
};

export default JobDetailsPage;