import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchMapRotation } from "@/lib/fetch-map-rotation";
import { ExternalLink, Minus, Plus } from "lucide-react";

export default async function MapRotationPage() {
  const data = await fetchMapRotation();

  if (!data) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)]">
        <Image
          src="/crying.png"
          width={125}
          height={0}
          alt="crying emoji"
          className="opacity-50 -z-1"
        />
        <div className="-mt-8">
          <h1 className="text-center text-lg">Failed to load map data.</h1>
          <p className="text-center text-muted-foreground mt-1">
            Sorry about the inconvenience. Please try again later.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/">
            <Button className="cursor-pointer font-bold mt-3">Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto mt-2 p-4">
      <h1 className="text-4xl font-bold bg-linear-to-b mb-1 pb-1">
        Map Rotation
      </h1>
      <div className="flex flex-col md:flex-row justify-between md:items-center text-muted-foreground">
        <p className="font-medium mb-2 md:mb-0">
          The latest Hypixel Bedwars map rotation.
        </p>
        <a
          href="https://hypixel.net/threads/bed-wars-map-rotation-log.4441812/page-10"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center cursor-pointer font-medium max-w-[92px] bg-secondary hover:bg-secondary/80 gap-1 rounded-md transition-colors px-2 py-1">
            Source <ExternalLink className="w-5 h-5" />
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-3">
        <div className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18">
          <div className="bg-primary-foreground rounded-[calc(1rem-1px)] p-4 h-full">
            <h2 className="flex justify-between items-center text-xl font-bold gap-1 mb-4 ml-1">
              Entering Rotation
              <Plus />
            </h2>
            {data.entering.length > 0 ? (
              <div className="pl-2 space-y-0.5">
                {data.entering.map((mapName, index) => (
                  <p key={index} className="font-medium text-foreground">
                    {mapName}
                  </p>
                ))}
              </div>
            ) : (
              <p className="italic text-foreground">
                Couldn't get maps, try again later.
              </p>
            )}
          </div>
        </div>
        <div className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18">
          <div className="bg-primary-foreground rounded-[calc(1rem-1px)] p-4 h-full">
            <h2 className="flex justify-between items-center text-xl font-bold gap-1 mb-4 ml-1">
              Leaving Rotation
              <Minus />
            </h2>
            {data.leaving.length > 0 ? (
              <div className="pl-2 space-y-0.5">
                {data.leaving.map((mapName, index) => (
                  <p key={index} className="font-medium text-foreground">
                    {mapName}
                  </p>
                ))}
              </div>
            ) : (
              <p className="italic text-foreground">
                Couldn't get maps, try again later.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
