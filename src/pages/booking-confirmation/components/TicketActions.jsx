import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TicketActions = ({ bookingData, language = 'en' }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const translations = {
    en: {
      ticketActions: 'Ticket Actions',
      downloadTicket: 'Download Ticket',
      emailTicket: 'Email Ticket',
      addToCalendar: 'Add to Calendar',
      shareTrip: 'Share Trip',
      viewBookings: 'View All Bookings',
      emailSent: 'Email Sent Successfully!',
      downloadSuccess: 'Ticket Downloaded!'
    },
    es: {
      ticketActions: 'Acciones del Boleto',
      downloadTicket: 'Descargar Boleto',
      emailTicket: 'Enviar por Email',
      addToCalendar: 'Agregar al Calendario',
      shareTrip: 'Compartir Viaje',
      viewBookings: 'Ver Todas las Reservas',
      emailSent: '¡Email Enviado Exitosamente!',
      downloadSuccess: '¡Boleto Descargado!'
    },
    fr: {
      ticketActions: 'Actions du Billet',
      downloadTicket: 'Télécharger le Billet',
      emailTicket: 'Envoyer par Email',
      addToCalendar: 'Ajouter au Calendrier',
      shareTrip: 'Partager le Voyage',
      viewBookings: 'Voir Toutes les Réservations',
      emailSent: 'Email Envoyé avec Succès!',
      downloadSuccess: 'Billet Téléchargé!'
    }
  };

  const t = translations?.[language] || translations?.en;

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      // Create and trigger download
      const element = document.createElement('a');
      element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`BusBooker Pro Ticket\n\nBooking Reference: ${bookingData?.reference}\nRoute: ${bookingData?.origin} to ${bookingData?.destination}\nDate: ${bookingData?.date}\nTime: ${bookingData?.departureTime}`);
      element.download = `ticket-${bookingData?.reference}.txt`;
      document.body?.appendChild(element);
      element?.click();
      document.body?.removeChild(element);
    }, 2000);
  };

  const handleEmailTicket = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  const handleAddToCalendar = () => {
    const startDate = new Date(`${bookingData.date} ${bookingData.departureTime}`);
    const endDate = new Date(startDate.getTime() + (4 * 60 * 60 * 1000)); // 4 hours later
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bus Journey - ${bookingData?.origin} to ${bookingData?.destination}&dates=${startDate?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0]}Z/${endDate?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0]}Z&details=Booking Reference: ${bookingData?.reference}%0AOperator: ${bookingData?.operator}%0ASeats: ${bookingData?.seats?.join(', ')}`;
    
    window.open(calendarUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Bus Journey',
        text: `I'm traveling from ${bookingData?.origin} to ${bookingData?.destination} on ${bookingData?.date}`,
        url: window.location?.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard?.writeText(`I'm traveling from ${bookingData?.origin} to ${bookingData?.destination} on ${bookingData?.date}. Booking Reference: ${bookingData?.reference}`);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <Icon name="Download" size={20} className="mr-2 text-primary" />
        {t?.ticketActions}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button
          variant="default"
          onClick={handleDownload}
          loading={isDownloading}
          iconName="Download"
          iconPosition="left"
          className="w-full"
        >
          {t?.downloadTicket}
        </Button>

        <Button
          variant="outline"
          onClick={handleEmailTicket}
          iconName={emailSent ? "Check" : "Mail"}
          iconPosition="left"
          className="w-full"
        >
          {emailSent ? t?.emailSent : t?.emailTicket}
        </Button>

        <Button
          variant="outline"
          onClick={handleAddToCalendar}
          iconName="Calendar"
          iconPosition="left"
          className="w-full"
        >
          {t?.addToCalendar}
        </Button>

        <Button
          variant="outline"
          onClick={handleShare}
          iconName="Share2"
          iconPosition="left"
          className="w-full"
        >
          {t?.shareTrip}
        </Button>

        <Button
          variant="secondary"
          onClick={() => window.location.href = '/booking-management'}
          iconName="Calendar"
          iconPosition="left"
          className="w-full sm:col-span-2"
        >
          {t?.viewBookings}
        </Button>
      </div>
      {emailSent && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg flex items-center">
          <Icon name="CheckCircle" size={16} className="text-success mr-2" />
          <span className="text-success text-sm">{t?.emailSent}</span>
        </div>
      )}
    </div>
  );
};

export default TicketActions;