import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CustomCard from '../components/UI/CustomCard';
import CustomButton from '../components/UI/CustomButton';
import { 
  LayoutDashboard, 
  Users, 
  Coffee, 
  DollarSign, 
  LineChart, 
  AlertTriangle, 
  Settings, 
  Mail, 
  Bell, 
  Eye, 
  Download, 
  RefreshCw, 
  Filter, 
  ChevronRight, 
  ChevronLeft,
  Store,
  CreditCard,
  Tag,
  BarChart,
  ChevronDown,
  Search,
  ArrowUpDown
} from 'lucide-react';

const Admin = () => {
  // Active tab state
  const [activeTab, setActiveTab] = React.useState('dashboard');
  
  // Example dashboard stats
  const stats = [
    {
      title: "Total Coffee Points",
      value: "1,248",
      change: "+12%",
      positive: true,
      icon: <Coffee className="h-6 w-6" />
    },
    {
      title: "Active Users",
      value: "8,942",
      change: "+24%",
      positive: true,
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Monthly Revenue",
      value: "₪38,492",
      change: "+8%",
      positive: true,
      icon: <DollarSign className="h-6 w-6" />
    },
    {
      title: "Pending Alerts",
      value: "23",
      change: "-5%",
      positive: true,
      icon: <AlertTriangle className="h-6 w-6" />
    }
  ];
  
  // Example recent activities
  const activities = [
    {
      id: 1,
      type: "user_registration",
      user: "David Cohen",
      timestamp: "2 hours ago",
      details: "New user registered",
    },
    {
      id: 2,
      type: "coffee_point_added",
      user: "Tel Aviv Cafe",
      timestamp: "5 hours ago",
      details: "New coffee point registered",
    },
    {
      id: 3,
      type: "payment_received",
      user: "Subscription Payment",
      timestamp: "1 day ago",
      details: "₪199.00 received from Premium subscription",
    },
    {
      id: 4,
      type: "machine_alert",
      user: "Office Brews Co.",
      timestamp: "1 day ago",
      details: "Low beans alert",
    },
    {
      id: 5,
      type: "promotion_created",
      user: "Beach Coffee Shop",
      timestamp: "2 days ago",
      details: "New promotional campaign created",
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="inline-flex items-center bg-coffee-light/50 rounded-full px-4 py-1.5 text-coffee-dark font-medium mb-4">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Admin Dashboard
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
              System Overview
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage and monitor all aspects of your Coffee2Go Connect system.
            </p>
          </div>
          
          {/* Admin Tabs */}
          <div className="mb-8 border-b border-border">
            <div className="flex overflow-x-auto">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
                { id: 'users', label: 'Users', icon: <Users className="h-4 w-4" /> },
                { id: 'coffee-points', label: 'Coffee Points', icon: <Coffee className="h-4 w-4" /> },
                { id: 'analytics', label: 'Analytics', icon: <LineChart className="h-4 w-4" /> },
                { id: 'finances', label: 'Finances', icon: <DollarSign className="h-4 w-4" /> },
                { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-coffee-dark border-b-2 border-coffee-medium'
                      : 'text-muted-foreground hover:text-coffee-dark'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-up">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <CustomCard key={index} variant="default">
                    <CustomCard.Content className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                          <h4 className="text-2xl font-bold text-coffee-dark mb-1">{stat.value}</h4>
                          <p className={`text-xs flex items-center ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change} from last month
                          </p>
                        </div>
                        <div className="bg-coffee-light/40 p-3 rounded-full text-coffee-dark">
                          {stat.icon}
                        </div>
                      </div>
                    </CustomCard.Content>
                  </CustomCard>
                ))}
              </div>
              
              {/* System Status & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* System Status */}
                <CustomCard variant="default" className="lg:col-span-1">
                  <CustomCard.Header>
                    <CustomCard.Title>System Status</CustomCard.Title>
                    <CustomCard.Description>Current system performance</CustomCard.Description>
                  </CustomCard.Header>
                  <CustomCard.Content className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Server Uptime</span>
                          <span className="font-medium">99.9%</span>
                        </div>
                        <div className="w-full bg-coffee-light/30 rounded-full h-2">
                          <div className="bg-coffee-medium h-2 rounded-full" style={{ width: '99.9%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>API Response</span>
                          <span className="font-medium">132ms</span>
                        </div>
                        <div className="w-full bg-coffee-light/30 rounded-full h-2">
                          <div className="bg-coffee-medium h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Database</span>
                          <span className="font-medium">Good</span>
                        </div>
                        <div className="w-full bg-coffee-light/30 rounded-full h-2">
                          <div className="bg-coffee-medium h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Payment Processing</span>
                          <span className="font-medium">Operational</span>
                        </div>
                        <div className="w-full bg-coffee-light/30 rounded-full h-2">
                          <div className="bg-coffee-medium h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <CustomButton
                        variant="outline"
                        size="sm"
                        icon={<RefreshCw className="h-4 w-4" />}
                      >
                        Refresh Status
                      </CustomButton>
                    </div>
                  </CustomCard.Content>
                </CustomCard>
                
                {/* Recent Activity */}
                <CustomCard variant="default" className="lg:col-span-2">
                  <CustomCard.Header>
                    <div className="flex justify-between items-center">
                      <div>
                        <CustomCard.Title>Recent Activity</CustomCard.Title>
                        <CustomCard.Description>Latest system events</CustomCard.Description>
                      </div>
                      <CustomButton
                        variant="ghost"
                        size="sm"
                        icon={<Filter className="h-4 w-4" />}
                      >
                        Filter
                      </CustomButton>
                    </div>
                  </CustomCard.Header>
                  <CustomCard.Content className="p-0">
                    <div className="divide-y divide-border">
                      {activities.map((activity) => (
                        <div key={activity.id} className="p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium text-coffee-dark">{activity.user}</span>
                            <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.details}</p>
                        </div>
                      ))}
                    </div>
                  </CustomCard.Content>
                  <CustomCard.Footer className="flex justify-between px-6 py-4">
                    <CustomButton variant="ghost" size="sm" icon={<ChevronLeft className="h-4 w-4" />}>
                      Previous
                    </CustomButton>
                    <CustomButton variant="ghost" size="sm" icon={<ChevronRight className="h-4 w-4" />}>
                      Next
                    </CustomButton>
                  </CustomCard.Footer>
                </CustomCard>
              </div>
              
              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-medium text-coffee-dark mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[
                    { label: 'View Reports', icon: <Eye className="h-5 w-5" /> },
                    { label: 'Send Newsletter', icon: <Mail className="h-5 w-5" /> },
                    { label: 'System Alerts', icon: <Bell className="h-5 w-5" /> },
                    { label: 'Export Data', icon: <Download className="h-5 w-5" /> },
                  ].map((action, index) => (
                    <CustomCard key={index} variant="default" hoverable>
                      <CustomCard.Content className="p-4 text-center">
                        <div className="bg-coffee-light/40 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-coffee-dark">
                          {action.icon}
                        </div>
                        <h4 className="text-sm font-medium">{action.label}</h4>
                      </CustomCard.Content>
                    </CustomCard>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Placeholder for other tabs */}
          {activeTab !== 'dashboard' && (
            <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
              <div className="text-center">
                <h3 className="text-xl font-medium text-coffee-dark mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h3>
                <p className="text-muted-foreground">This section is under development.</p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
