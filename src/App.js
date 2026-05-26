import React from "react";
import { BookingForm } from "./components/BookingForm";
import "./App.css";

function App() {
  const participantId =
    "TEST_" + Math.random().toString(36).substr(2, 5).toUpperCase();

  return (
    <div className="App">
      <header className="app-header">
        <h1>🔬 Usability Study - Event Tracking Test</h1>
        <p>Testing event tracking and time measurement capabilities</p>
      </header>
      <BookingForm participantId={participantId} />
      <footer className="app-footer">
        <h3>Setup Instructions</h3>
        <div className="instructions">
          <h4>1. Connect to Supabase:</h4>
          <pre>
            REACT_APP_SUPABASE_URL=your_supabase_url
            <br />
            REACT_APP_SUPABASE_ANON_KEY=your_anon_key
          </pre>

          <h4>2. Create this table in Supabase:</h4>
          <pre>{`CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  participant_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  action_name TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  response_time INTEGER,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`}</pre>

          <h4>3. Deploy to Vercel:</h4>
          <pre>
            vercel --env REACT_APP_SUPABASE_URL=... --env
            REACT_APP_SUPABASE_ANON_KEY=...
          </pre>
        </div>
      </footer>
    </div>
  );
}

export default App;
