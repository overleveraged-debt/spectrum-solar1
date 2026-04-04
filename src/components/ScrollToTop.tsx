import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      // Standard page change - scroll to top
      window.scrollTo(0, 0);
    } else {
      // Fragment link - scroll to the element with an offset for the header
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        const yOffset = -100; // Account for fixed header (80px) + some breathing room
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
