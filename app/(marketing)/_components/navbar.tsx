"use client";

import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "shadow-md border-b"
      )}
    >
      <Logo />
      <div className="flex items-center justify-between md:justify-end md:ml-auto w-full gap-x-2">
        <ModeToggle />
      </div>
    </div>
  );
}
