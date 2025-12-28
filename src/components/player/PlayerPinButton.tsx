"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

export function PlayerPinButton({ ign }: { ign: string }) {
  const [isPinned, setIsPinned] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const checkPinStatus = () => {
      const stored = localStorage.getItem("pinnedPlayers");
      if (stored) {
        const pinned = JSON.parse(stored) as string[];
        const pinnedStatus = pinned.includes(ign);
        setIsPinned(pinnedStatus);
        
        // Disable if not pinned and max reached
        if (!pinnedStatus && pinned.length >= 3) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      } else {
          setIsPinned(false);
          setDisabled(false);
      }
    };

    checkPinStatus();
  }, [ign]);

  const togglePin = () => {
    const stored = localStorage.getItem("pinnedPlayers");
    let pinned: string[] = stored ? JSON.parse(stored) : [];

    if (isPinned) {
      pinned = pinned.filter((p) => p !== ign);
      setIsPinned(false);
      setDisabled(false);
    } else {
      if (pinned.length >= 3) return;
      pinned.push(ign);
      setIsPinned(true);
    }

    localStorage.setItem("pinnedPlayers", JSON.stringify(pinned));
  };
  
  if (disabled) {
      return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="inline-block" tabIndex={0}>
                         <Button variant="secondary" disabled className="pointer-events-none opacity-50 justify-end">
                            <Pin className="-rotate-45" /> Pin
                        </Button>
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>You can have a maximum of 3 pinned players</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      )
  }

  return (
    <Button variant="secondary" onClick={togglePin} className="cursor-pointer justify-end">
      {isPinned ? (
        <>
          <Pin className="-rotate-45 fill-foreground" /> Unpin
        </>
      ) : (
        <>
          <Pin className="-rotate-45" /> Pin
        </>
      )}
    </Button>
  );
}
