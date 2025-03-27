
import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';
import { Coffee, Gift, QrCode, Camera, BarChart, Bot, LayoutDashboard, Globe } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-secondary py-24 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-coffee-light/20 filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-coffee-medium/10 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center bg-coffee-light/30 rounded-full px-3 py-1 text-sm text-coffee-dark mb-4">
              <Globe className="h-4 w-4 mr-2" />
              <span>Available in English, עברית, Русский</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-coffee-dark mb-6">
              The Easiest Way to Send Coffee Gifts
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Surprise someone with a coffee, wherever they are. Create a QR code gift and send it via SMS, email, or any messaging app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start flex-wrap">
              <Link to="/gift-creator">
                <CustomButton 
                  variant="primary" 
                  size="lg" 
                  icon={<Gift className="h-5 w-5" />}
                >
                  Send a Coffee Gift
                </CustomButton>
              </Link>
              <Link to="/coffee-map">
                <CustomButton 
                  variant="outline" 
                  size="lg" 
                  icon={<QrCode className="h-5 w-5" />}
                >
                  Find Coffee Points
                </CustomButton>
              </Link>
              <Link to="/scan-qr">
                <CustomButton 
                  variant="outline" 
                  size="lg" 
                  icon={<Camera className="h-5 w-5" />}
                >
                  Scan QR Gift
                </CustomButton>
              </Link>
              <Link to="/business-promotion">
                <CustomButton 
                  variant="outline" 
                  size="lg" 
                  icon={<BarChart className="h-5 w-5" />}
                >
                  Promote Your Business
                </CustomButton>
              </Link>
              <Link to="/ai-agent">
                <CustomButton 
                  variant="outline" 
                  size="lg" 
                  icon={<Bot className="h-5 w-5" />}
                >
                  AI Agent
                </CustomButton>
              </Link>
              <Link to="/admin">
                <CustomButton 
                  variant="outline" 
                  size="lg" 
                  icon={<LayoutDashboard className="h-5 w-5" />}
                >
                  Admin Panel
                </CustomButton>
              </Link>
            </div>
          </div>
          
          {/* Image Content */}
          <div className="flex justify-center">
            <Coffee className="h-64 w-64 text-coffee-dark animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
