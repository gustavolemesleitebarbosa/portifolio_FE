import React, { createContext, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext(
  null,
);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const theme = localStorage.getItem('@portifolio:theme');
    if (theme) {
      return theme;
    }
    return 'light'
  });

  useEffect(() => {
      document.documentElement.style.setProperty('--primary-color', theme==='dark'? '#01161E' :'#edf2f8' );
      document.documentElement.style.setProperty('--secondary-color', theme==='dark'? '#186559' :'#313bac' );
      document.documentElement.style.setProperty('--white-color', theme==='dark'? '#301934' :'#ffffff' );
      document.documentElement.style.setProperty('--black-color', theme==='dark'? '#e4e4e4' :'#030303' );
      document.documentElement.style.setProperty('--lightGray-color', theme==='dark'? '#6b7688' :'#e4e4e4' );
      document.documentElement.style.setProperty('--gray-color', theme==='dark'? '#e4e4e4' :'#6b7688' );
      document.documentElement.style.setProperty('--tertiary-color', theme==='dark'? '#186559' :'#fef4f5' );
      document.documentElement.style.setProperty('--nav-bar', theme==='dark'? 'rgba(80, 80, 80, 0.85)' :'rgba(255, 255, 225, 0.25)' );
      document.documentElement.style.setProperty('--quartenary-color', theme==='dark'? 'rgba(255, 255, 255, 0.8)':'rgba(31, 31, 31, 0.85)' );
  }, [theme])
  

  const toggleTheme =() => {
    localStorage.setItem('@portifolio:theme', theme==="light"?"dark": "light")
    setTheme(curr=> curr==="light"?"dark": "light")
  }

  return (
    <ThemeContext.Provider
      value={{theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(){
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAuth must be used within an authprovider');
  }
  return context;
}