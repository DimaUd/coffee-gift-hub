
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/hooks/use-toast";
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CustomCard from '../components/UI/CustomCard';
import CustomButton from '../components/UI/CustomButton';
import { Calendar, Clock, DollarSign, MapPin, Upload, Play, Pause, Check, X, Film, BarChart } from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  FormDescription 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Form schema validation
const formSchema = z.object({
  businessName: z.string().min(2, { message: "Business name is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }).max(200),
  locations: z.string().min(1, { message: "At least one location is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  timeSlots: z.string().min(1, { message: "Time slots are required" }),
  budget: z.string().min(1, { message: "Budget is required" }),
});

const BusinessPromotion = () => {
  const { toast } = useToast();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<null | 'success' | 'error'>(null);
  const [step, setStep] = useState(1);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  // Calculate estimated cost based on selections
  const [estimatedCost, setEstimatedCost] = useState(0);
  
  // Setup form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      description: "",
      locations: "",
      startDate: "",
      endDate: "",
      timeSlots: "",
      budget: "",
    },
  });
  
  // Handle video upload
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setValidationStatus(null);
  };
  
  // Handle video playback
  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Simulate AI validation
  const validateVideo = () => {
    setIsValidating(true);
    
    // Simulate validation process
    setTimeout(() => {
      setIsValidating(false);
      // Random validation result for demo
      const isValid = Math.random() > 0.3;
      setValidationStatus(isValid ? 'success' : 'error');
      
      toast({
        title: isValid ? "Video Validated Successfully" : "Validation Failed",
        description: isValid 
          ? "Your video meets all our requirements."
          : "Please check video volume, content, or aspect ratio.",
        variant: isValid ? "default" : "destructive",
      });
    }, 2000);
  };
  
  // Update cost estimate when form changes
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      // Simple cost calculation logic
      let baseCost = 500; // Base cost in ILS
      
      // Add costs based on duration
      if (value.startDate && value.endDate) {
        try {
          const start = new Date(value.startDate);
          const end = new Date(value.endDate);
          const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
          if (days > 0) {
            baseCost += days * 100;
          }
        } catch (e) {
          // Invalid dates
        }
      }
      
      // Add costs based on locations
      if (value.locations) {
        const locationCount = value.locations.split(",").length;
        baseCost += locationCount * 200;
      }
      
      setEstimatedCost(baseCost);
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);
  
  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would initiate the Stripe payment process
    toast({
      title: "Promotion Scheduled",
      description: "Your business promotion has been scheduled successfully.",
    });
    
    console.log("Form submitted:", values);
    console.log("Video file:", videoFile);
  };
  
  // Progress to next step
  const nextStep = () => {
    if (step === 1 && (!videoFile || validationStatus !== 'success')) {
      toast({
        title: "Cannot Proceed",
        description: "Please upload and validate your video first.",
        variant: "destructive",
      });
      return;
    }
    
    setStep(step + 1);
  };
  
  // Go back to previous step
  const prevStep = () => {
    setStep(step - 1);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="inline-flex items-center bg-coffee-light/50 rounded-full px-4 py-1.5 text-coffee-dark font-medium mb-4">
              <Film className="h-4 w-4 mr-2" />
              Business Promotion
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-2">
              Promote Your Business
            </h1>
            <p className="text-xl text-muted-foreground">
              Display your promotional videos on coffee machine screens.
            </p>
          </div>
          
          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-coffee-medium text-white' : 'bg-muted text-muted-foreground'}`}>
                1
              </div>
              <div className={`h-1 flex-1 ${step >= 2 ? 'bg-coffee-medium' : 'bg-muted'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-coffee-medium text-white' : 'bg-muted text-muted-foreground'}`}>
                2
              </div>
              <div className={`h-1 flex-1 ${step >= 3 ? 'bg-coffee-medium' : 'bg-muted'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-coffee-medium text-white' : 'bg-muted text-muted-foreground'}`}>
                3
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>Upload Video</span>
              <span>Configure Campaign</span>
              <span>Review & Pay</span>
            </div>
          </div>
          
          {/* Step 1: Video Upload and Validation */}
          {step === 1 && (
            <CustomCard variant="default" className="animate-fade-up">
              <CustomCard.Header>
                <CustomCard.Title>Upload Promotional Video</CustomCard.Title>
                <CustomCard.Description>
                  Upload a short video to be displayed on coffee machine screens.
                </CustomCard.Description>
              </CustomCard.Header>
              <CustomCard.Content className="p-6">
                <div className="space-y-6">
                  {!videoPreview ? (
                    <div 
                      className="border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => document.getElementById('video-upload')?.click()}
                    >
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">Upload Video</h3>
                      <p className="text-muted-foreground mb-4">Drag and drop or click to browse</p>
                      <p className="text-xs text-muted-foreground">
                        Accepted formats: MP4, MOV, WebM (Max 30 seconds, 10MB)
                      </p>
                      <input 
                        type="file" 
                        id="video-upload" 
                        className="hidden" 
                        accept="video/mp4,video/quicktime,video/webm" 
                        onChange={handleVideoUpload}
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative rounded-lg overflow-hidden">
                        <video 
                          ref={videoRef} 
                          src={videoPreview} 
                          className="w-full aspect-video object-cover rounded-lg"
                          controls={false}
                          onEnded={() => setIsPlaying(false)}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button 
                            onClick={togglePlayback}
                            className="bg-coffee-dark/70 text-white rounded-full p-4 hover:bg-coffee-dark/90 transition-colors"
                          >
                            {isPlaying ? (
                              <Pause className="h-6 w-6" />
                            ) : (
                              <Play className="h-6 w-6" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{videoFile?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(videoFile?.size && (videoFile.size / 1024 / 1024).toFixed(2)) || 0} MB
                          </p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <CustomButton
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setVideoFile(null);
                              setVideoPreview(null);
                              setValidationStatus(null);
                            }}
                          >
                            Replace
                          </CustomButton>
                          
                          <CustomButton
                            variant={validationStatus === 'success' ? 'secondary' : 'primary'}
                            size="sm"
                            onClick={validateVideo}
                            disabled={isValidating}
                            icon={isValidating ? undefined : 
                              validationStatus === 'success' ? <Check className="h-4 w-4" /> : 
                              validationStatus === 'error' ? <X className="h-4 w-4" /> : undefined
                            }
                          >
                            {isValidating ? 'Validating...' : 
                             validationStatus === 'success' ? 'Validated' : 
                             validationStatus === 'error' ? 'Failed' : 'Validate Video'}
                          </CustomButton>
                        </div>
                      </div>
                      
                      {validationStatus === 'error' && (
                        <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
                          <p className="font-medium">Validation Failed</p>
                          <ul className="list-disc list-inside text-sm mt-2">
                            <li>Video volume is too low or inconsistent</li>
                            <li>Video aspect ratio should be 16:9</li>
                            <li>Video content may not comply with our guidelines</li>
                          </ul>
                        </div>
                      )}
                      
                      {validationStatus === 'success' && (
                        <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                          <p className="font-medium">Video Validated Successfully</p>
                          <p className="text-sm mt-1">
                            Your video meets all our requirements and is ready for promotion.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CustomCard.Content>
              <CustomCard.Footer className="flex justify-end px-6 py-4">
                <CustomButton 
                  variant="primary" 
                  onClick={nextStep}
                >
                  Continue
                </CustomButton>
              </CustomCard.Footer>
            </CustomCard>
          )}
          
          {/* Step 2: Campaign Configuration */}
          {step === 2 && (
            <CustomCard variant="default" className="animate-fade-up">
              <CustomCard.Header>
                <CustomCard.Title>Configure Your Campaign</CustomCard.Title>
                <CustomCard.Description>
                  Set up where and when your promotional video will be displayed.
                </CustomCard.Description>
              </CustomCard.Header>
              <CustomCard.Content className="p-6">
                <Form {...form}>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your business name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief description of your promotion"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum 200 characters
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="locations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Locations</FormLabel>
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <Input placeholder="Select coffee points" {...field} />
                            </FormControl>
                            <CustomButton
                              variant="outline"
                              size="sm"
                              icon={<MapPin className="h-4 w-4" />}
                              type="button"
                              onClick={() => {
                                toast({
                                  title: "Map Selection",
                                  description: "Map selection will be implemented in the next version.",
                                });
                              }}
                            >
                              Map
                            </CustomButton>
                          </div>
                          <FormDescription>
                            Enter location names or click Map to select visually
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="date" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="date" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="timeSlots"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Time Slots</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="e.g., Morning, Lunch, Evening" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Enter preferred times or ranges when your ad should be shown
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CustomCard.Content>
              <CustomCard.Footer className="flex justify-between px-6 py-4">
                <CustomButton 
                  variant="outline" 
                  onClick={prevStep}
                >
                  Back
                </CustomButton>
                <CustomButton 
                  variant="primary" 
                  onClick={nextStep}
                >
                  Continue to Review
                </CustomButton>
              </CustomCard.Footer>
            </CustomCard>
          )}
          
          {/* Step 3: Review and Payment */}
          {step === 3 && (
            <CustomCard variant="default" className="animate-fade-up">
              <CustomCard.Header>
                <CustomCard.Title>Review & Complete Payment</CustomCard.Title>
                <CustomCard.Description>
                  Review your campaign details and complete payment to schedule your promotion.
                </CustomCard.Description>
              </CustomCard.Header>
              <CustomCard.Content className="p-6">
                <div className="space-y-6">
                  {/* Campaign Summary */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">Campaign Summary</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Business Name:</span>
                        <span className="font-medium">{form.getValues().businessName || "Not specified"}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Locations:</span>
                        <span className="font-medium">{form.getValues().locations || "Not specified"}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Campaign Duration:</span>
                        <span className="font-medium">
                          {form.getValues().startDate} to {form.getValues().endDate || "Not specified"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time Slots:</span>
                        <span className="font-medium">{form.getValues().timeSlots || "Not specified"}</span>
                      </div>
                      
                      <div className="border-t border-border pt-3">
                        <div className="flex justify-between font-bold">
                          <span>Total Campaign Cost:</span>
                          <span>₪{estimatedCost.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Section */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Payment Details</h3>
                    
                    <div className="p-4 border border-border rounded-lg">
                      <p className="text-center text-muted-foreground mb-4">
                        Secure payment processed via Stripe
                      </p>
                      
                      <CustomButton
                        variant="primary"
                        className="w-full"
                        icon={<DollarSign className="h-4 w-4" />}
                        onClick={() => {
                          toast({
                            title: "Payment Processing",
                            description: "This is a demo. In a real app, this would redirect to Stripe.",
                          });
                          
                          // Simulate payment success
                          setTimeout(() => {
                            toast({
                              title: "Payment Successful",
                              description: "Your promotion has been scheduled successfully.",
                            });
                          }, 2000);
                        }}
                      >
                        Pay ₪{estimatedCost.toFixed(2)}
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </CustomCard.Content>
              <CustomCard.Footer className="flex justify-between px-6 py-4">
                <CustomButton 
                  variant="outline" 
                  onClick={prevStep}
                >
                  Back
                </CustomButton>
                <CustomButton 
                  variant="primary" 
                  onClick={() => onSubmit(form.getValues())}
                >
                  Complete Campaign
                </CustomButton>
              </CustomCard.Footer>
            </CustomCard>
          )}
          
          {/* Sample Analytics Dashboard (For Demo) */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-coffee-dark">
                Analytics Dashboard
              </h2>
              <CustomButton
                variant="outline"
                size="sm"
                icon={<BarChart className="h-4 w-4" />}
              >
                View Full Reports
              </CustomButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CustomCard variant="default">
                <CustomCard.Content className="p-6 text-center">
                  <h3 className="text-xl font-medium mb-4">Total Views</h3>
                  <p className="text-4xl font-bold text-coffee-dark mb-2">12,458</p>
                  <p className="text-sm text-muted-foreground">+24% from last month</p>
                </CustomCard.Content>
              </CustomCard>
              
              <CustomCard variant="default">
                <CustomCard.Content className="p-6 text-center">
                  <h3 className="text-xl font-medium mb-4">Click-Through Rate</h3>
                  <p className="text-4xl font-bold text-coffee-dark mb-2">3.2%</p>
                  <p className="text-sm text-muted-foreground">+0.5% from last month</p>
                </CustomCard.Content>
              </CustomCard>
              
              <CustomCard variant="default">
                <CustomCard.Content className="p-6 text-center">
                  <h3 className="text-xl font-medium mb-4">Cost per View</h3>
                  <p className="text-4xl font-bold text-coffee-dark mb-2">₪0.12</p>
                  <p className="text-sm text-muted-foreground">-0.03₪ from last month</p>
                </CustomCard.Content>
              </CustomCard>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessPromotion;
