import { useEffect } from 'react';
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
import SinglePrompt from './pages/SinglePrompt';
import ViewCitation from './pages/ViewCitation';
import PrivateRoute from './PrivateRoute';
import { useAuth0 } from '@auth0/auth0-react';
import { syncUserToFirebase } from './utils/syncUserToFirebase';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user && user.sub && user.email) {
      syncUserToFirebase({
        sub: user.sub,
        email: user.email,
        name: user.name,
        picture: user.picture
      });
    }
  }, [isAuthenticated, user]);

  return (
    <Router>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/instructions" element={<Instructions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/generate" element={<GeneratePrompt />} />
              <Route path="/cite/:id" element={<ViewCitation />} />
              <Route path="/prompts/:id" element={<SinglePrompt />} />
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
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
