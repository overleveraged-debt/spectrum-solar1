import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import SolarSolutions from './pages/SolarSolutions';
import OnGridSolar from './pages/OnGridSolar';
import PowerBackup from './pages/PowerBackup';
import LithiumUps from './pages/LithiumUps';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Calculator from './pages/Calculator';
import Feedback from './pages/Feedback';
import Opportunities from './pages/Opportunities';
import Gallery from './pages/Gallery';
import Support from './pages/Support';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="solar" element={<SolarSolutions />} />
          <Route path="solar/on-grid" element={<OnGridSolar />} />
          <Route path="power" element={<PowerBackup />} />
          <Route path="power/lithium-ups" element={<LithiumUps />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
