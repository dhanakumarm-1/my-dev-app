import "./App.css";
import axios from "axios";
import React, { useState } from "react";

const baseURL =
  "https://my-app-dev-2df40-default-rtdb.firebaseio.com//button.json";

function App() {
  const [apiStatus, setApiStatus] = useState(null);
  const [startButtonFlag, setStartButtonFlag] = useState(true);

  // get api status
  const getApiStatus = () => {
    axios.get(`${baseURL}`).then((response) => {
      const items = Object.values(response.data);
      const result = items[0].flag;
      setApiStatus(result);
    });
  };

  // create new record
  const createApi = (flag) => {
    axios
      .post(baseURL, {
        flag,
      })
      .then((response) => {
        setApiStatus(response.data);
        getApiStatus();
      });
  };

  // delete existing record
  const deleteApi = (flag) => {
    axios.delete(`${baseURL}`).then(() => {
      createApi(flag);
    });
  };

  const startTimer = () => {
    setStartButtonFlag(!startButtonFlag);
    deleteApi(!startButtonFlag);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      getApiStatus();
      if (apiStatus != null && apiStatus === false) {
        setStartButtonFlag(false);
      } else {
        setStartButtonFlag(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [apiStatus]);

  return (
    <div className="App">
      <header className="App-header">
        <button className="button" onClick={startTimer}>
          {apiStatus === true ? "Start Event" : "Stop Event"}
        </button>
        <hr />
        {!apiStatus && <span>🟢🟢🟢🟢🟢</span>}
      </header>
    </div>
  );
}

export default App;
