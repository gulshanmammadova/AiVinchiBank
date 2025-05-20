"use client";

import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import AdminPanel from "./pages/AdminPanel";
import Hero from "./components/Hero";
import SimpleTransitions from "./components/SimpleTransitions";
import MobileApp from "./components/MobileApp";
import Calculator from "./components/Calculator";
import CardOrder from "./components/CardOrder";
import OtherServices from "./components/OtherServices";
import News from "./components/News";
import Services from "./components/Services";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider } from "./components/ThemeContext";

import { useEffect } from "react";

function AppContent() {
  const location = useLocation();
  const [customerType, setCustomerType] = useState("fiziki");

  // Bu route-larda Header/Footer və s. göstərilməyəcək
  const hideLayoutRoutes = ["/login", "/register", "/admin"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {!hideLayout && (
        <Header
          customerType={customerType}
          setCustomerType={setCustomerType}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <main className="flex-grow">
              {customerType === "fiziki" ? (
                <>
                  <Hero />
                  <SimpleTransitions />
                  <MobileApp />
                  <Calculator />
                  <CardOrder />
                  <OtherServices />
                  <News />
                  <Services />
                  <Faq />
                </>
              ) : (
                <div className="container mx-auto mt-16 py-40 text-center">
                  <h2 className="text-3xl font-bold">Biznes səhifəsi</h2>
                  <p className="mt-4">Biznes səhifəsi hazırlanır...</p>
                </div>
              )}
            </main>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideLayout && <Footer />}
      {!hideLayout && <ChatBot />}
      {!hideLayout && <ScrollToTop />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
