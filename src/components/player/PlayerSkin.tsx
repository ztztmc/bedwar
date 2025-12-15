"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

type Props = {
  uuid: string;
  ign: string;
};

export default function PlayerSkin({ uuid, ign }: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18">
      <div className="bg-primary-foreground rounded-[calc(1rem-1px)] w-46 h-46 relative overflow-hidden">
        {/* Skeleton */}
        {!loaded && (
          <Image
            src="/player-skeleton.png"
            alt="Loading player skin"
            width={185}
            height={185}
            className="absolute inset-0 object-contain"
          />
        )}

        {/* Actual skin */}
        <img
          ref={imgRef}
          src={`https://vzge.me/bust/256/${uuid}`}
          alt={`${ign} skin`}
          width={185}
          height={185}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 transition-opacity duration-200 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
