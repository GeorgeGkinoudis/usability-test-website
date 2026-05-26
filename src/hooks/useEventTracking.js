import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "";

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export function useEventTracking(participantId) {
  const sessionId = sessionStorage.getItem("session_id") || generateSessionId();

  if (!sessionStorage.getItem("session_id")) {
    sessionStorage.setItem("session_id", sessionId);
  }

  const trackEvent = async (eventType, actionName, responseTime = null) => {
    const eventData = {
      participant_id: participantId,
      event_type: eventType,
      action_name: actionName,
      timestamp: new Date().toISOString(),
      response_time: responseTime,
      session_id: sessionId,
    };

    console.log("📊 Event Tracked:", eventData);

    if (typeof window !== "undefined") {
      const events = JSON.parse(localStorage.getItem("tracked_events") || "[]");
      events.push(eventData);
      localStorage.setItem("tracked_events", JSON.stringify(events));
    }

    if (supabase) {
      try {
        const { error } = await supabase.from("events").insert([eventData]);

        if (error) console.error("Supabase error:", error);
        else console.log("✅ Event saved to Supabase");
      } catch (err) {
        console.error("Error tracking event:", err);
      }
    } else {
      console.warn("⚠️ Supabase not configured - events stored locally only");
    }
  };

  return { trackEvent, sessionId };
}

function generateSessionId() {
  return (
    "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
  );
}
