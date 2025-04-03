
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = {
  isGiftCreator: boolean;
  isCoffeePointOwner: boolean;
};

interface UserRoleContextType {
  userRoles: UserRole;
  updateUserRoles: (roles: UserRole) => void;
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

  const updateUserRoles = (roles: UserRole) => {
    setUserRoles(roles);
    localStorage.setItem('userRolePreferences', JSON.stringify(roles));
  };

  return (
    <UserRoleContext.Provider value={{ userRoles, updateUserRoles }}>
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
