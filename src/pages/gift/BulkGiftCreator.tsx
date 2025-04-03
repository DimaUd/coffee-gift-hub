
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "@/hooks/useTranslate";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Gift, Upload, Plus, Trash2 } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface BulkGiftFormValues {
  teamName: string;
  giftMessage: string;
  coffeeType: string;
  recipients: { name: string; email: string }[];
}

const BulkGiftCreator: React.FC = () => {
  const t = useTranslate();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipients, setRecipients] = useState([{ name: "", email: "" }]);
  
  const form = useForm<BulkGiftFormValues>({
    defaultValues: {
      teamName: "",
      giftMessage: "",
      coffeeType: "Regular Coffee",
      recipients: [{ name: "", email: "" }]
    }
  });
  
  const addRecipient = () => {
    setRecipients([...recipients, { name: "", email: "" }]);
  };
  
  const removeRecipient = (index: number) => {
    if (recipients.length > 1) {
      const newRecipients = [...recipients];
      newRecipients.splice(index, 1);
      setRecipients(newRecipients);
    }
  };
  
  const updateRecipient = (index: number, field: "name" | "email", value: string) => {
    const newRecipients = [...recipients];
    newRecipients[index][field] = value;
    setRecipients(newRecipients);
  };
  
  const onSubmit = (data: BulkGiftFormValues) => {
    setIsSubmitting(true);
    
    // This would typically be an API call in a real application
    setTimeout(() => {
      toast({
        title: t("Bulk Gifts Created"),
        description: t(`Created ${recipients.length} gifts successfully.`),
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
        <h1 className="text-3xl font-bold">{t("Create Bulk Gifts")}</h1>
      </div>
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{t("Bulk Gift Details")}</CardTitle>
          <CardDescription>
            {t("Create multiple coffee gifts in one go.")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Team or Event Name")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Marketing Team" {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("An identifier for this group of gifts.")}
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
                      {t("What type of coffee would you like to gift to everyone?")}
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
                        placeholder={t("Enter a message for all recipients...")}
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("This message will be included with all gifts.")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{t("Recipients")}</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      /* This would open a file upload dialog in a real app */
                      toast({
                        title: t("CSV Upload"),
                        description: t("CSV upload functionality coming soon."),
                      });
                    }}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {t("Upload CSV")}
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {recipients.map((recipient, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1">
                        <Input
                          placeholder={t("Name")}
                          value={recipient.name}
                          onChange={(e) => updateRecipient(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          placeholder={t("Email")}
                          type="email"
                          value={recipient.email}
                          onChange={(e) => updateRecipient(index, "email", e.target.value)}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRecipient(index)}
                        disabled={recipients.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    type="button" 
                    variant="outline" 
                    onClick={addRecipient}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {t("Add Recipient")}
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? t("Creating...") : t("Create Bulk Gifts")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkGiftCreator;
