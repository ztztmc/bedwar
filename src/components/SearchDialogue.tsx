"use client";

import { CommandDialog, CommandInput } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchDialogueProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchDialogue = ({ open, setOpen }: SearchDialogueProps) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      setOpen(false);
      router.push(`/player/${value}`);
      setValue("");
    }
  };

  const handleValueChange = (input: string) => {
    //only letters, numbers, and underscores
    const sanitized = input.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 16);;
    setValue(sanitized);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Enter an IGN, then press Enter to view stats"
        value={value}
        onValueChange={handleValueChange}
        onKeyDown={handleKeyDown}
      />
    </CommandDialog>
  );
};
export default SearchDialogue;
