
import React from 'react';
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  isLoading = false,
  disabled = false,
  icon,
  type = 'button',
  fullWidth = false,
}: ButtonProps) => {
  
  // Base classes that apply to all buttons
  const baseClasses = "font-medium rounded-lg transition-all duration-300 ease-in-out inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-medium active:scale-[0.98]";
  
  // Size-specific classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "p-2 aspect-square",
  };
  
  // Variant-specific classes
  const variantClasses = {
    primary: "bg-coffee-dark text-white hover:bg-coffee-black shadow-sm hover:shadow-md",
    secondary: "bg-coffee-medium text-white hover:bg-coffee-dark shadow-sm hover:shadow-md",
    outline: "border-2 border-coffee-medium text-coffee-dark hover:bg-coffee-light",
    ghost: "bg-transparent text-coffee-dark hover:bg-coffee-light",
    link: "bg-transparent text-coffee-dark hover:underline p-0",
  };
  
  // Disabled state
  const disabledClasses = "opacity-60 cursor-not-allowed pointer-events-none";
  
  // Full width class
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        (disabled || isLoading) && disabledClasses,
        widthClass,
        className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {icon && <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
