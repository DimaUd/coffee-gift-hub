
import { Button } from "@/components/ui/button";
import { Settings, AlertTriangle, Store, MapPin, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import useTranslate from "@/hooks/useTranslate";
import { useUserRole } from "@/contexts/UserRoleContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const AddCoffeePoint = () => {
  const t = useTranslate();
  const { userRoles } = useUserRole();
  const { toast } = useToast();
  
  // Show toast notification if user is not a coffee point owner
  useEffect(() => {
    if (!userRoles.isCoffeePointOwner) {
      toast({
        title: t("Role Required"),
        description: t("You need to enable the Coffee Point Owner role in settings to use this feature."),
        variant: "destructive",
      });
    }
  }, [userRoles.isCoffeePointOwner, toast, t]);
  
  if (!userRoles.isCoffeePointOwner) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{t("Access Restricted")}</AlertTitle>
          <AlertDescription>
            {t("You need to enable the Coffee Point Owner role to access this page.")}
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
        <h1 className="text-3xl font-bold">{t("Add Coffee Point")}</h1>
        <Link to="/profile-settings">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t("Profile Settings")}
          </Button>
        </Link>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("Register Your Coffee Point")}</CardTitle>
          <CardDescription>
            {t("Add your coffee machine location to start receiving payments through our platform.")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-muted/40 rounded-lg">
              <Store className="h-12 w-12 text-primary mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{t("Business Information")}</h3>
                <p className="text-muted-foreground">{t("Register and verify your business details")}</p>
              </div>
              <Button variant="outline" className="ml-auto">{t("Start")}</Button>
            </div>
            
            <div className="flex items-center p-4 bg-muted/40 rounded-lg">
              <Coffee className="h-12 w-12 text-primary mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{t("Machine Setup")}</h3>
                <p className="text-muted-foreground">{t("Configure your coffee machine and payment terminal")}</p>
              </div>
              <Button variant="outline" className="ml-auto">{t("Configure")}</Button>
            </div>
            
            <div className="flex items-center p-4 bg-muted/40 rounded-lg">
              <MapPin className="h-12 w-12 text-primary mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{t("Location Settings")}</h3>
                <p className="text-muted-foreground">{t("Add your location to the map for customers to find")}</p>
              </div>
              <Button variant="outline" className="ml-auto">{t("Set Location")}</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">{t("Complete Registration")}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddCoffeePoint;
