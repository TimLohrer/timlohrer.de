"use client";

export default function Footer() {
  return (
    <footer className="relative bottom-[5rem] flex items-center justify-center bg-gradient-to-t from-white/50 to-white/0 dark:from-black/50 dark:to-black/0">
      <p className="text-[.85rem] opacity-75">© {new Date().getFullYear()} Tim Lohrer. All rights reserved.</p>
    </footer>
  );
}