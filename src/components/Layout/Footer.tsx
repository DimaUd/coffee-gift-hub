
import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Instagram, Twitter, Facebook, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer link sections
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Get Gift", path: "/gift-creator" },
        { name: "Coffee Map", path: "/coffee-map" },
        { name: "My QR Codes", path: "/my-qr-codes" },
        { name: "Gift Analytics", path: "/gift-analytics" },
        { name: "For Businesses", path: "/add-coffee-point" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Press", path: "/press" },
        { name: "Contact", path: "/contact" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms", path: "/terms" },
        { name: "Privacy", path: "/privacy" },
        { name: "Cookies", path: "/cookies" },
        { name: "Licenses", path: "/licenses" },
      ]
    },
  ];
  
  // Social links
  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, path: "https://instagram.com" },
    { icon: <Twitter className="h-5 w-5" />, path: "https://twitter.com" },
    { icon: <Facebook className="h-5 w-5" />, path: "https://facebook.com" },
    { icon: <Linkedin className="h-5 w-5" />, path: "https://linkedin.com" },
  ];
  
  return (
    <footer className="bg-secondary pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4">
        {/* Footer Top: Logo and Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Coffee className="h-8 w-8 text-coffee-dark" />
              <span className="font-bold text-xl text-coffee-dark">
                Coffee2Go <span className="text-coffee-medium">Connect</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Connect people through coffee gifts with our innovative QR code platform. Bring joy to others one cup at a time.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all hover:translate-y-[-2px] text-coffee-medium hover:text-coffee-dark"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-medium text-coffee-dark mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-coffee-medium transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Footer Bottom: Copyright and Language */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {currentYear} Coffee2Go Connect. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-coffee-medium" />
            <span>in Coffee Land</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
