import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [events, setEvents] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const token = localStorage.getItem("token");

  const handleStartStop = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Record the start event
      recordEvent("start", new Date().toISOString());
    } else {
      // Record the stop event
      recordEvent("stop", new Date().toISOString());

      sendEventsToServer();
    }
  };

  const recordEvent = (type, data) => {
    console.log("recordEvent");
    setEvents((prevEvents) => [...prevEvents, { type, data }]);
  };

  const sendEventsToServer = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/events",
        { events },
        {
          headers: { authorization: `JWT ${token}` },
        }
      );
      setEvents([]);
    } catch (error) {
      console.error("Error sending events to server:", error);
    }
  };

  useEffect(() => {
    if (isRecording) {
      const handleMouseDown = (e) =>
        recordEvent("mouseDown", {
          time: new Date().toISOString(),
          x: e.clientX,
          y: e.clientY,
        });
      const handleMouseUp = (e) =>
        recordEvent("mouseUp", {
          time: new Date().toISOString(),
          x: e.clientX,
          y: e.clientY,
        });
      const handleKeyPress = (e) =>
        recordEvent("keyPress", { time: new Date().toISOString(), key: e.key });
      const handleBlur = () =>
        recordEvent("outOfFocus", { time: new Date().toISOString() });

      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("keypress", handleKeyPress);
      window.addEventListener("blur", handleBlur);

      return () => {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("keypress", handleKeyPress);
        window.removeEventListener("blur", handleBlur);
      };
    }
  }, [isRecording]);

  return (
    <div className="homeContainer">
      <h1>Record your event here</h1>
      <div className={`${isRecording ? "btn-play" : "btn-stop"}`}>
        <button
          onClick={handleStartStop}
          className={`${isRecording ? "play" : "stop"}`}
        >
          {isRecording ? "Play" : "Stop"}
        </button>
      </div>

      <h1>View Your Records</h1>
      <Link to="/events">
        <button className="btn">Dashboard</button>
      </Link>
    </div>
  );
};

export default Home;
