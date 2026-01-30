
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Gallery from './pages/Gallery';
import Location from './pages/Location';
import Join from './pages/Join';
import Admin from './pages/Admin';
import { LanguageProvider } from './contexts/LanguageContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Layouts without standard nav/footer */}
            <Route path="/join" element={<Join />} />
            <Route path="/admin" element={<Admin />} />
            
            {/* Main Layout */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/rooms" element={<Rooms />} />
                      <Route path="/rooms/:id" element={<RoomDetails />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/location" element={<Location />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
