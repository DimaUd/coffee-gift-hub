
import React, { useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import QRScanner from '../components/UI/QRScanner';
import { useUserRole } from "@/contexts/UserRoleContext";
import { useToast } from "@/hooks/use-toast";
import useTranslate from "@/hooks/useTranslate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Coffee, Lock, Store } from "lucide-react";
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
import { Link } from "react-router-dom";

const ScanQR = () => {
  const { userRoles, toggleRole, login, requestOwnerRole } = useUserRole();
  const { toast } = useToast();
  const t = useTranslate();
  
  // Different toast messages based on what's missing
  useEffect(() => {
    if (!userRoles.isAuthenticated) {
      toast({
        title: t("Authentication Required"),
        description: t("You need to log in to scan and redeem gifts."),
        variant: "destructive",
      });
    } else if (!userRoles.isAdminValidated) {
      toast({
        title: t("Approval Required"),
        description: t("You need admin approval to scan and redeem gifts."),
        variant: "destructive",
      });
    } else if (!userRoles.isCoffeePointOwner) {
      toast({
        title: t("Role Disabled"),
        description: t("You need to enable the Coffee Point Owner role in settings."),
        variant: "destructive",
      });
    }
  }, [userRoles, toast, t]);
  
  // If not authenticated
  if (!userRoles.isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto">
                <Alert variant="destructive" className="mb-6">
                  <Lock className="h-4 w-4" />
                  <AlertTitle>{t("Authentication Required")}</AlertTitle>
                  <AlertDescription>
                    {t("You need to log in to scan and redeem coffee gifts.")}
                  </AlertDescription>
                </Alert>
                
                <div className="text-center space-y-6">
                  <div className="bg-muted p-8 rounded-lg inline-block mx-auto">
                    <Coffee className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-xl font-medium mb-2">{t("Coffee Point Owner Access")}</h2>
                    <p className="text-muted-foreground mb-6">
                      {t("Log in to access Coffee Point Owner features.")}
                    </p>
                    
                    <Button 
                      variant="default" 
                      className="flex items-center gap-2"
                      onClick={() => login()}
                    >
                      {t("Log In")}
                    </Button>
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
  
  // If authenticated but not admin validated
  if (!userRoles.isAdminValidated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto">
                <Alert className="mb-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>{t("Admin Approval Required")}</AlertTitle>
                  <AlertDescription>
                    {t("You need to request Coffee Point Owner access and get approved.")}
                  </AlertDescription>
                </Alert>
                
                <div className="text-center space-y-6">
                  <div className="bg-muted p-8 rounded-lg inline-block mx-auto">
                    <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-xl font-medium mb-2">{t("Request Owner Approval")}</h2>
                    <p className="text-muted-foreground mb-6">
                      {t("Your account needs admin approval before you can scan and redeem gifts.")}
                    </p>
                    
                    <Button 
                      variant="default" 
                      className="flex items-center gap-2"
                      onClick={() => requestOwnerRole()}
                    >
                      {t("Request Approval")}
                    </Button>
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
  
  // If admin validated but role is turned off
  if (!userRoles.isCoffeePointOwner) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto">
                <Alert className="mb-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>{t("Role Not Enabled")}</AlertTitle>
                  <AlertDescription>
                    {t("You have been approved, but your Coffee Point Owner role is currently disabled.")}
                  </AlertDescription>
                </Alert>
                
                <div className="text-center space-y-6">
                  <div className="bg-muted p-8 rounded-lg inline-block mx-auto">
                    <Coffee className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-xl font-medium mb-2">{t("Enable Owner Role")}</h2>
                    <p className="text-muted-foreground mb-6">
                      {t("Go to your profile settings to enable the Coffee Point Owner role.")}
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
                              checked={true}
                              disabled={true}
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
                    
                    <div className="mt-4">
                      <Link to="/profile-settings">
                        <Button variant="outline">{t("Go to Profile Settings")}</Button>
                      </Link>
                    </div>
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
  
  // If all requirements are met, show the scanner
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
