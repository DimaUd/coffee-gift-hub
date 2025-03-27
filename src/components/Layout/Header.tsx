
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Coffee, ChevronDown } from 'lucide-react';
import CustomButton from '../UI/CustomButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Check if user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Navigation links
  const navLinks = [
    { name: 'Get Gift', path: '/gift-creator' },
    { name: 'Coffee Map', path: '/coffee-map' },
    { name: 'My QR Codes', path: '/my-qr-codes' },
    { 
      name: 'For Businesses', 
      path: '#',
      submenu: [
        { name: 'Add Coffee Point', path: '/add-coffee-point' },
        { name: 'Promotions', path: '/promotions' },
      ]
    },
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <Coffee className="h-8 w-8 text-coffee-dark group-hover:text-coffee-medium transition-colors duration-300" />
          <span className="font-bold text-xl text-coffee-dark group-hover:text-coffee-medium transition-colors duration-300">
            Coffee2Go <span className="text-coffee-medium">Connect</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => 
            link.submenu ? (
              <div key={link.name} className="relative group">
                <button className="flex items-center space-x-1 hover:text-coffee-medium transition-colors text-coffee-dark/90">
                  <span>{link.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 min-w-[200px] hidden group-hover:block animate-fade-in">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden py-2">
                    {link.submenu.map((subLink) => (
                      <Link 
                        key={subLink.name}
                        to={subLink.path}
                        className="block px-4 py-2 hover:bg-coffee-light transition-colors"
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`hover:text-coffee-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-coffee-dark font-medium' 
                    : 'text-coffee-dark/90'
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>
        
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <CustomButton variant="ghost" size="sm">
            Login
          </CustomButton>
          <CustomButton variant="primary" size="sm">
            Sign Up
          </CustomButton>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-coffee-dark" />
          ) : (
            <Menu className="h-6 w-6 text-coffee-dark" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[70px] bg-white z-40 animate-fade-in">
          <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
            {navLinks.map((link) => 
              link.submenu ? (
                <div key={link.name} className="space-y-2">
                  <h4 className="font-medium text-coffee-dark">{link.name}</h4>
                  <div className="pl-4 space-y-2 border-l-2 border-coffee-light">
                    {link.submenu.map((subLink) => (
                      <Link 
                        key={subLink.name}
                        to={subLink.path}
                        className="block text-coffee-dark/90 hover:text-coffee-medium transition-colors"
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-coffee-dark/90 hover:text-coffee-medium transition-colors text-lg ${
                    location.pathname === link.path ? 'font-medium text-coffee-dark' : ''
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
            
            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-3 pt-4 border-t border-coffee-light">
              <CustomButton variant="outline" fullWidth>
                Login
              </CustomButton>
              <CustomButton variant="primary" fullWidth>
                Sign Up
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
