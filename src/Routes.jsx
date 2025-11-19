import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import BookingConfirmation from './pages/booking-confirmation';
import LandingPage from './pages/landing-page';
import BookingManagement from './pages/booking-management';
import UserDashboard from './pages/user-dashboard';
import UserAuthentication from './pages/user-authentication';
import PaymentProcessing from './pages/payment-processing';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/booking-management" element={<BookingManagement />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="/payment-processing" element={<PaymentProcessing />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
