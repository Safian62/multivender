import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../server";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isDeleted, setIsDeleted] = useState(false);

  function calculateTimeLeft() {
    const difference = +new Date(data?.finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    if (isDeleted) return; 

    const timer = setTimeout(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);

   
      if (
        !newTime.days &&
        !newTime.hours &&
        !newTime.minutes &&
        !newTime.seconds
      ) {
        axios
          .delete(`${server}/event/delete-shop-event/${data?._id}`)
          .then(() => {
            console.log("Event deleted");
            setIsDeleted(true);
          })
          .catch((err) => {
            console.error("Delete error:", err.response?.data?.message);
            setIsDeleted(true);
          });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isDeleted, data?._id]); 

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    return (
      <span key={interval} className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {!isDeleted && timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-red-500 text-[25px]">Event expired</span>
      )}
    </div>
  );
};

export default CountDown;
