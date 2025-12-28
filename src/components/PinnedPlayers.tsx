"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function PinnedPlayers() {
  const [pinnedPlayers, setPinnedPlayers] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("pinnedPlayers");
    if (stored) {
      setPinnedPlayers(JSON.parse(stored));
    }
  }, []);

  if (pinnedPlayers.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {pinnedPlayers.map((ign) => (
        <Link
          key={ign}
          href={`/player/${ign}`}
          className="group rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18"
        >
          <div className="bg-primary-foreground hover:bg-secondary rounded-[calc(1rem-1px)] px-2 py-1 flex items-center gap-3 transition-colors h-full">
            <span className="font-medium">{ign}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
