import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Instructions from './pages/Instructions';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import Settings from './pages/Settings';
import MyPrompts from './pages/MyPrompts';
import GeneratePrompt from './pages/GeneratePrompt';
import PrivateRoute from './PrivateRoute'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-prompts"
              element={
                <PrivateRoute>
                  <MyPrompts />
                </PrivateRoute>
              }
            />
            <Route path="/generate" element={<GeneratePrompt />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
