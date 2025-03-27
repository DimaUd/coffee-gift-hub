
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CustomCard from '../components/UI/CustomCard';
import CustomButton from '../components/UI/CustomButton';
import AIMonitoringDashboard from '../components/AI/AIMonitoringDashboard';
import AISuggestions from '../components/AI/AISuggestions';
import AITranslator from '../components/AI/AITranslator';
import AIMediaValidator from '../components/AI/AIMediaValidator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Activity, BellRing, BarChart, Languages } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const AIAgent = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('monitoring');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="inline-flex items-center bg-coffee-light/50 rounded-full px-4 py-1.5 text-coffee-dark font-medium mb-4">
              <Bot className="h-4 w-4 mr-2" />
              AI Agent System
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-2">
              AI Operations Center
            </h1>
            <p className="text-xl text-muted-foreground">
              Smart monitoring, alerts, and insights for your coffee business
            </p>
          </div>
          
          <div className="mb-6">
            <Alert className="bg-amber-50 border-amber-200">
              <Activity className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">System Status: Active</AlertTitle>
              <AlertDescription className="text-amber-700">
                AI agent actively monitoring 24 machines, 3 alerts pending attention.
              </AlertDescription>
            </Alert>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="monitoring" className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Monitoring</span>
              </TabsTrigger>
              <TabsTrigger value="validation" className="flex items-center space-x-2">
                <BellRing className="h-4 w-4" />
                <span>Media Validator</span>
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center space-x-2">
                <BarChart className="h-4 w-4" />
                <span>Suggestions</span>
              </TabsTrigger>
              <TabsTrigger value="translator" className="flex items-center space-x-2">
                <Languages className="h-4 w-4" />
                <span>Translator</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="monitoring" className="space-y-4">
              <AIMonitoringDashboard />
            </TabsContent>
            
            <TabsContent value="validation" className="space-y-4">
              <AIMediaValidator />
            </TabsContent>
            
            <TabsContent value="suggestions" className="space-y-4">
              <AISuggestions />
            </TabsContent>
            
            <TabsContent value="translator" className="space-y-4">
              <AITranslator />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIAgent;
