"use client";
import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 27 * 60); // seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 3 * 3600 + 21 * 60 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <p className="text-2xl text-red-600">
      შეუკვეთე შემდეგ {minutes} წუთსა და {seconds} წამში და მიიღე ფასდაკლება
    </p>
  );
};

export default CountdownTimer;
