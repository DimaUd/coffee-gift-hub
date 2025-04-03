
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserRole } from "@/contexts/UserRoleContext";
import useTranslate from "@/hooks/useTranslate";
import { cn } from "@/lib/utils";

type RoleBasedNavLinkProps = {
  to: string;
  requiredRole: "giftCreator" | "coffeePointOwner" | "authenticated" | "adminValidated" | "both" | "any";
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
  requiresAuth?: boolean;
};

const RoleBasedNavLink = ({ 
  to, 
  requiredRole, 
  children, 
  className = "",
  activeClassName = "", 
  onClick,
  requiresAuth = false,
}: RoleBasedNavLinkProps) => {
  const { hasRole, userRoles } = useUserRole();
  const t = useTranslate();
  const location = useLocation();

  // Check if user has access
  const hasAccess = hasRole(requiredRole);
  
  // If authentication is required and user is not authenticated, don't show the link
  if (requiresAuth && !userRoles.isAuthenticated) {
    return null;
  }
  
  // If user doesn't have the required role, don't render the link
  if (!hasAccess) {
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
