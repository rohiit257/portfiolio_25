"use client";

import { useEffect, useState } from "react";

interface LiveLocalTimeProps {
  timeZone?: string;
  locale?: string;
}

export function LiveLocalTime({
  timeZone = "Asia/Kolkata",
  locale = "en-IN",
}: LiveLocalTimeProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone,
    });

    const update = () => setTime(formatter.format(new Date()));

    update();
    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, [locale, timeZone]);

  return <span suppressHydrationWarning>{time}</span>;
}
