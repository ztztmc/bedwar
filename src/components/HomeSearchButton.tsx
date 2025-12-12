"use client";

import { useSearch } from "@/components/SearchProvider";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

export const HomeSearchButton = () => {
  const { setOpen } = useSearch();

  return (
    <Button
      variant="outline"
      size="lg"
      className="cursor-pointer backdrop-blur-lg items-center text-sm md:text-[16px] text-muted-foreground px-3 py-2 justify-between w-[332px] md:w-[360px] block mx-auto sm:-mt-38 border-none shadow-lg sm:shadow-[0px_0px_10px_10px_rgba(0,0,0,0.1)]"
      onClick={() => setOpen(true)}
    >
      <div className="flex justify-center items-center gap-2">
        <Search strokeWidth={3} />
        Enter an IGN to view Hypixel Bedwars stats
      </div>
    </Button>
  );
};
