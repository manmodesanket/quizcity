import { useEffect } from "react";
import { useState } from "react";
import { Time } from "./timer.types";

export default function Timer({
  minSec,
  setTimeUp,
}: {
  minSec: Time;
  setTimeUp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //const [timer, setTimer] = useState(0);
  const { minutes, seconds } = minSec;
  const [[mins, secs], setTime] = useState([minutes, seconds]);

  const tick = () => {
    if (secs === 0) {
      if (mins === 0) {
        return setTimeUp(true);
      }
      return setTime([mins - 1, 59]);
    }
    setTime([mins, secs - 1]);
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <section className="mx-auto mt-4 p-2 rounded border-2 border-gray-300">
      Timer: {mins}:{secs}
    </section>
  );
}
