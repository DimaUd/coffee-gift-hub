
import React from "react";
import { Link } from "react-router-dom";
import { useUserRole } from "@/contexts/UserRoleContext";
import useTranslate from "@/hooks/useTranslate";

type RoleBasedNavLinkProps = {
  to: string;
  requiredRole: "giftCreator" | "coffeePointOwner" | "both" | "any";
  children: React.ReactNode;
  className?: string;
};

const RoleBasedNavLink = ({ to, requiredRole, children, className = "" }: RoleBasedNavLinkProps) => {
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

  return <Link to={to} className={className}>{children}</Link>;
};

export default RoleBasedNavLink;
