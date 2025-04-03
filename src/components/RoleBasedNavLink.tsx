
import React from "react";
import { Link } from "react-router-dom";
import { useUserRole } from "@/contexts/UserRoleContext";
import useTranslate from "@/hooks/useTranslate";
import { cn } from "@/lib/utils";

type RoleBasedNavLinkProps = {
  to: string;
  requiredRole: "giftCreator" | "coffeePointOwner" | "both" | "any";
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
};

const RoleBasedNavLink = ({ 
  to, 
  requiredRole, 
  children, 
  className = "",
  activeClassName = "", 
  onClick
}: RoleBasedNavLinkProps) => {
  const { userRoles } = useUserRole();
  const t = useTranslate();

  // Determine if the link should be shown based on user roles
  const shouldShow = () => {
    switch (requiredRole) {
      case "giftCreator":
        return userRoles.isGiftCreator;
      case "coffeePointOwner":
        return userRoles.isCoffeePointOwner;
      case "both":
        return userRoles.isGiftCreator && userRoles.isCoffeePointOwner;
      case "any":
        return true;
      default:
        return false;
    }
  };

  if (!shouldShow()) {
    return null;
  }
  
  // Check if current path matches this link for active styling
  const isActive = window.location.pathname === to;
  const combinedClassName = cn(
    className,
    isActive ? activeClassName : ""
  );

  return (
    <Link 
      to={to} 
      className={combinedClassName}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default RoleBasedNavLink;
