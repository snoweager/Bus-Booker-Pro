import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TwoFactorAuth = ({ currentLanguage, onSuccess, onBack }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  const translations = {
    en: {
      title: 'Two-Factor Authentication',
      description: 'Enter the 6-digit code sent to your device',
      codePlaceholder: 'Enter 6-digit code',
      verify: 'Verify Code',
      resendCode: 'Resend Code',
      backToLogin: 'Back to Login',
      invalidCode: 'Invalid verification code',
      codeExpired: 'Verification code has expired',
      timeRemaining: 'Time remaining:',
      mockCode: 'Use code: 123456'
    },
    es: {
      title: 'Autenticación de Dos Factores',
      description: 'Ingresa el código de 6 dígitos enviado a tu dispositivo',
      codePlaceholder: 'Ingresa código de 6 dígitos',
      verify: 'Verificar Código',
      resendCode: 'Reenviar Código',
      backToLogin: 'Volver al Login',
      invalidCode: 'Código de verificación inválido',
      codeExpired: 'El código de verificación ha expirado',
      timeRemaining: 'Tiempo restante:',
      mockCode: 'Usa el código: 123456'
    },
    fr: {
      title: 'Authentification à Deux Facteurs',
      description: 'Entrez le code à 6 chiffres envoyé à votre appareil',
      codePlaceholder: 'Entrez le code à 6 chiffres',
      verify: 'Vérifier le Code',
      resendCode: 'Renvoyer le Code',
      backToLogin: 'Retour à la Connexion',
      invalidCode: 'Code de vérification invalide',
      codeExpired: 'Le code de vérification a expiré',
      timeRemaining: 'Temps restant:',
      mockCode: 'Utilisez le code: 123456'
    },
    de: {
      title: 'Zwei-Faktor-Authentifizierung',
      description: 'Geben Sie den 6-stelligen Code ein, der an Ihr Gerät gesendet wurde',
      codePlaceholder: 'Geben Sie den 6-stelligen Code ein',
      verify: 'Code Verifizieren',
      resendCode: 'Code Erneut Senden',
      backToLogin: 'Zurück zur Anmeldung',
      invalidCode: 'Ungültiger Verifizierungscode',
      codeExpired: 'Verifizierungscode ist abgelaufen',
      timeRemaining: 'Verbleibende Zeit:',
      mockCode: 'Verwenden Sie Code: 123456'
    },
    zh: {
      title: '双因素认证',
      description: '输入发送到您设备的6位数字代码',
      codePlaceholder: '输入6位数字代码',
      verify: '验证代码',
      resendCode: '重新发送代码',
      backToLogin: '返回登录',
      invalidCode: '验证码无效',
      codeExpired: '验证码已过期',
      timeRemaining: '剩余时间：',
      mockCode: '使用代码：123456'
    },
    ar: {
      title: 'المصادقة الثنائية',
      description: 'أدخل الرمز المكون من 6 أرقام المرسل إلى جهازك',
      codePlaceholder: 'أدخل الرمز المكون من 6 أرقام',
      verify: 'تحقق من الرمز',
      resendCode: 'إعادة إرسال الرمز',
      backToLogin: 'العودة إلى تسجيل الدخول',
      invalidCode: 'رمز التحقق غير صحيح',
      codeExpired: 'انتهت صلاحية رمز التحقق',
      timeRemaining: 'الوقت المتبقي:',
      mockCode: 'استخدم الرمز: 123456'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const handleCodeChange = (e) => {
    const value = e?.target?.value?.replace(/\D/g, '')?.slice(0, 6);
    setCode(value);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (code?.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (code !== '123456') {
        setError(t?.invalidCode + '. ' + t?.mockCode);
        return;
      }
      
      if (timeLeft === 0) {
        setError(t?.codeExpired);
        return;
      }
      
      onSuccess();
      
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setCanResend(false);
    setTimeLeft(300);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Code resent successfully
    } catch (error) {
      console.error('Failed to resend code:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t?.title}</h2>
        <p className="text-muted-foreground text-sm">{t?.description}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}
        
        <Input
          type="text"
          placeholder={t?.codePlaceholder}
          value={code}
          onChange={handleCodeChange}
          className="text-center text-lg tracking-widest"
          maxLength={6}
          autoComplete="one-time-code"
        />
        
        <div className="text-center text-sm text-muted-foreground">
          {timeLeft > 0 ? (
            <span>{t?.timeRemaining} {formatTime(timeLeft)}</span>
          ) : (
            <span className="text-destructive">Code expired</span>
          )}
        </div>
        
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={code?.length !== 6}
          iconName="Shield"
          iconPosition="left"
        >
          {t?.verify}
        </Button>
        
        <div className="flex flex-col space-y-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            fullWidth
            onClick={handleResendCode}
            disabled={!canResend}
            iconName="RefreshCw"
            iconPosition="left"
          >
            {t?.resendCode}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            fullWidth
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            {t?.backToLogin}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TwoFactorAuth;