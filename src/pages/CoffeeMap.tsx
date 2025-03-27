
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  Coffee, 
  MapPin, 
  Search, 
  Clock, 
  Star, 
  Filter, 
  ArrowUpDown, 
  ChevronDown, 
  Navigation
} from 'lucide-react';

const CoffeeMap = () => {
  // Example coffee points data
  const coffeePoints = [
    {
      id: 1,
      name: "Bean There Coffee",
      address: "123 Main St, Tel Aviv",
      distance: "0.5 km",
      rating: 4.8,
      machineType: "Jetinno V9",
      hours: "Open until 20:00",
    },
    {
      id: 2,
      name: "Caffeinated Corner",
      address: "45 Rothschild Blvd, Tel Aviv",
      distance: "1.2 km",
      rating: 4.6,
      machineType: "Nayax Nova",
      hours: "Open 24 hours",
    },
    {
      id: 3,
      name: "Office Brews Co.",
      address: "78 Dizengoff St, Tel Aviv",
      distance: "2.3 km",
      rating: 4.5,
      machineType: "Jetinno V9",
      hours: "Open until 18:00",
    },
    {
      id: 4,
      name: "Tech Park Coffee",
      address: "90 Herzl St, Tel Aviv",
      distance: "3.1 km",
      rating: 4.7,
      machineType: "Nayax Nova Plus",
      hours: "Open until 22:00",
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="inline-flex items-center bg-coffee-light/50 rounded-full px-4 py-1.5 text-coffee-dark font-medium mb-4">
              <MapPin className="h-4 w-4 mr-2" />
              Coffee Map
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
              Find Coffee Points
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover nearby coffee machines where you can redeem your coffee gifts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar for search and filters */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Card variant="default" className="sticky top-24 animate-fade-up">
                <Card.Content className="p-6">
                  {/* Search */}
                  <div className="mb-6">
                    <label htmlFor="search" className="block text-sm font-medium text-coffee-dark mb-2">
                      Search Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <input
                        id="search"
                        type="text"
                        className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                        placeholder="Enter address or location"
                      />
                    </div>
                  </div>
                  
                  {/* Use current location */}
                  <div className="mb-6">
                    <Button 
                      variant="outline" 
                      fullWidth
                      icon={<Navigation className="h-5 w-5" />}
                    >
                      Use Current Location
                    </Button>
                  </div>
                  
                  {/* Filters */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-coffee-dark">Filters</h3>
                      <button className="text-sm text-coffee-medium hover:text-coffee-dark">
                        Reset
                      </button>
                    </div>
                    
                    {/* Distance filter */}
                    <div className="mb-4">
                      <label className="block text-sm text-muted-foreground mb-2">
                        Maximum Distance
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          defaultValue="5"
                          className="w-full h-2 bg-coffee-light/50 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="ml-2 text-sm text-muted-foreground">5 km</span>
                      </div>
                    </div>
                    
                    {/* Machine type filter */}
                    <div className="mb-4">
                      <label className="block text-sm text-muted-foreground mb-2">
                        Machine Type
                      </label>
                      <div className="relative">
                        <select className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors appearance-none">
                          <option value="">All Types</option>
                          <option value="jetinno">Jetinno</option>
                          <option value="nayax">Nayax</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Open now filter */}
                    <div className="mb-4">
                      <div className="flex items-center">
                        <input
                          id="open-now"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-coffee-medium focus:ring-coffee-medium"
                        />
                        <label htmlFor="open-now" className="ml-2 text-sm text-muted-foreground">
                          Open Now
                        </label>
                      </div>
                    </div>
                    
                    {/* Minimum rating filter */}
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Minimum Rating
                      </label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            className="flex-1 py-1 border border-coffee-light rounded hover:bg-coffee-light/30 transition-colors"
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Sort by */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-coffee-dark">Sort By</h3>
                    </div>
                    <div className="relative">
                      <select className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors appearance-none">
                        <option value="distance">Distance (Nearest)</option>
                        <option value="rating">Rating (Highest)</option>
                        <option value="name">Name (A-Z)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </div>
            
            {/* Main content - Map and list */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              {/* Map placeholder */}
              <div className="bg-coffee-light/30 rounded-xl h-[300px] lg:h-[400px] mb-8 relative animate-fade-up">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-10 w-10 text-coffee-medium" />
                </div>
                
                {/* Coffee point markers */}
                <div className="absolute top-1/4 left-1/4 w-10 h-10 flex items-center justify-center">
                  <div className="absolute w-3 h-3 bg-coffee-dark rounded-full"></div>
                  <div className="w-10 h-10 bg-coffee-dark/20 rounded-full animate-ping"></div>
                </div>
                <div className="absolute top-1/2 right-1/3 w-10 h-10 flex items-center justify-center">
                  <div className="absolute w-3 h-3 bg-coffee-dark rounded-full"></div>
                  <div className="w-10 h-10 bg-coffee-dark/20 rounded-full animate-ping"></div>
                </div>
                <div className="absolute bottom-1/3 left-1/2 w-10 h-10 flex items-center justify-center">
                  <div className="absolute w-3 h-3 bg-coffee-dark rounded-full"></div>
                  <div className="w-10 h-10 bg-coffee-dark/20 rounded-full animate-ping"></div>
                </div>
                <div className="absolute top-2/3 right-1/4 w-10 h-10 flex items-center justify-center">
                  <div className="absolute w-3 h-3 bg-coffee-dark rounded-full"></div>
                  <div className="w-10 h-10 bg-coffee-dark/20 rounded-full animate-ping"></div>
                </div>
              </div>
              
              {/* List of coffee points */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-coffee-dark">Coffee Points</h2>
                  <div className="text-sm text-muted-foreground">
                    {coffeePoints.length} locations found
                  </div>
                </div>
                
                {coffeePoints.map((point, index) => (
                  <Card 
                    key={point.id} 
                    variant="default" 
                    hoverable 
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card.Content className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-coffee-light/50 rounded-full p-3 text-coffee-dark">
                          <Coffee className="h-6 w-6" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-coffee-dark">{point.name}</h3>
                            <div className="flex items-center space-x-1 text-coffee-medium">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-sm font-medium">{point.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{point.address}</p>
                          <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{point.distance}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{point.hours}</span>
                            </div>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <div className="text-xs bg-coffee-light/50 px-2 py-1 rounded-full text-coffee-dark">
                              {point.machineType}
                            </div>
                            <div className="text-xs bg-coffee-light/50 px-2 py-1 rounded-full text-coffee-dark">
                              QR Enabled
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CoffeeMap;
