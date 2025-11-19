import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const PaymentMethodSelector = ({ selectedMethod, onMethodSelect, className = '' }) => {
  const [expandedMethod, setExpandedMethod] = useState(null);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: 'CreditCard',
      popular: true,
      processingTime: 'Instant',
      fees: 'No additional fees',
      supportedCards: ['visa', 'mastercard', 'amex', 'discover']
    },
    {
      id: 'digital_wallet',
      name: 'Digital Wallets',
      description: 'PayPal, Apple Pay, Google Pay',
      icon: 'Wallet',
      popular: true,
      processingTime: 'Instant',
      fees: 'No additional fees',
      wallets: ['paypal', 'apple_pay', 'google_pay', 'samsung_pay']
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      description: 'Direct bank account transfer',
      icon: 'Building2',
      popular: false,
      processingTime: '1-3 business days',
      fees: 'May include bank charges',
      methods: ['ach', 'wire', 'sepa']
    },
    {
      id: 'local_payment',
      name: 'Local Payment Methods',
      description: 'Regional payment options',
      icon: 'MapPin',
      popular: false,
      processingTime: 'Varies by method',
      fees: 'Varies by provider',
      methods: ['alipay', 'wechat_pay', 'ideal', 'sofort']
    }
  ];

  const handleMethodSelect = (methodId) => {
    onMethodSelect(methodId);
    setExpandedMethod(expandedMethod === methodId ? null : methodId);
  };

  const getCardIcon = (cardType) => {
    const cardIcons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳'
    };
    return cardIcons?.[cardType] || '💳';
  };

  const getWalletIcon = (walletType) => {
    const walletIcons = {
      paypal: '🅿️',
      apple_pay: '🍎',
      google_pay: '🔵',
      samsung_pay: '📱'
    };
    return walletIcons?.[walletType] || '💰';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Payment Method</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Secure Payment</span>
        </div>
      </div>
      <div className="space-y-3">
        {paymentMethods?.map((method) => (
          <div key={method?.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => handleMethodSelect(method?.id)}
              className={`w-full p-4 text-left transition-all duration-200 hover:bg-muted/50 ${
                selectedMethod === method?.id ? 'bg-primary/5 border-primary' : 'bg-card'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedMethod === method?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <Icon name={method?.icon} size={20} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{method?.name}</span>
                      {method?.popular && (
                        <span className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{method?.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === method?.id 
                      ? 'border-primary bg-primary' :'border-muted-foreground'
                  }`}>
                    {selectedMethod === method?.id && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    )}
                  </div>
                  <Icon 
                    name={expandedMethod === method?.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </div>
              </div>
            </button>

            {expandedMethod === method?.id && (
              <div className="px-4 pb-4 bg-muted/20 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Processing Time</span>
                    <p className="text-sm text-foreground">{method?.processingTime}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Fees</span>
                    <p className="text-sm text-foreground">{method?.fees}</p>
                  </div>
                </div>

                {method?.supportedCards && (
                  <div className="mt-3">
                    <span className="text-xs font-medium text-muted-foreground">Accepted Cards</span>
                    <div className="flex items-center space-x-2 mt-1">
                      {method?.supportedCards?.map((card) => (
                        <div key={card} className="flex items-center space-x-1 text-sm">
                          <span>{getCardIcon(card)}</span>
                          <span className="capitalize text-foreground">{card}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {method?.wallets && (
                  <div className="mt-3">
                    <span className="text-xs font-medium text-muted-foreground">Available Wallets</span>
                    <div className="flex items-center space-x-3 mt-1">
                      {method?.wallets?.map((wallet) => (
                        <div key={wallet} className="flex items-center space-x-1 text-sm">
                          <span>{getWalletIcon(wallet)}</span>
                          <span className="capitalize text-foreground">{wallet?.replace('_', ' ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Security Badges */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={16} className="text-success" />
            <span>PCI Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>Secure Processing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;