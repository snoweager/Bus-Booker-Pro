import React from 'react';
import Icon from '../../../components/AppIcon';

const ConfirmationHeader = ({ bookingReference, language = 'en' }) => {
  const translations = {
    en: {
      success: 'Booking Confirmed!',
      subtitle: 'Your bus ticket has been successfully booked',
      reference: 'Booking Reference'
    },
    es: {
      success: '¡Reserva Confirmada!',
      subtitle: 'Su boleto de autobús ha sido reservado exitosamente',
      reference: 'Referencia de Reserva'
    },
    fr: {
      success: 'Réservation Confirmée!',
      subtitle: 'Votre billet de bus a été réservé avec succès',
      reference: 'Référence de Réservation'
    }
  };

  const t = translations?.[language] || translations?.en;

  return (
    <div className="text-center py-8 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg border border-success/20">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center animate-pulse">
          <Icon name="CheckCircle" size={32} color="white" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-success mb-2">
        {t?.success}
      </h1>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {t?.subtitle}
      </p>
      <div className="bg-card border border-border rounded-lg p-4 inline-block">
        <div className="text-sm text-muted-foreground mb-1">
          {t?.reference}
        </div>
        <div className="text-xl font-mono font-bold text-primary">
          {bookingReference}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationHeader;