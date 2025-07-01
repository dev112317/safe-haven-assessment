/**
 * BrandContext.jsx
 * Provides React Context for brand configuration and switching.
 * Centralizes brand state and allows overrides for brand-specific UI.
 * @todo: Add persistence for user-selected brand.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import brands from '../config/brands.json';

/**
 * @typedef {Object} BrandConfig
 * @property {string} id - Brand identifier
 * @property {string} name - Brand display name
 * @property {string} primaryColor - Brand primary color
 * @property {string} ctaText - Call-to-action text
 * @property {string} phone - Brand phone number
 * @property {string} region - Brand region
 * @property {boolean} [default] - Is this the default brand?
 */

/**
 * Context for current brand config and setter.
 */
const BrandContext = createContext();

/**
 * BrandProvider wraps the app and manages brand state.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function BrandProvider({ children }) {
  // Find default brand from config
  const defaultBrand = Object.values(brands).find(b => b.default) || Object.values(brands)[0];
  const [brand, setBrand] = useState(defaultBrand);

  /**
   * Switches the current brand by brandId.
   * @param {string} brandId
   */
  const switchBrand = (brandId) => {
    const found = Object.values(brands).find(b => b.id === brandId);
    if (found) setBrand(found);
    // @todo: Handle unknown brandId (fallback or error)
  };

  // @todo: Add effect to persist brand selection

  return (
    <BrandContext.Provider value={{ brand, switchBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

/**
 * Custom hook to access brand context.
 */
export function useBrand() {
  return useContext(BrandContext);
} 