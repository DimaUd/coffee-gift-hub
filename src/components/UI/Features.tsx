
import React from 'react';
import { QrCode, MapPin, CreditCard, Coffee, Video, Award, Zap } from 'lucide-react';
import Card from './Card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card variant="default" hoverable className="h-full">
      <Card.Content className="flex flex-col items-center text-center p-8">
        <div className="bg-coffee-light w-16 h-16 rounded-full flex items-center justify-center mb-6">
          <div className="text-coffee-dark">{icon}</div>
        </div>
        <h3 className="text-xl font-bold mb-3 text-coffee-dark">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </Card.Content>
    </Card>
  );
};

const Features = () => {
  const features = [
    {
      icon: <QrCode className="h-8 w-8" />,
      title: "QR Code Gifts",
      description: "Send coffee gifts with a simple QR code that recipients can scan to redeem at any participating coffee point."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Coffee Map",
      description: "Find nearby coffee points where gifts can be redeemed. Filter by location, working hours, and coffee types."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Fixed Amounts",
      description: "Send gifts with fixed amounts. Recipients get the full gift value, regardless of the item's actual cost."
    },
    {
      icon: <Coffee className="h-8 w-8" />,
      title: "Machine Integration",
      description: "Works with most coffee machines through Nayax terminals, QR readers, and other popular payment systems."
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Promotional Content",
      description: "Coffee point owners can display advertisements on their machines to generate additional revenue."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Franchise Solution",
      description: "Comprehensive system for franchise partners to manage networks of coffee points efficiently."
    },
  ];
  
  return (
    <section className="section bg-secondary">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center bg-coffee-light/50 rounded-full px-4 py-1.5 text-coffee-dark font-medium mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Platform Features
          </div>
          <h2 className="section-title">Everything You Need for Coffee Gifting</h2>
          <p className="section-subtitle">
            Our comprehensive platform connects gift givers, receivers, and coffee point owners in one seamless ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
