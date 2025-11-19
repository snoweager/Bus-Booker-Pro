import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import AuthTabs from './components/AuthTabs';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import SocialAuth from './components/SocialAuth';
import TwoFactorAuth from './components/TwoFactorAuth';

const UserAuthentication = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const translations = {
    en: {
      pageTitle: 'BusBooker Pro - Sign In',
      welcomeBack: 'Welcome Back',
      joinUs: 'Join BusBooker Pro',
      secureAuth: 'Secure Authentication',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign in',
      trustBadge: 'Trusted by 1M+ travelers worldwide',
      securityNote: 'Your data is protected with bank-level security'
    },
    es: {
      pageTitle: 'BusBooker Pro - Iniciar Sesión',
      welcomeBack: 'Bienvenido de Nuevo',
      joinUs: 'Únete a BusBooker Pro',
      secureAuth: 'Autenticación Segura',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      signIn: 'Iniciar sesión',
      trustBadge: 'Confiado por más de 1M de viajeros en todo el mundo',
      securityNote: 'Tus datos están protegidos con seguridad de nivel bancario'
    },
    fr: {
      pageTitle: 'BusBooker Pro - Se Connecter',
      welcomeBack: 'Bon Retour',
      joinUs: 'Rejoignez BusBooker Pro',
      secureAuth: 'Authentification Sécurisée',
      alreadyHaveAccount: 'Vous avez déjà un compte?',
      signIn: 'Se connecter',
      trustBadge: 'Approuvé par plus de 1M de voyageurs dans le monde',
      securityNote: 'Vos données sont protégées par une sécurité de niveau bancaire'
    },
    de: {
      pageTitle: 'BusBooker Pro - Anmelden',
      welcomeBack: 'Willkommen Zurück',
      joinUs: 'Treten Sie BusBooker Pro bei',
      secureAuth: 'Sichere Authentifizierung',
      alreadyHaveAccount: 'Haben Sie bereits ein Konto?',
      signIn: 'Anmelden',
      trustBadge: 'Vertraut von über 1M Reisenden weltweit',
      securityNote: 'Ihre Daten sind mit bankähnlicher Sicherheit geschützt'
    },
    zh: {
      pageTitle: 'BusBooker Pro - 登录',
      welcomeBack: '欢迎回来',
      joinUs: '加入 BusBooker Pro',
      secureAuth: '安全认证',
      alreadyHaveAccount: '已有账户？',
      signIn: '登录',
      trustBadge: '全球超过100万旅客的信赖之选',
      securityNote: '您的数据受到银行级安全保护'
    },
    ar: {
      pageTitle: 'BusBooker Pro - تسجيل الدخول',
      welcomeBack: 'مرحباً بعودتك',
      joinUs: 'انضم إلى BusBooker Pro',
      secureAuth: 'مصادقة آمنة',
      alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
      signIn: 'تسجيل الدخول',
      trustBadge: 'موثوق من قبل أكثر من مليون مسافر حول العالم',
      securityNote: 'بياناتك محمية بأمان على مستوى البنوك'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  // Update document title
  useEffect(() => {
    document.title = t?.pageTitle;
  }, [t?.pageTitle]);

  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const from = location?.state?.from?.pathname || '/user-dashboard';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleAuthSuccess = () => {
    const from = location?.state?.from?.pathname || '/user-dashboard';
    navigate(from, { replace: true });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowTwoFactor(false);
  };

  if (showTwoFactor) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <TwoFactorAuth
            currentLanguage={currentLanguage}
            onSuccess={handleAuthSuccess}
            onBack={() => setShowTwoFactor(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 min-h-screen flex">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop)'
            }}
          />
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <div className="mb-8">
              <Icon name="Bus" size={48} className="mb-4" />
              <h1 className="text-4xl font-bold mb-4">
                {activeTab === 'signin' ? t?.welcomeBack : t?.joinUs}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {t?.secureAuth}
              </p>
              <div className="flex items-center space-x-2 text-white/80">
                <Icon name="Shield" size={20} />
                <span className="text-sm">{t?.securityNote}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} />
                </div>
                <span>Multi-language support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} />
                </div>
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} />
                </div>
                <span>24/7 customer support</span>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-white/70">{t?.trustBadge}</p>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md">
            <div className="bg-card rounded-lg shadow-lg border border-border p-8">
              <AuthTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
                currentLanguage={currentLanguage}
              />
              
              {activeTab === 'signin' ? (
                <SignInForm
                  currentLanguage={currentLanguage}
                  onSuccess={handleAuthSuccess}
                />
              ) : (
                <SignUpForm
                  currentLanguage={currentLanguage}
                  onSuccess={handleAuthSuccess}
                />
              )}
              
              <SocialAuth
                currentLanguage={currentLanguage}
                onSuccess={handleAuthSuccess}
              />
              
              {activeTab === 'signin' && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {t?.alreadyHaveAccount}{' '}
                    <button
                      onClick={() => setActiveTab('signup')}
                      className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                    >
                      {t?.signIn}
                    </button>
                  </p>
                </div>
              )}
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={14} />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Lock" size={14} />
                  <span>256-bit Encryption</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="CheckCircle" size={14} />
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthentication;