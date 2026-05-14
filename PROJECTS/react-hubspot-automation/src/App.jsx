import React from "react";
import HubSpotForm from "./components/HubSpotForm";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand-logo">
          <div className="logo-glow"></div>
          <span>InvexTech</span>
        </div>
        <span className="badge">Deals Portal</span>
      </header>

      <main className="main-content">
        <HubSpotForm />
      </main>

      <footer className="app-footer">
        <p>
          © {new Date().getFullYear()} InvexTech. Fully integrated with HubSpot
          v3 Submissions API.
        </p>
      </footer>
    </div>
  );
}

export default App;
