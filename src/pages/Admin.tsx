
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CustomCard from '../components/UI/CustomCard';
import CustomButton from '../components/UI/CustomButton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
  ArrowUpDown,
  Wrench,
  UserPlus,
  Power,
  MapPin,
  Upload,
  FileText,
  Send,
  Lock,
  Unlock
} from 'lucide-react';

const Admin = () => {
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

  // Example staff members
  const staffMembers = [
    { id: 1, name: "Sarah Johnson", role: "Maintenance", region: "North", status: "Available" },
    { id: 2, name: "Michael Chen", role: "Repair", region: "Central", status: "On Call" },
    { id: 3, name: "Amir Hassan", role: "Maintenance", region: "South", status: "On Task" },
    { id: 4, name: "Liat Cohen", role: "Repair", region: "North", status: "Available" },
  ];

  // Example franchise accounts
  const franchiseAccounts = [
    { id: 1, name: "City Coffee Group", locations: 12, status: "Active", plan: "Premium" },
    { id: 2, name: "University Brews", locations: 5, status: "Active", plan: "Standard" },
    { id: 3, name: "Office Perks Ltd", locations: 8, status: "Pending", plan: "Premium" },
    { id: 4, name: "Hospital Caffeine", locations: 3, status: "Active", plan: "Basic" },
  ];

  // Example coffee locations
  const coffeeLocations = [
    { id: 1, name: "Central Station Kiosk", address: "Tel Aviv Central, Platform 3", status: "Active" },
    { id: 2, name: "Beach Promenade", address: "15 Herbert Samuel, Tel Aviv", status: "Active" },
    { id: 3, name: "Business District Plaza", address: "121 Begin Road, Tel Aviv", status: "Maintenance" },
    { id: 4, name: "University Library", address: "Tel Aviv University, Ramat Aviv", status: "Active" },
  ];

  // Example users
  const userAccounts = [
    { id: 1, name: "Ron Levi", email: "ron@example.com", status: "Active", lastLogin: "2 hours ago" },
    { id: 2, name: "Noa Shapira", email: "noa@example.com", status: "Active", lastLogin: "1 day ago" },
    { id: 3, name: "Yael Dagan", email: "yael@example.com", status: "Inactive", lastLogin: "2 weeks ago" },
    { id: 4, name: "Dan Mizrahi", email: "dan@example.com", status: "Locked", lastLogin: "5 days ago" },
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
              System Control Panel
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage coffee locations, staff, users, and monitor system performance.
            </p>
          </div>
          
          {/* Admin Tabs */}
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="mb-8 border-b border-border w-full justify-start rounded-none bg-transparent p-0 h-auto">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
                { id: 'staff', label: 'Staff Management', icon: <Wrench className="h-4 w-4 mr-2" /> },
                { id: 'franchises', label: 'Franchises', icon: <Store className="h-4 w-4 mr-2" /> },
                { id: 'locations', label: 'Coffee Points', icon: <Coffee className="h-4 w-4 mr-2" /> },
                { id: 'cms', label: 'CMS Content', icon: <FileText className="h-4 w-4 mr-2" /> },
                { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4 mr-2" /> },
                { id: 'analytics', label: 'Analytics', icon: <LineChart className="h-4 w-4 mr-2" /> },
                { id: 'user-access', label: 'User Access', icon: <Lock className="h-4 w-4 mr-2" /> },
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap data-[state=active]:text-coffee-dark data-[state=active]:border-b-2 data-[state=active]:border-coffee-medium data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent"
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {/* Dashboard Content */}
            <TabsContent value="dashboard" className="animate-fade-up space-y-8">
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
            </TabsContent>
            
            {/* Staff Management */}
            <TabsContent value="staff" className="animate-fade-up">
              <CustomCard>
                <CustomCard.Header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <CustomCard.Title>Staff Management</CustomCard.Title>
                    <CustomCard.Description>Assign and manage maintenance and repair staff</CustomCard.Description>
                  </div>
                  <CustomButton variant="primary" size="sm" icon={<UserPlus className="h-4 w-4" />}>
                    Add New Staff
                  </CustomButton>
                </CustomCard.Header>
                <CustomCard.Content>
                  <div className="relative overflow-x-auto shadow-sm rounded-lg">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted text-muted-foreground">
                        <tr>
                          <th scope="col" className="px-6 py-3">Name</th>
                          <th scope="col" className="px-6 py-3">Role</th>
                          <th scope="col" className="px-6 py-3">Region</th>
                          <th scope="col" className="px-6 py-3">Status</th>
                          <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {staffMembers.map((staff) => (
                          <tr key={staff.id} className="bg-white border-b hover:bg-muted/50">
                            <td className="px-6 py-4 font-medium">{staff.name}</td>
                            <td className="px-6 py-4">{staff.role}</td>
                            <td className="px-6 py-4">{staff.region}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                staff.status === 'Available' ? 'bg-green-100 text-green-800' :
                                staff.status === 'On Call' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {staff.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 space-x-2">
                              <CustomButton variant="ghost" size="sm">
                                Edit
                              </CustomButton>
                              <CustomButton variant="ghost" size="sm">
                                Assign
                              </CustomButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CustomCard.Content>
              </CustomCard>
            </TabsContent>
            
            {/* Franchise Management */}
            <TabsContent value="franchises" className="animate-fade-up">
              <CustomCard>
                <CustomCard.Header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <CustomCard.Title>Franchise Management</CustomCard.Title>
                    <CustomCard.Description>Manage franchise accounts and permissions</CustomCard.Description>
                  </div>
                  <CustomButton variant="primary" size="sm" icon={<Store className="h-4 w-4" />}>
                    Add Franchise
                  </CustomButton>
                </CustomCard.Header>
                <CustomCard.Content>
                  <div className="relative overflow-x-auto shadow-sm rounded-lg">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted text-muted-foreground">
                        <tr>
                          <th scope="col" className="px-6 py-3">Franchise Name</th>
                          <th scope="col" className="px-6 py-3">Locations</th>
                          <th scope="col" className="px-6 py-3">Status</th>
                          <th scope="col" className="px-6 py-3">Plan</th>
                          <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {franchiseAccounts.map((franchise) => (
                          <tr key={franchise.id} className="bg-white border-b hover:bg-muted/50">
                            <td className="px-6 py-4 font-medium">{franchise.name}</td>
                            <td className="px-6 py-4">{franchise.locations}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs ${
                                franchise.status === 'Active' ? 'bg-green-100 text-green-800' :
                                franchise.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {franchise.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs ${
                                franchise.plan === 'Premium' ? 'bg-purple-100 text-purple-800' :
                                franchise.plan === 'Standard' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {franchise.plan}
                              </span>
                            </td>
                            <td className="px-6 py-4 space-x-2">
                              <CustomButton variant="ghost" size="sm">
                                Edit
                              </CustomButton>
                              <CustomButton variant="ghost" size="sm">
                                View
                              </CustomButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CustomCard.Content>
              </CustomCard>
            </TabsContent>

            {/* Coffee Locations */}
            <TabsContent value="locations" className="animate-fade-up">
              <CustomCard>
                <CustomCard.Header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <CustomCard.Title>Coffee Locations</CustomCard.Title>
                    <CustomCard.Description>Add, edit or remove coffee points</CustomCard.Description>
                  </div>
                  <CustomButton variant="primary" size="sm" icon={<MapPin className="h-4 w-4" />}>
                    Add New Location
                  </CustomButton>
                </CustomCard.Header>
                <CustomCard.Content>
                  <div className="relative overflow-x-auto shadow-sm rounded-lg">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted text-muted-foreground">
                        <tr>
                          <th scope="col" className="px-6 py-3">Location Name</th>
                          <th scope="col" className="px-6 py-3">Address</th>
                          <th scope="col" className="px-6 py-3">Status</th>
                          <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coffeeLocations.map((location) => (
                          <tr key={location.id} className="bg-white border-b hover:bg-muted/50">
                            <td className="px-6 py-4 font-medium">{location.name}</td>
                            <td className="px-6 py-4">{location.address}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs ${
                                location.status === 'Active' ? 'bg-green-100 text-green-800' :
                                location.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {location.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 space-x-2">
                              <CustomButton variant="ghost" size="sm">
                                Edit
                              </CustomButton>
                              <CustomButton variant="ghost" size="sm">
                                Delete
                              </CustomButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CustomCard.Content>
              </CustomCard>
            </TabsContent>

            {/* CMS Content */}
            <TabsContent value="cms" className="animate-fade-up">
              <CustomCard>
                <CustomCard.Header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <CustomCard.Title>CMS Content Management</CustomCard.Title>
                    <CustomCard.Description>Upload and manage website content and banners</CustomCard.Description>
                  </div>
                  <CustomButton variant="primary" size="sm" icon={<Upload className="h-4 w-4" />}>
                    Upload Content
                  </CustomButton>
                </CustomCard.Header>
                <CustomCard.Content>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-sm font-medium">Upload Banner Images</h3>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Drag and drop image files or click to browse
                      </p>
                      <CustomButton variant="outline" size="sm" className="mt-4">
                        Choose Files
                      </CustomButton>
                    </div>
                    <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-sm font-medium">Page Content</h3>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Edit website pages and content
                      </p>
                      <CustomButton variant="outline" size="sm" className="mt-4">
                        Edit Pages
                      </CustomButton>
                    </div>
                  </div>
                </CustomCard.Content>
              </CustomCard>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="animate-fade-up">
              <CustomCard>
                <CustomCard.Header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <CustomCard.Title>Push Notifications</CustomCard.Title>
                    <CustomCard.Description>Send announcements and promotions to users</CustomCard.Description>
                  </div>
                  <CustomButton variant="primary" size="sm" icon={<Send className="h-4 w-4" />}>
                    Create Notification
                  </CustomButton>
                </CustomCard.Header>
                <CustomCard.Content>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Notification Title</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Enter notification title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Target Audience</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option>All Users</option>
                          <option>Active Users</option>
                          <option>Premium Users</option>
                          <option>New Users</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Notification Message</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
                        placeholder="Enter your message here..."
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <CustomButton variant="outline" size="sm" className="mr-2">
                        Preview
                      </CustomButton>
                      <CustomButton variant="primary" size="sm" icon={<Send className="h-4 w-4" />}>
                        Send Notification
                      </CustomButton>
                    </div>
                  </div>
                </CustomCard.Content>
              </CustomCard>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics" className="animate-fade-up">
              <CustomCard>
                <CustomCard.Header>
                  <CustomCard.Title>System Analytics</CustomCard.Title>
                  <CustomCard.Description>Performance metrics and machine logs</CustomCard.Description>
                </CustomCard.Header>
                <CustomCard.Content>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Usage Metrics</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Daily Active Users</span>
                            <span className="font-medium">1,248</span>
                          </div>
                          <div className="w-full bg-coffee-light/30 rounded-full h-2">
                            <div className="bg-coffee-medium h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Coffee Points Activity</span>
                            <span className="font-medium">89%</span>
                          </div>
                          <div className="w-full bg-coffee-light/30 rounded-full h-2">
                            <div className="bg-coffee-medium h-2 rounded-full" style={{ width: '89%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Gift Redemption Rate</span>
                            <span className="font-medium">64%</span>
                          </div>
                          <div className="w-full bg-coffee-light/30 rounded-full h-2">
                            <div className="bg-coffee-medium h-2 rounded-full" style={{ width: '64%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Promotion CTR</span>
                            <span className="font-medium">12.3%</span>
                          </div>
                          <div className="w-full bg-coffee-light/30 rounded-full h-2">
                            <div className="bg-coffee-medium h-2 rounded-full" style={{ width: '12.3%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Machine Logs</h3>
                      <div className="border rounded-md h-64 overflow-y-auto p-4 bg-black/5 font-mono text-xs">
                        <div className="space-y-2">
                          <p><span className="text-green-600">INFO</span> [10:15:22] Machine #1242 - Normal operation</p>
                          <p><span className="text-yellow-600">WARN</span> [10:12:05] Machine #0876 - Low beans detected</p>
                          <p><span className="text-green-600">INFO</span> [10:08:30] Machine #0348 - Maintenance completed</p>
                          <p><span className="text-red-600">ERROR</span> [09:52:11] Machine #1054 - Water supply issue</p>
                          <p><span className="text-green-600">INFO</span> [09:45:00] Machine #0229 - System update completed</p>
                          <p><span className="text-green-600">INFO</span> [09:32:18] Machine #0967 - Payment processed</p>
                          <p><span className="text-yellow-600">WARN</span> [09:24:55] Machine #1128 - Temperature fluctuation</p>
                          <p><span className="text-green-600">INFO</span> [09:15:02] Machine #0592 - Daily report generated</p>
                          <p><span className="text-green-600">INFO</span> [09:01:30] Machine #0778 - System startup</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <CustomButton variant="outline" size="sm" icon={<Download className="h-4 w-4 mr-2" />}>
                          Export Logs
                        </CustomButton>
                      </div>
                    </div>
                  </div>
                </CustomCard.Content>
              </CustomCard>
            </TabsContent>

            {/* User Access */}
            <TabsContent value="user-access" className="animate-fade-up">
              <CustomCard>
                <CustomCard.Header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <CustomCard.Title>User Access Control</CustomCard.Title>
                    <CustomCard.Description>Manage user permissions and access</CustomCard.Description>
                  </div>
                  <CustomButton variant="primary" size="sm" icon={<UserPlus className="h-4 w-4" />}>
                    Add New User
                  </CustomButton>
                </CustomCard.Header>
                <CustomCard.Content>
                  <div className="relative overflow-x-auto shadow-sm rounded-lg">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted text-muted-foreground">
                        <tr>
                          <th scope="col" className="px-6 py-3">User Name</th>
                          <th scope="col" className="px-6 py-3">Email</th>
                          <th scope="col" className="px-6 py-3">Status</th>
                          <th scope="col" className="px-6 py-3">Last Login</th>
                          <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userAccounts.map((user) => (
                          <tr key={user.id} className="bg-white border-b hover:bg-muted/50">
                            <td className="px-6 py-4 font-medium">{user.name}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs ${
                                user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                user.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">{user.lastLogin}</td>
                            <td className="px-6 py-4 space-x-2">
                              <CustomButton 
                                variant="ghost" 
                                size="sm" 
                                icon={user.status === 'Locked' ? <Unlock className="h-4 w-4 mr-1" /> : <Lock className="h-4 w-4 mr-1" />}
                              >
                                {user.status === 'Locked' ? 'Unlock' : 'Lock'}
                              </CustomButton>
                              <CustomButton variant="ghost" size="sm">
                                Edit
                              </CustomButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CustomCard.Content>
              </CustomCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
