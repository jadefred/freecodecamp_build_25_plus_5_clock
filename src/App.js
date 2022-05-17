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

  function startOver() {
    setCountDownStart(false);
    setSessionTime(25);
    setBreakTime(5);
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
            breakTime={breakTime}
            sessionTime={sessionTime}
            countBreakTime={countBreakTime}
            setCountBreakTime={setCountBreakTime}
            timeFormatting={timeFormatting}
            countDownStart={countDownStart}
          />
        </div>

        <div>
          <Controller startCountDown={startCountDown} countDownStart={countDownStart} startOver={startOver} />
        </div>
      </div>
    </>
  );
}

//session time display
function SessionTime(props) {
  const [timerTitle, setTimerTitle] = useState("Session");
  const [sessionTime, setSessionTime] = useState(props.sessionTime * 60);
  const [breakTime, setBreakTime] = useState(props.breakTime * 60);

  //when main session time changed, update the session time here
  useEffect(() => {
    setSessionTime(props.sessionTime * 60);
  }, [props.sessionTime]);

  //when main break time changed, update the break time here
  useEffect(() => {
    setBreakTime(props.breakTime * 60);
  }, [props.breakTime]);

  //check if the sessionTime is 0 and the play button is true => if so, countdown session time
  //then if sessionTime is already 0 but play button is so true, will start to count down breakTime
  useEffect(() => {
    if (props.countDownStart && sessionTime > 0) {
      const timer = setInterval(() => {
        props.timeFormatting(sessionTime);
        setSessionTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (props.countDownStart && sessionTime === 0) {
      setTimerTitle("Break");
      const timer = setInterval(() => {
        props.timeFormatting(breakTime);
        setBreakTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  return (
    <>
      <h2 id="timer-label">{timerTitle}</h2>
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
      <i onClick={props.startOver} className="fa-solid fa-arrow-rotate-left"></i>
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
