import React, { useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const BookingStats = ({ bookings }) => {
  const stats = React.useMemo(() => {
    const totalBookings = bookings?.length;
    const confirmedBookings = bookings?.filter(b => b?.status === 'confirmed')?.length;
    const upcomingBookings = bookings?.filter(b => 
      b?.status === 'confirmed' && new Date(b.departureDate) > new Date()
    )?.length;
    const completedBookings = bookings?.filter(b => b?.status === 'completed')?.length;
    const cancelledBookings = bookings?.filter(b => b?.status === 'cancelled')?.length;
    const totalSpent = bookings?.filter(b => b?.paymentStatus === 'paid')?.reduce((sum, b) => sum + parseFloat(b?.totalAmount), 0);

    return {
      totalBookings,
      confirmedBookings,
      upcomingBookings,
      completedBookings,
      cancelledBookings,
      totalSpent
    };
  }, [bookings]);

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats?.totalBookings,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Confirmed',
      value: stats?.confirmedBookings,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Upcoming Trips',
      value: stats?.upcomingBookings,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Completed',
      value: stats?.completedBookings,
      icon: 'Check',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Cancelled',
      value: stats?.cancelledBookings,
      icon: 'X',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      title: 'Total Spent',
      value: `$${stats?.totalSpent?.toFixed(2)}`,
      icon: 'DollarSign',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
              <div className="text-sm text-muted-foreground truncate">{stat?.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingStats;