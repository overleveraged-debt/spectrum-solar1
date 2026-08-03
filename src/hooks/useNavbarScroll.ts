import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavbarScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      const scrolled = window.scrollY > 50;
      const lightSections = document.querySelectorAll('[data-nav-light]');
      let overLight = false;
      const navHeight = 80;

      lightSections.forEach(sec => {
        const pos = sec.getBoundingClientRect();
        if (pos.top < navHeight && pos.bottom > 10) overLight = true;
      });

      setIsScrolled(scrolled);
      setIsOverLightSection(overLight);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Immediate check + slight delay for SPA DOM stability
    checkScroll();
    const timer = setTimeout(checkScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [location.pathname]); // Re-run on navigation

  return { isScrolled, isOverLightSection };
};
