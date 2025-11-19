import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AccountSettings = ({ user, currentLanguage, onLanguageChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    language: currentLanguage,
    currency: user?.currency || 'USD',
    notifications: {
      email: user?.notifications?.email || true,
      sms: user?.notifications?.sms || false,
      push: user?.notifications?.push || true
    }
  });

  const translations = {
    en: {
      accountSettings: 'Account Settings',
      personalInfo: 'Personal Information',
      preferences: 'Preferences',
      notifications: 'Notification Settings',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      language: 'Language',
      currency: 'Currency',
      emailNotifications: 'Email Notifications',
      smsNotifications: 'SMS Notifications',
      pushNotifications: 'Push Notifications',
      edit: 'Edit',
      save: 'Save Changes',
      cancel: 'Cancel',
      loyaltyProgram: 'Loyalty Program',
      memberSince: 'Member Since',
      totalPoints: 'Total Points',
      currentTier: 'Current Tier'
    },
    es: {
      accountSettings: 'Configuración de Cuenta',
      personalInfo: 'Información Personal',
      preferences: 'Preferencias',
      notifications: 'Configuración de Notificaciones',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      language: 'Idioma',
      currency: 'Moneda',
      emailNotifications: 'Notificaciones por Email',
      smsNotifications: 'Notificaciones SMS',
      pushNotifications: 'Notificaciones Push',
      edit: 'Editar',
      save: 'Guardar Cambios',
      cancel: 'Cancelar',
      loyaltyProgram: 'Programa de Lealtad',
      memberSince: 'Miembro Desde',
      totalPoints: 'Puntos Totales',
      currentTier: 'Nivel Actual'
    },
    fr: {
      accountSettings: 'Paramètres du Compte',
      personalInfo: 'Informations Personnelles',
      preferences: 'Préférences',
      notifications: 'Paramètres de Notification',
      firstName: 'Prénom',
      lastName: 'Nom de Famille',
      email: 'Adresse Email',
      phone: 'Numéro de Téléphone',
      language: 'Langue',
      currency: 'Devise',
      emailNotifications: 'Notifications Email',
      smsNotifications: 'Notifications SMS',
      pushNotifications: 'Notifications Push',
      edit: 'Modifier',
      save: 'Enregistrer les Modifications',
      cancel: 'Annuler',
      loyaltyProgram: 'Programme de Fidélité',
      memberSince: 'Membre Depuis',
      totalPoints: 'Points Totaux',
      currentTier: 'Niveau Actuel'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'zh', label: '中文' },
    { value: 'ar', label: 'العربية' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' }
  ];

  const handleInputChange = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev?.[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    // Handle save logic here
    if (formData?.language !== currentLanguage) {
      onLanguageChange(formData?.language);
    }
    setIsEditing(false);
    console.log('Saving user data:', formData);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      language: currentLanguage,
      currency: user?.currency || 'USD',
      notifications: {
        email: user?.notifications?.email || true,
        sms: user?.notifications?.sms || false,
        push: user?.notifications?.push || true
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Loyalty Program Card */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t?.loyaltyProgram}</h2>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="Star" size={24} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm opacity-90">{t?.memberSince}</p>
            <p className="text-lg font-semibold">{new Date(user?.memberSince || '2023-01-15')?.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">{t?.totalPoints}</p>
            <p className="text-lg font-semibold">{user?.loyaltyPoints?.toLocaleString() || '2,450'}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">{t?.currentTier}</p>
            <p className="text-lg font-semibold">{user?.tier || 'Gold'}</p>
          </div>
        </div>
      </div>
      {/* Account Settings */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">{t?.accountSettings}</h2>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} iconName="Edit" iconPosition="left">
                {t?.edit}
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  {t?.cancel}
                </Button>
                <Button variant="default" size="sm" onClick={handleSave} iconName="Check" iconPosition="left">
                  {t?.save}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">{t?.personalInfo}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t?.firstName}
                type="text"
                value={formData?.firstName}
                onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                disabled={!isEditing}
              />
              <Input
                label={t?.lastName}
                type="text"
                value={formData?.lastName}
                onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                disabled={!isEditing}
              />
              <Input
                label={t?.email}
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                disabled={!isEditing}
              />
              <Input
                label={t?.phone}
                type="tel"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">{t?.preferences}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label={t?.language}
                options={languageOptions}
                value={formData?.language}
                onChange={(value) => handleInputChange('language', value)}
                disabled={!isEditing}
              />
              <Select
                label={t?.currency}
                options={currencyOptions}
                value={formData?.currency}
                onChange={(value) => handleInputChange('currency', value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">{t?.notifications}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{t?.emailNotifications}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData?.notifications?.email}
                    onChange={(e) => handleInputChange('notifications.email', e?.target?.checked)}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="MessageSquare" size={20} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{t?.smsNotifications}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData?.notifications?.sms}
                    onChange={(e) => handleInputChange('notifications.sms', e?.target?.checked)}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Bell" size={20} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{t?.pushNotifications}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData?.notifications?.push}
                    onChange={(e) => handleInputChange('notifications.push', e?.target?.checked)}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;