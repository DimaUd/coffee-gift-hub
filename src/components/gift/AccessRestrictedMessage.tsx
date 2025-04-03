
import React from "react";
import { Gift, Settings, AlertTriangle } from "lucide-react";
import useTranslate from "@/hooks/useTranslate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import RoleSettingsPanel from "./RoleSettingsPanel";

const AccessRestrictedMessage: React.FC = () => {
  const t = useTranslate();
  
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
          
          <RoleSettingsPanel buttonSize="default" />
        </div>
      </div>
    </div>
  );
};

export default AccessRestrictedMessage;
