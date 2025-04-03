
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
import { User, Coffee, Store, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
  const { userRoles, updateUserRoles } = useUserRole();
  
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
        <Card className="w-full mb-6">
          <CardHeader>
            <CardTitle>{t("Role Preferences")}</CardTitle>
            <CardDescription>
              {t("Choose which roles you want to enable for your account. You can be both a Gift Creator and a Coffee Point Owner.")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="isGiftCreator"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center gap-2">
                          <User className="h-5 w-5 text-primary" />
                          {t("Gift Creator")}
                        </FormLabel>
                        <FormDescription>
                          {t("Enable to create and send coffee gifts to others.")}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isCoffeePointOwner"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center gap-2">
                          <Coffee className="h-5 w-5 text-primary" /> 
                          <Store className="h-5 w-5 text-primary" />
                          {t("Coffee Point Owner")}
                        </FormLabel>
                        <FormDescription>
                          {t("Enable to manage coffee points and receive payments.")}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <CardFooter className="flex justify-between px-0">
                  <Button variant="outline" onClick={() => navigate(-1)}>
                    {t("Cancel")}
                  </Button>
                  <Button type="submit">{t("Save Changes")}</Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <h3 className="font-medium mb-2">{t("What do these roles mean?")}</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <span className="font-medium">{t("Gift Creator:")}</span> {t("Create and send coffee gifts to friends, employees, or customers.")}
            </li>
            <li>
              <span className="font-medium">{t("Coffee Point Owner:")}</span> {t("Register your coffee machines and receive payments when people redeem gifts.")}
            </li>
          </ul>
          <p className="mt-3">{t("You can enable one or both roles depending on your needs.")}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
