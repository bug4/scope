import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TokenMonitor from './components/TokenMonitor';
import DexChecker from './components/DexChecker';
import LoadingScreen from './components/LoadingScreen';

// Wrapper component for page transitions
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Show loading screen on route change
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Shorter loading time for page transitions

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <PageWrapper>
            <LandingPage />
          </PageWrapper>
        } />
        <Route path="/monitor" element={
          <PageWrapper>
            <TokenMonitor />
          </PageWrapper>
        } />
        <Route path="/dex" element={
          <PageWrapper>
            <DexChecker />
          </PageWrapper>
        } />
      </Routes>
    </Router>
  );
}

export default App;