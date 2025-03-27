
import React from 'react';
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "font-medium rounded-lg transition-all duration-300 ease-in-out inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-medium active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-coffee-dark text-white hover:bg-coffee-black shadow-sm hover:shadow-md",
        secondary: "bg-coffee-medium text-white hover:bg-coffee-dark shadow-sm hover:shadow-md",
        outline: "border-2 border-coffee-medium text-coffee-dark hover:bg-coffee-light",
        ghost: "bg-transparent text-coffee-dark hover:bg-coffee-light",
        link: "bg-transparent text-coffee-dark hover:underline p-0",
        default: "bg-coffee-dark text-white hover:bg-coffee-black shadow-sm hover:shadow-md",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
      },
      size: {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-6 py-3 text-lg",
        icon: "p-2 aspect-square",
        default: "px-4 py-2.5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

const CustomButton = ({
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
  style,
  ...props
}: ButtonProps) => {
  
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
        buttonVariants({ variant, size }),
        (disabled || isLoading) && disabledClasses,
        widthClass,
        className
      )}
      style={style}
      {...props}
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

export default CustomButton;
export { CustomButton };
