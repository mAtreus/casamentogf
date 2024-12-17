import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Wedding } from './pages/Wedding';
import { Gifts } from './pages/Gifts';
import { RSVP } from './pages/RSVP';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Wedding />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/rsvp" element={<RSVP />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;