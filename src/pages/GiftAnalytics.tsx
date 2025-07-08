import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CustomCard from '../components/UI/CustomCard';
import AISuggestions from '../components/AI/AISuggestions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Gift, BarChart as BarChartIcon, Lightbulb } from 'lucide-react';

const monthlyUsage = [
  { month: 'Jan', sent: 20, redeemed: 12 },
  { month: 'Feb', sent: 25, redeemed: 17 },
  { month: 'Mar', sent: 18, redeemed: 15 },
  { month: 'Apr', sent: 30, redeemed: 22 },
  { month: 'May', sent: 28, redeemed: 20 },
  { month: 'Jun', sent: 32, redeemed: 24 },
];

const giftStats = {
  totalSent: 153,
  redeemed: 110,
  expired: 15,
  avgTime: '3 days'
};

const GiftAnalytics = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 space-y-10">
          <div className="mb-6">
            <div className="inline-flex items-center bg-coffee-light/50 rounded-full px-4 py-1.5 text-coffee-dark font-medium mb-4">
              <Gift className="h-4 w-4 mr-2" />
              Gift Analytics
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-2">Usage Insights</h1>
            <p className="text-xl text-muted-foreground">Track how your coffee gifts are used over time.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <CustomCard variant="default">
              <CustomCard.Content className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Total Gifts Sent</p>
                <h3 className="text-2xl font-bold text-coffee-dark">{giftStats.totalSent}</h3>
              </CustomCard.Content>
            </CustomCard>
            <CustomCard variant="default">
              <CustomCard.Content className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Redeemed</p>
                <h3 className="text-2xl font-bold text-coffee-dark">{giftStats.redeemed}</h3>
              </CustomCard.Content>
            </CustomCard>
            <CustomCard variant="default">
              <CustomCard.Content className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Expired</p>
                <h3 className="text-2xl font-bold text-coffee-dark">{giftStats.expired}</h3>
              </CustomCard.Content>
            </CustomCard>
            <CustomCard variant="default">
              <CustomCard.Content className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Avg. Redemption Time</p>
                <h3 className="text-2xl font-bold text-coffee-dark">{giftStats.avgTime}</h3>
              </CustomCard.Content>
            </CustomCard>
          </div>
          <CustomCard variant="default">
            <CustomCard.Header>
              <CustomCard.Title className="flex items-center"><BarChartIcon className="h-4 w-4 mr-2" />Monthly Redemption</CustomCard.Title>
              <CustomCard.Description>How many gifts were redeemed each month</CustomCard.Description>
            </CustomCard.Header>
            <CustomCard.Content className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyUsage} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="redeemed" fill="#8B5CF6" name="Redeemed" />
                  <Bar dataKey="sent" fill="#22C55E" name="Sent" />
                </BarChart>
              </ResponsiveContainer>
            </CustomCard.Content>
          </CustomCard>
          <CustomCard variant="default">
            <CustomCard.Header>
              <CustomCard.Title className="flex items-center"><Lightbulb className="h-4 w-4 mr-2" />Analytics Agent</CustomCard.Title>
              <CustomCard.Description>AI-powered tips to boost engagement</CustomCard.Description>
            </CustomCard.Header>
            <CustomCard.Content>
              <AISuggestions />
            </CustomCard.Content>
          </CustomCard>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GiftAnalytics;

