
import React, { useState, useEffect } from 'react';
import { 
  Activity, AlertTriangle, CheckCircle, Coffee, 
  DollarSign, HeartPulse, TrendingDown, TrendingUp 
} from 'lucide-react';
import CustomCard from '../UI/CustomCard';
import CustomButton from '../UI/CustomButton';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from "@/hooks/use-toast";

// Sample data for demonstration
const generateMachineData = () => {
  const machines = [];
  for (let i = 1; i <= 24; i++) {
    const status = Math.random() > 0.85 ? 
      (Math.random() > 0.5 ? 'warning' : 'error') : 'operational';
    
    machines.push({
      id: `MACHINE-${i.toString().padStart(3, '0')}`,
      location: `Coffee Point ${i}`,
      status,
      lastPing: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60)).toISOString(),
      sales: Math.floor(Math.random() * 50),
      inventory: Math.floor(Math.random() * 100),
    });
  }
  return machines;
};

const sampleActivityData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  sales: Math.floor(Math.random() * 30) + 5,
  errors: Math.floor(Math.random() * 3),
  promotions: Math.floor(Math.random() * 10),
}));

const AIMonitoringDashboard = () => {
  const { toast } = useToast();
  const [machines, setMachines] = useState([]);
  const [stats, setStats] = useState({
    totalMachines: 0,
    operational: 0,
    warnings: 0,
    errors: 0,
    totalSales: 0
  });
  
  // Simulate loading data
  useEffect(() => {
    const machineData = generateMachineData();
    setMachines(machineData);
    
    // Calculate stats
    const operational = machineData.filter(m => m.status === 'operational').length;
    const warnings = machineData.filter(m => m.status === 'warning').length;
    const errors = machineData.filter(m => m.status === 'error').length;
    const totalSales = machineData.reduce((sum, m) => sum + m.sales, 0);
    
    setStats({
      totalMachines: machineData.length,
      operational,
      warnings,
      errors,
      totalSales
    });
    
    // Simulate getting an alert after a delay
    const timer = setTimeout(() => {
      toast({
        title: "Maintenance Alert",
        description: "Machine MACHINE-005 requires maintenance: Low coffee beans",
        variant: "destructive",
      });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CustomCard variant="default" className="bg-green-50 border-green-200">
          <CustomCard.Content className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-green-800">Operational Machines</p>
                <h3 className="text-2xl font-bold text-green-700">{stats.operational}/{stats.totalMachines}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CustomCard.Content>
        </CustomCard>
        
        <CustomCard variant="default" className="bg-amber-50 border-amber-200">
          <CustomCard.Content className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-amber-800">Machines with Warnings</p>
                <h3 className="text-2xl font-bold text-amber-700">{stats.warnings}</h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CustomCard.Content>
        </CustomCard>
        
        <CustomCard variant="default" className="bg-red-50 border-red-200">
          <CustomCard.Content className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-red-800">Machines with Errors</p>
                <h3 className="text-2xl font-bold text-red-700">{stats.errors}</h3>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <HeartPulse className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CustomCard.Content>
        </CustomCard>
        
        <CustomCard variant="default" className="bg-blue-50 border-blue-200">
          <CustomCard.Content className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-blue-800">Today's Sales</p>
                <h3 className="text-2xl font-bold text-blue-700">₪{stats.totalSales}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CustomCard.Content>
        </CustomCard>
      </div>
      
      {/* Activity Graph */}
      <CustomCard variant="default">
        <CustomCard.Header>
          <CustomCard.Title>24-Hour Activity</CustomCard.Title>
          <CustomCard.Description>
            Real-time monitoring of sales and system events
          </CustomCard.Description>
        </CustomCard.Header>
        <CustomCard.Content className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sampleActivityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="promotions" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              <Area type="monotone" dataKey="errors" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
          </ResponsiveContainer>
        </CustomCard.Content>
      </CustomCard>
      
      {/* Machines Status */}
      <CustomCard variant="default">
        <CustomCard.Header>
          <CustomCard.Title>Coffee Machine Status</CustomCard.Title>
          <CustomCard.Description>
            Real-time status of all connected machines
          </CustomCard.Description>
        </CustomCard.Header>
        <CustomCard.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {machines.map((machine) => (
              <div 
                key={machine.id} 
                className={`p-4 rounded-lg border ${
                  machine.status === 'operational' ? 'border-green-200 bg-green-50' : 
                  machine.status === 'warning' ? 'border-amber-200 bg-amber-50' : 
                  'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{machine.id}</h4>
                    <p className="text-sm text-muted-foreground">{machine.location}</p>
                  </div>
                  <div>
                    {machine.status === 'operational' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : machine.status === 'warning' ? (
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    ) : (
                      <Activity className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Inventory:</span>
                    <span className="font-medium">{machine.inventory}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Today's Sales:</span>
                    <span className="font-medium">₪{machine.sales}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Ping:</span>
                    <span className="font-medium">
                      {new Date(machine.lastPing).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <CustomButton 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Connecting to Device",
                        description: `Establishing remote connection to ${machine.id}...`,
                      });
                    }}
                  >
                    Manage Device
                  </CustomButton>
                </div>
              </div>
            ))}
          </div>
        </CustomCard.Content>
      </CustomCard>
    </div>
  );
};

export default AIMonitoringDashboard;
