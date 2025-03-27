
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import CustomCard from '../UI/CustomCard';
import CustomButton from '../UI/CustomButton';
import { 
  Lightbulb, TrendingUp, BarChart, DollarSign, 
  Target, Clock, ChevronRight, CheckCircle, Repeat 
} from 'lucide-react';

// Sample suggestion data
const sampleSuggestions = [
  {
    id: 1,
    type: 'campaign',
    title: 'Weekend Promotion Opportunity',
    description: 'Based on historical data, weekends show 35% higher engagement. Consider launching a weekend-specific promotion.',
    impact: 'Potential 20% increase in sales',
    difficulty: 'Low',
    timeframe: 'Implement within 1-2 days',
    status: 'new',
  },
  {
    id: 2,
    type: 'maintenance',
    title: 'Preventative Maintenance Alert',
    description: 'Machine MACHINE-012 is showing early signs of potential issues. Schedule maintenance before it affects service.',
    impact: 'Prevent potential 2-day downtime',
    difficulty: 'Medium',
    timeframe: 'Schedule within next week',
    status: 'new',
  },
  {
    id: 3,
    type: 'budget',
    title: 'Advertising Budget Optimization',
    description: 'Current ad spending in North region is showing diminishing returns. Consider reallocating 30% to Central region.',
    impact: 'Potential 15% better ROI on ad spend',
    difficulty: 'Medium',
    timeframe: 'Apply to next campaign cycle',
    status: 'new',
  },
  {
    id: 4,
    type: 'content',
    title: 'Video Content Optimization',
    description: 'Videos under 20 seconds show 40% better completion rates. Consider shortening your promotional videos.',
    impact: 'Potential 25% increase in message retention',
    difficulty: 'Low',
    timeframe: 'Apply to next video production',
    status: 'implemented',
  },
  {
    id: 5,
    type: 'pricing',
    title: 'Dynamic Pricing Opportunity',
    description: 'Morning hours show price sensitivity. Consider time-based discounts from 7-9am to drive traffic.',
    impact: 'Potential 30% increase in morning transactions',
    difficulty: 'Medium',
    timeframe: 'Test for 2 weeks',
    status: 'dismissed',
  },
];

