
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import HeroSection from '../components/UI/HeroSection';
import Features from '../components/UI/Features';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Users, 
  Building2, 
  GraduationCap, 
  ArrowRight, 
  Coffee, 
  Gift, 
  QrCode,
  User, 
  Star,
  Store,
  Video,
  ChevronRight
} from 'lucide-react';

const Index = () => {
  // User role examples
  const userRoles = [
    {
      icon: <User className="h-6 w-6" />,
      title: "Gift Creator",
      description: "Send coffee gifts to friends, colleagues, or clients. Perfect for HR teams and marketing campaigns.",
      cta: "Send a Gift",
      path: "/gift-creator"
    },
    {
      icon: <Store className="h-6 w-6" />,
      title: "Coffee Point Owner",
      description: "Connect your coffee machine to our platform and accept QR code payments. Increase traffic and revenue.",
      cta: "Add Coffee Point",
      path: "/add-coffee-point"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Promotion Advertiser",
      description: "Display your promotional content on coffee machines. Target local audiences effectively.",
      cta: "Create Campaign",
      path: "/promotions"
    }
  ];
  
  // How it works steps
  const howItWorksSteps = [
    {
      number: "01",
      title: "Create a Coffee Gift",
      description: "Choose an amount, pay securely, and generate a QR code to share."
    },
    {
      number: "02",
      title: "Send to Recipient",
      description: "Share via SMS, email, or messaging apps with a personal note."
    },
    {
      number: "03",
      title: "Recipient Scans QR",
      description: "They scan the code at any participating coffee point."
    },
    {
      number: "04",
      title: "Enjoy Coffee",
      description: "The machine dispenses coffee immediately after scanning."
    }
  ];
  
  // Stats
  const stats = [
    { value: "10,000+", label: "Coffee Points" },
    { value: "50,000+", label: "Monthly Gifts" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <Features />
        
        {/* How It Works Section */}
        <section className="section">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center bg-coffee-light/50 rounded-full px-4 py-1.5 text-coffee-dark font-medium mb-4">
                <QrCode className="h-4 w-4 mr-2" />
                Simple Process
              </div>
              <h2 className="section-title">How Coffee2Go Connect Works</h2>
              <p className="section-subtitle">
                A seamless experience from gift creation to coffee enjoyment, powered by QR technology.
              </p>
            </div>
            
            <div className="relative">
              {/* Connection line */}
              <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-coffee-light z-0"></div>
              
              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {howItWorksSteps.map((step, index) => (
                  <div 
                    key={index}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center text-coffee-dark font-bold text-lg mb-6 mx-auto lg:mx-0 shadow-md">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-coffee-dark text-center lg:text-left">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-center lg:text-left">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* User Roles Section */}
        <section className="section bg-secondary">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center bg-coffee-light/50 rounded-full px-4 py-1.5 text-coffee-dark font-medium mb-4">
                <Users className="h-4 w-4 mr-2" />
                For Everyone
              </div>
              <h2 className="section-title">Who Can Use Coffee2Go Connect?</h2>
              <p className="section-subtitle">
                Our platform serves different user needs in the coffee gifting ecosystem.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {userRoles.map((role, index) => (
                <div 
                  key={index}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card variant="default" hoverable className="h-full">
                    <Card.Content className="p-8">
                      <div className="bg-coffee-light/50 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-coffee-dark">
                        {role.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-coffee-dark">{role.title}</h3>
                      <p className="text-muted-foreground mb-6">{role.description}</p>
                      <Button 
                        variant="outline" 
                        className="mt-auto" 
                        icon={<ChevronRight className="h-4 w-4" />}
                      >
                        {role.cta}
                      </Button>
                    </Card.Content>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-coffee-dark text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                    {stat.value}
                  </div>
                  <div className="text-coffee-light">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section relative overflow-hidden">
          {/* Background shapes */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-coffee-light/20 filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-coffee-medium/10 filter blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center bg-coffee-light/50 rounded-full px-4 py-1.5 text-coffee-dark font-medium mb-6">
                <Coffee className="h-4 w-4 mr-2" />
                Get Started Today
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Join the Coffee Gifting Revolution?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you're sending gifts, managing coffee points, or promoting your business, Coffee2Go Connect has everything you need.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon={<Gift className="h-5 w-5" />}
                >
                  Send Your First Gift
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  icon={<QrCode className="h-5 w-5" />}
                >
                  Explore the Platform
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
