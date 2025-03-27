import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { QrCode } from 'lucide-react';

const AddCoffeePoint = () => {
  // State for registration steps
  const [step, setStep] = React.useState(1);
  
  // Handle next step
  const handleNextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Subscription plans
  const subscriptionPlans = [
    {
      name: "Basic",
      price: "₪99",
      period: "per month",
      features: [
        "1 Coffee Machine",
        "QR Code Support",
        "Basic Analytics",
        "Email Support",
        "Standard Processing Fee (5%)",
      ],
      recommended: false,
    },
    {
      name: "Premium",
      price: "₪199",
      period: "per month",
      features: [
        "Up to 5 Coffee Machines",
        "Advanced Analytics",
        "Priority Support",
        "Lower Processing Fee (3%)",
        "Promotional Content Hosting",
      ],
      recommended: true,
    },
    {
      name: "Enterprise",
      price: "₪499",
      period: "per month",
      features: [
        "Unlimited Coffee Machines",
        "White-Label Solution",
        "Dedicated Account Manager",
        "Lowest Processing Fee (2%)",
        "Priority Placement on Coffee Map",
      ],
      recommended: false,
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Page Title */}
            <div className="mb-10 text-center">
              <div className="inline-flex items-center bg-coffee-light/50 rounded-full px-4 py-1.5 text-coffee-dark font-medium mb-4">
                <Store className="h-4 w-4 mr-2" />
                Coffee Point Registration
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
                Add Your Coffee Point
              </h1>
              <p className="text-xl text-muted-foreground">
                Register your coffee machine to accept QR code payments and increase your revenue.
              </p>
            </div>
            
            {/* Step Indicator */}
            <div className="mb-10">
              <div className="relative">
                <div className="overflow-hidden h-2 mb-4 flex rounded bg-coffee-light/30">
                  <div 
                    className="bg-coffee-medium transition-all duration-500 ease-in-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <div className={`text-sm font-medium ${step >= 1 ? 'text-coffee-dark' : 'text-muted-foreground'}`}>Business Info</div>
                  <div className={`text-sm font-medium ${step >= 2 ? 'text-coffee-dark' : 'text-muted-foreground'}`}>Location</div>
                  <div className={`text-sm font-medium ${step >= 3 ? 'text-coffee-dark' : 'text-muted-foreground'}`}>Machine Details</div>
                  <div className={`text-sm font-medium ${step >= 4 ? 'text-coffee-dark' : 'text-muted-foreground'}`}>Subscription</div>
                </div>
              </div>
            </div>
            
            {/* Step Content */}
            <Card variant="default" className="mb-8 animate-fade-up">
              <Card.Content className="p-6 md:p-8">
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-coffee-dark">Business Information</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Business Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="text"
                            className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                            placeholder="Your Business Name"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Business Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <AtSign className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="email"
                            className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="tel"
                            className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                            placeholder="+972 12 345 6789"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Business Type
                        </label>
                        <select className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors">
                          <option value="">Select Business Type</option>
                          <option value="cafe">Café</option>
                          <option value="restaurant">Restaurant</option>
                          <option value="office">Office</option>
                          <option value="retail">Retail Store</option>
                          <option value="hotel">Hotel</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Business Description
                        </label>
                        <textarea
                          rows={4}
                          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                          placeholder="Tell us about your business..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-coffee-dark">Location Information</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Street Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="text"
                            className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                            placeholder="123 Main Street"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-coffee-dark mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                            placeholder="City"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-coffee-dark mb-2">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                            placeholder="Postal Code"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Opening Hours
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <select className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors">
                            <option value="">Select Hours</option>
                            <option value="9-17">9:00 AM - 5:00 PM</option>
                            <option value="8-18">8:00 AM - 6:00 PM</option>
                            <option value="24-7">24/7</option>
                            <option value="custom">Custom Hours</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Location Map
                        </label>
                        <div className="bg-coffee-light/30 h-[200px] rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <MapPin className="h-10 w-10 text-coffee-medium mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Map preview will appear here</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            fullWidth
                            icon={<MapPin className="h-4 w-4" />}
                          >
                            Pin Your Location
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Additional Location Details
                        </label>
                        <textarea
                          rows={2}
                          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                          placeholder="E.g., 'Located inside the mall', 'Near the elevator', etc."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-coffee-dark">Machine Details</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Machine Type
                        </label>
                        <select className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors">
                          <option value="">Select Machine Type</option>
                          <option value="jetinno">Jetinno</option>
                          <option value="nayax">Nayax</option>
                          <option value="necta">Necta</option>
                          <option value="lavazza">Lavazza</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Machine Model
                        </label>
                        <input
                          type="text"
                          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                          placeholder="E.g., 'Jetinno V9', 'Nayax Nova', etc."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Machine ID / Serial Number
                        </label>
                        <input
                          type="text"
                          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                          placeholder="Enter machine ID or serial number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Payment Terminal Type
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-coffee-light rounded-lg p-4 flex items-center cursor-pointer hover:bg-coffee-light/20 transition-colors">
                            <input
                              type="radio"
                              id="terminal-nayax"
                              name="terminal-type"
                              className="h-4 w-4 text-coffee-medium border-coffee-light focus:ring-coffee-medium"
                            />
                            <label htmlFor="terminal-nayax" className="ml-2 flex items-center cursor-pointer">
                              <CreditCard className="h-5 w-5 mr-2 text-coffee-medium" />
                              <span>Nayax</span>
                            </label>
                          </div>
                          <div className="border border-coffee-light rounded-lg p-4 flex items-center cursor-pointer hover:bg-coffee-light/20 transition-colors">
                            <input
                              type="radio"
                              id="terminal-qr"
                              name="terminal-type"
                              className="h-4 w-4 text-coffee-medium border-coffee-light focus:ring-coffee-medium"
                            />
                            <label htmlFor="terminal-qr" className="ml-2 flex items-center cursor-pointer">
                              <QrCode className="h-5 w-5 mr-2 text-coffee-medium" />
                              <span>QR Reader</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Internet Connectivity
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-coffee-light rounded-lg p-4 flex items-center cursor-pointer hover:bg-coffee-light/20 transition-colors">
                            <input
                              type="radio"
                              id="wifi"
                              name="connectivity"
                              className="h-4 w-4 text-coffee-medium border-coffee-light focus:ring-coffee-medium"
                            />
                            <label htmlFor="wifi" className="ml-2 flex items-center cursor-pointer">
                              <Wifi className="h-5 w-5 mr-2 text-coffee-medium" />
                              <span>Wi-Fi</span>
                            </label>
                          </div>
                          <div className="border border-coffee-light rounded-lg p-4 flex items-center cursor-pointer hover:bg-coffee-light/20 transition-colors">
                            <input
                              type="radio"
                              id="ethernet"
                              name="connectivity"
                              className="h-4 w-4 text-coffee-medium border-coffee-light focus:ring-coffee-medium"
                            />
                            <label htmlFor="ethernet" className="ml-2 cursor-pointer">
                              Ethernet
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Machine Photos
                        </label>
                        <div className="border-2 border-dashed border-coffee-light rounded-lg p-6 text-center">
                          <Upload className="h-10 w-10 text-coffee-medium mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Drag and drop machine photos or <span className="text-coffee-medium">browse</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            (Upload up to 3 photos, max 5MB each)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {step === 4 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-coffee-dark">Choose Subscription Plan</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {subscriptionPlans.map((plan, index) => (
                        <div
                          key={index}
                          className={`border rounded-xl ${
                            plan.recommended 
                              ? 'border-coffee-medium ring-2 ring-coffee-medium/30' 
                              : 'border-coffee-light'
                          } transition-all hover:shadow-md`}
                        >
                          {plan.recommended && (
                            <div className="bg-coffee-medium text-white text-xs font-medium py-1.5 rounded-t-xl text-center">
                              RECOMMENDED
                            </div>
                          )}
                          
                          <div className="p-6">
                            <h3 className="text-lg font-bold text-coffee-dark mb-1">{plan.name}</h3>
                            <div className="flex items-baseline mb-4">
                              <span className="text-2xl font-bold text-coffee-dark">{plan.price}</span>
                              <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
                            </div>
                            
                            <ul className="space-y-2 mb-6">
                              {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center text-sm">
                                  <CheckCircle className="h-4 w-4 text-coffee-medium mr-2 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <div className="mt-auto">
                              <Button
                                variant={plan.recommended ? "primary" : "outline"}
                                fullWidth
                              >
                                Select Plan
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-coffee-light/20 p-4 rounded-lg mb-6 flex items-start">
                      <Info className="h-5 w-5 text-coffee-medium mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-coffee-dark mb-1">Payment Processing Fees</p>
                        <p className="text-muted-foreground">
                          Each coffee gift redemption incurs a processing fee based on your subscription plan. 
                          Basic: 5%, Premium: 3%, Enterprise: 2%.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-coffee-dark mb-4">Payment Details</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-coffee-dark mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-coffee-dark mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-coffee-dark mb-2">
                              CVC
                            </label>
                            <input
                              type="text"
                              className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex items-center space-x-2">
                          <input
                            id="terms"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-coffee-medium focus:ring-coffee-medium"
                          />
                          <label htmlFor="terms" className="text-sm text-muted-foreground">
                            I agree to the <a href="#" className="text-coffee-medium hover:underline">Terms and Conditions</a>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={handlePrevStep}
                disabled={step === 1}
                icon={<ChevronLeft className="h-5 w-5" />}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={step < 4 ? handleNextStep : () => {}}
                icon={step < 4 ? <ChevronRight className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
              >
                {step < 4 ? 'Continue' : 'Complete Registration'}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddCoffeePoint;
