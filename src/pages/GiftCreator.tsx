import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CustomCard from '../components/UI/CustomCard';
import CustomButton from '../components/UI/CustomButton';
import { 
  Gift, 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar, 
  CreditCard, 
  QrCode, 
  Share2, 
  Download, 
  Copy, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Coffee,
  Check
} from 'lucide-react';

const GiftCreator = () => {
  // State for multi-step form
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: 25,
    recipientName: '',
    recipientEmail: '',
    recipientPhone: '',
    message: '',
    expiryDate: '',
    paymentMethod: 'card',
  });
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle amount selection
  const handleAmountSelect = (amount: number) => {
    setFormData(prev => ({ ...prev, amount }));
  };
  
  // Navigate between steps
  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  
  // Predefined gift amounts
  const giftAmounts = [15, 25, 50, 100];
  
  // Mock function for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    nextStep(); // Move to success step
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="inline-flex items-center bg-coffee-light/50 rounded-full px-4 py-1.5 text-coffee-dark font-medium mb-4">
              <Gift className="h-4 w-4 mr-2" />
              Gift Creator
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-2">
              Send a Coffee Gift
            </h1>
            <p className="text-xl text-muted-foreground">
              Create a personalized coffee gift for friends, family, or colleagues.
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step >= i 
                        ? 'bg-coffee-dark text-white' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {step > i ? <Check className="h-5 w-5" /> : i}
                  </div>
                  <div className={`text-sm ${step >= i ? 'text-coffee-dark' : 'text-gray-400'}`}>
                    {i === 1 && 'Amount'}
                    {i === 2 && 'Details'}
                    {i === 3 && 'Payment'}
                    {i === 4 && 'Done'}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-2 max-w-3xl mx-auto">
              <div className="absolute top-0 left-[5%] right-[5%] h-1 bg-gray-200"></div>
              <div 
                className="absolute top-0 left-[5%] h-1 bg-coffee-dark transition-all duration-300"
                style={{ width: `${(step - 1) * 33.33}%` }}
              ></div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <CustomCard variant="default" className="animate-fade-up">
              <CustomCard.Content className="p-8">
                {/* Step 1: Choose Amount */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-coffee-dark">Choose Gift Amount</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {giftAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handleAmountSelect(amount)}
                          className={`p-4 rounded-lg border-2 text-center transition-all ${
                            formData.amount === amount 
                              ? 'border-coffee-dark bg-coffee-light/30 text-coffee-dark' 
                              : 'border-gray-200 hover:border-coffee-light'
                          }`}
                        >
                          <div className="text-2xl font-bold mb-1">₪{amount}</div>
                          <div className="text-sm text-muted-foreground">
                            {amount <= 25 ? 'Small' : amount <= 50 ? 'Medium' : 'Large'} Gift
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Custom Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₪</span>
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          min="10"
                          max="500"
                          className="pl-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Min: ₪10, Max: ₪500</p>
                    </div>
                    
                    <div className="flex justify-end">
                      <CustomButton 
                        variant="primary" 
                        onClick={nextStep}
                        icon={<ChevronRight className="h-4 w-4" />}
                      >
                        Continue
                      </CustomButton>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Recipient Details */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-coffee-dark">Recipient Details</h2>
                    
                    <div className="space-y-4 mb-8">
                      <div>
                        <label htmlFor="recipientName" className="block text-sm font-medium mb-1">
                          Recipient Name
                        </label>
                        <input
                          id="recipientName"
                          name="recipientName"
                          type="text"
                          value={formData.recipientName}
                          onChange={handleChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                          placeholder="Enter recipient's name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="recipientEmail" className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <input
                            id="recipientEmail"
                            name="recipientEmail"
                            type="email"
                            value={formData.recipientEmail}
                            onChange={handleChange}
                            className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="recipientPhone" className="block text-sm font-medium mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <input
                            id="recipientPhone"
                            name="recipientPhone"
                            type="tel"
                            value={formData.recipientPhone}
                            onChange={handleChange}
                            className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                            placeholder="+972 50 123 4567"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          We'll send the gift via SMS if provided
                        </p>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          Personal Message
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-3 pointer-events-none">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                            placeholder="Write a personal message..."
                          ></textarea>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Max 200 characters
                        </p>
                      </div>
                      
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                          Expiry Date
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <select
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors appearance-none"
                          >
                            <option value="">Select expiry period</option>
                            <option value="3months">3 months from now</option>
                            <option value="6months">6 months from now</option>
                            <option value="1year">1 year from now</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <CustomButton 
                        variant="outline" 
                        onClick={prevStep}
                        icon={<ChevronLeft className="h-4 w-4" />}
                      >
                        Back
                      </CustomButton>
                      <CustomButton 
                        variant="primary" 
                        onClick={nextStep}
                        icon={<ChevronRight className="h-4 w-4" />}
                      >
                        Continue
                      </CustomButton>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Payment */}
                {step === 3 && (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6 text-coffee-dark">Payment</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Order Summary</h3>
                      <div className="bg-secondary rounded-lg p-4 mb-4">
                        <div className="flex justify-between mb-2">
                          <span>Coffee Gift</span>
                          <span>₪{formData.amount}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                          <span>Service Fee</span>
                          <span>₪{Math.round(formData.amount * 0.05)}</span>
                        </div>
                        <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold">
                          <span>Total</span>
                          <span>₪{formData.amount + Math.round(formData.amount * 0.05)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                      <div className="space-y-3">
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <CreditCard className="h-5 w-5 mr-2 text-coffee-dark" />
                          <span>Credit/Debit Card</span>
                        </label>
                        
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <span className="font-bold text-blue-600 mr-2">Pay</span>
                          <span className="font-bold text-blue-800">Pal</span>
                        </label>
                        
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="apple"
                            checked={formData.paymentMethod === 'apple'}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <span className="font-medium">Apple Pay</span>
                        </label>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === 'card' && (
                      <div className="mb-8 space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                            Card Number
                          </label>
                          <input
                            id="cardNumber"
                            type="text"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                              Expiry Date
                            </label>
                            <input
                              id="expiryDate"
                              type="text"
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                              CVV
                            </label>
                            <input
                              id="cvv"
                              type="text"
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                              placeholder="123"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="nameOnCard" className="block text-sm font-medium mb-1">
                            Name on Card
                          </label>
                          <input
                            id="nameOnCard"
                            type="text"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <CustomButton 
                        variant="outline" 
                        onClick={prevStep}
                        icon={<ChevronLeft className="h-4 w-4" />}
                        type="button"
                      >
                        Back
                      </CustomButton>
                      <CustomButton 
                        variant="primary" 
                        type="submit"
                        icon={<Coffee className="h-4 w-4" />}
                      >
                        Pay ₪{formData.amount + Math.round(formData.amount * 0.05)}
                      </CustomButton>
                    </div>
                  </form>
                )}
                
                {/* Step 4: Success */}
                {step === 4 && (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                      <Check className="h-8 w-8" />
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2 text-coffee-dark">Gift Created Successfully!</h2>
                    <p className="text-muted-foreground mb-8">
                      Your coffee gift for {formData.recipientName || 'your recipient'} has been created and is ready to share.
                    </p>
                    
                    <div className="bg-white border-2 border-coffee-light rounded-lg p-6 mb-8 max-w-xs mx-auto">
                      <QrCode className="h-full w-full text-coffee-dark" />
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                      <CustomButton 
                        variant="outline" 
                        size="sm"
                        icon={<Share2 className="h-4 w-4" />}
                      >
                        Share
                      </CustomButton>
                      <CustomButton 
                        variant="outline" 
                        size="sm"
                        icon={<Download className="h-4 w-4" />}
                      >
                        Download
                      </CustomButton>
                      <CustomButton 
                        variant="outline" 
                        size="sm"
                        icon={<Copy className="h-4 w-4" />}
                      >
                        Copy Link
                      </CustomButton>
                    </div>
                    
                    <div className="flex justify-center">
                      <CustomButton 
                        variant="primary"
                        icon={<Gift className="h-4 w-4" />}
                        onClick={() => setStep(1)}
                      >
                        Create Another Gift
                      </CustomButton>
                    </div>
                  </div>
                )}
              </CustomCard.Content>
            </CustomCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GiftCreator;
