
import React from 'react';
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'coffee' | 'outlined';
  hoverable?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const CustomCard = ({
  children,
  className,
  variant = 'default',
  hoverable = false,
  onClick,
  style,
}: CardProps) => {
  
  // Base classes for all cards
  const baseClasses = "rounded-xl overflow-hidden transition-all duration-300";
  
  // Variant-specific classes
  const variantClasses = {
    default: "bg-white shadow-md",
    glass: "glassmorphism shadow-lg",
    coffee: "coffee-gradient text-white shadow-lg",
    outlined: "border-2 border-coffee-light",
  };
  
  // Hover effect classes
  const hoverClasses = hoverable 
    ? "hover:shadow-xl hover:translate-y-[-4px] cursor-pointer" 
    : "";
  
  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        className
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

// Sub-components for better organization
const CardHeader = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <div className={cn("p-6 border-b border-border", className)}>
    {children}
  </div>
);

const CardTitle = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <h3 className={cn("text-xl font-semibold", className)}>
    {children}
  </h3>
);

const CardDescription = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <p className={cn("text-muted-foreground mt-1", className)}>
    {children}
  </p>
);

const CardContent = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <div className={cn("p-6", className)}>
    {children}
  </div>
);

const CardFooter = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <div className={cn("p-6 border-t border-border", className)}>
    {children}
  </div>
);

// Attach sub-components to the Card component
CustomCard.Header = CardHeader;
CustomCard.Title = CardTitle;
CustomCard.Description = CardDescription;
CustomCard.Content = CardContent;
CustomCard.Footer = CardFooter;

export default CustomCard;
export { CustomCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
