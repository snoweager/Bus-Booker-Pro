import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CancellationModal = ({ booking, isOpen, onClose, onConfirm }) => {
  const [cancellationReason, setCancellationReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const cancellationReasons = [
    { value: 'change_of_plans', label: 'Change of Plans' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'illness', label: 'Illness' },
    { value: 'work_commitment', label: 'Work Commitment' },
    { value: 'weather', label: 'Weather Conditions' },
    { value: 'other', label: 'Other' }
  ];

  const calculateRefund = () => {
    const bookingDate = new Date(booking.bookingDate);
    const departureDate = new Date(booking.departureDate);
    const now = new Date();
    
    const hoursUntilDeparture = (departureDate - now) / (1000 * 60 * 60);
    const totalAmount = parseFloat(booking?.totalAmount);
    
    let refundPercentage = 0;
    let cancellationFee = 0;
    
    if (hoursUntilDeparture >= 24) {
      refundPercentage = 90;
      cancellationFee = totalAmount * 0.1;
    } else if (hoursUntilDeparture >= 12) {
      refundPercentage = 75;
      cancellationFee = totalAmount * 0.25;
    } else if (hoursUntilDeparture >= 6) {
      refundPercentage = 50;
      cancellationFee = totalAmount * 0.5;
    } else {
      refundPercentage = 0;
      cancellationFee = totalAmount;
    }
    
    const refundAmount = totalAmount * (refundPercentage / 100);
    
    return {
      refundPercentage,
      refundAmount,
      cancellationFee,
      processingTime: hoursUntilDeparture >= 24 ? '3-5 business days' : '5-7 business days'
    };
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      onConfirm({
        bookingId: booking?.bookingId,
        reason: cancellationReason,
        refundDetails: calculateRefund()
      });
      onClose();
    } catch (error) {
      console.error('Cancellation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const refundDetails = calculateRefund();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Cancel Booking</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Warning */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div>
                <h3 className="font-medium text-warning mb-1">Cancellation Notice</h3>
                <p className="text-sm text-warning/80">
                  Please review the cancellation policy and refund details before proceeding. 
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Booking to Cancel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking ID:</span>
                  <span className="text-foreground">{booking?.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Route:</span>
                  <span className="text-foreground">{booking?.origin} → {booking?.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="text-foreground">{booking?.departureDate}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Passengers:</span>
                  <span className="text-foreground">{booking?.passengers?.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seats:</span>
                  <span className="text-foreground">{booking?.seatNumbers?.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="text-foreground">${booking?.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation Reason */}
          <div>
            <Select
              label="Reason for Cancellation"
              placeholder="Select a reason"
              options={cancellationReasons}
              value={cancellationReason}
              onChange={setCancellationReason}
              required
            />
          </div>

          {/* Refund Details */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="DollarSign" size={16} />
              <span>Refund Calculation</span>
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Original Amount:</span>
                    <span className="text-foreground">${booking?.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cancellation Fee:</span>
                    <span className="text-destructive">-${refundDetails?.cancellationFee?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-border">
                    <span className="text-foreground">Refund Amount:</span>
                    <span className="text-success">${refundDetails?.refundAmount?.toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Refund Percentage:</span>
                    <span className="text-foreground">{refundDetails?.refundPercentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Time:</span>
                    <span className="text-foreground">{refundDetails?.processingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Refund Method:</span>
                    <span className="text-foreground">{booking?.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="pt-3 border-t border-border">
                <h4 className="font-medium text-foreground mb-2">Cancellation Policy</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• 24+ hours before departure: 90% refund (10% cancellation fee)</div>
                  <div>• 12-24 hours before departure: 75% refund (25% cancellation fee)</div>
                  <div>• 6-12 hours before departure: 50% refund (50% cancellation fee)</div>
                  <div>• Less than 6 hours: No refund</div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  By proceeding with the cancellation, you acknowledge that:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>The refund will be processed according to our cancellation policy</li>
                  <li>Refunds will be credited to the original payment method</li>
                  <li>Processing times may vary based on your bank or payment provider</li>
                  <li>This action is irreversible once confirmed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Keep Booking
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            loading={isLoading}
            disabled={!cancellationReason}
            iconName="X"
            iconPosition="left"
          >
            Cancel Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancellationModal;