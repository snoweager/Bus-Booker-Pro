import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import SearchWidget from './SearchWidget';
import { useTranslation } from '../../../hooks/useTranslation';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-[600px] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-accent rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-secondary rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-primary rounded-full"></div>
      </div>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Icon name="Shield" size={16} className="mr-2" />
              {t('hero.highlight')}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{t('hero.trustIndicators.travelers')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={20} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{t('hero.trustIndicators.routes')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={20} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{t('hero.trustIndicators.rating')}</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1592475221871-a2636a730176"
                alt="Modern luxury bus with comfortable seating and large windows traveling on scenic highway"
                className="w-full h-[400px] object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t('hero.trustIndicators.onTime')}</div>
                  <div className="text-xs text-muted-foreground">{t('hero.trustIndicators.departureRate')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Widget */}
        <div className="mt-12">
          <SearchWidget />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;