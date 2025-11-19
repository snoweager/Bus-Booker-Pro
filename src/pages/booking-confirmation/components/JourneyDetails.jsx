import React from 'react';
import Icon from '../../../components/AppIcon';

const JourneyDetails = ({ journeyData, language = 'en' }) => {
  const translations = {
    en: {
      journey: 'Journey Details',
      from: 'From',
      to: 'To',
      date: 'Date',
      time: 'Time',
      duration: 'Duration',
      busOperator: 'Bus Operator',
      busType: 'Bus Type',
      seatNumbers: 'Seat Numbers',
      boardingPoint: 'Boarding Point',
      droppingPoint: 'Dropping Point'
    },
    es: {
      journey: 'Detalles del Viaje',
      from: 'Desde',
      to: 'Hasta',
      date: 'Fecha',
      time: 'Hora',
      duration: 'Duración',
      busOperator: 'Operador de Autobús',
      busType: 'Tipo de Autobús',
      seatNumbers: 'Números de Asiento',
      boardingPoint: 'Punto de Embarque',
      droppingPoint: 'Punto de Descenso'
    },
    fr: {
      journey: 'Détails du Voyage',
      from: 'De',
      to: 'À',
      date: 'Date',
      time: 'Heure',
      duration: 'Durée',
      busOperator: 'Opérateur de Bus',
      busType: 'Type de Bus',
      seatNumbers: 'Numéros de Siège',
      boardingPoint: 'Point d\'Embarquement',
      droppingPoint: 'Point de Dépose'
    }
  };

  const t = translations?.[language] || translations?.en;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <Icon name="MapPin" size={20} className="mr-2 text-primary" />
        {t?.journey}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Route Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <div className="w-0.5 h-8 bg-border"></div>
              <div className="w-3 h-3 bg-primary rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="mb-2">
                <div className="text-sm text-muted-foreground">{t?.from}</div>
                <div className="font-semibold text-foreground">{journeyData?.origin}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{t?.to}</div>
                <div className="font-semibold text-foreground">{journeyData?.destination}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Information */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">{t?.date}</div>
              <div className="font-semibold text-foreground">{journeyData?.date}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t?.time}</div>
              <div className="font-semibold text-foreground">{journeyData?.departureTime}</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{t?.duration}</div>
            <div className="font-semibold text-foreground">{journeyData?.duration}</div>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">{t?.busOperator}</div>
            <div className="font-semibold text-foreground">{journeyData?.operator}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{t?.busType}</div>
            <div className="font-semibold text-foreground">{journeyData?.busType}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{t?.seatNumbers}</div>
            <div className="font-semibold text-foreground">{journeyData?.seats?.join(', ')}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total Fare</div>
            <div className="font-semibold text-primary text-lg">${journeyData?.totalFare}</div>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">{t?.boardingPoint}</div>
            <div className="font-semibold text-foreground">{journeyData?.boardingPoint}</div>
            <div className="text-xs text-muted-foreground mt-1">{journeyData?.boardingTime}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{t?.droppingPoint}</div>
            <div className="font-semibold text-foreground">{journeyData?.droppingPoint}</div>
            <div className="text-xs text-muted-foreground mt-1">{journeyData?.arrivalTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyDetails;