
import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CustomCard from '../components/UI/CustomCard';
import CustomButton from '../components/UI/CustomButton';
import { MapPin, Coffee, Star, ChevronDown, Search, MapIcon, ListFilter } from 'lucide-react';

const CoffeeMap = () => {
  const [coffeePoints, setCoffeePoints] = useState([
    {
      id: 1,
      name: "Bean There Coffee",
      address: "123 Main St",
      rating: 4.5,
      reviews: 120,
      location: { lat: 32.0853, lng: 34.7818 }, // Tel Aviv coordinates
    },
    {
      id: 2,
      name: "Coffee Central",
      address: "456 Elm St",
      rating: 4.2,
      reviews: 95,
      location: { lat: 32.0884, lng: 34.7798 },
    },
    {
      id: 3,
      name: "The Coffee Bean",
      address: "789 Oak St",
      rating: 4.8,
      reviews: 150,
      location: { lat: 32.0823, lng: 34.7738 },
    },
    {
      id: 4,
      name: "Daily Grind",
      address: "101 Pine St",
      rating: 4.0,
      reviews: 80,
      location: { lat: 32.0903, lng: 34.7868 },
    },
  ]);
  
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [sortBy, setSortBy] = useState('distance');

  // Filter coffee points based on search term and rating
  const filteredCoffeePoints = coffeePoints.filter(point => {
    const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         point.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter ? point.rating >= parseFloat(ratingFilter) : true;
    return matchesSearch && matchesRating;
  });

  // Sort filtered coffee points
  const sortedCoffeePoints = [...filteredCoffeePoints].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'reviews') {
      return b.reviews - a.reviews;
    }
    // Default: sort by distance (in a real app, this would use the user's location)
    return 0; // Placeholder for distance calculation
  });

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-2">
                  Explore Coffee Points
                </h1>
                <p className="text-xl text-muted-foreground">
                  Discover the best coffee shops near you.
                </p>
              </div>
              <div className="flex gap-2">
                <CustomButton
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  icon={<ListFilter className="h-5 w-5" />}
                  onClick={() => setViewMode('list')}
                >
                  List View
                </CustomButton>
                <CustomButton
                  variant={viewMode === 'map' ? 'primary' : 'outline'}
                  icon={<MapIcon className="h-5 w-5" />}
                  onClick={() => setViewMode('map')}
                >
                  Map View
                </CustomButton>
              </div>
            </div>
          </div>
          
          {/* Filters and search */}
          <CustomCard variant="default" className="mb-8 animate-fade-up">
            <CustomCard.Content className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or address..."
                    className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Rating filter */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Star className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <select 
                    className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors appearance-none"
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                  >
                    <option value="">All Ratings</option>
                    <option value="4.5">4.5 Stars & Up</option>
                    <option value="4.0">4.0 Stars & Up</option>
                    <option value="3.5">3.5 Stars & Up</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                {/* Sort by */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <select 
                    className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors appearance-none"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="distance">Distance (Nearest)</option>
                    <option value="rating">Rating (Highest)</option>
                    <option value="reviews">Reviews (Most)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </CustomCard.Content>
          </CustomCard>
          
          {/* Toggle between Map and List view */}
          {viewMode === 'map' ? (
            <CustomCard variant="default" className="mb-8 animate-fade-up">
              <CustomCard.Content className="p-0 overflow-hidden rounded-lg">
                {/* Simple map representation */}
                <div className="bg-coffee-light/20 h-[450px] relative">
                  {/* Map visualization placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 backdrop-blur-sm"></div>
                  
                  {/* Coordinate lines */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 pointer-events-none">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="border-r border-coffee-medium/10 h-full"></div>
                    ))}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="border-b border-coffee-medium/10 w-full"></div>
                    ))}
                  </div>
                  
                  {/* Map pins */}
                  {sortedCoffeePoints.map((point) => {
                    // Calculate relative position (this is just for visualization)
                    const top = `${40 + Math.random() * 50}%`;
                    const left = `${30 + Math.random() * 40}%`;
                    
                    return (
                      <div 
                        key={point.id}
                        className="absolute p-1 cursor-pointer transition-all hover:z-10"
                        style={{ top, left }}
                      >
                        <div className="flex flex-col items-center group">
                          <div className="bg-coffee-medium text-white p-2.5 rounded-full shadow-md transition-transform group-hover:scale-110 mb-1">
                            <Coffee className="h-5 w-5" />
                          </div>
                          <div className="scale-0 group-hover:scale-100 transition-all duration-200 bg-white shadow-lg rounded-md p-2 whitespace-nowrap">
                            <p className="font-medium text-coffee-dark text-sm">{point.name}</p>
                            <div className="flex items-center gap-1 text-xs">
                              <Star className="h-3 w-3 text-coffee-medium" />
                              <span>{point.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Center marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-coffee-dark rounded-full"></div>
                    <div className="absolute top-0 left-0 w-4 h-4 bg-coffee-dark rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
              </CustomCard.Content>
            </CustomCard>
          ) : (
            /* Coffee Points List (keep existing list view) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCoffeePoints.map((point, index) => (
                <CustomCard 
                  key={point.id} 
                  variant="default" 
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CustomCard.Content className="p-6">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-coffee-dark">
                          {point.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 text-coffee-medium" />
                          {point.rating}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {point.address}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Coffee className="h-4 w-4 text-coffee-medium" />
                        {point.reviews} reviews
                      </div>
                    </div>
                  </CustomCard.Content>
                </CustomCard>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-1">
              <CustomButton variant="outline" size="sm">
                Previous
              </CustomButton>
              <CustomButton variant="outline" size="sm" className="bg-coffee-light/50">
                1
              </CustomButton>
              <CustomButton variant="outline" size="sm">
                2
              </CustomButton>
              <CustomButton variant="outline" size="sm">
                3
              </CustomButton>
              <CustomButton variant="outline" size="sm">
                Next
              </CustomButton>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CoffeeMap;
