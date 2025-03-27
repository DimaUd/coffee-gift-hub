
import React from 'react';
import { ArrowRight, Coffee, Gift, MapPin } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="min-h-screen relative overflow-hidden pt-24 pb-16 flex items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-coffee-light/30 filter blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-coffee-medium/20 filter blur-3xl animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-coffee-light/20 filter blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left animate-fade-up">
            <div className="inline-block bg-coffee-light/50 px-4 py-1.5 rounded-full text-coffee-dark font-medium mb-6">
              Coffee Giving, Reimagined
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Send Coffee Gifts with <span className="text-coffee-dark">QR Codes</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Connect people through coffee with our innovative platform. Send coffee gifts instantly, redeemable at participating coffee points.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                variant="primary" 
                size="lg" 
                icon={<Gift className="h-5 w-5" />}
                onClick={() => navigate('/gift-creator')}
              >
                Create a Gift
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                icon={<MapPin className="h-5 w-5" />}
                onClick={() => navigate('/coffee-map')}
              >
                Find Coffee Points
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-coffee-medium mr-2"></div>
                <span>10,000+ Coffee Points</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-coffee-medium mr-2"></div>
                <span>50,000+ Monthly Gifts</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-coffee-medium mr-2"></div>
                <span>100% Secure Payments</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image/Device Mockup */}
          <div className="lg:block animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Phone mockup */}
              <div className="relative mx-auto w-[280px] md:w-[320px] h-[580px] md:h-[660px] bg-black rounded-[60px] border-[14px] border-black shadow-xl overflow-hidden">
                {/* Screen */}
                <div className="absolute inset-0 overflow-hidden rounded-[48px] bg-white">
                  {/* App UI Mockup */}
                  <div className="relative h-full w-full overflow-hidden">
                    {/* App header */}
                    <div className="p-4 bg-coffee-dark text-white flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Coffee className="h-5 w-5" />
                        <span className="font-medium">Coffee2Go</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/20"></div>
                    </div>
                    
                    {/* QR code gift card */}
                    <div className="p-6">
                      <div className="bg-white rounded-xl shadow-lg p-5 border border-coffee-light/50">
                        <div className="mb-4 text-center">
                          <h3 className="font-bold text-coffee-dark">Coffee Gift</h3>
                          <p className="text-sm text-muted-foreground">Scan to redeem</p>
                        </div>
                        
                        {/* QR placeholder */}
                        <div className="w-full aspect-square bg-white border-2 border-coffee-light rounded-lg mb-4 grid place-items-center p-4">
                          <div className="w-full h-full bg-coffee-dark/10 rounded grid place-items-center">
                            <div className="w-3/4 h-3/4 grid grid-cols-4 grid-rows-4 gap-1">
                              {Array.from({ length: 16 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`bg-coffee-dark ${Math.random() > 0.3 ? 'opacity-100' : 'opacity-0'}`}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Amount</p>
                            <p className="text-xl font-bold text-coffee-dark">₪25.00</p>
                          </div>
                          <button className="px-4 py-2 bg-coffee-medium text-white rounded-lg text-sm font-medium flex items-center">
                            Redeem <ArrowRight className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Coffee map preview */}
                    <div className="p-6 pt-2">
                      <div className="mb-3">
                        <h3 className="font-medium text-coffee-dark">Nearby Coffee Points</h3>
                      </div>
                      <div className="rounded-xl overflow-hidden h-32 bg-coffee-light/30 relative">
                        {/* Map placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <MapPin className="h-8 w-8 text-coffee-medium" />
                        </div>
                        
                        {/* Markers */}
                        <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-coffee-dark"></div>
                        <div className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-coffee-dark"></div>
                        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 rounded-full bg-coffee-dark"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-3xl"></div>
              </div>
              
              {/* Device shadow */}
              <div className="absolute -bottom-6 inset-x-0 h-12 bg-black/10 blur-xl rounded-full mx-auto w-[250px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
