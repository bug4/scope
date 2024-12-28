import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TokenMonitor from './components/TokenMonitor';
import DexChecker from './components/DexChecker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/monitor" element={<TokenMonitor />} />
        <Route path="/dex" element={<DexChecker />} />
      </Routes>
    </Router>
  );
}

export default App;