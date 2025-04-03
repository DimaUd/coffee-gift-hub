
import { Button } from "@/components/ui/button";
import { Settings, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import useTranslate from "@/hooks/useTranslate";
import { useUserRole } from "@/contexts/UserRoleContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const GiftCreator = () => {
  const t = useTranslate();
  const { userRoles } = useUserRole();
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
        
        <div className="flex justify-center">
          <Link to="/profile-settings">
            <Button>{t("Go to Profile Settings")}</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("Create a Gift")}</h1>
        <Link to="/profile-settings">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t("Profile Settings")}
          </Button>
        </Link>
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
      
      {/* Rest of your GiftCreator component */}
    </div>
  );
};

export default GiftCreator;
