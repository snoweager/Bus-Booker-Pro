import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingCard = ({ booking, onModify, onCancel, onDownload, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'cancelled':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'completed':
        return 'text-muted-foreground bg-muted border-border';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const canModify = booking?.status === 'confirmed' && new Date(booking.departureDate) > new Date();
  const canCancel = ['confirmed', 'pending']?.includes(booking?.status?.toLowerCase()) && 
                   new Date(booking.departureDate) > new Date();

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-foreground">
                {booking?.origin} → {booking?.destination}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(booking?.status)}`}>
                {booking?.status}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{formatDate(booking?.departureDate)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{formatTime(booking?.departureTime)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>Booking ID: {booking?.bookingId}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {isExpanded ? 'Less' : 'Details'}
            </Button>
          </div>
        </div>
      </div>
      {/* Basic Info */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Image
              src={booking?.busOperator?.logo}
              alt={`${booking?.busOperator?.name} bus company logo with blue and white design`}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <div className="font-medium text-foreground">{booking?.busOperator?.name}</div>
              <div className="text-sm text-muted-foreground">{booking?.busType}</div>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <div className="text-sm text-muted-foreground">Passengers</div>
            <div className="font-medium text-foreground">{booking?.passengers?.length} Passenger(s)</div>
            <div className="text-sm text-muted-foreground">
              Seats: {booking?.seatNumbers?.join(', ')}
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="text-sm text-muted-foreground">Total Amount</div>
            <div className="text-xl font-bold text-foreground">${booking?.totalAmount}</div>
            <div className="text-sm text-muted-foreground">
              {booking?.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
            </div>
          </div>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border">
          <div className="p-4 space-y-4">
            {/* Journey Details */}
            <div>
              <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                <Icon name="Route" size={16} />
                <span>Journey Details</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Departure:</span>
                    <span className="text-foreground">{booking?.departureTerminal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Arrival:</span>
                    <span className="text-foreground">{booking?.arrivalTerminal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="text-foreground">{booking?.duration}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Arrival Time:</span>
                    <span className="text-foreground">{formatTime(booking?.arrivalTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="text-foreground">{booking?.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bus Number:</span>
                    <span className="text-foreground">{booking?.busNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Details */}
            <div>
              <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span>Passenger Information</span>
              </h4>
              <div className="space-y-2">
                {booking?.passengers?.map((passenger, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {passenger?.name?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{passenger?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {passenger?.age} years • {passenger?.gender} • Seat {booking?.seatNumbers?.[index]}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {passenger?.phone}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                <Icon name="CreditCard" size={16} />
                <span>Payment Information</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Fare:</span>
                    <span className="text-foreground">${booking?.baseFare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees:</span>
                    <span className="text-foreground">${booking?.taxes}</span>
                  </div>
                  {booking?.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount:</span>
                      <span className="text-success">-${booking?.discount}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span className="text-foreground">{booking?.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID:</span>
                    <span className="text-foreground">{booking?.transactionId}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-foreground">Total Amount:</span>
                    <span className="text-foreground">${booking?.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload(booking)}
            iconName="Download"
            iconPosition="left"
          >
            Download Ticket
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(booking)}
            iconName="Eye"
            iconPosition="left"
          >
            View Details
          </Button>

          {canModify && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onModify(booking)}
              iconName="Edit"
              iconPosition="left"
            >
              Modify Booking
            </Button>
          )}

          {canCancel && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onCancel(booking)}
              iconName="X"
              iconPosition="left"
            >
              Cancel Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;