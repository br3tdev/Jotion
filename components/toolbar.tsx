"use client";

import { Doc } from "@/convex/_generated/dataModel";
import IconPicker from "./icon-picker";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImageStore } from "@/hooks/use-cover-image";

export interface IToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export default function Toolbar({ initialData, preview }: IToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const coverImage = useCoverImageStore();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    update({ id: initialData._id, title: value || "Untitled" });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableEditing();
    }
  };

  const onIconSelect = (icon: string) => {
    update({ id: initialData._id, icon });
  };

  const onRemoveIcon = () => {
    removeIcon({ id: initialData._id });
  };

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant={"outline"}
            size={"icon"}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100 transition">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-xs text-muted-foreground"
              variant={"outline"}
              size={"sm"}
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className="text-xs text-muted-foreground"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableEditing}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
}