import React, { useState, useEffect } from "react";
import { useEventTracking } from "../hooks/useEventTracking";
import "../styles/BookingForm.css";

export function BookingForm({ participantId = "TEST_P001" }) {
  const { trackEvent, sessionId } = useEventTracking(participantId);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
  });
  const [trackedEvents, setTrackedEvents] = useState([]);
  const [stepStartTime, setStepStartTime] = useState(null);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("tracked_events") || "[]");
    setTrackedEvents(events);
  }, []);

  useEffect(() => {
    setStepStartTime(Date.now());
    trackEvent("step_viewed", `step_${step}`);
  }, [step, trackEvent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    trackEvent("field_changed", name);
  };

  const handleNextStep = () => {
    const timeOnStep = Date.now() - stepStartTime;
    trackEvent("step_completed", `step_${step}`, timeOnStep);
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalTime = Date.now() - stepStartTime;
    trackEvent("form_submitted", "booking_complete", totalTime);

    alert(
      `✅ Booking submitted!\nSession ID: ${sessionId}\nParticipant: ${participantId}\n\nCheck the Events Log below to see tracked data.`,
    );

    const events = JSON.parse(localStorage.getItem("tracked_events") || "[]");
    setTrackedEvents(events);
  };

  const exportData = () => {
    const events = JSON.parse(localStorage.getItem("tracked_events") || "[]");
    const dataStr = JSON.stringify(events, null, 2);
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/json;charset=utf-8," + encodeURIComponent(dataStr),
    );
    element.setAttribute(
      "download",
      `events_${participantId}_${sessionId}.json`,
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    trackEvent("data_exported", "export_json");
  };

  const clearData = () => {
    localStorage.removeItem("tracked_events");
    sessionStorage.removeItem("session_id");
    setTrackedEvents([]);
    setStep(1);
    trackEvent("data_cleared", "reset");
  };

  return (
    <div className="booking-container">
      <div className="booking-form">
        <h1>Hotel Booking System</h1>
        <p className="session-info">
          Session ID: <code>{sessionId}</code> | Participant:{" "}
          <code>{participantId}</code>
        </p>

        {step === 1 && (
          <div className="step">
            <h2>Step 1: Your Details</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>
            <button onClick={handleNextStep} className="btn-next">
              Next →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step">
            <h2>Step 2: Travel Dates</h2>
            <div className="form-group">
              <label>Destination</label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
              >
                <option value="">Select a destination</option>
                <option value="paris">Paris, France</option>
                <option value="tokyo">Tokyo, Japan</option>
                <option value="newyork">New York, USA</option>
                <option value="sydney">Sydney, Australia</option>
              </select>
            </div>
            <div className="form-group">
              <label>Check-in Date</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Check-out Date</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-buttons">
              <button onClick={handlePreviousStep} className="btn-back">
                ← Back
              </button>
              <button onClick={handleNextStep} className="btn-next">
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step">
            <h2>Step 3: Number of Guests</h2>
            <div className="form-group">
              <label>How many guests?</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>
            <div className="form-buttons">
              <button onClick={handlePreviousStep} className="btn-back">
                ← Back
              </button>
              <button onClick={handleSubmit} className="btn-submit">
                Complete Booking
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="events-log">
        <div className="log-header">
          <h3>📊 Events Log ({trackedEvents.length})</h3>
          <div className="log-actions">
            <button onClick={exportData} className="btn-export">
              Export JSON
            </button>
            <button onClick={clearData} className="btn-clear">
              Clear All
            </button>
          </div>
        </div>
        <div className="log-content">
          {trackedEvents.length === 0 ? (
            <p className="empty-log">
              No events tracked yet. Interact with the form to start tracking.
            </p>
          ) : (
            <table className="events-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Event Type</th>
                  <th>Action</th>
                  <th>Response Time (ms)</th>
                </tr>
              </thead>
              <tbody>
                {trackedEvents.map((event, idx) => (
                  <tr key={idx}>
                    <td>{new Date(event.timestamp).toLocaleTimeString()}</td>
                    <td>{event.event_type}</td>
                    <td>{event.action_name}</td>
                    <td>{event.response_time ? event.response_time : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
