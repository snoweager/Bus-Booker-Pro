import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingBookings = ({ bookings, currentLanguage }) => {
  const translations = {
    en: {
      upcomingBookings: 'Upcoming Bookings',
      viewAll: 'View All Bookings',
      noBookings: 'No upcoming bookings',
      bookNow: 'Book Your Next Trip',
      departure: 'Departure',
      arrival: 'Arrival',
      seat: 'Seat',
      status: 'Status',
      viewTicket: 'View Ticket',
      modify: 'Modify',
      cancel: 'Cancel'
    },
    es: {
      upcomingBookings: 'Próximas Reservas',
      viewAll: 'Ver Todas las Reservas',
      noBookings: 'No hay reservas próximas',
      bookNow: 'Reserva tu Próximo Viaje',
      departure: 'Salida',
      arrival: 'Llegada',
      seat: 'Asiento',
      status: 'Estado',
      viewTicket: 'Ver Boleto',
      modify: 'Modificar',
      cancel: 'Cancelar'
    },
    fr: {
      upcomingBookings: 'Réservations à Venir',
      viewAll: 'Voir Toutes les Réservations',
      noBookings: 'Aucune réservation à venir',
      bookNow: 'Réservez Votre Prochain Voyage',
      departure: 'Départ',
      arrival: 'Arrivée',
      seat: 'Siège',
      status: 'Statut',
      viewTicket: 'Voir le Billet',
      modify: 'Modifier',
      cancel: 'Annuler'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-amber-600 bg-amber-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDateTime = (dateTime, locale) => {
    const date = new Date(dateTime);
    return {
      date: date?.toLocaleDateString(locale, { 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date?.toLocaleTimeString(locale, { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  if (bookings?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Calendar" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{t?.noBookings}</h3>
        <p className="text-muted-foreground mb-6">Start planning your next journey with us</p>
        <Link to="/landing-page">
          <Button variant="default" iconName="Plus" iconPosition="left">
            {t?.bookNow}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">{t?.upcomingBookings}</h2>
          <Link to="/booking-management">
            <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
              {t?.viewAll}
            </Button>
          </Link>
        </div>
      </div>
      <div className="divide-y divide-border">
        {bookings?.slice(0, 3)?.map((booking) => {
          const departureDateTime = formatDateTime(booking?.departureTime, currentLanguage);
          const arrivalDateTime = formatDateTime(booking?.arrivalTime, currentLanguage);

          return (
            <div key={booking?.id} className="p-6 hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={booking?.operatorLogo}
                    alt={`${booking?.operatorName} bus company logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{booking?.operatorName}</h3>
                    <p className="text-sm text-muted-foreground">{booking?.busType}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking?.status)}`}>
                  {booking?.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <Icon name="MapPin" size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{booking?.origin}</p>
                    <p className="text-xs text-muted-foreground">
                      {departureDateTime?.date} • {departureDateTime?.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                    <Icon name="MapPin" size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{booking?.destination}</p>
                    <p className="text-xs text-muted-foreground">
                      {arrivalDateTime?.date} • {arrivalDateTime?.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <Icon name="Armchair" size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t?.seat}: {booking?.seatNumber}</p>
                    <p className="text-xs text-muted-foreground">Booking #{booking?.bookingId}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                  {t?.viewTicket}
                </Button>
                <Button variant="outline" size="sm" iconName="Edit" iconPosition="left">
                  {t?.modify}
                </Button>
                <Button variant="outline" size="sm" iconName="X" iconPosition="left" className="text-red-600 hover:text-red-700">
                  {t?.cancel}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingBookings;