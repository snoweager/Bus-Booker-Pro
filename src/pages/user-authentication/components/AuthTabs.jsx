import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthTabs = ({ activeTab, onTabChange, currentLanguage }) => {
  const translations = {
    en: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signInDesc: 'Welcome back! Please sign in to your account',
      signUpDesc: 'Create a new account to start booking'
    },
    es: {
      signIn: 'Iniciar Sesión',
      signUp: 'Registrarse',
      signInDesc: '¡Bienvenido de nuevo! Inicia sesión en tu cuenta',
      signUpDesc: 'Crea una nueva cuenta para empezar a reservar'
    },
    fr: {
      signIn: 'Se Connecter',
      signUp: "S\'inscrire",
      signInDesc: 'Bon retour ! Veuillez vous connecter à votre compte',
      signUpDesc: 'Créez un nouveau compte pour commencer à réserver'
    },
    de: {
      signIn: 'Anmelden',
      signUp: 'Registrieren',
      signInDesc: 'Willkommen zurück! Bitte melden Sie sich in Ihrem Konto an',
      signUpDesc: 'Erstellen Sie ein neues Konto, um mit der Buchung zu beginnen'
    },
    zh: {
      signIn: '登录',
      signUp: '注册',
      signInDesc: '欢迎回来！请登录您的账户',
      signUpDesc: '创建新账户开始预订'
    },
    ar: {
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      signInDesc: 'مرحباً بعودتك! يرجى تسجيل الدخول إلى حسابك',
      signUpDesc: 'أنشئ حساباً جديداً لبدء الحجز'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const tabs = [
    {
      id: 'signin',
      label: t?.signIn,
      description: t?.signInDesc,
      icon: 'LogIn'
    },
    {
      id: 'signup',
      label: t?.signUp,
      description: t?.signUpDesc,
      icon: 'UserPlus'
    }
  ];

  return (
    <div className="w-full">
      <div className="flex bg-muted rounded-lg p-1 mb-6">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab?.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      <div className="text-center mb-6">
        <p className="text-muted-foreground text-sm">
          {activeTab === 'signin' ? t?.signInDesc : t?.signUpDesc}
        </p>
      </div>
    </div>
  );
};

export default AuthTabs;
