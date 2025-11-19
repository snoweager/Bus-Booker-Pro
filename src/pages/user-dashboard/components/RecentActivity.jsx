import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities, currentLanguage }) => {
  const translations = {
    en: {
      recentActivity: 'Recent Activity',
      viewAll: 'View All Activity',
      noActivity: 'No recent activity',
      today: 'Today',
      yesterday: 'Yesterday',
      daysAgo: 'days ago'
    },
    es: {
      recentActivity: 'Actividad Reciente',
      viewAll: 'Ver Toda la Actividad',
      noActivity: 'Sin actividad reciente',
      today: 'Hoy',
      yesterday: 'Ayer',
      daysAgo: 'días atrás'
    },
    fr: {
      recentActivity: 'Activité Récente',
      viewAll: 'Voir Toute l\'Activité',
      noActivity: 'Aucune activité récente',
      today: 'Aujourd\'hui',
      yesterday: 'Hier',
      daysAgo: 'jours passés'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const getActivityIcon = (type) => {
    switch (type) {
      case 'booking':
        return { name: 'Calendar', color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'payment':
        return { name: 'CreditCard', color: 'text-green-600', bg: 'bg-green-50' };
      case 'cancellation':
        return { name: 'X', color: 'text-red-600', bg: 'bg-red-50' };
      case 'modification':
        return { name: 'Edit', color: 'text-amber-600', bg: 'bg-amber-50' };
      case 'refund':
        return { name: 'RefreshCw', color: 'text-purple-600', bg: 'bg-purple-50' };
      default:
        return { name: 'Bell', color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const activityDate = new Date(timestamp);
    const diffInDays = Math.floor((now - activityDate) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return t?.today;
    if (diffInDays === 1) return t?.yesterday;
    return `${diffInDays} ${t?.daysAgo}`;
  };

  if (activities?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Activity" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{t?.noActivity}</h3>
        <p className="text-muted-foreground">Your recent activities will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">{t?.recentActivity}</h2>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            {t?.viewAll}
          </button>
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {activities?.slice(0, 5)?.map((activity) => {
          const iconConfig = getActivityIcon(activity?.type);
          
          return (
            <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 ${iconConfig?.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Icon name={iconConfig?.name} size={16} className={iconConfig?.color} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity?.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {getRelativeTime(activity?.timestamp)}
                    </span>
                    {activity?.amount && (
                      <span className="text-sm font-medium text-foreground">
                        ${activity?.amount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;