import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";

function App() {
  const [startButtonFlag, setStartButtonFlag] = useState(
    JSON.parse(localStorage.getItem("is-open")) || false
  );

  const startTimer = () => {
    localStorage.setItem("is-open", JSON.stringify(!startButtonFlag));
    setStartButtonFlag(!startButtonFlag);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (JSON.parse(localStorage.getItem("is-open")) === false) {
        setStartButtonFlag(false);
      } else {
        setStartButtonFlag(true);
      }
      //console.log("This will run every second!");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button className="button" onClick={startTimer}>
          {startButtonFlag === true ? "Start Event" : "Stop Event"}
        </button>
        <hr />
        {!startButtonFlag && <span>🟢🟢🟢🟢🟢</span>}
      </header>
    </div>
  );
}

export default App;
