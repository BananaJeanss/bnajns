import React from "react";

export default function Footer() {
  return (
    <footer className="p-8 text-center text-sm text-white/50 bg-black/50">
      {new Date().getFullYear()} BananaJeans. All{" "}
      {Math.random() < 0.5 ? "rights" : "lefts"} reserved.
    </footer>
  );
}
