import "./App.css";
import { useState } from "react";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);

  return (
    <>
      <h1>25 + 5 Clock</h1>
      <div className="length-setting-box">
        <div>
          <h2 id="break-label">Break Length</h2>
          <TimeSetting
            timeLength={breakTime}
            updateTime={setBreakTime}
            incrementId={"break-increment"}
            decrementId={"break-decrement"}
            timeLengthId={"break-length"}
          />
        </div>
        <div>
          <h2 id="session-label">Session Length</h2>
          <TimeSetting
            timeLength={sessionTime}
            updateTime={setSessionTime}
            incrementId={"session-increment"}
            decrementId={"session-decrement"}
            timeLengthId={"session-length"}
          />
        </div>
      </div>
    </>
  );
}

//controller of time

function TimeSetting(props) {
  const increment = () => {
    if (props.timeLength < 60) {
      props.updateTime((prev) => prev + 1);
    } else {
      props.timeLength(props.timeLength);
    }
  };

  const decrement = () => {
    if (props.timeLength === 0) {
      props.timeLength(props.timeLength);
    } else {
      props.updateTime((prev) => prev - 1);
    }
  };

  return (
    <>
      <i id={props.incrementId} onClick={increment} class="fa-solid fa-arrow-up"></i>
      <span id={props.timeLengthId}>{props.timeLength}</span>
      <i id={props.decrementId} onClick={decrement} class="fa-solid fa-arrow-down"></i>
    </>
  );
}

export default App;
