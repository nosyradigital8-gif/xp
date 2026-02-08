// FILE PATH: src/contexts/CountryContext.tsx
// Place this file at: src/contexts/CountryContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { countryData, CountryData } from '../data/countryData';

interface CountryContextType {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  currentData: CountryData;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within CountryProvider');
  }
  return context;
};

interface CountryProviderProps {
  children: ReactNode;
}

export const CountryProvider: React.FC<CountryProviderProps> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('nigeria');

  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('selectedCountry');
    if (saved && countryData[saved]) {
      setSelectedCountry(saved);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever it changes
    localStorage.setItem('selectedCountry', selectedCountry);
  }, [selectedCountry]);

  const currentData = countryData[selectedCountry];

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry, currentData }}>
      {children}
    </CountryContext.Provider>
  );
};
