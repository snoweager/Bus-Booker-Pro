import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const SupportModal = ({ booking, isOpen, onClose }) => {
  const [supportType, setSupportType] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const supportTypes = [
    { value: 'booking_issue', label: 'Booking Issue' },
    { value: 'payment_problem', label: 'Payment Problem' },
    { value: 'seat_change', label: 'Seat Change Request' },
    { value: 'special_assistance', label: 'Special Assistance' },
    { value: 'travel_documents', label: 'Travel Documents' },
    { value: 'complaint', label: 'Complaint' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const supportChannels = [
    {
      type: 'chat',
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7 Available',
      icon: 'MessageCircle',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      type: 'phone',
      title: 'Phone Support',
      description: 'Speak directly with a support agent',
      availability: 'Mon-Sun: 6 AM - 11 PM',
      icon: 'Phone',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      type: 'email',
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      icon: 'Mail',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Support request failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartChat = () => {
    // Simulate opening chat widget
    alert('Live chat would open here with booking context');
  };

  const handlePhoneCall = () => {
    // Simulate phone call initiation
    window.open('tel:+1-800-BUS-HELP');
  };

  const resetForm = () => {
    setSupportType('');
    setMessage('');
    setPriority('medium');
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Customer Support</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <div className="space-y-6">
              {/* Booking Context */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                  <Icon name="Ticket" size={16} />
                  <span>Booking Reference</span>
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Booking ID:</span>
                    <span className="ml-2 text-foreground">{booking?.bookingId}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Route:</span>
                    <span className="ml-2 text-foreground">{booking?.origin} → {booking?.destination}</span>
                  </div>
                </div>
              </div>

              {/* Quick Support Channels */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Quick Support Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {supportChannels?.map((channel) => (
                    <button
                      key={channel?.type}
                      onClick={channel?.type === 'chat' ? handleStartChat : 
                               channel?.type === 'phone' ? handlePhoneCall : null}
                      className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${channel?.bgColor} flex items-center justify-center`}>
                          <Icon name={channel?.icon} size={20} className={channel?.color} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{channel?.title}</div>
                          <div className="text-sm text-muted-foreground">{channel?.description}</div>
                          <div className="text-xs text-muted-foreground mt-1">{channel?.availability}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Support Form */}
              <div className="border-t border-border pt-6">
                <h3 className="font-medium text-foreground mb-4">Send Support Request</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Issue Type"
                      placeholder="Select issue type"
                      options={supportTypes}
                      value={supportType}
                      onChange={setSupportType}
                      required
                    />
                    <Select
                      label="Priority Level"
                      options={priorityOptions}
                      value={priority}
                      onChange={setPriority}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Describe your issue
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e?.target?.value)}
                      placeholder="Please provide detailed information about your issue..."
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="Info" size={16} className="text-primary mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        <p className="mb-2">Response Times:</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Urgent: Within 1 hour</li>
                          <li>High Priority: Within 4 hours</li>
                          <li>Medium Priority: Within 24 hours</li>
                          <li>Low Priority: Within 48 hours</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3">
                    <Button variant="outline" type="button" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      loading={isSubmitting}
                      disabled={!supportType || !message?.trim()}
                      iconName="Send"
                      iconPosition="left"
                    >
                      Send Request
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* Success State */
            (<div className="text-center py-8">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Request Submitted Successfully</h3>
              <p className="text-muted-foreground mb-6">
                We've received your support request and will get back to you soon.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ticket ID:</span>
                    <span className="text-foreground font-mono">SUP-{Date.now()?.toString()?.slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority:</span>
                    <span className="text-foreground capitalize">{priority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Response:</span>
                    <span className="text-foreground">
                      {priority === 'urgent' ? 'Within 1 hour' :
                       priority === 'high' ? 'Within 4 hours' :
                       priority === 'medium' ? 'Within 24 hours' : 'Within 48 hours'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Button variant="outline" onClick={resetForm}>
                  Submit Another Request
                </Button>
                <Button onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportModal;