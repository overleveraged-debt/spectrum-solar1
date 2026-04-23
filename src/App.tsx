import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import ScrollToTop from './components/ScrollToTop';

// Lazy loading pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const SolarSolutions = lazy(() => import('./pages/SolarSolutions'));
const OnGridSolar = lazy(() => import('./pages/OnGridSolar'));
const HybridSolar = lazy(() => import('./pages/HybridSolar'));
const OffGridSolar = lazy(() => import('./pages/OffGridSolar'));
const SolarWaterHeaters = lazy(() => import('./pages/SolarWaterHeaters'));
const PowerBackup = lazy(() => import('./pages/PowerBackup'));
const LithiumUps = lazy(() => import('./pages/LithiumUps'));
const HomeUps = lazy(() => import('./pages/HomeUps'));
const Inverters = lazy(() => import('./pages/Inverters'));
const OnlineUps = lazy(() => import('./pages/OnlineUps'));
const LithiumBatteries = lazy(() => import('./pages/LithiumBatteries'));
const TubularBatteries = lazy(() => import('./pages/TubularBatteries'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Feedback = lazy(() => import('./pages/Feedback'));
const Opportunities = lazy(() => import('./pages/Opportunities'));
const Franchise = lazy(() => import('./pages/Franchise'));
const Dealership = lazy(() => import('./pages/Dealership'));
const Freelance = lazy(() => import('./pages/Freelance'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Support = lazy(() => import('./pages/Support'));
const Careers = lazy(() => import('./pages/Careers'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-zinc-950">
    <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            {/* Solar Solutions */}
            <Route path="solar" element={<SolarSolutions />} />
            <Route path="solar/on-grid" element={<OnGridSolar />} />
            <Route path="solar/hybrid" element={<HybridSolar />} />
            <Route path="solar/off-grid" element={<OffGridSolar />} />
            <Route path="solar/water-heaters" element={<SolarWaterHeaters />} />
            {/* Power Backup */}
            <Route path="power" element={<PowerBackup />} />
            <Route path="power/lithium-ups" element={<LithiumUps />} />
            <Route path="power/home-ups" element={<HomeUps />} />
            <Route path="power/inverters" element={<Inverters />} />
            <Route path="power/online-ups" element={<OnlineUps />} />
            <Route path="power/lithium-batteries" element={<LithiumBatteries />} />
            <Route path="power/tubular-batteries" element={<TubularBatteries />} />
            {/* Other pages */}
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="opportunities/franchise" element={<Franchise />} />
            <Route path="opportunities/dealership" element={<Dealership />} />
            <Route path="opportunities/freelance" element={<Freelance />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="support" element={<Support />} />
            <Route path="careers" element={<Careers />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-conditions" element={<TermsConditions />} />
            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
