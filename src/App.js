import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [countBreakTime, setCountBreakTime] = useState();
  const [countDownStart, setCountDownStart] = useState(false);

  //reformat time into min:sec, arg needed to be mupliplied by 60 before passed
  const timeFormatting = (time) => {
    if (time > 0) {
      let minute = Math.floor(time / 60);
      let second = time % 60;
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      setCountBreakTime(`${minute}:${second}`);
    } else {
      setCountBreakTime("00:00");
    }
  };

  //re-render count down timer when session time change
  useEffect(() => timeFormatting(sessionTime * 60), [sessionTime]);

  //start count down control
  function startCountDown() {
    setCountDownStart((prev) => (!prev ? true : false));
  }

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
        <div>
          <SessionTime
            //breakTime={breakTime}
            sessionTime={sessionTime}
            countBreakTime={countBreakTime}
            setCountBreakTime={setCountBreakTime}
            timeFormatting={timeFormatting}
            countDownStart={countDownStart}
          />
        </div>

        <div>
          <Controller startCountDown={startCountDown} countDownStart={countDownStart} />
        </div>
      </div>
    </>
  );
}

//session time display
function SessionTime(props) {
  const [sessionTime, setSessionTime] = useState(props.sessionTime * 60);

  //when session time changed, update the session time here
  useEffect(() => {
    setSessionTime(props.sessionTime * 60);
  }, [props.sessionTime]);

  //time interval each second, arg muptiplied by 60, and then minus 1 when each second re-render
  //start render when countDownStart is true
  useEffect(() => {
    if (props.countDownStart) {
      const timer = setInterval(() => {
        props.timeFormatting(sessionTime);
        setSessionTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  return (
    <>
      <h2 id="timer-label">Session</h2>
      <p id="time-left">{props.countBreakTime}</p>
    </>
  );
}

//controller
function Controller(props) {
  return (
    <>
      <i
        onClick={props.startCountDown}
        style={props.countDownStart ? { color: "green" } : { color: "red" }}
        className="fa-solid fa-play"
      ></i>
      <i className="fa-solid fa-arrow-rotate-left"></i>
    </>
  );
}

//set time length

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
      <i id={props.incrementId} onClick={increment} className="fa-solid fa-arrow-up"></i>
      <span id={props.timeLengthId}>{props.timeLength}</span>
      <i id={props.decrementId} onClick={decrement} className="fa-solid fa-arrow-down"></i>
    </>
  );
}

export default App;
