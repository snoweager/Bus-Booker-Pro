import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = ({ className = '' }) => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encryption',
      description: 'Your data is protected with 256-bit SSL encryption',
      status: 'active'
    },
    {
      icon: 'Lock',
      title: 'PCI DSS Compliant',
      description: 'Payment Card Industry Data Security Standard certified',
      status: 'active'
    },
    {
      icon: 'CheckCircle',
      title: 'Secure Processing',
      description: 'Payments processed through certified secure gateways',
      status: 'active'
    },
    {
      icon: 'Eye',
      title: 'Fraud Protection',
      description: 'Advanced fraud detection and prevention systems',
      status: 'active'
    }
  ];

  const trustBadges = [
    {
      name: 'Visa Verified',
      logo: '💳',
      description: 'Visa Secure Payment Processing'
    },
    {
      name: 'Mastercard SecureCode',
      logo: '🔒',
      description: 'Mastercard Secure Authentication'
    },
    {
      name: 'Norton Secured',
      logo: '🛡️',
      description: 'Norton Security Verified'
    },
    {
      name: 'McAfee Secure',
      logo: '🔐',
      description: 'McAfee Security Certified'
    }
  ];

  const paymentProcessors = [
    {
      name: 'Stripe',
      logo: '💙',
      description: 'Secure payment processing by Stripe'
    },
    {
      name: 'PayPal',
      logo: '🅿️',
      description: 'PayPal buyer protection included'
    },
    {
      name: 'Square',
      logo: '⬜',
      description: 'Square secure payment gateway'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Security Features */}
      <div className="p-6 bg-card border border-border rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} className="text-success" />
          <h3 className="text-lg font-semibold text-foreground">Security & Protection</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
              <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={16} className="text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground text-sm">{feature?.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{feature?.description}</div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-success rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Badges */}
      <div className="p-6 bg-card border border-border rounded-lg">
        <h4 className="font-medium text-foreground mb-4">Trusted Security Partners</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {trustBadges?.map((badge, index) => (
            <div key={index} className="text-center p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors duration-200">
              <div className="text-2xl mb-2">{badge?.logo}</div>
              <div className="text-xs font-medium text-foreground">{badge?.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{badge?.description}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <h5 className="text-sm font-medium text-foreground mb-3">Payment Processors</h5>
          <div className="flex items-center justify-center space-x-6">
            {paymentProcessors?.map((processor, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span className="text-lg">{processor?.logo}</span>
                <span>{processor?.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Security Tips */}
      <div className="p-6 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Security Tips</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Never share your payment details via email or phone</li>
              <li>• Ensure you're on a secure connection (look for the lock icon)</li>
              <li>• Keep your browser and device updated</li>
              <li>• Log out after completing your transaction</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Contact Support */}
      <div className="p-4 bg-muted/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="HelpCircle" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Need help with payment?</span>
          </div>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityIndicators;