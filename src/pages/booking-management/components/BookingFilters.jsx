import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BookingFilters = ({ onFilterChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    dateRange: '',
    sortBy: 'departureDate'
  });

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'upcoming', label: 'Upcoming Trips' },
    { value: 'past', label: 'Past Trips' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'last3Months', label: 'Last 3 Months' }
  ];

  const sortOptions = [
    { value: 'departureDate', label: 'Departure Date' },
    { value: 'bookingDate', label: 'Booking Date' },
    { value: 'amount', label: 'Amount' },
    { value: 'status', label: 'Status' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      searchTerm: '',
      status: '',
      dateRange: '',
      sortBy: 'departureDate'
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = filters?.searchTerm || filters?.status || filters?.dateRange;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filter Bookings</span>
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <Input
            type="search"
            placeholder="Search by booking ID, destination..."
            value={filters?.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Status Filter */}
        <div>
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
        </div>

        {/* Date Range Filter */}
        <div>
          <Select
            placeholder="Filter by date"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
        </div>

        {/* Sort By */}
        <div>
          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
          />
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters?.searchTerm && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Search: "{filters?.searchTerm}"
                <button
                  onClick={() => handleFilterChange('searchTerm', '')}
                  className="ml-1 hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.status && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
                <button
                  onClick={() => handleFilterChange('status', '')}
                  className="ml-1 hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.dateRange && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Date: {dateRangeOptions?.find(opt => opt?.value === filters?.dateRange)?.label}
                <button
                  onClick={() => handleFilterChange('dateRange', '')}
                  className="ml-1 hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingFilters;