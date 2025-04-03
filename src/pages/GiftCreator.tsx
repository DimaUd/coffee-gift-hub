
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "@/hooks/useTranslate";
import { useUserRole } from "@/contexts/UserRoleContext";
import { useToast } from "@/hooks/use-toast";
import RoleSettingsPanel from "@/components/gift/RoleSettingsPanel";
import AccessRestrictedMessage from "@/components/gift/AccessRestrictedMessage";
import GiftOptionCard from "@/components/gift/GiftOptionCard";

const GiftCreator: React.FC = () => {
  const t = useTranslate();
  const { userRoles } = useUserRole();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCreatingSingleGift, setIsCreatingSingleGift] = useState(false);
  const [isCreatingBulkGifts, setIsCreatingBulkGifts] = useState(false);
  
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
  
  const handleCreateSingleGift = () => {
    setIsCreatingSingleGift(true);
    toast({
      title: t("Creating Gift"),
      description: t("Starting single gift creation..."),
    });
    
    setTimeout(() => {
      setIsCreatingSingleGift(false);
      navigate('/gift-creator/single');
    }, 1000);
  };
  
  const handleCreateBulkGifts = () => {
    setIsCreatingBulkGifts(true);
    toast({
      title: t("Creating Bulk Gifts"),
      description: t("Starting bulk gift creation..."),
    });
    
    setTimeout(() => {
      setIsCreatingBulkGifts(false);
      navigate('/gift-creator/bulk');
    }, 1000);
  };
  
  if (!userRoles.isGiftCreator) {
    return <AccessRestrictedMessage />;
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("Create a Gift")}</h1>
        <RoleSettingsPanel />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <GiftOptionCard 
          title={t("Single Gift")}
          description={t("Create a one-time coffee gift for a specific person.")}
          buttonText={t("Create Single Gift")}
          onButtonClick={handleCreateSingleGift}
          isLoading={isCreatingSingleGift}
        />
        
        <GiftOptionCard 
          title={t("Bulk Gifts")}
          description={t("Create multiple gifts at once for a team or event.")}
          buttonText={t("Create Bulk Gifts")}
          onButtonClick={handleCreateBulkGifts}
          isLoading={isCreatingBulkGifts}
          variant="outline"
        />
      </div>
    </div>
  );
};

export default GiftCreator;
