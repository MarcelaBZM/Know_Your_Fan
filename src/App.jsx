
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationFlow from "@/components/RegistrationFlow";
import ProfileView from "@/components/ProfileView";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <div className="min-h-screen furia-gradient">
        <Routes>
          <Route path="/" element={<RegistrationFlow />} />
          <Route path="/profile" element={<ProfileView />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
