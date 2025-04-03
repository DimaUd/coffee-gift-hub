
import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  const { hasRole } = useUserRole();
  const t = useTranslate();
  const location = useLocation();

  // If user doesn't have the required role, don't render the link
  if (!hasRole(requiredRole)) {
    return null;
  }
  
  // Check if current path matches this link for active styling
  const isActive = location.pathname === to;
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
