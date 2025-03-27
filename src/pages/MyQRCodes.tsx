
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { 
  QrCode, 
  Filter, 
  ArrowUpDown, 
  Eye, 
  Copy, 
  Share2, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Plus,
  ChevronDown,
  Search
} from 'lucide-react';

const MyQRCodes = () => {
  // Example QR code data
  const qrCodes = [
    {
      id: 1,
      recipient: "David Cohen",
      amount: 25,
      status: "active",
      created: "Jan 15, 2024",
      expires: "Apr 15, 2024",
      message: "Happy birthday!",
    },
    {
      id: 2,
      recipient: "Sarah Levy",
      amount: 50,
      status: "redeemed",
      created: "Dec 10, 2023",
      redeemed: "Dec 12, 2023",
      redeemedAt: "Bean There Coffee",
      message: "Thanks for your help!",
    },
    {
      id: 3,
      recipient: "Michael Ben-David",
      amount: 15,
      status: "expired",
      created: "Nov 5, 2023",
      expires: "Jan 5, 2024",
      message: "Enjoy your coffee!",
    },
    {
      id: 4,
      recipient: "Rachel Goldman",
      amount: 30,
      status: "active",
      created: "Jan 20, 2024",
      expires: "Apr 20, 2024",
      message: "For being an awesome team member!",
    },
  ];
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      active: "bg-green-100 text-green-700",
      redeemed: "bg-blue-100 text-blue-700",
      expired: "bg-gray-100 text-gray-700",
    };
    
    const icons = {
      active: <CheckCircle2 className="h-3 w-3 mr-1" />,
      redeemed: <CheckCircle2 className="h-3 w-3 mr-1" />,
      expired: <AlertTriangle className="h-3 w-3 mr-1" />,
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {icons[status]}
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
              <QrCode className="h-4 w-4 mr-2" />
              My QR Codes
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-2">
                  Your Coffee Gifts
                </h1>
                <p className="text-xl text-muted-foreground">
                  Manage all your coffee gifts and QR codes in one place.
                </p>
              </div>
              <Button
                variant="primary"
                icon={<Plus className="h-5 w-5" />}
              >
                Create New Gift
              </Button>
            </div>
          </div>
          
          {/* Filters and search */}
          <Card variant="default" className="mb-8 animate-fade-up">
            <Card.Content className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by recipient..."
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
                    <option value="redeemed">Redeemed</option>
                    <option value="expired">Expired</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                {/* Sort by */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <select className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors appearance-none">
                    <option value="created">Date Created (Newest)</option>
                    <option value="expires">Expiry Date (Soonest)</option>
                    <option value="amount">Amount (Highest)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
          
          {/* QR Codes List */}
          <div className="space-y-6">
            {qrCodes.map((qrCode, index) => (
              <Card 
                key={qrCode.id} 
                variant="default" 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card.Content className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* QR Code */}
                    <div className="w-full md:w-40 flex-shrink-0">
                      <div className="bg-white border-2 border-coffee-light rounded-lg p-2 flex items-center justify-center h-40">
                        <QrCode className="h-28 w-28 text-coffee-dark" />
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-coffee-dark mb-1">
                            ₪{qrCode.amount} Coffee Gift
                          </h3>
                          <p className="text-muted-foreground">
                            To: {qrCode.recipient}
                          </p>
                        </div>
                        <StatusBadge status={qrCode.status} />
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm italic text-muted-foreground">
                          "{qrCode.message}"
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-sm mb-6">
                        <div>
                          <p className="text-muted-foreground">Created:</p>
                          <p className="font-medium">{qrCode.created}</p>
                        </div>
                        
                        {qrCode.status === 'active' && (
                          <div>
                            <p className="text-muted-foreground">Expires:</p>
                            <p className="font-medium">{qrCode.expires}</p>
                          </div>
                        )}
                        
                        {qrCode.status === 'redeemed' && (
                          <>
                            <div>
                              <p className="text-muted-foreground">Redeemed:</p>
                              <p className="font-medium">{qrCode.redeemed}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Location:</p>
                              <p className="font-medium">{qrCode.redeemedAt}</p>
                            </div>
                          </>
                        )}
                        
                        {qrCode.status === 'expired' && (
                          <div>
                            <p className="text-muted-foreground">Expired on:</p>
                            <p className="font-medium">{qrCode.expires}</p>
                          </div>
                        )}
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
                        
                        {qrCode.status === 'active' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={<Copy className="h-4 w-4" />}
                            >
                              Copy Link
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={<Share2 className="h-4 w-4" />}
                            >
                              Share
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={<Clock className="h-4 w-4" />}
                            >
                              Extend
                            </Button>
                          </>
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
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-1">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-coffee-light/50">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyQRCodes;
