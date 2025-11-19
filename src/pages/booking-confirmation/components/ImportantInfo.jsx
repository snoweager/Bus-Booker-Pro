import React from 'react';
import Icon from '../../../components/AppIcon';

const ImportantInfo = ({ language = 'en' }) => {
  const translations = {
    en: {
      importantInfo: 'Important Information',
      boardingInstructions: 'Boarding Instructions',
      boardingText: 'Arrive at the boarding point 15 minutes before departure time. Carry a valid ID proof along with your ticket.',
      baggagePolicy: 'Baggage Policy',
      baggageText: 'Free baggage allowance: 20kg per passenger. Additional charges apply for excess baggage.',
      cancellationPolicy: 'Cancellation Policy',
      cancellationText: 'Free cancellation up to 2 hours before departure. Partial refund available for cancellations within 2 hours.',
      contactSupport: 'Need Help?',
      supportText: 'Contact our 24/7 customer support for any assistance.',
      supportPhone: '+1-800-BUS-HELP',
      supportEmail: 'support@busbookerpro.com'
    },
    es: {
      importantInfo: 'Información Importante',
      boardingInstructions: 'Instrucciones de Embarque',
      boardingText: 'Llegue al punto de embarque 15 minutos antes de la hora de salida. Lleve una identificación válida junto con su boleto.',
      baggagePolicy: 'Política de Equipaje',
      baggageText: 'Equipaje gratuito permitido: 20kg por pasajero. Se aplican cargos adicionales por exceso de equipaje.',
      cancellationPolicy: 'Política de Cancelación',
      cancellationText: 'Cancelación gratuita hasta 2 horas antes de la salida. Reembolso parcial disponible para cancelaciones dentro de 2 horas.',
      contactSupport: '¿Necesita Ayuda?',
      supportText: 'Contacte nuestro soporte al cliente 24/7 para cualquier asistencia.',
      supportPhone: '+1-800-BUS-HELP',
      supportEmail: 'support@busbookerpro.com'
    },
    fr: {
      importantInfo: 'Informations Importantes',
      boardingInstructions: 'Instructions d\'Embarquement',
      boardingText: 'Arrivez au point d\'embarquement 15 minutes avant l\'heure de départ. Portez une pièce d\'identité valide avec votre billet.',
      baggagePolicy: 'Politique de Bagages',
      baggageText: 'Franchise de bagages gratuite: 20kg par passager. Des frais supplémentaires s\'appliquent pour les bagages en excès.',
      cancellationPolicy: 'Politique d\'Annulation',
      cancellationText: 'Annulation gratuite jusqu\'à 2 heures avant le départ. Remboursement partiel disponible pour les annulations dans les 2 heures.',
      contactSupport: 'Besoin d\'Aide?',
      supportText: 'Contactez notre support client 24/7 pour toute assistance.',
      supportPhone: '+1-800-BUS-HELP',
      supportEmail: 'support@busbookerpro.com'
    }
  };

  const t = translations?.[language] || translations?.en;

  const infoItems = [
    {
      icon: 'Clock',
      title: t?.boardingInstructions,
      content: t?.boardingText,
      color: 'text-primary'
    },
    {
      icon: 'Luggage',
      title: t?.baggagePolicy,
      content: t?.baggageText,
      color: 'text-warning'
    },
    {
      icon: 'RefreshCw',
      title: t?.cancellationPolicy,
      content: t?.cancellationText,
      color: 'text-destructive'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <Icon name="AlertCircle" size={20} className="mr-2 text-primary" />
        {t?.importantInfo}
      </h2>
      <div className="space-y-6">
        {infoItems?.map((item, index) => (
          <div key={index} className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="flex items-start space-x-3">
              <Icon name={item?.icon} size={20} className={`${item?.color} mt-0.5 flex-shrink-0`} />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">{item?.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item?.content}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Support Section */}
        <div className="border-t border-border pt-6">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="HelpCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-primary mb-2">{t?.contactSupport}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t?.supportText}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">{t?.supportPhone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">{t?.supportEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantInfo;