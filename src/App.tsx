
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import GiftCreator from "./pages/GiftCreator";
import CoffeeMap from "./pages/CoffeeMap";
import MyQRCodes from "./pages/MyQRCodes";
import AddCoffeePoint from "./pages/AddCoffeePoint";
import Promotions from "./pages/Promotions";
import BusinessPromotion from "./pages/BusinessPromotion";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import RedeemGift from "./pages/RedeemGift";
import ScanQR from "./pages/ScanQR";
import AIAgent from "./pages/AIAgent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gift-creator" element={<GiftCreator />} />
          <Route path="/coffee-map" element={<CoffeeMap />} />
          <Route path="/my-qr-codes" element={<MyQRCodes />} />
          <Route path="/add-coffee-point" element={<AddCoffeePoint />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/business-promotion" element={<BusinessPromotion />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/scan-qr" element={<ScanQR />} />
          <Route path="/redeem/:giftId" element={<RedeemGift />} />
          <Route path="/ai-agent" element={<AIAgent />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
