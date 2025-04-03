
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
import { User, Coffee, Store } from "lucide-react";
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
      <h1 className="text-3xl font-bold mb-6">{t("Profile Settings")}</h1>
      
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{t("Role Preferences")}</CardTitle>
          <CardDescription>
            {t("Choose which roles you want to enable for your account.")}
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
                        <User className="h-5 w-5" />
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
                        <Coffee className="h-5 w-5" /> 
                        <Store className="h-5 w-5" />
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
    </div>
  );
};

export default ProfileSettings;
