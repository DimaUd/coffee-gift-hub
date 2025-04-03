
import React, { useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import QRScanner from '../components/UI/QRScanner';
import { useUserRole } from "@/contexts/UserRoleContext";
import { useToast } from "@/hooks/use-toast";
import useTranslate from "@/hooks/useTranslate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Gift } from "lucide-react";

const ScanQR = () => {
  const { userRoles, toggleRole } = useUserRole();
  const { toast } = useToast();
  const t = useTranslate();
  
  // Notify users if they're not a coffee point owner
  useEffect(() => {
    if (!userRoles.isCoffeePointOwner) {
      toast({
        title: t("Role Required"),
        description: t("You need to enable the Coffee Point Owner role to redeem gifts"),
        variant: "destructive",
      });
    }
  }, [userRoles.isCoffeePointOwner, toast, t]);
  
  // Show different content based on user role
  if (!userRoles.isCoffeePointOwner) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto">
                <Alert variant="destructive" className="mb-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>{t("Access Restricted")}</AlertTitle>
                  <AlertDescription>
                    {t("You need to enable the Coffee Point Owner role to scan and redeem coffee gifts.")}
                  </AlertDescription>
                </Alert>
                
                <div className="text-center space-y-6">
                  <div className="bg-muted p-8 rounded-lg inline-block mx-auto">
                    <Coffee className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-xl font-medium mb-2">{t("Coffee Point Owner Role")}</h2>
                    <p className="text-muted-foreground mb-6">
                      {t("Enable the Coffee Point Owner role to scan and redeem coffee gifts at your location.")}
                    </p>
                    
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="default" className="flex items-center gap-2">
                          {t("Manage Roles")}
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>{t("Role Settings")}</SheetTitle>
                          <SheetDescription>
                            {t("Enable or disable your user roles to access different features.")}
                          </SheetDescription>
                        </SheetHeader>
                        
                        <div className="py-6 space-y-6">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Gift className="h-4 w-4" />
                                <Label htmlFor="gift-creator-role" className="font-medium">
                                  {t("Gift Creator")}
                                </Label>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {t("Create and send coffee gifts to others.")}
                              </p>
                            </div>
                            <Switch 
                              id="gift-creator-role"
                              checked={userRoles.isGiftCreator}
                              onCheckedChange={() => toggleRole("isGiftCreator")}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Coffee className="h-4 w-4" />
                                <Label htmlFor="coffee-owner-role" className="font-medium">
                                  {t("Coffee Point Owner")}
                                </Label>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {t("Manage your coffee shops and accept gifts.")}
                              </p>
                            </div>
                            <Switch 
                              id="coffee-owner-role"
                              checked={userRoles.isCoffeePointOwner}
                              onCheckedChange={() => toggleRole("isCoffeePointOwner")}
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <SheetClose asChild>
                            <Button className="w-full">{t("Apply Changes")}</Button>
                          </SheetClose>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-3xl font-bold text-coffee-dark mb-6">
                {t("Scan a Coffee Gift")}
              </h1>
              <p className="text-muted-foreground mb-8">
                {t("Scan a QR code to redeem your coffee gift. Position the QR code within the frame to scan.")}
              </p>
              
              <QRScanner />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScanQR;
