import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TopNavigation from '../../components/ui/TopNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import SearchHeader from './components/SearchHeader';
import FilterPanel from './components/FilterPanel';
import QuickFilters from './components/QuickFilters';
import JobGrid from './components/JobGrid';
import LoadMoreButton from './components/LoadMoreButton';

const JobMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    budgetRange: [0, 10000],
    skills: [],
    duration: [],
    minRating: 0
  });
  const [quickFilters, setQuickFilters] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    role: "freelancer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Mock jobs data
  const mockJobs = [
    {
      id: 1,
      title: "React Developer for E-commerce Platform",
      description: `We're looking for an experienced React developer to build a modern e-commerce platform with advanced features.\n\nKey requirements:\n• 3+ years React experience\n• TypeScript proficiency\n• E-commerce experience preferred\n• Strong UI/UX skills`,
      budget: 2500,
      duration: "2-3 months",
      location: "Remote",
      skills: ["React", "TypeScript", "Node.js", "MongoDB", "Stripe"],
      client: {
        name: "TechCorp Solutions",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        reviewCount: 127
      },
      postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isSaved: false,
      isUrgent: false,
      experienceLevel: "expert"
    },
    {
      id: 2,
      title: "UI/UX Designer for Mobile App",
      description: `Design a beautiful and intuitive mobile app for our fitness platform.\n\nWhat we need:\n• Modern, clean design\n• User-centered approach\n• Figma prototypes\n• Design system creation`,
      budget: 1800,
      duration: "1-2 months",
      location: "Remote",
      skills: ["UI/UX Design", "Figma", "Mobile Design", "Prototyping"],
      client: {
        name: "FitLife Startup",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        rating: 4.6,
        reviewCount: 89
      },
      postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isSaved: true,
      isUrgent: true,
      experienceLevel: "intermediate"
    },
    {
      id: 3,
      title: "Blockchain Smart Contract Development",
      description: `Develop smart contracts for our DeFi platform on Stellar network.\n\nRequirements:\n• Soroban experience\n• Rust programming\n• DeFi protocols knowledge\n• Security best practices`,
      budget: 4200,
      duration: "3-4 months",
      location: "Remote",
      skills: ["Blockchain", "Soroban", "Rust", "Smart Contracts", "DeFi"],
      client: {
        name: "CryptoVentures",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        reviewCount: 203
      },
      postedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      isSaved: false,
      isUrgent: false,
      experienceLevel: "expert"
    },
    {
      id: 4,
      title: "Content Writer for Tech Blog",
      description: `Write engaging technical articles for our developer blog.\n\nWe're looking for:\n• Technical writing experience\n• SEO knowledge\n• 2-3 articles per week\n• Long-term collaboration`,
      budget: 800,
      duration: "Ongoing",
      location: "Remote",
      skills: ["Content Writing", "Technical Writing", "SEO", "Research"],
      client: {
        name: "DevBlog Media",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 4.4,
        reviewCount: 56
      },
      postedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      isSaved: false,
      isUrgent: false,
      experienceLevel: "entry-level"
    },
    {
      id: 5,
      title: "Python Data Analysis Project",
      description: `Analyze large datasets and create visualizations for business insights.\n\nSkills needed:\n• Python & Pandas\n• Data visualization\n• Statistical analysis\n• Report generation`,
      budget: 1500,
      duration: "3-4 weeks",
      location: "Remote",
      skills: ["Python", "Data Analysis", "Pandas", "Matplotlib", "Statistics"],
      client: {
        name: "DataInsights Co",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 4.7,
        reviewCount: 134
      },
      postedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      isSaved: false,
      isUrgent: true,
      experienceLevel: "intermediate"
    },
    {
      id: 6,
      title: "Mobile App Development - React Native",
      description: `Build a cross-platform mobile app for our social networking platform.\n\nFeatures include:\n• User authentication\n• Real-time messaging\n• Photo sharing\n• Push notifications`,
      budget: 3200,
      duration: "4-5 months",
      location: "Remote",
      skills: ["React Native", "JavaScript", "Firebase", "Mobile Development"],
      client: {
        name: "SocialConnect",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        rating: 4.5,
        reviewCount: 78
      },
      postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isSaved: true,
      isUrgent: false,
      experienceLevel: "expert"
    }
  ];

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // In a real app, this would trigger a search API call
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger a filtered search
  };

  const handleQuickFilterToggle = (filterId) => {
    setQuickFilters(prev => 
      prev?.includes(filterId)
        ? prev?.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate loading more jobs
    setTimeout(() => {
      const newJobs = mockJobs?.map(job => ({
        ...job,
        id: job?.id + currentPage * 10
      }));
      setJobs(prev => [...prev, ...newJobs]);
      setCurrentPage(prev => prev + 1);
      setLoadingMore(false);
      
      // Simulate no more jobs after 3 pages
      if (currentPage >= 2) {
        setHasMore(false);
      }
    }, 1500);
  };

  const filteredJobs = jobs?.filter(job => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      const matchesTitle = job?.title?.toLowerCase()?.includes(query);
      const matchesDescription = job?.description?.toLowerCase()?.includes(query);
      const matchesSkills = job?.skills?.some(skill => 
        skill?.toLowerCase()?.includes(query)
      );
      if (!matchesTitle && !matchesDescription && !matchesSkills) {
        return false;
      }
    }

    // Budget filter
    if (job?.budget < filters?.budgetRange?.[0] || job?.budget > filters?.budgetRange?.[1]) {
      return false;
    }

    // Skills filter
    if (filters?.skills?.length > 0) {
      const hasMatchingSkill = filters?.skills?.some(skill => 
        job?.skills?.includes(skill)
      );
      if (!hasMatchingSkill) return false;
    }

    // Quick filters
    if (quickFilters?.includes('remote') && job?.location !== 'Remote') {
      return false;
    }
    if (quickFilters?.includes('urgent') && !job?.isUrgent) {
      return false;
    }
    if (quickFilters?.includes('entry-level') && job?.experienceLevel !== 'entry-level') {
      return false;
    }
    if (quickFilters?.includes('expert') && job?.experienceLevel !== 'expert') {
      return false;
    }

    return true;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs]?.sort((a, b) => {
    switch (sortBy) {
      case 'budget-high':
        return b?.budget - a?.budget;
      case 'budget-low':
        return a?.budget - b?.budget;
      case 'relevance':
        // Simple relevance based on search query match
        if (!searchQuery) return 0;
        const aRelevance = a?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ? 1 : 0;
        const bRelevance = b?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ? 1 : 0;
        return bRelevance - aRelevance;
      case 'newest':
      default:
        return new Date(b.postedAt) - new Date(a.postedAt);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        user={currentUser} 
        notificationCount={3}
        onLogout={() => console.log('Logout')}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]"
      >
        {/* Filter Panel */}
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isMobile={true}
        />
        
        <FilterPanel
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isMobile={false}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Search Header */}
          <SearchHeader
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onFilterToggle={() => setIsFilterOpen(true)}
          />

          {/* Quick Filters */}
          <QuickFilters
            activeFilters={quickFilters}
            onFilterToggle={handleQuickFilterToggle}
            jobCount={sortedJobs?.length}
          />

          {/* Job Grid */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <JobGrid
              jobs={sortedJobs}
              viewMode={viewMode}
              loading={loading}
            />

            {/* Load More */}
            {!loading && sortedJobs?.length > 0 && (
              <LoadMoreButton
                onLoadMore={handleLoadMore}
                loading={loadingMore}
                hasMore={hasMore}
              />
            )}
          </div>
        </div>
      </motion.div>
      <BottomTabNavigation 
        user={currentUser} 
        notificationCount={3}
      />
    </div>
  );
};

export default JobMarketplace;