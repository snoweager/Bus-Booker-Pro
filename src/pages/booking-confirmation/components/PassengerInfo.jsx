import React from 'react';
import Icon from '../../../components/AppIcon';

const PassengerInfo = ({ passengers, language = 'en' }) => {
  const translations = {
    en: {
      passengerDetails: 'Passenger Details',
      name: 'Name',
      age: 'Age',
      gender: 'Gender',
      seat: 'Seat',
      contact: 'Contact Information',
      email: 'Email',
      phone: 'Phone'
    },
    es: {
      passengerDetails: 'Detalles del Pasajero',
      name: 'Nombre',
      age: 'Edad',
      gender: 'Género',
      seat: 'Asiento',
      contact: 'Información de Contacto',
      email: 'Correo',
      phone: 'Teléfono'
    },
    fr: {
      passengerDetails: 'Détails du Passager',
      name: 'Nom',
      age: 'Âge',
      gender: 'Genre',
      seat: 'Siège',
      contact: 'Informations de Contact',
      email: 'Email',
      phone: 'Téléphone'
    }
  };

  const t = translations?.[language] || translations?.en;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <Icon name="Users" size={20} className="mr-2 text-primary" />
        {t?.passengerDetails}
      </h2>
      <div className="space-y-4">
        {passengers?.map((passenger, index) => (
          <div key={index} className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">{t?.name}</div>
                <div className="font-semibold text-foreground">{passenger?.name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{t?.age}</div>
                <div className="font-semibold text-foreground">{passenger?.age}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{t?.gender}</div>
                <div className="font-semibold text-foreground">{passenger?.gender}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{t?.seat}</div>
                <div className="font-semibold text-primary">{passenger?.seat}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border mt-6 pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Phone" size={18} className="mr-2 text-primary" />
          {t?.contact}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">{t?.email}</div>
            <div className="font-semibold text-foreground">{passengers?.[0]?.email}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{t?.phone}</div>
            <div className="font-semibold text-foreground">{passengers?.[0]?.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;