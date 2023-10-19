"use client";

import { useTheme } from "next-themes";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export interface IIconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

export default function IconPicker({
  asChild,
  onChange,
  children,
}: IIconPickerProps) {
  const { resolvedTheme } = useTheme();

  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    light: Theme.LIGHT,
    dark: Theme.DARK,
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
}
