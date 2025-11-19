import React from 'react';
import Icon from '../../../components/AppIcon';

const QRCodeSection = ({ bookingReference, language = 'en' }) => {
  const translations = {
    en: {
      mobileTicket: 'Mobile Ticket',
      scanCode: 'Scan this QR code at the boarding point',
      instructions: 'Show this QR code to the conductor when boarding',
      offlineAccess: 'Available offline - screenshot recommended',
      bookingRef: 'Booking Reference'
    },
    es: {
      mobileTicket: 'Boleto Móvil',
      scanCode: 'Escanee este código QR en el punto de embarque',
      instructions: 'Muestre este código QR al conductor al abordar',
      offlineAccess: 'Disponible sin conexión - se recomienda captura de pantalla',
      bookingRef: 'Referencia de Reserva'
    },
    fr: {
      mobileTicket: 'Billet Mobile',
      scanCode: 'Scannez ce code QR au point d\'embarquement',
      instructions: 'Montrez ce code QR au conducteur lors de l\'embarquement',
      offlineAccess: 'Disponible hors ligne - capture d\'écran recommandée',
      bookingRef: 'Référence de Réservation'
    }
  };

  const t = translations?.[language] || translations?.en;

  // Generate a simple QR code pattern (in real app, use a QR code library)
  const generateQRPattern = () => {
    const size = 8;
    const pattern = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        // Create a pseudo-random pattern based on booking reference
        const hash = (bookingReference?.charCodeAt(i % bookingReference?.length) + i + j) % 3;
        row?.push(hash > 0);
      }
      pattern?.push(row);
    }
    return pattern;
  };

  const qrPattern = generateQRPattern();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <Icon name="Smartphone" size={20} className="mr-2 text-primary" />
        {t?.mobileTicket}
      </h2>
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
        {/* QR Code */}
        <div className="flex-shrink-0">
          <div className="bg-white p-4 rounded-lg border-2 border-border shadow-sm">
            <div className="grid grid-cols-8 gap-1 w-32 h-32">
              {qrPattern?.map((row, i) => 
                row?.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    className={`w-3 h-3 ${cell ? 'bg-black' : 'bg-white'}`}
                  />
                ))
              )}
            </div>
          </div>
          <div className="text-center mt-2">
            <div className="text-xs text-muted-foreground">{t?.bookingRef}</div>
            <div className="text-sm font-mono font-semibold">{bookingReference}</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="flex-1 space-y-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <div className="font-semibold text-primary mb-1">{t?.scanCode}</div>
                <div className="text-sm text-muted-foreground">{t?.instructions}</div>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Wifi" size={20} className="text-muted-foreground mt-0.5" />
              <div>
                <div className="font-semibold text-foreground mb-1">Offline Access</div>
                <div className="text-sm text-muted-foreground">{t?.offlineAccess}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span>Valid for boarding</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} className="text-success" />
              <span>Secure verification</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeSection;