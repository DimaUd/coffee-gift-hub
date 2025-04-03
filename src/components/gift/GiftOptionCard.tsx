
import React from "react";
import { Button } from "@/components/ui/button";
import useTranslate from "@/hooks/useTranslate";

interface GiftOptionCardProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  isLoading: boolean;
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
}

const GiftOptionCard: React.FC<GiftOptionCardProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  isLoading,
  variant = "default",
}) => {
  const t = useTranslate();
  
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-muted-foreground mb-4">
        {description}
      </p>
      <Button 
        className="w-full" 
        variant={variant}
        onClick={onButtonClick}
        disabled={isLoading}
      >
        {isLoading ? t("Creating...") : buttonText}
      </Button>
    </div>
  );
};

export default GiftOptionCard;
