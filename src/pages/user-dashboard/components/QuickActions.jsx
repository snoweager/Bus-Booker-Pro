import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ currentLanguage, favoriteRoutes }) => {
  const translations = {
    en: {
      quickActions: 'Quick Actions',
      bookNewTrip: 'Book New Trip',
      manageBookings: 'Manage Bookings',
      downloadTickets: 'Download Tickets',
      contactSupport: 'Contact Support',
      favoriteRoutes: 'Favorite Routes',
      noFavorites: 'No favorite routes yet',
      addFavorite: 'Add Favorite Route',
      bookAgain: 'Book Again'
    },
    es: {
      quickActions: 'Acciones Rápidas',
      bookNewTrip: 'Reservar Nuevo Viaje',
      manageBookings: 'Gestionar Reservas',
      downloadTickets: 'Descargar Boletos',
      contactSupport: 'Contactar Soporte',
      favoriteRoutes: 'Rutas Favoritas',
      noFavorites: 'Aún no hay rutas favoritas',
      addFavorite: 'Agregar Ruta Favorita',
      bookAgain: 'Reservar de Nuevo'
    },
    fr: {
      quickActions: 'Actions Rapides',
      bookNewTrip: 'Réserver un Nouveau Voyage',
      manageBookings: 'Gérer les Réservations',
      downloadTickets: 'Télécharger les Billets',
      contactSupport: 'Contacter le Support',
      favoriteRoutes: 'Routes Favorites',
      noFavorites: 'Aucune route favorite pour le moment',
      addFavorite: 'Ajouter une Route Favorite',
      bookAgain: 'Réserver à Nouveau'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const quickActionItems = [
    {
      label: t?.bookNewTrip,
      icon: 'Plus',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      path: '/landing-page'
    },
    {
      label: t?.manageBookings,
      icon: 'Calendar',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      path: '/booking-management'
    },
    {
      label: t?.downloadTickets,
      icon: 'Download',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      action: 'download'
    },
    {
      label: t?.contactSupport,
      icon: 'HelpCircle',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      hoverColor: 'hover:bg-amber-100',
      action: 'support'
    }
  ];

  const handleQuickAction = (action) => {
    switch (action) {
      case 'download':
        // Handle ticket download
        console.log('Downloading tickets...');
        break;
      case 'support':
        // Handle support contact
        console.log('Opening support...');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t?.quickActions}</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActionItems?.map((item, index) => (
            <div key={index}>
              {item?.path ? (
                <Link to={item?.path}>
                  <div className={`p-4 ${item?.bgColor} ${item?.hoverColor} rounded-lg transition-colors duration-200 cursor-pointer group`}>
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <Icon name={item?.icon} size={24} className={item?.color} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item?.label}</span>
                    </div>
                  </div>
                </Link>
              ) : (
                <div 
                  onClick={() => handleQuickAction(item?.action)}
                  className={`p-4 ${item?.bgColor} ${item?.hoverColor} rounded-lg transition-colors duration-200 cursor-pointer group`}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <Icon name={item?.icon} size={24} className={item?.color} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item?.label}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Favorite Routes */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t?.favoriteRoutes}</h2>
        
        {favoriteRoutes?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Heart" size={32} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">{t?.noFavorites}</p>
            <Link to="/landing-page">
              <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
                {t?.addFavorite}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {favoriteRoutes?.slice(0, 3)?.map((route) => (
              <div key={route?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="MapPin" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {route?.origin} → {route?.destination}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last booked: {new Date(route.lastBooked)?.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Link to="/landing-page">
                  <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
                    {t?.bookAgain}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActions;