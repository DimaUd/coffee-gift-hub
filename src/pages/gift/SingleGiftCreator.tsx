
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "@/hooks/useTranslate";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Gift } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface GiftFormValues {
  recipientName: string;
  recipientEmail: string;
  giftMessage: string;
  coffeeType: string;
}

const SingleGiftCreator: React.FC = () => {
  const t = useTranslate();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<GiftFormValues>({
    defaultValues: {
      recipientName: "",
      recipientEmail: "",
      giftMessage: "",
      coffeeType: "Regular Coffee"
    }
  });
  
  const onSubmit = (data: GiftFormValues) => {
    setIsSubmitting(true);
    
    // This would typically be an API call in a real application
    setTimeout(() => {
      toast({
        title: t("Gift Created"),
        description: t("Your gift has been created and will be sent to the recipient."),
      });
      setIsSubmitting(false);
      navigate("/gift-creator");
    }, 1500);
  };
  
  return (
    <div className="container mx-auto py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/gift-creator")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("Back to Gift Options")}
      </Button>
      
      <div className="flex items-center gap-3 mb-6">
        <Gift className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">{t("Create a Single Gift")}</h1>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{t("Gift Details")}</CardTitle>
          <CardDescription>
            {t("Fill in the details for your coffee gift.")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="recipientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Recipient Name")}</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("The name of the person who will receive this gift.")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="recipientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Recipient Email")}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("We'll send the gift code to this email address.")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="coffeeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Coffee Type")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Regular Coffee" {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("What type of coffee would you like to gift?")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="giftMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Gift Message")}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("Enter a personal message for the recipient...")}
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? t("Creating...") : t("Create Gift")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleGiftCreator;
