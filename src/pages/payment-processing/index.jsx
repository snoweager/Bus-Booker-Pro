import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingProgress from '../../components/ui/BookingProgress';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import PaymentForm from './components/PaymentForm';
import BookingSummary from './components/BookingSummary';
import SecurityIndicators from './components/SecurityIndicators';
import ProcessingIndicator from './components/ProcessingIndicator';

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Check for saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const breadcrumbs = [
    { label: 'Home', path: '/landing-page' },
    { label: 'Search Results', path: '/landing-page' },
    { label: 'Payment', path: '/payment-processing' }
  ];

  const handlePaymentSubmit = async (paymentData) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      // Mock payment processing delay
      await new Promise(resolve => setTimeout(resolve, 7500));
      
      // Store payment data for confirmation page
      localStorage.setItem('paymentData', JSON.stringify({
        ...paymentData,
        method: selectedPaymentMethod,
        timestamp: new Date()?.toISOString(),
        transactionId: `TXN-${Date.now()}-${Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase()}`
      }));
      
      // Navigate to confirmation page
      navigate('/booking-confirmation');
    } catch (error) {
      console.error('Payment processing error:', error);
      setIsProcessing(false);
      // Handle error state here
    }
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
  };

  const handleBackToSearch = () => {
    navigate('/landing-page');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BookingProgress />
      <main className="pt-20">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs customBreadcrumbs={breadcrumbs} />
        </div>

        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Payment</h1>
              <p className="text-muted-foreground">
                Secure payment processing with multiple payment options
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleBackToSearch}
              iconName="ArrowLeft"
              iconPosition="left"
              className="hidden md:flex"
            >
              Back to Search
            </Button>
          </div>

          {/* Mobile Back Button */}
          <div className="md:hidden mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToSearch}
              iconName="ArrowLeft"
              iconPosition="left"
              fullWidth
            >
              Back to Search
            </Button>
          </div>
        </div>

        {/* Payment Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Payment Methods and Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Method Selection */}
              <PaymentMethodSelector
                selectedMethod={selectedPaymentMethod}
                onMethodSelect={setSelectedPaymentMethod}
              />

              {/* Payment Form */}
              <PaymentForm
                paymentMethod={selectedPaymentMethod}
                onSubmit={handlePaymentSubmit}
                isProcessing={isProcessing}
              />

              {/* Security Indicators - Mobile */}
              <div className="lg:hidden">
                <SecurityIndicators />
              </div>
            </div>

            {/* Right Column - Booking Summary and Security */}
            <div className="space-y-6">
              {/* Booking Summary */}
              <BookingSummary />

              {/* Security Indicators - Desktop */}
              <div className="hidden lg:block">
                <SecurityIndicators />
              </div>

              {/* Help Section */}
              <div className="p-6 bg-card border border-border rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="HelpCircle" size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Need Help?</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name="Phone" size={16} />
                    <span>24/7 Support: +1 (800) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name="Mail" size={16} />
                    <span>support@busbookerpro.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name="MessageCircle" size={16} />
                    <span>Live Chat Available</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="mt-4"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Start Live Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Processing Indicator */}
      <ProcessingIndicator
        isProcessing={isProcessing}
        onComplete={handleProcessingComplete}
      />
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Bus" size={20} color="white" />
                </div>
                <span className="text-xl font-bold text-foreground">BusBooker Pro</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Secure and reliable bus booking platform with comprehensive travel management features.
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Lock" size={16} className="text-success" />
                  <span>PCI Compliant</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Payment Issues</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Refund Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-3">Security</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Trust & Safety</a></li>
              </ul>
            </div>
          </div>
          
          <hr className="border-border my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} BusBooker Pro. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span>Powered by secure payment processing</span>
              <div className="flex items-center space-x-2">
                <span>💳</span>
                <span>🔒</span>
                <span>🛡️</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentProcessing;