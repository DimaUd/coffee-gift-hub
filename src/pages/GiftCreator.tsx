
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { 
  Coffee, 
  DollarSign, 
  CalendarDays, 
  QrCode, 
  Share2, 
  ArrowRight,
  Gift,
  ChevronRight,
  ChevronLeft,
  Send
} from 'lucide-react';

const GiftCreator = () => {
  // State for gift creation steps
  const [step, setStep] = React.useState(1);
  const [giftAmount, setGiftAmount] = React.useState(25);
  
  // Predefined gift amounts
  const giftAmounts = [15, 25, 50, 100];
  
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Page Title */}
            <div className="mb-10 text-center">
              <div className="inline-flex items-center bg-coffee-light/50 rounded-full px-4 py-1.5 text-coffee-dark font-medium mb-4">
                <Gift className="h-4 w-4 mr-2" />
                Create a Gift
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
                Send a Coffee Gift
              </h1>
              <p className="text-xl text-muted-foreground">
                Create a personalized coffee gift that can be redeemed at any participating coffee point.
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
                  <div className={`text-sm font-medium ${step >= 1 ? 'text-coffee-dark' : 'text-muted-foreground'}`}>Amount</div>
                  <div className={`text-sm font-medium ${step >= 2 ? 'text-coffee-dark' : 'text-muted-foreground'}`}>Personalize</div>
                  <div className={`text-sm font-medium ${step >= 3 ? 'text-coffee-dark' : 'text-muted-foreground'}`}>Payment</div>
                  <div className={`text-sm font-medium ${step >= 4 ? 'text-coffee-dark' : 'text-muted-foreground'}`}>Share</div>
                </div>
              </div>
            </div>
            
            {/* Step Content */}
            <Card variant="default" className="mb-8 animate-fade-up">
              <Card.Content className="p-6 md:p-8">
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-coffee-dark">Choose Gift Amount</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {giftAmounts.map(amount => (
                        <button
                          key={amount}
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                            giftAmount === amount 
                              ? 'border-coffee-medium bg-coffee-light/30 shadow-md' 
                              : 'border-coffee-light/50 hover:border-coffee-light'
                          }`}
                          onClick={() => setGiftAmount(amount)}
                        >
                          <DollarSign className="h-6 w-6 text-coffee-medium mb-2" />
                          <span className="text-xl font-bold text-coffee-dark">₪{amount}</span>
                        </button>
                      ))}
                    </div>
                    
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-coffee-dark mb-2">
                        Custom Amount (₪)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="5"
                          max="500"
                          value={giftAmount}
                          onChange={(e) => setGiftAmount(Number(e.target.value))}
                          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground bg-coffee-light/20 p-4 rounded-lg mb-8">
                      <p>
                        The recipient will get a coffee gift worth ₪{giftAmount}. The gift can be redeemed at any participating coffee point.
                      </p>
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-coffee-dark">Personalize Your Gift</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Recipient's Name
                        </label>
                        <input
                          type="text"
                          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                          placeholder="Enter recipient's name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Personal Message
                        </label>
                        <textarea
                          rows={4}
                          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                          placeholder="Add a personal message..."
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Gift Expiry Date
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarDays className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="date"
                            className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-coffee-dark">Payment Details</h2>
                    
                    <div className="bg-secondary p-4 rounded-lg mb-6">
                      <div className="flex justify-between mb-3">
                        <span className="text-muted-foreground">Gift Amount:</span>
                        <span className="font-medium">₪{giftAmount}.00</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="text-muted-foreground">Service Fee:</span>
                        <span className="font-medium">₪{(giftAmount * 0.05).toFixed(2)}</span>
                      </div>
                      <div className="h-px bg-border my-3"></div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>₪{(giftAmount * 1.05).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
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
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee-dark mb-2">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                          placeholder="John Doe"
                        />
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
                )}
                
                {step === 4 && (
                  <div className="text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-coffee-light flex items-center justify-center">
                        <Gift className="h-8 w-8 text-coffee-dark" />
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-2 text-coffee-dark">Your Gift is Ready!</h2>
                    <p className="text-muted-foreground mb-8">
                      Your coffee gift has been created and is ready to be shared.
                    </p>
                    
                    <div className="bg-white border-2 border-coffee-light rounded-lg p-6 mb-8 inline-block">
                      <div className="flex justify-center mb-4">
                        <QrCode className="h-32 w-32 text-coffee-dark" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-coffee-dark">Coffee Gift: ₪{giftAmount}</p>
                        <p className="text-sm text-muted-foreground">Valid until: 02/28/2024</p>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="font-medium text-coffee-dark mb-4">Share via:</h3>
                      <div className="flex flex-wrap justify-center gap-3">
                        <Button variant="outline" size="sm">WhatsApp</Button>
                        <Button variant="outline" size="sm">Email</Button>
                        <Button variant="outline" size="sm">SMS</Button>
                        <Button variant="outline" size="sm">Copy Link</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        variant="primary" 
                        icon={<Send className="h-5 w-5" />}
                      >
                        Send Another Gift
                      </Button>
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>
            
            {/* Navigation Buttons */}
            {step < 4 && (
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
                  onClick={handleNextStep}
                  icon={<ChevronRight className="h-5 w-5" />}
                >
                  {step === 3 ? 'Pay & Continue' : 'Continue'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GiftCreator;
