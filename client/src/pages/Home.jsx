import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [events, setEvents] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedEvents, setRecordedEvents] = useState([]);
  const navigate = useNavigate();

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

  const fetchRecordedEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/events", {
        headers: { authorization: `JWT ${token}` },
      });
      setRecordedEvents(response.data);
    } catch (error) {
      console.error("Error fetching recorded events:", error);
    }
  };

  useEffect(() => {
    fetchRecordedEvents();
  }, []);

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
      <div className={`${isRecording ? "btn-play" : "btn-stop"}`}>
        <button
          onClick={handleStartStop}
          className={`${isRecording ? "play" : "stop"}`}
        >
          {isRecording ? "Play" : "Stop"}
        </button>
      </div>
      <ul>
        <li>Record button click time</li>
        <li>
          Mouse click events, including the time of mouse pointer up and down,
          and the position on the screen where the mouse click happened
        </li>
        <li>
          Keyboard events, specifying the time of key press and which key was
          pressed
        </li>
        <li>
          Out-of-focus events, capturing when the user switches tabs and when
          the out-of-focus event occurred
        </li>
        <li>
          Stop button click event to check if the user has stopped recording
        </li>
      </ul>

      <div>
        <h2>Recorded Events</h2>
        <ul>
          {recordedEvents.map((event, index) => (
            <li key={index}>
              <strong>{event.type}:</strong> {JSON.stringify(event.data)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