const AISuggestions = () => {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Simulate loading suggestions
  useEffect(() => {
    setSuggestions(sampleSuggestions);
  }, []);
  
  // Handle implementing a suggestion
  const implementSuggestion = (id: number) => {
    setSuggestions(suggestions.map(suggestion => 
      suggestion.id === id ? { ...suggestion, status: 'implemented' } : suggestion
    ));
    
    toast({
      title: "Suggestion Implemented",
      description: "The AI suggestion has been marked as implemented.",
    });
  };
  
  // Handle dismissing a suggestion
  const dismissSuggestion = (id: number) => {
    setSuggestions(suggestions.map(suggestion => 
      suggestion.id === id ? { ...suggestion, status: 'dismissed' } : suggestion
    ));
    
    toast({
      title: "Suggestion Dismissed",
      description: "The AI suggestion has been dismissed.",
    });
  };
  
  // Generate new suggestions
  const generateNewSuggestions = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newSuggestion = {
        id: suggestions.length + 1,
        type: 'loyalty',
        title: 'Launch Loyalty Program',
        description: 'Customer retention analysis shows opportunity for a simple loyalty program. 10% of customers generate 40% of revenue.',
        impact: 'Potential 25% increase in repeat business',
        difficulty: 'High',
        timeframe: 'Launch within 1 month',
        status: 'new',
      };
      
      setSuggestions([newSuggestion, ...suggestions]);
      setIsGenerating(false);
      
      toast({
        title: "New Suggestion Generated",
        description: "AI has analyzed recent data and generated a new business suggestion.",
      });
    }, 3000);
  };
  
  // Filter suggestions
  const filteredSuggestions = filter === 'all' 
    ? suggestions 
    : suggestions.filter(suggestion => suggestion.status === filter);
    
  // Get icon based on suggestion type
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'campaign':
        return <Target className="h-5 w-5" />;
      case 'maintenance':
        return <Clock className="h-5 w-5" />;
      case 'budget':
        return <DollarSign className="h-5 w-5" />;
      case 'content':
        return <Lightbulb className="h-5 w-5" />;
      case 'pricing':
        return <BarChart className="h-5 w-5" />;
      case 'loyalty':
        return <Repeat className="h-5 w-5" />;
      default:
        return <TrendingUp className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium">AI Business Suggestions</h3>
          <p className="text-sm text-muted-foreground">
            Smart recommendations based on your business data and market trends
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex bg-muted rounded-lg p-1">
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                filter === 'all' ? 'bg-background shadow-sm' : 'text-muted-foreground'
              }`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                filter === 'new' ? 'bg-background shadow-sm' : 'text-muted-foreground'
              }`}
              onClick={() => setFilter('new')}
            >
              New
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                filter === 'implemented' ? 'bg-background shadow-sm' : 'text-muted-foreground'
              }`}
              onClick={() => setFilter('implemented')}
            >
              Implemented
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                filter === 'dismissed' ? 'bg-background shadow-sm' : 'text-muted-foreground'
              }`}
              onClick={() => setFilter('dismissed')}
            >
              Dismissed
            </button>
          </div>
          
          <CustomButton
            variant="outline"
            size="sm"
            icon={<Lightbulb className="h-4 w-4" />}
            onClick={generateNewSuggestions}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate New'}
          </CustomButton>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredSuggestions.map((suggestion) => (
          <CustomCard 
            key={suggestion.id} 
            variant="default"
            className={`
              ${suggestion.status === 'implemented' ? 'border-green-200 bg-green-50' : 
                suggestion.status === 'dismissed' ? 'border-muted bg-muted/30 opacity-70' : 
                'border-amber-200 bg-amber-50'}
            `}
          >
            <CustomCard.Content className="p-5">
              <div className="flex flex-wrap gap-4">
                <div className={`p-3 rounded-full ${
                  suggestion.status === 'implemented' ? 'bg-green-100' : 
                  suggestion.status === 'dismissed' ? 'bg-muted' : 
                  'bg-amber-100'
                }`}>
                  {getSuggestionIcon(suggestion.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-lg">{suggestion.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                          {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                        </span>
                        {suggestion.status === 'implemented' && (
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Implemented
                          </span>
                        )}
                        {suggestion.status === 'dismissed' && (
                          <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                            Dismissed
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {suggestion.status === 'new' && (
                      <div className="flex space-x-2">
                        <CustomButton
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={() => dismissSuggestion(suggestion.id)}
                        >
                          Dismiss
                        </CustomButton>
                        <CustomButton
                          variant="primary"
                          size="sm"
                          className="h-8"
                          onClick={() => implementSuggestion(suggestion.id)}
                        >
                          Implement
                        </CustomButton>
                      </div>
                    )}
                  </div>
                  
                  <p className="mt-3 text-muted-foreground">
                    {suggestion.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Potential Impact</p>
                      <p className="font-medium text-sm">{suggestion.impact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Implementation Difficulty</p>
                      <p className="font-medium text-sm">{suggestion.difficulty}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Timeframe</p>
                      <p className="font-medium text-sm">{suggestion.timeframe}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CustomCard.Content>
          </CustomCard>
        ))}
        
        {filteredSuggestions.length === 0 && (
          <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
            <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium">No suggestions found</h4>
            <p className="text-muted-foreground mt-1 mb-4">
              {filter === 'all' ? 
                "We don't have any suggestions for you at the moment." : 
                `You don't have any ${filter} suggestions.`}
            </p>
            <CustomButton 
              variant="outline"
              onClick={generateNewSuggestions}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate New Suggestions'}
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestions;
