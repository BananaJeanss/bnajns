"use client";

import { useState, useEffect } from "react";

const list404s = [
  "Page Not Found",
  "This page does not exist",
  "Sorry Mario, but the page you are looking for is in another castle.",
  "Whoopsie Daisy",
  "20.0997512422",
  "I'm running out of ideas to add to this random list",
  "¯\\_(ツ)_/¯",
  "You Are Just In Time To Witness My World Domination",
  "So That Final Move Was Supposed To Be Cooler But The Internet Is Down",
  "four oh four",
  "meanwhile you should check out this handsome persons github https://github.com/BananaJeanss",
  "@grok why is this page 404",
  "qwertyuiopasdfghjklzxcvbnm",
  "Certified Estonian Seal of Quality",
  "pick up the phone baby like brrt i know you're home baby",
  "pretend this is a funny 404 message",
];

export default function Custom404() {
  const [randomMessage, setRandomMessage] = useState<string>("");

  useEffect(() => {
    setRandomMessage(list404s[Math.floor(Math.random() * list404s.length)]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-foreground">
      <h1 className="text-8xl font-bold">404</h1>
      <hr className="border-t border-white/30 w-1/4 my-4" />
      <p className="text-2xl mt-2">
        {randomMessage || "Page Not Found"}
      </p>
      <p>
        <a href="/" className="mt-6 text-blue-500 hover:underline">
          Go back home 
        </a>
        <span> or </span>
        <button
          className="mt-6 text-blue-500 hover:underline cursor-pointer"
          onClick={() => window.history.back()}
        >
          Go to previous page
        </button>
      </p>
    </div>
  );
}