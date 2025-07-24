// client/src/components/shopping-view/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingFooter = () => { // <--- This component is named ShoppingFooter
  const currentYear = new Date().getFullYear();

  return (
    <footer style={shoppingFooterStyles}>
      <div style={shoppingContainerStyles}>
        {/* Shopping-specific footer content */}
        <div style={shoppingColumnStyles}>
          <h3 style={shoppingBrandNameStyles}>E-Commerce Shop</h3>
          <p style={shoppingTextStyles}>
            &copy; {currentYear} E-Commerce Shop. All rights reserved.
          </p>
          <p style={shoppingTextStyles}>
            Your perfect shopping destination.
          </p>
        </div>

        <div style={shoppingColumnStyles}>
          <h4 style={shoppingHeadingStyles}>Quick Links</h4>
          <ul style={shoppingListStyles}>
            <li style={shoppingListItemStyles}><Link to="/shop/about" style={shoppingLinkStyles}>About Us</Link></li>
            <li style={shoppingListItemStyles}><Link to="/shop/contact" style={shoppingLinkStyles}>Contact</Link></li>
            <li style={shoppingListItemStyles}><Link to="/shop/faq" style={shoppingLinkStyles}>FAQ</Link></li>
            <li style={shoppingListItemStyles}><Link to="/shop/careers" style={shoppingLinkStyles}>Careers</Link></li>
          </ul>
        </div>

        <div style={shoppingColumnStyles}>
          <h4 style={shoppingHeadingStyles}>Customer Service</h4>
          <ul style={shoppingListStyles}>
            <li style={shoppingListItemStyles}><Link to="/shop/returns" style={shoppingLinkStyles}>Returns & Exchanges</Link></li>
            <li style={shoppingListItemStyles}><Link to="/shop/shipping" style={shoppingLinkStyles}>Shipping Info</Link></li>
            <li style={shoppingListItemStyles}><Link to="/shop/order-status" style={shoppingLinkStyles}>Order Status</Link></li>
            <li style={shoppingListItemStyles}><Link to="/shop/sitemap" style={shoppingLinkStyles}>Sitemap</Link></li>
          </ul>
        </div>

        <div style={shoppingColumnStyles}>
          <h4 style={shoppingHeadingStyles}>Connect</h4>
          <div style={shoppingSocialIconsStyles}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={shoppingSocialLinkStyles}>Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={shoppingSocialLinkStyles}>Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={shoppingSocialLinkStyles}>Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Styles specific to ShoppingFooter ---
const shoppingFooterStyles = {
  backgroundColor: '#f8f8f8',
  color: '#333',
  padding: '40px 20px',
  marginTop: 'auto',
  width: '100%',
  borderTop: '1px solid #e0e0e0',
};

const shoppingContainerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '20px',
};

const shoppingColumnStyles = {
  flex: '1',
  minWidth: '200px',
};

const shoppingBrandNameStyles = {
  fontSize: '1.5em',
  marginBottom: '10px',
  color: '#333',
};

const shoppingHeadingStyles = {
  fontSize: '1.2em',
  marginBottom: '15px',
  color: '#555',
};

const shoppingTextStyles = {
  fontSize: '0.9em',
  lineHeight: '1.6',
  marginBottom: '8px',
  color: '#666',
};

const shoppingListStyles = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const shoppingListItemStyles = {
  marginBottom: '8px',
};

const shoppingLinkStyles = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '0.9em',
};

const shoppingSocialIconsStyles = {
  display: 'flex',
  gap: '15px',
};

const shoppingSocialLinkStyles = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '1em',
};

export default ShoppingFooter; // Ensure it's exported as ShoppingFooter