import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventData = () => {
  const [recordedEvents, setRecordedEvents] = useState([]);

  const token = localStorage.getItem("token");

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

  return (
    <div className="eventContainer">
      <Link to="/" className="returnLink">
        <button className="btn-cart">GO BACK</button>
      </Link>

      <div className="eventDetails">
        <h2>Recorded Events</h2>
        <ul className="eventList">
          {recordedEvents.length > 0 ? (
            recordedEvents.map((event, index) => (
              <li key={index}>
                <strong className="eventName">{event.type}:</strong>{" "}
                {JSON.stringify(event.data)}
              </li>
            ))
          ) : (
            <h2 style={{ color: "red" }}> No Data Found</h2>
          )}
        </ul>
      </div>
    </div>
  );
};

export default EventData;
