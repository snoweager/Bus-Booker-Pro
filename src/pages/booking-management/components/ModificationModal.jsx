import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ModificationModal = ({ booking, isOpen, onClose, onConfirm }) => {
  const [modificationType, setModificationType] = useState('');
  const [modificationData, setModificationData] = useState({
    newDate: '',
    newTime: '',
    seatUpgrade: '',
    passengerInfo: {},
    additionalServices: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const modificationOptions = [
    { value: 'date', label: 'Change Travel Date' },
    { value: 'seat', label: 'Upgrade Seat' },
    { value: 'passenger', label: 'Update Passenger Info' },
    { value: 'services', label: 'Add Services' }
  ];

  const seatUpgradeOptions = [
    { value: 'premium', label: 'Premium Seat (+$15)' },
    { value: 'sleeper', label: 'Sleeper Berth (+$25)' },
    { value: 'window', label: 'Window Seat (+$5)' }
  ];

  const additionalServices = [
    { value: 'meal', label: 'Meal Service (+$12)' },
    { value: 'wifi', label: 'Premium WiFi (+$8)' },
    { value: 'insurance', label: 'Travel Insurance (+$15)' },
    { value: 'priority', label: 'Priority Boarding (+$10)' }
  ];

  const handleModificationTypeChange = (type) => {
    setModificationType(type);
    setModificationData({
      newDate: '',
      newTime: '',
      seatUpgrade: '',
      passengerInfo: {},
      additionalServices: []
    });
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      onConfirm({
        bookingId: booking?.bookingId,
        type: modificationType,
        data: modificationData
      });
      onClose();
    } catch (error) {
      console.error('Modification failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAdditionalCost = () => {
    let cost = 0;
    if (modificationType === 'seat' && modificationData?.seatUpgrade) {
      const upgrade = seatUpgradeOptions?.find(opt => opt?.value === modificationData?.seatUpgrade);
      if (upgrade) {
        const match = upgrade?.label?.match(/\+\$(\d+)/);
        if (match) cost += parseInt(match?.[1]);
      }
    }
    if (modificationData?.additionalServices?.length > 0) {
      modificationData?.additionalServices?.forEach(service => {
        const serviceOption = additionalServices?.find(opt => opt?.value === service);
        if (serviceOption) {
          const match = serviceOption?.label?.match(/\+\$(\d+)/);
          if (match) cost += parseInt(match?.[1]);
        }
      });
    }
    return cost;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Modify Booking</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Booking Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-2">Current Booking Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Route:</span>
                <span className="ml-2 text-foreground">{booking?.origin} → {booking?.destination}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>
                <span className="ml-2 text-foreground">{booking?.departureDate}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Seats:</span>
                <span className="ml-2 text-foreground">{booking?.seatNumbers?.join(', ')}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Amount:</span>
                <span className="ml-2 text-foreground">${booking?.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Modification Type */}
          <div>
            <Select
              label="What would you like to modify?"
              placeholder="Select modification type"
              options={modificationOptions}
              value={modificationType}
              onChange={handleModificationTypeChange}
              required
            />
          </div>

          {/* Modification Forms */}
          {modificationType === 'date' && (
            <div className="space-y-4">
              <Input
                type="date"
                label="New Travel Date"
                value={modificationData?.newDate}
                onChange={(e) => setModificationData(prev => ({ ...prev, newDate: e?.target?.value }))}
                min={new Date()?.toISOString()?.split('T')?.[0]}
                required
              />
              <div className="text-sm text-muted-foreground">
                <Icon name="Info" size={14} className="inline mr-1" />
                Date changes may incur additional charges based on fare difference.
              </div>
            </div>
          )}

          {modificationType === 'seat' && (
            <div className="space-y-4">
              <Select
                label="Select Seat Upgrade"
                placeholder="Choose seat upgrade"
                options={seatUpgradeOptions}
                value={modificationData?.seatUpgrade}
                onChange={(value) => setModificationData(prev => ({ ...prev, seatUpgrade: value }))}
                required
              />
              <div className="text-sm text-muted-foreground">
                <Icon name="Info" size={14} className="inline mr-1" />
                Seat upgrades are subject to availability and additional charges.
              </div>
            </div>
          )}

          {modificationType === 'passenger' && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Update passenger information for this booking:
              </div>
              {booking?.passengers?.map((passenger, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-foreground">Passenger {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      label="Full Name"
                      value={modificationData?.passengerInfo?.[`name_${index}`] || passenger?.name}
                      onChange={(e) => setModificationData(prev => ({
                        ...prev,
                        passengerInfo: {
                          ...prev?.passengerInfo,
                          [`name_${index}`]: e?.target?.value
                        }
                      }))}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={modificationData?.passengerInfo?.[`phone_${index}`] || passenger?.phone}
                      onChange={(e) => setModificationData(prev => ({
                        ...prev,
                        passengerInfo: {
                          ...prev?.passengerInfo,
                          [`phone_${index}`]: e?.target?.value
                        }
                      }))}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {modificationType === 'services' && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Add additional services to enhance your journey:
              </div>
              <div className="space-y-2">
                {additionalServices?.map((service) => (
                  <label key={service?.value} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modificationData?.additionalServices?.includes(service?.value)}
                      onChange={(e) => {
                        if (e?.target?.checked) {
                          setModificationData(prev => ({
                            ...prev,
                            additionalServices: [...prev?.additionalServices, service?.value]
                          }));
                        } else {
                          setModificationData(prev => ({
                            ...prev,
                            additionalServices: prev?.additionalServices?.filter(s => s !== service?.value)
                          }));
                        }
                      }}
                      className="rounded border-border"
                    />
                    <span className="text-foreground">{service?.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Cost Summary */}
          {modificationType && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Cost Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Amount:</span>
                  <span className="text-foreground">${booking?.totalAmount}</span>
                </div>
                {calculateAdditionalCost() > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Additional Charges:</span>
                    <span className="text-foreground">+${calculateAdditionalCost()}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium pt-2 border-t border-border">
                  <span className="text-foreground">New Total:</span>
                  <span className="text-foreground">
                    ${(parseFloat(booking?.totalAmount) + calculateAdditionalCost())?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            loading={isLoading}
            disabled={!modificationType}
            iconName="Check"
            iconPosition="left"
          >
            Confirm Modification
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModificationModal;