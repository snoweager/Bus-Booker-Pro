import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats, currentLanguage }) => {
  const translations = {
    en: {
      totalBookings: 'Total Bookings',
      upcomingTrips: 'Upcoming Trips',
      loyaltyPoints: 'Loyalty Points',
      totalSavings: 'Total Savings'
    },
    es: {
      totalBookings: 'Reservas Totales',
      upcomingTrips: 'Viajes Próximos',
      loyaltyPoints: 'Puntos de Lealtad',
      totalSavings: 'Ahorros Totales'
    },
    fr: {
      totalBookings: 'Réservations Totales',
      upcomingTrips: 'Voyages à Venir',
      loyaltyPoints: 'Points de Fidélité',
      totalSavings: 'Économies Totales'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const statItems = [
    {
      key: 'totalBookings',
      label: t?.totalBookings,
      value: stats?.totalBookings,
      icon: 'Calendar',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      key: 'upcomingTrips',
      label: t?.upcomingTrips,
      value: stats?.upcomingTrips,
      icon: 'MapPin',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      key: 'loyaltyPoints',
      label: t?.loyaltyPoints,
      value: stats?.loyaltyPoints?.toLocaleString(),
      icon: 'Star',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      key: 'totalSavings',
      label: t?.totalSavings,
      value: `$${stats?.totalSavings}`,
      icon: 'DollarSign',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems?.map((item) => (
        <div key={item?.key} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{item?.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{item?.value}</p>
            </div>
            <div className={`w-12 h-12 ${item?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;