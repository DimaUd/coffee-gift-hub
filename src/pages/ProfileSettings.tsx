
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserRole } from "@/contexts/UserRoleContext";
import useTranslate from "@/hooks/useTranslate";
import { User, Coffee, Store, ArrowLeft, Lock, CheckCircle, XCircle, HelpCircle, AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define the form schema
const formSchema = z.object({
  isGiftCreator: z.boolean().default(true),
  isCoffeePointOwner: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const t = useTranslate();
  const { language } = useLanguage();
  const { userRoles, updateUserRoles, toggleRole, requestOwnerRole, login, logout } = useUserRole();
  const [isOwnerRequestPending, setIsOwnerRequestPending] = useState(false);
  
  // Set up form with values from context
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isGiftCreator: userRoles.isGiftCreator,
      isCoffeePointOwner: userRoles.isCoffeePointOwner,
    },
  });

  // Update form when context changes
  useEffect(() => {
    form.reset({
      isGiftCreator: userRoles.isGiftCreator,
      isCoffeePointOwner: userRoles.isCoffeePointOwner,
    });
  }, [userRoles, form]);

  const onSubmit = (data: FormValues) => {
    // Update context with new values
    updateUserRoles(data);
    
    toast({
      title: t("Settings saved"),
      description: t("Your profile settings have been updated successfully."),
    });
  };

  const handleOwnerRequest = () => {
    setIsOwnerRequestPending(true);
    requestOwnerRole();
    
    toast({
      title: t("Request Submitted"),
      description: t("Your request for Coffee Point Owner privileges is being processed."),
    });
    
    // Reset after simulated approval
    setTimeout(() => {
      setIsOwnerRequestPending(false);
      
      toast({
        title: t("Request Approved"),
        description: t("You now have Coffee Point Owner privileges!"),
      });
    }, 2000);
  };

  const handleLogin = () => {
    login();
    toast({
      title: t("Logged In"),
      description: t("You are now logged in and have access to additional features."),
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: t("Logged Out"),
      description: t("You have been logged out. Some features are now limited."),
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {t("Back")}
        </Button>
        <h1 className="text-3xl font-bold">{t("Profile Settings")}</h1>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Authentication Status */}
        <Card className="w-full mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              {t("Authentication Status")}
            </CardTitle>
            <CardDescription>
              {t("Sign in to unlock additional features and settings.")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${userRoles.isAuthenticated ? "bg-green-500" : "bg-gray-400"}`}></div>
                <span className="font-medium">{userRoles.isAuthenticated ? t("Logged In") : t("Not Logged In")}</span>
              </div>
              {userRoles.isAuthenticated ? (
                <Button variant="outline" onClick={handleLogout}>{t("Log Out")}</Button>
              ) : (
                <Button onClick={handleLogin}>{t("Log In")}</Button>
              )}
            </div>
            
            {!userRoles.isAuthenticated && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {t("Your access is limited. Log in to unlock all features.")}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        
        {/* Role Tabs */}
        <Tabs defaultValue="roles" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="roles">{t("Role Management")}</TabsTrigger>
            <TabsTrigger value="features" disabled={!userRoles.isAuthenticated}>{t("Premium Features")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roles">
            <Card>
              <CardHeader>
                <CardTitle>{t("Role Preferences")}</CardTitle>
                <CardDescription>
                  {t("Manage your roles on the platform. Some roles require authentication and admin approval.")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Gift Creator Role - Always enabled for everyone */}
                    <FormField
                      control={form.control}
                      name="isGiftCreator"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base flex items-center gap-2">
                              <User className="h-5 w-5 text-primary" />
                              {t("Gift Creator")}
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {t("Available for everyone")}
                              </span>
                            </FormLabel>
                            <FormDescription>
                              {t("Create and send coffee gifts to others.")}
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={true}
                              disabled={true}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    {/* Coffee Point Owner Role - Requires auth + admin approval */}
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center gap-2">
                          <Coffee className="h-5 w-5 text-primary" /> 
                          <Store className="h-5 w-5 text-primary" />
                          {t("Coffee Point Owner")}
                          {userRoles.isAuthenticated && userRoles.isAdminValidated && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {t("Approved")}
                            </span>
                          )}
                          {userRoles.isAuthenticated && !userRoles.isAdminValidated && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {t("Needs Approval")}
                            </span>
                          )}
                          {!userRoles.isAuthenticated && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {t("Login Required")}
                            </span>
                          )}
                        </FormLabel>
                        <FormDescription>
                          {t("Manage coffee points and receive payments.")}
                        </FormDescription>
                      </div>
                      {userRoles.isAuthenticated && userRoles.isAdminValidated ? (
                        <Switch
                          checked={userRoles.isCoffeePointOwner}
                          onCheckedChange={() => toggleRole("isCoffeePointOwner")}
                        />
                      ) : userRoles.isAuthenticated ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleOwnerRequest}
                          disabled={isOwnerRequestPending}
                        >
                          {isOwnerRequestPending ? t("Processing...") : t("Request Access")}
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleLogin}
                        >
                          {t("Login to Request")}
                        </Button>
                      )}
                    </FormItem>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>{t("Premium Features")}</CardTitle>
                <CardDescription>
                  {t("Authenticated users get access to additional features.")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 border rounded-md">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <h3 className="font-medium">{t("Advanced Analytics")}</h3>
                      <p className="text-sm text-muted-foreground">{t("Track gift usage and performance")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 border rounded-md">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <h3 className="font-medium">{t("Campaign Tracking")}</h3>
                      <p className="text-sm text-muted-foreground">{t("Monitor marketing campaign effectiveness")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 border rounded-md">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <h3 className="font-medium">{t("Bulk Gift Creation")}</h3>
                      <p className="text-sm text-muted-foreground">{t("Create multiple gifts at once for teams")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <h3 className="font-medium mb-2">{t("How Coffee2Go Connect Roles Work")}</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span>
                <strong>{t("Gift Creator:")}</strong> {t("Available to everyone. Create and send coffee gifts with or without an account.")}
              </span>
            </li>
            <li className="flex items-start">
              <Lock className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
              <span>
                <strong>{t("Authentication:")}</strong> {t("Sign in to unlock premium features like analytics, saved preferences, and more.")}
              </span>
            </li>
            <li className="flex items-start">
              <Store className="h-4 w-4 text-amber-500 mt-1 mr-2 flex-shrink-0" />
              <span>
                <strong>{t("Coffee Point Owner:")}</strong> {t("Requires authentication and admin approval. Register coffee machines and receive payments.")}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
