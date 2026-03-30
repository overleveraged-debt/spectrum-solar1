import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavbarScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const lightSections = document.querySelectorAll('[data-nav-light]');
      let overLight = false;
      const navHeight = 80;

      lightSections.forEach(sec => {
        const pos = sec.getBoundingClientRect();
        // Section is 'Light' if it covers the top 80px of the viewport
        if (pos.top < navHeight && pos.bottom > 10) overLight = true;
      });

      setIsOverLightSection(overLight);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Immediate check + slight delay for SPA DOM stability
    handleScroll();
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [location.pathname]); // Re-run on navigation

  return { isScrolled, isOverLightSection };
};
