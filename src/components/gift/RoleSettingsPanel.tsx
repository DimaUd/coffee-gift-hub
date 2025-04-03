
import React from "react";
import { Coffee, Gift } from "lucide-react";
import useTranslate from "@/hooks/useTranslate";
import { useUserRole } from "@/contexts/UserRoleContext";
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
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface RoleSettingsPanelProps {
  triggerClassName?: string;
  buttonSize?: "default" | "sm" | "lg" | "icon";
}

const RoleSettingsPanel: React.FC<RoleSettingsPanelProps> = ({ 
  triggerClassName = "",
  buttonSize = "sm" 
}) => {
  const t = useTranslate();
  const { userRoles, toggleRole } = useUserRole();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={buttonSize} className={`flex items-center gap-2 ${triggerClassName}`}>
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
  );
};

export default RoleSettingsPanel;
