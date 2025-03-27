import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CustomCard from '../components/UI/CustomCard';
import CustomButton from '../components/UI/CustomButton';
import { MapPin, Coffee, Star, ChevronDown, Search } from 'lucide-react';

const CoffeeMap = () => {
  const [coffeePoints, setCoffeePoints] = useState([
    {
      id: 1,
      name: "Bean There Coffee",
      address: "123 Main St",
      rating: 4.5,
      reviews: 120,
    },
    {
      id: 2,
      name: "Coffee Central",
      address: "456 Elm St",
      rating: 4.2,
      reviews: 95,
    },
    {
      id: 3,
      name: "The Coffee Bean",
      address: "789 Oak St",
      rating: 4.8,
      reviews: 150,
    },
    {
      id: 4,
      name: "Daily Grind",
      address: "101 Pine St",
      rating: 4.0,
      reviews: 80,
    },
  ]);
  
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
              <CustomButton
                variant="primary"
                icon={<Coffee className="h-5 w-5" />}
              >
                Find Coffee
              </CustomButton>
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
                  />
                </div>
                
                {/* Rating filter */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Star className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <select className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors appearance-none">
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
                  <select className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors appearance-none">
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
          
          {/* Coffee Points List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coffeePoints.map((point, index) => (
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
