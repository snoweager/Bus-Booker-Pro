import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialAuth = ({ currentLanguage, onSuccess }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const translations = {
    en: {
      orContinueWith: 'Or continue with',
      google: 'Continue with Google',
      facebook: 'Continue with Facebook',
      apple: 'Continue with Apple',
      microsoft: 'Continue with Microsoft'
    },
    es: {
      orContinueWith: 'O continúa con',
      google: 'Continuar con Google',
      facebook: 'Continuar con Facebook',
      apple: 'Continuar con Apple',
      microsoft: 'Continuar con Microsoft'
    },
    fr: {
      orContinueWith: 'Ou continuer avec',
      google: 'Continuer avec Google',
      facebook: 'Continuer avec Facebook',
      apple: 'Continuer avec Apple',
      microsoft: 'Continuer avec Microsoft'
    },
    de: {
      orContinueWith: 'Oder fortfahren mit',
      google: 'Mit Google fortfahren',
      facebook: 'Mit Facebook fortfahren',
      apple: 'Mit Apple fortfahren',
      microsoft: 'Mit Microsoft fortfahren'
    },
    zh: {
      orContinueWith: '或继续使用',
      google: '使用 Google 继续',
      facebook: '使用 Facebook 继续',
      apple: '使用 Apple 继续',
      microsoft: '使用 Microsoft 继续'
    },
    ar: {
      orContinueWith: 'أو المتابعة باستخدام',
      google: 'المتابعة باستخدام Google',
      facebook: 'المتابعة باستخدام Facebook',
      apple: 'المتابعة باستخدام Apple',
      microsoft: 'المتابعة باستخدام Microsoft'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const socialProviders = [
  {
    id: 'google',
    name: t?.google,
    icon: 'Chrome',
    color: 'text-red-500',
    bgColor: 'hover:bg-red-50'
  },
  {
    id: 'facebook',
    name: t?.facebook,
    icon: 'Facebook',
    color: 'text-blue-600',
    bgColor: 'hover:bg-blue-50'
  },
  {
    id: 'apple',
    name: t?.apple,
    icon: 'Apple',
    color: 'text-gray-900',
    bgColor: 'hover:bg-gray-50'
  },
  {
    id: 'microsoft',
    name: t?.microsoft,
    icon: 'Square',
    color: 'text-blue-500',
    bgColor: 'hover:bg-blue-50'
  }];


  const handleSocialAuth = async (providerId) => {
    setLoadingProvider(providerId);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUserData = {
        id: Date.now(),
        name: 'Social User',
        email: `user@${providerId}.com`,
        avatar: "https://images.unsplash.com/photo-1708617451137-f94b1c4c4dc5",
        avatarAlt: 'Professional headshot of man with glasses and friendly smile',
        provider: providerId
      };

      localStorage.setItem('authToken', `mock-${providerId}-token-${Date.now()}`);
      localStorage.setItem('userData', JSON.stringify(mockUserData));

      const event = new CustomEvent('authStateChange');
      window.dispatchEvent(event);

      onSuccess();

    } catch (error) {
      console.error(`${providerId} authentication failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">
            {t?.orContinueWith}
          </span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3">
        {socialProviders?.map((provider) =>
        <Button
          key={provider?.id}
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => handleSocialAuth(provider?.id)}
          loading={loadingProvider === provider?.id}
          className={`${provider?.bgColor} transition-colors duration-200`}>

            <div className="flex items-center justify-center space-x-3">
              <Icon
              name={provider?.icon}
              size={20}
              className={provider?.color} />

              <span>{provider?.name}</span>
            </div>
          </Button>
        )}
      </div>
    </div>);

};

export default SocialAuth;