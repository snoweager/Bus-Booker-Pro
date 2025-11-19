import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingIndicator = ({ isProcessing, onComplete, className = '' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const processingSteps = [
    {
      id: 'validating',
      title: 'Validating Payment Details',
      description: 'Checking card information and security',
      icon: 'CreditCard',
      duration: 2000
    },
    {
      id: 'processing',
      title: 'Processing Payment',
      description: 'Securely processing your transaction',
      icon: 'Loader',
      duration: 3000
    },
    {
      id: 'confirming',
      title: 'Confirming Booking',
      description: 'Reserving your seats and generating ticket',
      icon: 'CheckCircle',
      duration: 2000
    }
  ];

  useEffect(() => {
    if (!isProcessing) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    let stepIndex = 0;
    let progressValue = 0;
    
    const processSteps = () => {
      if (stepIndex < processingSteps?.length) {
        setCurrentStep(stepIndex);
        
        const stepDuration = processingSteps?.[stepIndex]?.duration;
        const progressIncrement = (100 / processingSteps?.length) / (stepDuration / 100);
        
        const progressInterval = setInterval(() => {
          progressValue += progressIncrement;
          setProgress(Math.min(progressValue, ((stepIndex + 1) * 100) / processingSteps?.length));
          
          if (progressValue >= ((stepIndex + 1) * 100) / processingSteps?.length) {
            clearInterval(progressInterval);
            stepIndex++;
            
            if (stepIndex < processingSteps?.length) {
              setTimeout(processSteps, 500);
            } else {
              setTimeout(() => {
                setProgress(100);
                onComplete();
              }, 500);
            }
          }
        }, 100);
      }
    };

    processSteps();
  }, [isProcessing, onComplete]);

  if (!isProcessing) {
    return null;
  }

  const currentStepData = processingSteps?.[currentStep];

  return (
    <div className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center ${className}`}>
      <div className="bg-card border border-border rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon 
              name={currentStepData?.icon} 
              size={32} 
              className={`text-primary ${currentStepData?.icon === 'Loader' ? 'animate-spin' : ''}`}
            />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Processing Payment</h3>
          <p className="text-muted-foreground">Please don't close this window or refresh the page</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon 
                name={currentStepData?.icon} 
                size={20} 
                color="white"
                className={currentStepData?.icon === 'Loader' ? 'animate-spin' : ''}
              />
            </div>
            <div>
              <div className="font-medium text-foreground">{currentStepData?.title}</div>
              <div className="text-sm text-muted-foreground">{currentStepData?.description}</div>
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {processingSteps?.map((step, index) => (
            <div key={step?.id} className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index < currentStep 
                  ? 'bg-success text-success-foreground' 
                  : index === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {index < currentStep ? (
                  <Icon name="Check" size={14} />
                ) : index === currentStep ? (
                  <Icon name="Loader" size={14} className="animate-spin" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-accent" />
            <span className="text-sm text-accent-foreground">
              Your payment is being processed securely
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingIndicator;