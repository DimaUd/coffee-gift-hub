
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CustomButton from '../components/UI/CustomButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Coffee, 
  Gift, 
  Check, 
  Clock, 
  AlertCircle, 
  Heart, 
  Send,
  ThumbsUp
} from 'lucide-react';

// Simulated gift data
const mockGiftData = {
  '123': { 
    id: '123', 
    senderName: 'John Doe', 
    amount: 15, 
    isValid: true, 
    isExpired: false,
    locationName: 'Coffee Hub Downtown',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  '456': { 
    id: '456', 
    senderName: 'Jane Smith', 
    amount: 20, 
    isValid: true, 
    isExpired: false,
    locationName: 'Brew & Go Station',
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  '789': { 
    id: '789', 
    senderName: 'Alex Brown', 
    amount: 10, 
    isValid: false, 
    isExpired: true,
    locationName: 'Coffee Corner Express',
    expiryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  }
};

const RedeemGift = () => {
  const { giftId } = useParams();
  const { toast } = useToast();
  const [gift, setGift] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redeemStep, setRedeemStep] = useState('initial'); // initial, processing, success, expired, invalid
  const [showThankYouDialog, setShowThankYouDialog] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState('');

  useEffect(() => {
    // Simulate API call to fetch gift data
    const fetchGift = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        
        if (giftId && mockGiftData[giftId]) {
          setGift(mockGiftData[giftId]);
          
          if (mockGiftData[giftId].isExpired) {
            setRedeemStep('expired');
          } else if (!mockGiftData[giftId].isValid) {
            setRedeemStep('invalid');
          } else {
            setRedeemStep('initial');
          }
        } else {
          setRedeemStep('invalid');
          toast({
            title: "Gift not found",
            description: "The gift you're trying to redeem doesn't exist.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching gift:", error);
        toast({
          title: "Error",
          description: "Failed to load gift details. Please try again.",
          variant: "destructive",
        });
        setRedeemStep('invalid');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGift();
  }, [giftId, toast]);

  const handleRedeemGift = async () => {
    setRedeemStep('processing');
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful redemption
      setRedeemStep('success');
      
      toast({
        title: "Coffee Dispensing!",
        description: "Your coffee is being prepared. Enjoy!",
      });
    } catch (error) {
      console.error("Error redeeming gift:", error);
      
      toast({
        title: "Redemption Failed",
        description: "Unable to process your gift. Please try again or contact support.",
        variant: "destructive",
      });
      
      setRedeemStep('initial');
    }
  };

  const handleSendThankYou = () => {
    if (thankYouMessage.trim()) {
      // Simulate sending thank you message
      toast({
        title: "Thank You Sent!",
        description: `Your message has been sent to ${gift?.senderName}.`,
      });
      setShowThankYouDialog(false);
      setThankYouMessage('');
    } else {
      toast({
        title: "Empty Message",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="rounded-full bg-gray-200 h-20 w-20 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-8">
                    <div className="text-center mb-6">
                      {redeemStep === 'expired' && (
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                          <Clock className="h-10 w-10 text-muted-foreground" />
                        </div>
                      )}
                      
                      {redeemStep === 'invalid' && (
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                          <AlertCircle className="h-10 w-10 text-destructive" />
                        </div>
                      )}
                      
                      {(redeemStep === 'initial' || redeemStep === 'processing') && (
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-coffee-light rounded-full mb-4">
                          <Coffee className="h-10 w-10 text-coffee-dark" />
                        </div>
                      )}
                      
                      {redeemStep === 'success' && (
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                          <Check className="h-10 w-10 text-green-600" />
                        </div>
                      )}
                      
                      {redeemStep === 'expired' && (
                        <>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Gift Expired</h2>
                          <p className="text-muted-foreground mb-6">
                            This coffee gift has expired and can no longer be redeemed.
                          </p>
                        </>
                      )}
                      
                      {redeemStep === 'invalid' && (
                        <>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Invalid Gift</h2>
                          <p className="text-muted-foreground mb-6">
                            This coffee gift is invalid or has already been redeemed.
                          </p>
                        </>
                      )}
                      
                      {redeemStep === 'initial' && (
                        <>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Coffee Gift</h2>
                          <p className="text-muted-foreground mb-2">
                            <span className="font-medium text-coffee-dark">{gift?.senderName}</span> sent you a coffee gift!
                          </p>
                          <div className="text-3xl font-bold text-coffee-dark mb-2">₪{gift?.amount}</div>
                          <p className="text-sm text-muted-foreground mb-4">
                            Valid at: {gift?.locationName}
                          </p>
                          <p className="text-xs text-muted-foreground mb-6">
                            Expires on {new Date(gift?.expiryDate).toLocaleDateString()}
                          </p>
                        </>
                      )}
                      
                      {redeemStep === 'processing' && (
                        <>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing...</h2>
                          <p className="text-muted-foreground mb-6">
                            Please wait while we process your coffee gift.
                          </p>
                          <div className="flex justify-center mb-6">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-coffee-dark"></div>
                          </div>
                        </>
                      )}
                      
                      {redeemStep === 'success' && (
                        <>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
                          <p className="text-muted-foreground mb-6">
                            Your coffee is being prepared. Enjoy!
                          </p>
                        </>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      {redeemStep === 'initial' && (
                        <CustomButton 
                          variant="primary" 
                          size="lg" 
                          icon={<Coffee className="h-5 w-5" />} 
                          className="w-full" 
                          onClick={handleRedeemGift}
                        >
                          Pay with Gift
                        </CustomButton>
                      )}
                      
                      {redeemStep === 'success' && (
                        <div className="space-y-4">
                          <CustomButton 
                            variant="outline" 
                            size="lg" 
                            icon={<Heart className="h-5 w-5" />} 
                            className="w-full" 
                            onClick={() => setShowThankYouDialog(true)}
                          >
                            Thank the Sender
                          </CustomButton>
                          
                          <Link to="/gift-creator">
                            <CustomButton 
                              variant="primary" 
                              size="lg" 
                              icon={<Gift className="h-5 w-5" />} 
                              className="w-full"
                            >
                              Send a Gift Too!
                            </CustomButton>
                          </Link>
                        </div>
                      )}
                      
                      {(redeemStep === 'expired' || redeemStep === 'invalid') && (
                        <Link to="/gift-creator">
                          <CustomButton 
                            variant="primary" 
                            size="lg" 
                            icon={<Gift className="h-5 w-5" />} 
                            className="w-full"
                          >
                            Create Your Own Gift
                          </CustomButton>
                        </Link>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Dialog open={showThankYouDialog} onOpenChange={setShowThankYouDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thank {gift?.senderName}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <textarea
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-light"
              rows={4}
              placeholder="Write a thank you message..."
              value={thankYouMessage}
              onChange={(e) => setThankYouMessage(e.target.value)}
            ></textarea>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowThankYouDialog(false)}>Cancel</Button>
            <Button 
              className="bg-coffee-dark hover:bg-coffee-dark/90 text-white"
              onClick={handleSendThankYou}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default RedeemGift;
