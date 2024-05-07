// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ContactPage from './pages/ContactPage';
import MapsPage from './pages/MapsPage'; // Make sure to create this component
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <aside className="w-64 bg-gray-800 p-4 text-white">
            <nav className="space-y-2">
              <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded">
                Contact
              </Link>
              <Link to="/maps" className="block py-2 px-4 hover:bg-gray-700 rounded">
                Maps
              </Link>
            </nav>
          </aside>
          <div className="flex-1 flex flex-col">
            <header className="bg-white shadow p-4 text-xl font-semibold">
              <Routes>
                <Route path="/maps" element={<span>COVID-19 Dashboard</span>} />
                <Route path="/" element={<span>Contact Page</span>} />
              </Routes>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
              <Routes>
                <Route path="/maps" element={<MapsPage />} />
                <Route path="/" element={<ContactPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
