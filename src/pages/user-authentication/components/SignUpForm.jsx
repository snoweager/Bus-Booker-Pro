import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SignUpForm = ({ currentLanguage, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    acceptTerms: false,
    acceptMarketing: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    en: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      country: 'Country',
      acceptTerms: 'I agree to the Terms of Service and Privacy Policy',
      acceptMarketing: 'I want to receive marketing communications',
      signUp: 'Create Account',
      firstNamePlaceholder: 'Enter your first name',
      lastNamePlaceholder: 'Enter your last name',
      emailPlaceholder: 'Enter your email address',
      phonePlaceholder: 'Enter your phone number',
      passwordPlaceholder: 'Create a password',
      confirmPasswordPlaceholder: 'Confirm your password',
      countryPlaceholder: 'Select your country',
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email',
      phoneRequired: 'Phone number is required',
      passwordRequired: 'Password is required',
      passwordWeak: 'Password must be at least 8 characters',
      confirmPasswordRequired: 'Please confirm your password',
      passwordMismatch: 'Passwords do not match',
      countryRequired: 'Please select your country',
      termsRequired: 'You must accept the terms and conditions',
      accountExists: 'An account with this email already exists'
    },
    es: {
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      country: 'País',
      acceptTerms: 'Acepto los Términos de Servicio y Política de Privacidad',
      acceptMarketing: 'Quiero recibir comunicaciones de marketing',
      signUp: 'Crear Cuenta',
      firstNamePlaceholder: 'Ingresa tu nombre',
      lastNamePlaceholder: 'Ingresa tu apellido',
      emailPlaceholder: 'Ingresa tu correo electrónico',
      phonePlaceholder: 'Ingresa tu número de teléfono',
      passwordPlaceholder: 'Crea una contraseña',
      confirmPasswordPlaceholder: 'Confirma tu contraseña',
      countryPlaceholder: 'Selecciona tu país',
      firstNameRequired: 'El nombre es requerido',
      lastNameRequired: 'El apellido es requerido',
      emailRequired: 'El correo es requerido',
      emailInvalid: 'Por favor ingresa un correo válido',
      phoneRequired: 'El número de teléfono es requerido',
      passwordRequired: 'La contraseña es requerida',
      passwordWeak: 'La contraseña debe tener al menos 8 caracteres',
      confirmPasswordRequired: 'Por favor confirma tu contraseña',
      passwordMismatch: 'Las contraseñas no coinciden',
      countryRequired: 'Por favor selecciona tu país',
      termsRequired: 'Debes aceptar los términos y condiciones',
      accountExists: 'Ya existe una cuenta con este correo'
    },
    fr: {
      firstName: 'Prénom',
      lastName: 'Nom de famille',
      email: 'Adresse e-mail',
      phone: 'Numéro de téléphone',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      country: 'Pays',
      acceptTerms: "J\'accepte les Conditions d\'utilisation et la Politique de confidentialité",
      acceptMarketing: 'Je souhaite recevoir des communications marketing',
      signUp: 'Créer un compte',
      firstNamePlaceholder: 'Entrez votre prénom',
      lastNamePlaceholder: 'Entrez votre nom de famille',
      emailPlaceholder: 'Entrez votre adresse e-mail',
      phonePlaceholder: 'Entrez votre numéro de téléphone',
      passwordPlaceholder: 'Créez un mot de passe',
      confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
      countryPlaceholder: 'Sélectionnez votre pays',
      firstNameRequired: 'Le prénom est requis',
      lastNameRequired: 'Le nom de famille est requis',
      emailRequired: "L\'e-mail est requis",
      emailInvalid: 'Veuillez entrer un e-mail valide',
      phoneRequired: 'Le numéro de téléphone est requis',
      passwordRequired: 'Le mot de passe est requis',
      passwordWeak: 'Le mot de passe doit contenir au moins 8 caractères',
      confirmPasswordRequired: 'Veuillez confirmer votre mot de passe',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      countryRequired: 'Veuillez sélectionner votre pays',
      termsRequired: 'Vous devez accepter les termes et conditions',
      accountExists: 'Un compte avec cet e-mail existe déjà'
    },
    de: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail-Adresse',
      phone: 'Telefonnummer',
      password: 'Passwort',
      confirmPassword: 'Passwort bestätigen',
      country: 'Land',
      acceptTerms: 'Ich stimme den Nutzungsbedingungen und der Datenschutzrichtlinie zu',
      acceptMarketing: 'Ich möchte Marketing-Kommunikation erhalten',
      signUp: 'Konto erstellen',
      firstNamePlaceholder: 'Geben Sie Ihren Vornamen ein',
      lastNamePlaceholder: 'Geben Sie Ihren Nachnamen ein',
      emailPlaceholder: 'Geben Sie Ihre E-Mail-Adresse ein',
      phonePlaceholder: 'Geben Sie Ihre Telefonnummer ein',
      passwordPlaceholder: 'Erstellen Sie ein Passwort',
      confirmPasswordPlaceholder: 'Bestätigen Sie Ihr Passwort',
      countryPlaceholder: 'Wählen Sie Ihr Land',
      firstNameRequired: 'Vorname ist erforderlich',
      lastNameRequired: 'Nachname ist erforderlich',
      emailRequired: 'E-Mail ist erforderlich',
      emailInvalid: 'Bitte geben Sie eine gültige E-Mail ein',
      phoneRequired: 'Telefonnummer ist erforderlich',
      passwordRequired: 'Passwort ist erforderlich',
      passwordWeak: 'Passwort muss mindestens 8 Zeichen haben',
      confirmPasswordRequired: 'Bitte bestätigen Sie Ihr Passwort',
      passwordMismatch: 'Passwörter stimmen nicht überein',
      countryRequired: 'Bitte wählen Sie Ihr Land',
      termsRequired: 'Sie müssen die Geschäftsbedingungen akzeptieren',
      accountExists: 'Ein Konto mit dieser E-Mail existiert bereits'
    },
    zh: {
      firstName: '名字',
      lastName: '姓氏',
      email: '邮箱地址',
      phone: '手机号码',
      password: '密码',
      confirmPassword: '确认密码',
      country: '国家',
      acceptTerms: '我同意服务条款和隐私政策',
      acceptMarketing: '我希望接收营销通讯',
      signUp: '创建账户',
      firstNamePlaceholder: '输入您的名字',
      lastNamePlaceholder: '输入您的姓氏',
      emailPlaceholder: '输入您的邮箱地址',
      phonePlaceholder: '输入您的手机号码',
      passwordPlaceholder: '创建密码',
      confirmPasswordPlaceholder: '确认您的密码',
      countryPlaceholder: '选择您的国家',
      firstNameRequired: '名字是必需的',
      lastNameRequired: '姓氏是必需的',
      emailRequired: '邮箱是必需的',
      emailInvalid: '请输入有效的邮箱',
      phoneRequired: '手机号码是必需的',
      passwordRequired: '密码是必需的',
      passwordWeak: '密码必须至少8个字符',
      confirmPasswordRequired: '请确认您的密码',
      passwordMismatch: '密码不匹配',
      countryRequired: '请选择您的国家',
      termsRequired: '您必须接受条款和条件',
      accountExists: '此邮箱已存在账户'
    },
    ar: {
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'عنوان البريد الإلكتروني',
      phone: 'رقم الهاتف',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      country: 'البلد',
      acceptTerms: 'أوافق على شروط الخدمة وسياسة الخصوصية',
      acceptMarketing: 'أريد تلقي الاتصالات التسويقية',
      signUp: 'إنشاء حساب',
      firstNamePlaceholder: 'أدخل اسمك الأول',
      lastNamePlaceholder: 'أدخل اسم العائلة',
      emailPlaceholder: 'أدخل عنوان بريدك الإلكتروني',
      phonePlaceholder: 'أدخل رقم هاتفك',
      passwordPlaceholder: 'أنشئ كلمة مرور',
      confirmPasswordPlaceholder: 'أكد كلمة المرور',
      countryPlaceholder: 'اختر بلدك',
      firstNameRequired: 'الاسم الأول مطلوب',
      lastNameRequired: 'اسم العائلة مطلوب',
      emailRequired: 'البريد الإلكتروني مطلوب',
      emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
      phoneRequired: 'رقم الهاتف مطلوب',
      passwordRequired: 'كلمة المرور مطلوبة',
      passwordWeak: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
      confirmPasswordRequired: 'يرجى تأكيد كلمة المرور',
      passwordMismatch: 'كلمات المرور غير متطابقة',
      countryRequired: 'يرجى اختيار بلدك',
      termsRequired: 'يجب عليك قبول الشروط والأحكام',
      accountExists: 'يوجد حساب بهذا البريد الإلكتروني بالفعل'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'es', label: 'Spain' },
    { value: 'it', label: 'Italy' },
    { value: 'jp', label: 'Japan' },
    { value: 'cn', label: 'China' },
    { value: 'in', label: 'India' },
    { value: 'br', label: 'Brazil' },
    { value: 'mx', label: 'Mexico' },
    { value: 'ar', label: 'Argentina' },
    { value: 'sa', label: 'Saudi Arabia' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, country: value }));
    if (errors?.country) {
      setErrors(prev => ({ ...prev, country: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = t?.firstNameRequired;
    }
    
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = t?.lastNameRequired;
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = t?.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = t?.emailInvalid;
    }
    
    if (!formData?.phone?.trim()) {
      newErrors.phone = t?.phoneRequired;
    }
    
    if (!formData?.password?.trim()) {
      newErrors.password = t?.passwordRequired;
    } else if (formData?.password?.length < 8) {
      newErrors.password = t?.passwordWeak;
    }
    
    if (!formData?.confirmPassword?.trim()) {
      newErrors.confirmPassword = t?.confirmPasswordRequired;
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = t?.passwordMismatch;
    }
    
    if (!formData?.country) {
      newErrors.country = t?.countryRequired;
    }
    
    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = t?.termsRequired;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (formData?.email === 'existing@example.com') {
        setErrors({ general: t?.accountExists });
        return;
      }
      
      const userData = {
        id: Date.now(),
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        name: `${formData?.firstName} ${formData?.lastName}`,
        email: formData?.email,
        phone: formData?.phone,
        country: formData?.country,
        avatar: null,
        avatarAlt: `Profile photo of ${formData?.firstName} ${formData?.lastName}`
      };
      
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
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
      {errors?.general && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-destructive text-sm">{errors?.general}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t?.firstName}
          type="text"
          name="firstName"
          placeholder={t?.firstNamePlaceholder}
          value={formData?.firstName}
          onChange={handleInputChange}
          error={errors?.firstName}
          required
        />
        
        <Input
          label={t?.lastName}
          type="text"
          name="lastName"
          placeholder={t?.lastNamePlaceholder}
          value={formData?.lastName}
          onChange={handleInputChange}
          error={errors?.lastName}
          required
        />
      </div>
      <Input
        label={t?.email}
        type="email"
        name="email"
        placeholder={t?.emailPlaceholder}
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
      />
      <Input
        label={t?.phone}
        type="tel"
        name="phone"
        placeholder={t?.phonePlaceholder}
        value={formData?.phone}
        onChange={handleInputChange}
        error={errors?.phone}
        required
      />
      <Select
        label={t?.country}
        placeholder={t?.countryPlaceholder}
        options={countries}
        value={formData?.country}
        onChange={handleSelectChange}
        error={errors?.country}
        required
        searchable
      />
      <Input
        label={t?.password}
        type="password"
        name="password"
        placeholder={t?.passwordPlaceholder}
        value={formData?.password}
        onChange={handleInputChange}
        error={errors?.password}
        required
      />
      <Input
        label={t?.confirmPassword}
        type="password"
        name="confirmPassword"
        placeholder={t?.confirmPasswordPlaceholder}
        value={formData?.confirmPassword}
        onChange={handleInputChange}
        error={errors?.confirmPassword}
        required
      />
      <div className="space-y-3">
        <Checkbox
          label={t?.acceptTerms}
          name="acceptTerms"
          checked={formData?.acceptTerms}
          onChange={handleInputChange}
          error={errors?.acceptTerms}
          required
        />
        
        <Checkbox
          label={t?.acceptMarketing}
          name="acceptMarketing"
          checked={formData?.acceptMarketing}
          onChange={handleInputChange}
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {t?.signUp}
      </Button>
    </form>
  );
};

export default SignUpForm;