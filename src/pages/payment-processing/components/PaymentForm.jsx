import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const PaymentForm = ({ paymentMethod, onSubmit, isProcessing, className = '' }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    saveCard: false,
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState('');

  const monthOptions = [
    { value: '01', label: '01 - January' },
    { value: '02', label: '02 - February' },
    { value: '03', label: '03 - March' },
    { value: '04', label: '04 - April' },
    { value: '05', label: '05 - May' },
    { value: '06', label: '06 - June' },
    { value: '07', label: '07 - July' },
    { value: '08', label: '08 - August' },
    { value: '09', label: '09 - September' },
    { value: '10', label: '10 - October' },
    { value: '11', label: '11 - November' },
    { value: '12', label: '12 - December' }
  ];

  const yearOptions = Array.from({ length: 20 }, (_, i) => {
    const year = new Date()?.getFullYear() + i;
    return { value: year?.toString(), label: year?.toString() };
  });

  const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'ES', label: 'Spain' },
    { value: 'IT', label: 'Italy' },
    { value: 'AU', label: 'Australia' },
    { value: 'JP', label: 'Japan' },
    { value: 'IN', label: 'India' }
  ];

  const detectCardType = (number) => {
    const cleanNumber = number?.replace(/\s/g, '');
    if (/^4/?.test(cleanNumber)) return 'visa';
    if (/^5[1-5]/?.test(cleanNumber)) return 'mastercard';
    if (/^3[47]/?.test(cleanNumber)) return 'amex';
    if (/^6/?.test(cleanNumber)) return 'discover';
    return '';
  };

  const formatCardNumber = (value) => {
    const cleanValue = value?.replace(/\s/g, '');
    const cardType = detectCardType(cleanValue);
    setCardType(cardType);
    
    // Format with spaces every 4 digits
    return cleanValue?.replace(/(.{4})/g, '$1 ')?.trim();
  };

  const handleInputChange = (field, value) => {
    let processedValue = value;
    
    if (field === 'cardNumber') {
      processedValue = formatCardNumber(value);
    } else if (field === 'cvv') {
      processedValue = value?.replace(/\D/g, '')?.slice(0, cardType === 'amex' ? 4 : 3);
    } else if (field === 'cardholderName') {
      processedValue = value?.replace(/[^a-zA-Z\s]/g, '');
    } else if (field === 'zipCode') {
      processedValue = value?.replace(/[^a-zA-Z0-9]/g, '');
    }

    setFormData(prev => ({ ...prev, [field]: processedValue }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.cardNumber?.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData?.cardNumber?.replace(/\s/g, '')?.length < 13) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!formData?.expiryMonth) {
      newErrors.expiryMonth = 'Expiry month is required';
    }
    
    if (!formData?.expiryYear) {
      newErrors.expiryYear = 'Expiry year is required';
    }
    
    if (!formData?.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (formData?.cvv?.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    if (!formData?.cardholderName?.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    if (!formData?.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getCardIcon = () => {
    const icons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳'
    };
    return icons?.[cardType] || '💳';
  };

  if (paymentMethod !== 'card') {
    return (
      <div className={`p-6 bg-card border border-border rounded-lg ${className}`}>
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {paymentMethod === 'digital_wallet' && 'Digital Wallet Payment'}
            {paymentMethod === 'bank_transfer' && 'Bank Transfer Setup'}
            {paymentMethod === 'local_payment' && 'Local Payment Method'}
          </h3>
          <p className="text-muted-foreground mb-6">
            You will be redirected to complete your payment securely.
          </p>
          <Button 
            onClick={() => onSubmit({ method: paymentMethod })}
            loading={isProcessing}
            iconName="ExternalLink"
            iconPosition="right"
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 bg-card border border-border rounded-lg ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Card Details</h3>
        <div className="flex items-center space-x-2">
          {cardType && (
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>{getCardIcon()}</span>
              <span className="capitalize">{cardType}</span>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Number */}
        <Input
          label="Card Number"
          type="text"
          placeholder="1234 5678 9012 3456"
          value={formData?.cardNumber}
          onChange={(e) => handleInputChange('cardNumber', e?.target?.value)}
          error={errors?.cardNumber}
          maxLength={19}
          required
        />

        {/* Expiry and CVV */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Expiry Month"
            options={monthOptions}
            value={formData?.expiryMonth}
            onChange={(value) => handleInputChange('expiryMonth', value)}
            error={errors?.expiryMonth}
            placeholder="Month"
            required
          />
          
          <Select
            label="Expiry Year"
            options={yearOptions}
            value={formData?.expiryYear}
            onChange={(value) => handleInputChange('expiryYear', value)}
            error={errors?.expiryYear}
            placeholder="Year"
            required
          />
          
          <Input
            label="CVV"
            type="text"
            placeholder={cardType === 'amex' ? '1234' : '123'}
            value={formData?.cvv}
            onChange={(e) => handleInputChange('cvv', e?.target?.value)}
            error={errors?.cvv}
            maxLength={cardType === 'amex' ? 4 : 3}
            required
          />
        </div>

        {/* Cardholder Name */}
        <Input
          label="Cardholder Name"
          type="text"
          placeholder="John Doe"
          value={formData?.cardholderName}
          onChange={(e) => handleInputChange('cardholderName', e?.target?.value)}
          error={errors?.cardholderName}
          required
        />

        {/* Billing Address */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Billing Address</h4>
          
          <Input
            label="Address"
            type="text"
            placeholder="123 Main Street"
            value={formData?.billingAddress}
            onChange={(e) => handleInputChange('billingAddress', e?.target?.value)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              type="text"
              placeholder="New York"
              value={formData?.city}
              onChange={(e) => handleInputChange('city', e?.target?.value)}
            />
            
            <Input
              label="State/Province"
              type="text"
              placeholder="NY"
              value={formData?.state}
              onChange={(e) => handleInputChange('state', e?.target?.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="ZIP/Postal Code"
              type="text"
              placeholder="10001"
              value={formData?.zipCode}
              onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
            />
            
            <Select
              label="Country"
              options={countryOptions}
              value={formData?.country}
              onChange={(value) => handleInputChange('country', value)}
              required
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 pt-4 border-t border-border">
          <Checkbox
            label="Save this card for future payments"
            description="Your card details will be securely stored for faster checkout"
            checked={formData?.saveCard}
            onChange={(e) => handleInputChange('saveCard', e?.target?.checked)}
          />
          
          <Checkbox
            label="I agree to the Terms and Conditions and Privacy Policy"
            checked={formData?.agreeTerms}
            onChange={(e) => handleInputChange('agreeTerms', e?.target?.checked)}
            error={errors?.agreeTerms}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isProcessing}
            iconName="CreditCard"
            iconPosition="left"
          >
            Complete Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
