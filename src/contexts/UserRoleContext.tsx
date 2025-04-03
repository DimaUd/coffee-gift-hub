
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = {
  isGiftCreator: boolean;
  isCoffeePointOwner: boolean;
};

interface UserRoleContextType {
  userRoles: UserRole;
  updateUserRoles: (roles: Partial<UserRole>) => void;
  hasRole: (role: string) => boolean;
  toggleRole: (role: "isGiftCreator" | "isCoffeePointOwner") => void;
}

const defaultRoles: UserRole = {
  isGiftCreator: true,
  isCoffeePointOwner: false,
};

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRoles, setUserRoles] = useState<UserRole>(defaultRoles);

  // Load saved preferences on initial render
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userRolePreferences');
    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);
        setUserRoles(parsedPreferences);
      } catch (error) {
        console.error('Failed to parse user role preferences:', error);
        // If there's an error, use default roles
        setUserRoles(defaultRoles);
      }
    }
  }, []);

  // Update user roles with partial updates
  const updateUserRoles = (roles: Partial<UserRole>) => {
    // Create updated roles by merging current and new roles
    const updatedRoles = { ...userRoles, ...roles };
    
    // Ensure at least one role is enabled
    if (!updatedRoles.isGiftCreator && !updatedRoles.isCoffeePointOwner) {
      updatedRoles.isGiftCreator = true;
    }
    
    setUserRoles(updatedRoles);
    localStorage.setItem('userRolePreferences', JSON.stringify(updatedRoles));
  };

  // Toggle a specific role
  const toggleRole = (role: "isGiftCreator" | "isCoffeePointOwner") => {
    const newValue = !userRoles[role];
    
    // If trying to disable the last enabled role, don't allow it
    if (!newValue && !userRoles[role === "isGiftCreator" ? "isCoffeePointOwner" : "isGiftCreator"]) {
      return; // Don't allow disabling the last role
    }
    
    const updatedRoles = { ...userRoles, [role]: newValue };
    setUserRoles(updatedRoles);
    localStorage.setItem('userRolePreferences', JSON.stringify(updatedRoles));
  };

  // Check if user has a specific role
  const hasRole = (role: string): boolean => {
    if (role === "giftCreator") return userRoles.isGiftCreator;
    if (role === "coffeePointOwner") return userRoles.isCoffeePointOwner;
    if (role === "both") return userRoles.isGiftCreator && userRoles.isCoffeePointOwner;
    if (role === "any") return true;
    return false;
  };

  return (
    <UserRoleContext.Provider value={{ userRoles, updateUserRoles, hasRole, toggleRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = (): UserRoleContextType => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
