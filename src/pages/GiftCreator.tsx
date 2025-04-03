
import { Button } from "@/components/ui/button";
import { Settings, AlertTriangle, Coffee, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import useTranslate from "@/hooks/useTranslate";
import { useUserRole } from "@/contexts/UserRoleContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
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

const GiftCreator = () => {
  const t = useTranslate();
  const { userRoles, toggleRole } = useUserRole();
  const { toast } = useToast();
  
  // Show toast notification if user is not a gift creator
  useEffect(() => {
    if (!userRoles.isGiftCreator) {
      toast({
        title: t("Role Required"),
        description: t("You need to enable the Gift Creator role in settings to use this feature."),
        variant: "destructive",
      });
    }
  }, [userRoles.isGiftCreator, toast, t]);
  
  if (!userRoles.isGiftCreator) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{t("Access Restricted")}</AlertTitle>
          <AlertDescription>
            {t("You need to enable the Gift Creator role to access this page.")}
          </AlertDescription>
        </Alert>
        
        <div className="text-center space-y-6">
          <div className="bg-muted p-8 rounded-lg inline-block mx-auto">
            <Gift className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">{t("Gift Creator Role")}</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {t("Enable the Gift Creator role to create and manage coffee gifts for friends, colleagues, or customers.")}
            </p>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
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
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("Create a Gift")}</h1>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {t("Role Settings")}
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
                    <Label htmlFor="gift-creator-role-main" className="font-medium">
                      {t("Gift Creator")}
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("Create and send coffee gifts to others.")}
                  </p>
                </div>
                <Switch 
                  id="gift-creator-role-main"
                  checked={userRoles.isGiftCreator}
                  onCheckedChange={() => toggleRole("isGiftCreator")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Coffee className="h-4 w-4" />
                    <Label htmlFor="coffee-owner-role-main" className="font-medium">
                      {t("Coffee Point Owner")}
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("Manage your coffee shops and accept gifts.")}
                  </p>
                </div>
                <Switch 
                  id="coffee-owner-role-main"
                  checked={userRoles.isCoffeePointOwner}
                  onCheckedChange={() => toggleRole("isCoffeePointOwner")}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{t("Single Gift")}</h2>
          <p className="text-muted-foreground mb-4">
            {t("Create a one-time coffee gift for a specific person.")}
          </p>
          <Button className="w-full">{t("Create Single Gift")}</Button>
        </div>
        
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{t("Bulk Gifts")}</h2>
          <p className="text-muted-foreground mb-4">
            {t("Create multiple gifts at once for a team or event.")}
          </p>
          <Button className="w-full" variant="outline">{t("Create Bulk Gifts")}</Button>
        </div>
      </div>
    </div>
  );
};

export default GiftCreator;
