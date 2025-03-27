
import React, { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import CustomCard from '../UI/CustomCard';
import CustomButton from '../UI/CustomButton';
import { 
  Upload, Play, Pause, Check, X, Film, 
  Volume2, Maximize2, FileCheck, Scale 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const AIMediaValidator = () => {
  const { toast } = useToast();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const [validationResults, setValidationResults] = useState<{
    status: 'idle' | 'validating' | 'success' | 'error';
    volume: 'idle' | 'checking' | 'pass' | 'fail';
    content: 'idle' | 'checking' | 'pass' | 'fail';
    ratio: 'idle' | 'checking' | 'pass' | 'fail';
    overall: 'idle' | 'checking' | 'pass' | 'fail';
    feedback: string[];
  }>({
    status: 'idle',
    volume: 'idle',
    content: 'idle',
    ratio: 'idle',
    overall: 'idle',
    feedback: [],
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle video upload
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setValidationResults({
      status: 'idle',
      volume: 'idle',
      content: 'idle',
      ratio: 'idle',
      overall: 'idle',
      feedback: [],
    });
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
    if (!videoFile) return;
    
    setIsValidating(true);
    setValidationResults({
      ...validationResults,
      status: 'validating',
      volume: 'checking',
      content: 'idle',
      ratio: 'idle',
      overall: 'checking',
      feedback: [],
    });
    setValidationProgress(0);
    
    // Simulate progress and validation checks
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setValidationProgress(progress);
      
      if (progress === 25) {
        setValidationResults(prev => ({ 
          ...prev, 
          volume: Math.random() > 0.7 ? 'pass' : 'fail',
          content: 'checking'
        }));
      }
      
      if (progress === 50) {
        setValidationResults(prev => ({ 
          ...prev, 
          content: Math.random() > 0.8 ? 'pass' : 'fail',
          ratio: 'checking'
        }));
      }
      
      if (progress === 75) {
        setValidationResults(prev => ({ 
          ...prev, 
          ratio: Math.random() > 0.8 ? 'pass' : 'fail' 
        }));
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsValidating(false);
        
        // Determine overall result
        setTimeout(() => {
          const volumePass = validationResults.volume === 'pass';
          const contentPass = validationResults.content === 'pass';
          const ratioPass = validationResults.ratio === 'pass';
          
          const overallPass = volumePass && contentPass && ratioPass;
          
          // Generate feedback based on results
          let feedback = [];
          
          if (!volumePass) {
            feedback.push("Audio volume is too low or inconsistent. Aim for -14 LUFS.");
          }
          
          if (!contentPass) {
            feedback.push("Content may contain inappropriate elements or is not relevant to coffee promotion.");
          }
          
          if (!ratioPass) {
            feedback.push("Video aspect ratio should be 16:9 for optimal display.");
          }
          
          setValidationResults(prev => ({ 
            ...prev, 
            status: overallPass ? 'success' : 'error',
            overall: overallPass ? 'pass' : 'fail',
            feedback
          }));
          
          toast({
            title: overallPass ? "Validation Successful" : "Validation Failed",
            description: overallPass 
              ? "Your media meets all our standards."
              : "Please review the feedback and make necessary adjustments.",
            variant: overallPass ? "default" : "destructive",
          });
        }, 500);
      }
    }, 150);
  };

  // Generate auto-improvement suggestions
  const generateImprovements = () => {
    if (validationResults.status !== 'error') return;
    
    toast({
      title: "Generating Improvements",
      description: "AI is analyzing your media to suggest improvements...",
    });
    
    // Simulate processing time
    setTimeout(() => {
      const suggestions = [
        "We can automatically adjust your audio levels to meet our standards.",
        "We can crop your video to the optimal 16:9 aspect ratio.",
        "We can suggest content edits to improve engagement."
      ];
      
      setValidationResults(prev => ({
        ...prev,
        feedback: [...prev.feedback, "--- AI Suggestions ---", ...suggestions]
      }));
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <CustomCard variant="default">
        <CustomCard.Header>
          <CustomCard.Title>AI Media Validator</CustomCard.Title>
          <CustomCard.Description>
            Upload media content to verify it meets quality and content standards before distribution.
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
                <h3 className="text-lg font-medium mb-2">Upload Media Content</h3>
                <p className="text-muted-foreground mb-4">Drag and drop or click to browse</p>
                <p className="text-xs text-muted-foreground">
                  Accepted formats: MP4, MOV, WebM, PNG, JPG, GIF (Max 50MB)
                </p>
                <input 
                  type="file" 
                  id="video-upload" 
                  className="hidden" 
                  accept="video/mp4,video/quicktime,video/webm,image/png,image/jpeg,image/gif" 
                  onChange={handleVideoUpload}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden bg-black">
                  <video 
                    ref={videoRef} 
                    src={videoPreview} 
                    className="w-full aspect-video object-contain mx-auto"
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
                
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <p className="font-medium">{videoFile?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(videoFile?.size && (videoFile.size / 1024 / 1024).toFixed(2)) || 0} MB
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <CustomButton
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setVideoFile(null);
                        setVideoPreview(null);
                        setValidationResults({
                          status: 'idle',
                          volume: 'idle',
                          content: 'idle',
                          ratio: 'idle',
                          overall: 'idle',
                          feedback: [],
                        });
                      }}
                    >
                      Replace
                    </CustomButton>
                    
                    <CustomButton
                      variant={validationResults.status === 'success' ? 'secondary' : 'primary'}
                      size="sm"
                      onClick={validateVideo}
                      disabled={isValidating}
                      icon={isValidating ? undefined : 
                        validationResults.status === 'success' ? <Check className="h-4 w-4" /> : 
                        validationResults.status === 'error' ? <X className="h-4 w-4" /> : undefined
                      }
                    >
                      {isValidating ? 'Validating...' : 
                       validationResults.status === 'success' ? 'Validated' : 
                       validationResults.status === 'error' ? 'Failed' : 'Validate Media'}
                    </CustomButton>
                  </div>
                </div>
                
                {/* Validation Progress */}
                {isValidating && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span>Validating media...</span>
                      <span>{validationProgress}%</span>
                    </div>
                    <Progress value={validationProgress} className="h-2" />
                  </div>
                )}
                
                {/* Validation Results */}
                {validationResults.status !== 'idle' && !isValidating && (
                  <div className={`p-4 rounded-lg ${
                    validationResults.status === 'success' ? 'bg-green-50 border border-green-200' : 
                    validationResults.status === 'error' ? 'bg-red-50 border border-red-200' : 
                    'bg-muted'
                  }`}>
                    <h4 className={`font-medium mb-3 ${
                      validationResults.status === 'success' ? 'text-green-700' : 
                      validationResults.status === 'error' ? 'text-red-700' : 
                      'text-foreground'
                    }`}>
                      Validation Results
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-8">
                          {validationResults.volume === 'pass' && <Check className="h-4 w-4 text-green-600" />}
                          {validationResults.volume === 'fail' && <X className="h-4 w-4 text-red-600" />}
                          {validationResults.volume === 'checking' && <Volume2 className="h-4 w-4 text-amber-600 animate-pulse" />}
                        </div>
                        <span className="flex-1">Audio Quality</span>
                        <span className={`text-sm font-medium ${
                          validationResults.volume === 'pass' ? 'text-green-600' : 
                          validationResults.volume === 'fail' ? 'text-red-600' : 
                          validationResults.volume === 'checking' ? 'text-amber-600' : 
                          'text-muted-foreground'
                        }`}>
                          {validationResults.volume === 'pass' ? 'Pass' : 
                           validationResults.volume === 'fail' ? 'Fail' : 
                           validationResults.volume === 'checking' ? 'Checking...' : 
                           'Not checked'}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8">
                          {validationResults.content === 'pass' && <Check className="h-4 w-4 text-green-600" />}
                          {validationResults.content === 'fail' && <X className="h-4 w-4 text-red-600" />}
                          {validationResults.content === 'checking' && <FileCheck className="h-4 w-4 text-amber-600 animate-pulse" />}
                        </div>
                        <span className="flex-1">Content Appropriateness</span>
                        <span className={`text-sm font-medium ${
                          validationResults.content === 'pass' ? 'text-green-600' : 
                          validationResults.content === 'fail' ? 'text-red-600' : 
                          validationResults.content === 'checking' ? 'text-amber-600' : 
                          'text-muted-foreground'
                        }`}>
                          {validationResults.content === 'pass' ? 'Pass' : 
                           validationResults.content === 'fail' ? 'Fail' : 
                           validationResults.content === 'checking' ? 'Checking...' : 
                           'Not checked'}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8">
                          {validationResults.ratio === 'pass' && <Check className="h-4 w-4 text-green-600" />}
                          {validationResults.ratio === 'fail' && <X className="h-4 w-4 text-red-600" />}
                          {validationResults.ratio === 'checking' && <Maximize2 className="h-4 w-4 text-amber-600 animate-pulse" />}
                        </div>
                        <span className="flex-1">Aspect Ratio</span>
                        <span className={`text-sm font-medium ${
                          validationResults.ratio === 'pass' ? 'text-green-600' : 
                          validationResults.ratio === 'fail' ? 'text-red-600' : 
                          validationResults.ratio === 'checking' ? 'text-amber-600' : 
                          'text-muted-foreground'
                        }`}>
                          {validationResults.ratio === 'pass' ? 'Pass' : 
                           validationResults.ratio === 'fail' ? 'Fail' : 
                           validationResults.ratio === 'checking' ? 'Checking...' : 
                           'Not checked'}
                        </span>
                      </div>
                      
                      {validationResults.status !== 'validating' && (
                        <div className="flex items-center pt-2 border-t">
                          <div className="w-8">
                            {validationResults.overall === 'pass' && <Check className="h-5 w-5 text-green-600" />}
                            {validationResults.overall === 'fail' && <X className="h-5 w-5 text-red-600" />}
                            {validationResults.overall === 'checking' && <Scale className="h-5 w-5 text-amber-600 animate-pulse" />}
                          </div>
                          <span className="flex-1 font-medium">Overall Result</span>
                          <span className={`text-sm font-medium ${
                            validationResults.overall === 'pass' ? 'text-green-600' : 
                            validationResults.overall === 'fail' ? 'text-red-600' : 
                            'text-muted-foreground'
                          }`}>
                            {validationResults.overall === 'pass' ? 'Approved' : 
                             validationResults.overall === 'fail' ? 'Not Approved' : 
                             'Processing'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {validationResults.feedback.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h5 className="font-medium text-sm">AI Feedback:</h5>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {validationResults.feedback.map((item, index) => (
                            item.startsWith('---') ? (
                              <h6 key={index} className="font-medium mt-2 text-amber-700">{item.replace(/---/g, '')}</h6>
                            ) : (
                              <li key={index} className="text-muted-foreground">{item}</li>
                            )
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {validationResults.status === 'error' && (
                      <div className="mt-4">
                        <CustomButton
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={generateImprovements}
                        >
                          Generate AI Improvement Suggestions
                        </CustomButton>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </CustomCard.Content>
      </CustomCard>
      
      <CustomCard variant="default">
        <CustomCard.Header>
          <CustomCard.Title>Recent Validations</CustomCard.Title>
          <CustomCard.Description>
            View history of media validations and results
          </CustomCard.Description>
        </CustomCard.Header>
        <CustomCard.Content>
          <div className="divide-y divide-border">
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 bg-green-100 rounded-full p-2">
                  <Film className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">summer_promotion.mp4</p>
                  <p className="text-xs text-muted-foreground">Validated 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Approved
                </span>
              </div>
            </div>
            
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 bg-green-100 rounded-full p-2">
                  <Film className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">new_product_launch.mp4</p>
                  <p className="text-xs text-muted-foreground">Validated 1 day ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Approved
                </span>
              </div>
            </div>
            
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 bg-red-100 rounded-full p-2">
                  <Film className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">promo_v1.mp4</p>
                  <p className="text-xs text-muted-foreground">Validated 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">
                  Failed
                </span>
              </div>
            </div>
          </div>
        </CustomCard.Content>
      </CustomCard>
    </div>
  );
};

export default AIMediaValidator;
