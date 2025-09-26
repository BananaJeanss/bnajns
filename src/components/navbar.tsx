import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/50 p-4 border-b-black text-white z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">BnaJns</h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="transition hover:underline hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className="transition hover:underline hover:text-blue-400">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/blog" className="transition hover:underline hover:text-blue-400">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/services" className="transition hover:underline hover:text-blue-400">
              Service Statuses
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
