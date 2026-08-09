import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavbarScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // 1. Passive scroll listener for navbar background translucency
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. High-performance IntersectionObserver for light section detection (zero forced reflows)
    const lightSections = document.querySelectorAll('[data-nav-light]');
    const activeLightSections = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeLightSections.add(entry.target);
          } else {
            activeLightSections.delete(entry.target);
          }
        });
        setIsOverLightSection(activeLightSections.size > 0);
      },
      {
        rootMargin: '0px 0px -85% 0px',
        threshold: 0,
      }
    );

    lightSections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lightSections.forEach((sec) => observer.unobserve(sec));
    };
  }, [location.pathname]);

  return { isScrolled, isOverLightSection };
};
