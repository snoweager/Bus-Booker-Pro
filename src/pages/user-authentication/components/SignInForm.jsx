import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SignInForm = ({ currentLanguage, onSuccess }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    en: {
      emailOrPhone: 'Email or Phone',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign In',
      orContinueWith: 'Or continue with',
      noAccount: "Don\'t have an account?",
      signUp: 'Sign up',
      emailPlaceholder: 'Enter your email or phone number',
      passwordPlaceholder: 'Enter your password',
      invalidCredentials: 'Invalid email/phone or password',
      emailRequired: 'Email or phone is required',
      passwordRequired: 'Password is required',
      mockCredentials: 'Use: john@example.com / password123'
    },
    es: {
      emailOrPhone: 'Email o Teléfono',
      password: 'Contraseña',
      rememberMe: 'Recordarme',
      forgotPassword: '¿Olvidaste tu contraseña?',
      signIn: 'Iniciar Sesión',
      orContinueWith: 'O continúa con',
      noAccount: '¿No tienes una cuenta?',
      signUp: 'Regístrate',
      emailPlaceholder: 'Ingresa tu email o número de teléfono',
      passwordPlaceholder: 'Ingresa tu contraseña',
      invalidCredentials: 'Email/teléfono o contraseña inválidos',
      emailRequired: 'Email o teléfono es requerido',
      passwordRequired: 'Contraseña es requerida',
      mockCredentials: 'Usa: john@example.com / password123'
    },
    fr: {
      emailOrPhone: 'Email ou Téléphone',
      password: 'Mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié?',
      signIn: 'Se connecter',
      orContinueWith: 'Ou continuer avec',
      noAccount: "Vous n\'avez pas de compte?",
      signUp: "S\'inscrire",
      emailPlaceholder: 'Entrez votre email ou numéro de téléphone',
      passwordPlaceholder: 'Entrez votre mot de passe',
      invalidCredentials: 'Email/téléphone ou mot de passe invalide',
      emailRequired: 'Email ou téléphone requis',
      passwordRequired: 'Mot de passe requis',
      mockCredentials: 'Utilisez: john@example.com / password123'
    },
    de: {
      emailOrPhone: 'E-Mail oder Telefon',
      password: 'Passwort',
      rememberMe: 'Angemeldet bleiben',
      forgotPassword: 'Passwort vergessen?',
      signIn: 'Anmelden',
      orContinueWith: 'Oder fortfahren mit',
      noAccount: 'Haben Sie kein Konto?',
      signUp: 'Registrieren',
      emailPlaceholder: 'Geben Sie Ihre E-Mail oder Telefonnummer ein',
      passwordPlaceholder: 'Geben Sie Ihr Passwort ein',
      invalidCredentials: 'Ungültige E-Mail/Telefon oder Passwort',
      emailRequired: 'E-Mail oder Telefon erforderlich',
      passwordRequired: 'Passwort erforderlich',
      mockCredentials: 'Verwenden Sie: john@example.com / password123'
    },
    zh: {
      emailOrPhone: '邮箱或手机',
      password: '密码',
      rememberMe: '记住我',
      forgotPassword: '忘记密码？',
      signIn: '登录',
      orContinueWith: '或继续使用',
      noAccount: '没有账户？',
      signUp: '注册',
      emailPlaceholder: '输入您的邮箱或手机号码',
      passwordPlaceholder: '输入您的密码',
      invalidCredentials: '邮箱/手机或密码无效',
      emailRequired: '邮箱或手机是必需的',
      passwordRequired: '密码是必需的',
      mockCredentials: '使用: john@example.com / password123'
    },
    ar: {
      emailOrPhone: 'البريد الإلكتروني أو الهاتف',
      password: 'كلمة المرور',
      rememberMe: 'تذكرني',
      forgotPassword: 'نسيت كلمة المرور؟',
      signIn: 'تسجيل الدخول',
      orContinueWith: 'أو المتابعة باستخدام',
      noAccount: 'ليس لديك حساب؟',
      signUp: 'إنشاء حساب',
      emailPlaceholder: 'أدخل بريدك الإلكتروني أو رقم الهاتف',
      passwordPlaceholder: 'أدخل كلمة المرور',
      invalidCredentials: 'بريد إلكتروني/هاتف أو كلمة مرور غير صحيحة',
      emailRequired: 'البريد الإلكتروني أو الهاتف مطلوب',
      passwordRequired: 'كلمة المرور مطلوبة',
      mockCredentials: 'استخدم: john@example.com / password123'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const mockCredentials = [
  { email: 'john@example.com', password: 'password123' },
  { email: 'sarah@example.com', password: 'password123' },
  { email: '+1234567890', password: 'password123' }];


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors?.[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.emailOrPhone?.trim()) {
      newErrors.emailOrPhone = t?.emailRequired;
    }

    if (!formData?.password?.trim()) {
      newErrors.password = t?.passwordRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const isValidCredentials = mockCredentials?.some(
        (cred) => (cred?.email === formData?.emailOrPhone || cred?.phone === formData?.emailOrPhone) &&
        cred?.password === formData?.password
      );

      if (!isValidCredentials) {
        setErrors({ general: t?.invalidCredentials });
        return;
      }

      const userData = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        avatar: "https://images.unsplash.com/photo-1588178457501-31b7688a41a0",
        avatarAlt: 'Professional headshot of man with short brown hair in navy blazer'
      };

      localStorage.setItem('authToken', 'mock-jwt-token-12345');
      localStorage.setItem('userData', JSON.stringify(userData));

      const event = new CustomEvent('authStateChange');
      window.dispatchEvent(event);

      onSuccess();

    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors?.general &&
      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-destructive text-sm">{errors?.general}</p>
          <p className="text-xs text-muted-foreground mt-1">{t?.mockCredentials}</p>
        </div>
      }
      <Input
        label={t?.emailOrPhone}
        type="text"
        name="emailOrPhone"
        placeholder={t?.emailPlaceholder}
        value={formData?.emailOrPhone}
        onChange={handleInputChange}
        error={errors?.emailOrPhone}
        required />

      <Input
        label={t?.password}
        type="password"
        name="password"
        placeholder={t?.passwordPlaceholder}
        value={formData?.password}
        onChange={handleInputChange}
        error={errors?.password}
        required />

      <div className="flex items-center justify-between">
        <Checkbox
          label={t?.rememberMe}
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange} />

        
        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">

          {t?.forgotPassword}
        </Link>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="left">

        {t?.signIn}
      </Button>
    </form>);

};

export default SignInForm;