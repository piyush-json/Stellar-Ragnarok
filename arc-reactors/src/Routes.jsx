import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ClientDashboard from './pages/client-dashboard';
import ChatInterface from './pages/chat-interface';
import JobMarketplace from './pages/job-marketplace';
import LandingPage from './pages/landing-page';
import JobDetailsPage from './pages/job-details';
import FreelancerDashboard from './pages/freelancer-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ChatInterface />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/chat-interface" element={<ChatInterface />} />
        <Route path="/job-marketplace" element={<JobMarketplace />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/job-details" element={<JobDetailsPage />} />
        <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
