import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CustomCard from '../components/UI/CustomCard';
import CustomButton from '../components/UI/CustomButton';
import { Tag, Calendar, ChevronDown, Filter, Search } from 'lucide-react';

const Promotions = () => {
  // Example promotion data
  const promotions = [
    {
      id: 1,
      title: "Summer Coffee Discount",
      description: "Enjoy 20% off on all iced coffees this summer!",
      code: "SUMMER20",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      status: "active",
    },
    {
      id: 2,
      title: "New Customer Offer",
      description: "First-time customers get a free pastry with their coffee.",
      code: "WELCOME",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
    },
    {
      id: 3,
      title: "Loyalty Program Bonus",
      description: "Earn double points on all purchases for loyalty members.",
      code: "LOYALTY",
      startDate: "2024-05-01",
      endDate: "2024-05-31",
      status: "expired",
    },
    {
      id: 4,
      title: "Weekend Coffee Special",
      description: "Buy one coffee, get the second 50% off on weekends.",
      code: "WEEKEND50",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
    },
  ];
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      active: "bg-green-100 text-green-700",
      expired: "bg-gray-100 text-gray-700",
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
              <Tag className="h-4 w-4 mr-2" />
              Promotions
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-2">
                  Current Promotions
                </h1>
                <p className="text-xl text-muted-foreground">
                  Explore our latest promotions and special offers.
                </p>
              </div>
              <CustomButton
                variant="primary"
              >
                Add New Promotion
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
                    placeholder="Search by title or code..."
                    className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                  />
                </div>
                
                {/* Status filter */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <select className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors appearance-none">
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                {/* Sort by */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <select className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors appearance-none">
                    <option value="created">Start Date (Soonest)</option>
                    <option value="expires">Expiry Date (Soonest)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </CustomCard.Content>
          </CustomCard>
          
          {/* Promotions List */}
          <div className="space-y-6">
            {promotions.map((promotion, index) => (
              <CustomCard 
                key={promotion.id} 
                variant="default" 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CustomCard.Content className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Details */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-coffee-dark mb-1">
                            {promotion.title}
                          </h3>
                          <p className="text-muted-foreground">
                            Code: {promotion.code}
                          </p>
                        </div>
                        <StatusBadge status={promotion.status} />
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm italic text-muted-foreground">
                          {promotion.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm mb-6">
                        <div>
                          <p className="text-muted-foreground">Start Date:</p>
                          <p className="font-medium">{promotion.startDate}</p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground">End Date:</p>
                          <p className="font-medium">{promotion.endDate}</p>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <CustomButton
                          variant="outline"
                          size="sm"
                        >
                          Edit
                        </CustomButton>
                        
                        <CustomButton
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                        >
                          Delete
                        </CustomButton>
                      </div>
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

export default Promotions;
