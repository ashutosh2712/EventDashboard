import React from "react";
import play from "../assets/play.png";
const Home = () => {
  return (
    <div className="homeContainer">
      <button type="submit">
        <img src={play} alt="play" />
      </button>
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
    </div>
  );
};

export default Home;
