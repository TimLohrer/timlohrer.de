"use client";

export default function Footer() {
  return (
    <div className="pb-10 w-full flex items-center justify-center bg-linear-to-t from-white/50 to-white/0 dark:from-black/50 dark:to-black/0">
      <p className="text-[.85rem] opacity-75">© {new Date().getFullYear()} Tim - All rights reserved.</p>
    </div>
  );
}