import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { useTranslation } from '../../../hooks/useTranslation';

const SearchWidget = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departureDate: '',
    passengers: 1
  });
  const [errors, setErrors] = useState({});

  const cities = [
    { value: 'new-york', label: 'New York' },
    { value: 'los-angeles', label: 'Los Angeles' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'houston', label: 'Houston' },
    { value: 'phoenix', label: 'Phoenix' },
    { value: 'philadelphia', label: 'Philadelphia' },
    { value: 'san-antonio', label: 'San Antonio' },
    { value: 'san-diego', label: 'San Diego' },
    { value: 'dallas', label: 'Dallas' },
    { value: 'san-jose', label: 'San Jose' },
    { value: 'austin', label: 'Austin' },
    { value: 'jacksonville', label: 'Jacksonville' },
    { value: 'fort-worth', label: 'Fort Worth' },
    { value: 'columbus', label: 'Columbus' },
    { value: 'charlotte', label: 'Charlotte' }
  ];

  const passengerOptions = [
    { value: 1, label: t('search.passengers', { defaultText: '1 Passenger', count: 1 }) },
    { value: 2, label: t('search.passengers', { defaultText: '2 Passengers', count: 2 }) },
    { value: 3, label: t('search.passengers', { defaultText: '3 Passengers', count: 3 }) },
    { value: 4, label: t('search.passengers', { defaultText: '4 Passengers', count: 4 }) },
    { value: 5, label: t('search.passengers', { defaultText: '5 Passengers', count: 5 }) },
    { value: 6, label: t('search.passengers', { defaultText: '6+ Passengers', count: 6 }) }
  ];

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSwapCities = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev?.to,
      to: prev?.from
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!searchData?.from) {
      newErrors.from = t('search.errors.from');
    }
    if (!searchData?.to) {
      newErrors.to = t('search.errors.to');
    }
    if (!searchData?.departureDate) {
      newErrors.departureDate = t('search.errors.departureDate');
    }
    if (searchData?.from && searchData?.to && searchData?.from === searchData?.to) {
      newErrors.sameCity = t('search.errors.sameCity');
    }

    // Check if departure date is in the past
    if (searchData?.departureDate) {
      const selectedDate = new Date(searchData.departureDate);
      const today = new Date();
      today?.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.departureDate = t('search.errors.pastDate');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSearch = () => {
    if (validateForm()) {
      // Store search data for next page
      localStorage.setItem('busSearchData', JSON.stringify(searchData));
      // Navigate to route selection (would be implemented in actual app)
      console.log('Searching buses with:', searchData);
      // For demo, we'll show an alert
      alert(`Searching buses from ${searchData?.from} to ${searchData?.to} on ${searchData?.departureDate} for ${searchData?.passengers} passenger(s)`);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today?.toISOString()?.split('T')?.[0];
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-xl p-6 lg:p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('search.title')}</h2>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* From City */}
        <div className="lg:col-span-1">
          <Select
            label={t('search.from')}
            placeholder={t('search.fromPlaceholder')}
            options={cities}
            value={searchData?.from}
            onChange={(value) => handleInputChange('from', value)}
            error={errors?.from}
            searchable
            required
          />
        </div>

        {/* Swap Button */}
        <div className="lg:col-span-1 flex justify-center items-end pb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwapCities}
            className="w-10 h-10 rounded-full border border-border hover:bg-muted"
            title={t('search.swapTooltip')}
          >
            <Icon name="ArrowLeftRight" size={20} />
          </Button>
        </div>

        {/* To City */}
        <div className="lg:col-span-1">
          <Select
            label={t('search.to')}
            placeholder={t('search.toPlaceholder')}
            options={cities}
            value={searchData?.to}
            onChange={(value) => handleInputChange('to', value)}
            error={errors?.to}
            searchable
            required
          />
        </div>

        {/* Departure Date */}
        <div className="lg:col-span-1">
          <Input
            label={t('search.departure')}
            type="date"
            value={searchData?.departureDate}
            onChange={(e) => handleInputChange('departureDate', e?.target?.value)}
            error={errors?.departureDate}
            min={getMinDate()}
            required
          />
        </div>

        {/* Passengers */}
        <div className="lg:col-span-1">
          <Select
            label={t('search.passengers')}
            options={passengerOptions}
            value={searchData?.passengers}
            onChange={(value) => handleInputChange('passengers', value)}
            required
          />
        </div>
      </div>
      {/* Same City Error */}
      {errors?.sameCity && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-destructive" />
            <span className="text-sm text-destructive">{errors?.sameCity}</span>
          </div>
        </div>
      )}
      {/* Search Button */}
      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleSearch}
          size="lg"
          iconName="Search"
          iconPosition="left"
          className="px-8"
        >
          {t('search.searchButton')}
        </Button>
      </div>
    </div>
  );
};

export default SearchWidget;