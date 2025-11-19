import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const BookingSummary = ({ className = '' }) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);

  // Mock booking data
  const bookingData = {
    route: {
      from: "New York, NY",
      to: "Washington, DC",
      date: "2025-10-20",
      time: "08:30 AM"
    },
    bus: {
      operator: "Greyhound Lines",
      busNumber: "GL-2045",
      type: "Express Coach",
      amenities: ["WiFi", "AC", "Reclining Seats", "USB Charging"]
    },
    passengers: [
      {
        id: 1,
        name: "John Doe",
        age: 32,
        seatNumber: "12A",
        type: "Adult"
      },
      {
        id: 2,
        name: "Jane Doe",
        age: 28,
        seatNumber: "12B",
        type: "Adult"
      }
    ],
    pricing: {
      basePrice: 89.00,
      taxes: 7.12,
      serviceFee: 4.50,
      promoDiscount: promoApplied ? -15.00 : 0,
      loyaltyDiscount: useLoyaltyPoints ? -10.00 : 0,
      total: 0
    },
    currency: "USD",
    refundPolicy: "Free cancellation up to 24 hours before departure"
  };

  // Calculate total
  bookingData.pricing.total = 
    (bookingData?.pricing?.basePrice * bookingData?.passengers?.length) + 
    bookingData?.pricing?.taxes + 
    bookingData?.pricing?.serviceFee + 
    bookingData?.pricing?.promoDiscount + 
    bookingData?.pricing?.loyaltyDiscount;

  const availableLoyaltyPoints = 1250;

  const handlePromoCode = () => {
    if (promoCode?.toLowerCase() === 'save15') {
      setPromoApplied(true);
      setPromoError('');
    } else if (promoCode?.trim()) {
      setPromoError('Invalid promo code');
      setPromoApplied(false);
    }
  };

  const handleLoyaltyPoints = () => {
    setUseLoyaltyPoints(!useLoyaltyPoints);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: bookingData.currency
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`p-6 bg-card border border-border rounded-lg ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-6">Booking Summary</h3>
      {/* Route Information */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={20} color="white" />
            </div>
            <div>
              <div className="font-medium text-foreground">{bookingData?.route?.from}</div>
              <div className="text-sm text-muted-foreground">Departure</div>
            </div>
          </div>
          <Icon name="ArrowRight" size={20} className="text-muted-foreground" />
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-medium text-foreground text-right">{bookingData?.route?.to}</div>
              <div className="text-sm text-muted-foreground text-right">Arrival</div>
            </div>
            <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={20} color="white" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/20 rounded-lg">
            <div className="text-sm text-muted-foreground">Date</div>
            <div className="font-medium text-foreground">{formatDate(bookingData?.route?.date)}</div>
          </div>
          <div className="p-3 bg-muted/20 rounded-lg">
            <div className="text-sm text-muted-foreground">Departure Time</div>
            <div className="font-medium text-foreground">{bookingData?.route?.time}</div>
          </div>
        </div>
      </div>
      {/* Bus Information */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Bus Details</h4>
        <div className="p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-medium text-foreground">{bookingData?.bus?.operator}</div>
              <div className="text-sm text-muted-foreground">{bookingData?.bus?.busNumber} • {bookingData?.bus?.type}</div>
            </div>
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Icon name="Bus" size={24} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {bookingData?.bus?.amenities?.map((amenity, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-accent/20 text-accent-foreground rounded-full">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Passengers */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Passengers</h4>
        <div className="space-y-2">
          {bookingData?.passengers?.map((passenger) => (
            <div key={passenger?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} />
                </div>
                <div>
                  <div className="font-medium text-foreground">{passenger?.name}</div>
                  <div className="text-sm text-muted-foreground">{passenger?.type} • Age {passenger?.age}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-foreground">Seat {passenger?.seatNumber}</div>
                <div className="text-sm text-muted-foreground">{formatCurrency(bookingData?.pricing?.basePrice)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Promo Code */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Promo Code</h4>
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e?.target?.value)}
              error={promoError}
              disabled={promoApplied}
            />
          </div>
          <Button
            variant={promoApplied ? "success" : "outline"}
            onClick={handlePromoCode}
            disabled={promoApplied || !promoCode?.trim()}
            iconName={promoApplied ? "Check" : "Tag"}
            iconPosition="left"
          >
            {promoApplied ? "Applied" : "Apply"}
          </Button>
        </div>
        {promoApplied && (
          <div className="mt-2 flex items-center space-x-2 text-sm text-success">
            <Icon name="CheckCircle" size={16} />
            <span>Promo code "SAVE15" applied successfully!</span>
          </div>
        )}
      </div>
      {/* Loyalty Points */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Loyalty Points</h4>
        <div className="p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-muted-foreground">Available Points</div>
              <div className="font-medium text-foreground">{availableLoyaltyPoints?.toLocaleString()} points</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Value</div>
              <div className="font-medium text-foreground">{formatCurrency(availableLoyaltyPoints * 0.008)}</div>
            </div>
          </div>
          <Button
            variant={useLoyaltyPoints ? "success" : "outline"}
            size="sm"
            fullWidth
            onClick={handleLoyaltyPoints}
            iconName={useLoyaltyPoints ? "Check" : "Gift"}
            iconPosition="left"
          >
            {useLoyaltyPoints ? "Points Applied" : "Use 1,250 Points (-$10.00)"}
          </Button>
        </div>
      </div>
      {/* Price Breakdown */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Price Breakdown</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Base Price × {bookingData?.passengers?.length} passengers
            </span>
            <span className="text-foreground">
              {formatCurrency(bookingData?.pricing?.basePrice * bookingData?.passengers?.length)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Taxes & Fees</span>
            <span className="text-foreground">{formatCurrency(bookingData?.pricing?.taxes)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service Fee</span>
            <span className="text-foreground">{formatCurrency(bookingData?.pricing?.serviceFee)}</span>
          </div>
          {promoApplied && (
            <div className="flex justify-between text-sm">
              <span className="text-success">Promo Discount (SAVE15)</span>
              <span className="text-success">{formatCurrency(bookingData?.pricing?.promoDiscount)}</span>
            </div>
          )}
          {useLoyaltyPoints && (
            <div className="flex justify-between text-sm">
              <span className="text-success">Loyalty Points Discount</span>
              <span className="text-success">{formatCurrency(bookingData?.pricing?.loyaltyDiscount)}</span>
            </div>
          )}
          <hr className="border-border" />
          <div className="flex justify-between font-semibold text-lg">
            <span className="text-foreground">Total</span>
            <span className="text-primary">{formatCurrency(bookingData?.pricing?.total)}</span>
          </div>
        </div>
      </div>
      {/* Refund Policy */}
      <div className="p-4 bg-muted/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <div className="text-sm font-medium text-foreground">Refund Policy</div>
            <div className="text-xs text-muted-foreground mt-1">{bookingData?.refundPolicy}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;