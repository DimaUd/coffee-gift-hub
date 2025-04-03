
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = {
  isGiftCreator: boolean;
  isCoffeePointOwner: boolean;
  isAuthenticated: boolean;
  isAdminValidated: boolean;
};

interface UserRoleContextType {
  userRoles: UserRole;
  updateUserRoles: (roles: Partial<UserRole>) => void;
  hasRole: (role: string) => boolean;
  toggleRole: (role: "isGiftCreator" | "isCoffeePointOwner") => void;
  requestOwnerRole: () => void;
  login: () => void;
  logout: () => void;
}

const defaultRoles: UserRole = {
  isGiftCreator: true,
  isCoffeePointOwner: false,
  isAuthenticated: false,
  isAdminValidated: false,
};

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRoles, setUserRoles] = useState<UserRole>(defaultRoles);

  useEffect(() => {
    const savedPreferences = localStorage.getItem('userRolePreferences');
    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);
        setUserRoles({...parsedPreferences, 
          isGiftCreator: true
        });
      } catch (error) {
        console.error('Failed to parse user role preferences:', error);
        setUserRoles(defaultRoles);
      }
    }
  }, []);

  const updateUserRoles = (roles: Partial<UserRole>) => {
    const updatedRoles = { ...userRoles, ...roles };
    updatedRoles.isGiftCreator = true;
    setUserRoles(updatedRoles);
    localStorage.setItem('userRolePreferences', JSON.stringify(updatedRoles));
  };

  const toggleRole = (role: "isGiftCreator" | "isCoffeePointOwner") => {
    if (role === "isGiftCreator") return;
    
    if (role === "isCoffeePointOwner") {
      if (!userRoles.isAuthenticated) {
        return;
      }
      if (!userRoles.isAdminValidated && !userRoles.isCoffeePointOwner) {
        return;
      }
    }
    
    const newValue = !userRoles[role];
    const updatedRoles = { ...userRoles, [role]: newValue };
    setUserRoles(updatedRoles);
    localStorage.setItem('userRolePreferences', JSON.stringify(updatedRoles));
  };

  const requestOwnerRole = () => {
    if (!userRoles.isAuthenticated) return;
    
    console.log("Requesting coffee point owner role");
    setTimeout(() => {
      const updatedRoles = { ...userRoles, isAdminValidated: true };
      setUserRoles(updatedRoles);
      localStorage.setItem('userRolePreferences', JSON.stringify(updatedRoles));
    }, 2000);
  };

  const login = () => {
    const updatedRoles = { ...userRoles, isAuthenticated: true };
    setUserRoles(updatedRoles);
    localStorage.setItem('userRolePreferences', JSON.stringify(updatedRoles));
  };

  const logout = () => {
    const updatedRoles = { 
      ...defaultRoles,
      isAuthenticated: false,
      isAdminValidated: false,
      isCoffeePointOwner: false,
    };
    setUserRoles(updatedRoles);
    localStorage.setItem('userRolePreferences', JSON.stringify(updatedRoles));
  };

  const hasRole = (role: string): boolean => {
    if (role === "giftCreator") return userRoles.isGiftCreator;
    if (role === "coffeePointOwner") return userRoles.isCoffeePointOwner && userRoles.isAuthenticated;
    if (role === "authenticated") return userRoles.isAuthenticated;
    if (role === "adminValidated") return userRoles.isAdminValidated && userRoles.isAuthenticated;
    if (role === "both") return userRoles.isGiftCreator && userRoles.isCoffeePointOwner && userRoles.isAuthenticated;
    if (role === "any") return true;
    return false;
  };

  return (
    <UserRoleContext.Provider value={{ 
      userRoles, 
      updateUserRoles, 
      hasRole, 
      toggleRole,
      requestOwnerRole,
      login,
      logout
    }}>
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
