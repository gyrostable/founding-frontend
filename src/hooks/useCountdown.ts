import { useState, useEffect, Dispatch, SetStateAction } from "react";

function calculateTime(
  divisor: number,
  modulus: number,
  launchTime: number,
  setter?: Dispatch<SetStateAction<string>>
) {
  let timeLeft = Math.floor(((launchTime - Date.now()) / (divisor * 1000)) % modulus).toString();

  setter && setter(timeLeft);

  return timeLeft;
}

function count(launchTime, setSecondsLeft, setMinutesLeft, setHoursLeft, setDaysLeft) {
  calculateTime(1, 60, launchTime, setSecondsLeft);
  calculateTime(60, 60, launchTime, setMinutesLeft);
  calculateTime(3600, 24, launchTime, setHoursLeft);
  calculateTime(86400, 1000000000000, launchTime, setDaysLeft);
}

export const useCountdown = (launchTime: number) => {
  const [secondsLeft, setSecondsLeft] = useState(calculateTime(1, 60, launchTime));
  const [minutesLeft, setMinutesLeft] = useState(calculateTime(60, 60, launchTime));
  const [hoursLeft, setHoursLeft] = useState(calculateTime(3600, 24, launchTime));
  const [daysLeft, setDaysLeft] = useState(calculateTime(86400, 1000000000000, launchTime));

  // useEffect
  useEffect(() => {
    setInterval(
      () => count(launchTime, setSecondsLeft, setMinutesLeft, setHoursLeft, setDaysLeft),
      1000
    );
    return clearInterval;
  }, [launchTime]);

  return {
    secondsLeft,
    minutesLeft,
    hoursLeft,
    daysLeft,
  };
};
