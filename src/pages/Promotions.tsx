
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Video, 
  Play, 
  Pause, 
  Upload, 
  Clock, 
  Calendar, 
  MapPin, 
  BarChart2, 
  Eye, 
  Trash2, 
  Edit, 
  Plus, 
  Info, 
  DollarSign
} from 'lucide-react';

const Promotions = () => {
  // Example promotions data
  const promotions = [
    {
      id: 1,
      name: "Summer Coffee Special",
      status: "active",
      views: 1245,
      startDate: "Jun 1, 2024",
      endDate: "Aug 31, 2024",
      locations: 5,
      budget: 250,
      thumbnail: null, // Would be an image URL in a real app
    },
    {
      id: 2,
      name: "Morning Commuter Ad",
      status: "scheduled",
      views: 0,
      startDate: "Jul 15, 2024",
      endDate: "Sep 15, 2024",
      locations: 3,
      budget: 150,
      thumbnail: null,
    },
    {
      id: 3,
      name: "Weekend Coffee Discount",
      status: "ended",
      views: 3567,
      startDate: "Mar 1, 2024",
      endDate: "May 31, 2024",
      locations: 8,
      budget: 400,
      thumbnail: null,
    },
  ];
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      active: "bg-green-100 text-green-700",
      scheduled: "bg-blue-100 text-blue-700",
      ended: "bg-gray-100 text-gray-700",
      paused: "bg-yellow-100 text-yellow-700",
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="inline-flex items-center bg-coffee-light/50 rounded-full px-4 py-1.5 text-coffee-dark font-medium mb-4">
              <Video className="h-4 w-4 mr-2" />
              Promotional Content
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-2">
                  Video Promotions
                </h1>
                <p className="text-xl text-muted-foreground">
                  Create and manage video ads that display on coffee machines.
                </p>
              </div>
              <Button
                variant="primary"
                icon={<Plus className="h-5 w-5" />}
              >
                Create New Campaign
              </Button>
            </div>
          </div>
          
          {/* Info Card */}
          <Card variant="default" className="mb-8 animate-fade-up">
            <Card.Content className="p-6">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-coffee-medium mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-coffee-dark mb-1">How Promotions Work</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Video promotions are displayed on coffee machine screens between uses. 
                    You can target specific locations, set run dates, and track performance.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="bg-coffee-light/20 p-3 rounded-lg">
                      <h4 className="font-medium text-coffee-dark mb-1">Video Requirements</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Max 30 seconds length</li>
                        <li>• MP4 format, 720p quality</li>
                        <li>• No sound required</li>
                      </ul>
                    </div>
                    <div className="bg-coffee-light/20 p-3 rounded-lg">
                      <h4 className="font-medium text-coffee-dark mb-1">Pricing Model</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Pay per impression</li>
                        <li>• Minimum ₪50 budget</li>
                        <li>• Set daily/total limits</li>
                      </ul>
                    </div>
                    <div className="bg-coffee-light/20 p-3 rounded-lg">
                      <h4 className="font-medium text-coffee-dark mb-1">Content Policy</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• No explicit content</li>
                        <li>• No competitor brands</li>
                        <li>• AI review process</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
          
          {/* Promotions List */}
          <div className="space-y-6">
            {promotions.map((promo, index) => (
              <Card 
                key={promo.id} 
                variant="default" 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card.Content className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Video thumbnail */}
                    <div className="w-full md:w-48 lg:w-64 flex-shrink-0">
                      <div className="bg-coffee-light/30 border border-coffee-light/50 rounded-lg aspect-video relative group">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Video className="h-10 w-10 text-coffee-medium" />
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          {promo.status === 'active' ? (
                            <Pause className="h-12 w-12 text-white cursor-pointer" />
                          ) : (
                            <Play className="h-12 w-12 text-white cursor-pointer" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-coffee-dark mb-1">
                            {promo.name}
                          </h3>
                          <p className="text-muted-foreground">
                            Campaign ID: {promo.id}
                          </p>
                        </div>
                        <StatusBadge status={promo.status} />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 text-sm mb-6">
                        <div>
                          <p className="text-muted-foreground">Campaign Period:</p>
                          <p className="font-medium">
                            {promo.startDate} - {promo.endDate}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground">Locations:</p>
                          <p className="font-medium">{promo.locations} coffee points</p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground">Views:</p>
                          <p className="font-medium">{promo.views.toLocaleString()}</p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground">Budget:</p>
                          <p className="font-medium">₪{promo.budget}</p>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Eye className="h-4 w-4" />}
                        >
                          View
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<BarChart2 className="h-4 w-4" />}
                        >
                          Analytics
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Edit className="h-4 w-4" />}
                        >
                          Edit
                        </Button>
                        
                        {promo.status === 'active' && (
                          <Button
                            variant="outline"
                            size="sm"
                            icon={<Pause className="h-4 w-4" />}
                          >
                            Pause
                          </Button>
                        )}
                        
                        {promo.status === 'paused' && (
                          <Button
                            variant="outline"
                            size="sm"
                            icon={<Play className="h-4 w-4" />}
                          >
                            Resume
                          </Button>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                          icon={<Trash2 className="h-4 w-4" />}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
          
          {/* Create New Promotion Card */}
          <Card variant="default" className="mt-8 border-dashed border-2 animate-fade-up">
            <Card.Content className="p-8 text-center">
              <div className="mb-4">
                <div className="mx-auto bg-coffee-light/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-coffee-dark" />
                </div>
                <h3 className="text-xl font-bold text-coffee-dark mb-2">Upload New Video</h3>
                <p className="text-muted-foreground mb-6">
                  Create a new promotional campaign to reach coffee lovers.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-4 border border-coffee-light rounded-lg">
                  <Video className="h-6 w-6 text-coffee-medium mb-2" />
                  <h4 className="font-medium text-coffee-dark text-sm">Upload Video</h4>
                </div>
                <div className="flex flex-col items-center p-4 border border-coffee-light rounded-lg">
                  <MapPin className="h-6 w-6 text-coffee-medium mb-2" />
                  <h4 className="font-medium text-coffee-dark text-sm">Target Locations</h4>
                </div>
                <div className="flex flex-col items-center p-4 border border-coffee-light rounded-lg">
                  <DollarSign className="h-6 w-6 text-coffee-medium mb-2" />
                  <h4 className="font-medium text-coffee-dark text-sm">Set Budget</h4>
                </div>
              </div>
              
              <Button
                variant="primary"
                icon={<Plus className="h-5 w-5" />}
              >
                Create New Campaign
              </Button>
            </Card.Content>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Promotions;
