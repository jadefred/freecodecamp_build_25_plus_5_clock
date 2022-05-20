import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [start, setStart] = useState(false);

  //re-render time everysecond when clock is started and have timeleft
  const timeOut = setTimeout(() => {
    if (timeLeft && start) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakTime < 60) {
      setBreakTime(breakTime + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakTime > 1) {
      setBreakTime(breakTime - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionTime < 60) {
      setSessionTime(sessionTime + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionTime > 1) {
      setSessionTime(sessionTime - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  //reset all setting
  const handleReset = () => {
    clearTimeout(timeOut);
    setStart(false);
    setTimeLeft(1500);
    setBreakTime(5);
    setSessionTime(25);
    setTimerLabel("Session");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handleStart = () => {
    clearTimeout(timeOut);
    setStart(!start);
  };

  //when break time is finished, start to count down session again and on and on
  function resetTimer() {
    const audio = document.getElementById("beep");
    if (!timeLeft && timerLabel === "Session") {
      setTimeLeft(breakTime * 60);
      console.log(breakTime);
      setTimerLabel("Break");
      audio.play();
    }
    if (!timeLeft && timerLabel === "Break") {
      setTimeLeft(sessionTime * 60);
      setTimerLabel("Session");
      audio.pause();
      audio.currentTime = 0;
    }
  }

  const clock = () => {
    if (start) {
      return timeOut, resetTimer();
    } else {
      clearTimeout(timeOut);
    }
  };

  useEffect(() => {
    clock();
  }, [start, timeLeft, timeOut]);

  const timeFormatting = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleTimerLabel = timerLabel === "Session" ? "Session" : "Break";

  return (
    <>
      <div>
        <div className="time-controller-box">
          <div className="length-outter-box">
            <h2 id="break-label">Break Length</h2>
            <div className="length-wrapper">
              <button disabled={start} id="break-increment" onClick={handleBreakIncrease}>
                Increase
              </button>
              <p id="break-length">{breakTime}</p>
              <button disabled={start} id="break-decrement" onClick={handleBreakDecrease}>
                Decrease
              </button>
            </div>
          </div>

          <div className="length-outter-box">
            <h2 id="session-label">Session Length</h2>
            <div className="length-wrapper">
              <button disabled={start} id="session-increment" onClick={handleSessionIncrease}>
                Increase
              </button>
              <p id="session-length">{sessionTime}</p>
              <button disabled={start} id="session-decrement" onClick={handleSessionDecrease}>
                Decrease
              </button>
            </div>
          </div>
        </div>

        <div className="countDown-box">
          <h2 id="timer-label">{handleTimerLabel}</h2>
          <div>
            <p id="time-left">{timeFormatting()}</p>
            <div className="start-button-box">
              <button id="start_stop" onClick={handleStart}>
                Start
              </button>
              <button id="reset" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
          <audio
            id="beep"
            preload="auto"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          />
        </div>
      </div>
    </>
  );
}

export default App;
