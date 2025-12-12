import { ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HomeSearchButton } from "@/components/HomeSearchButton";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto mt-10 p-4">
      <section about="hero">
        <h1 className="text-8xl sm:text-[170px] md:text-[200px] lg:text-[280px] xl:text-[310px] sm:leading-80 text-center font-bold bg-linear-to-b from-foreground/25 dark:from-foreground/12 to-background bg-clip-text text-transparent mb-1 transition-all select-none">
          bedwar
        </h1>
        <HomeSearchButton />
      </section>

      <section about="features" className="mt-50 select-none">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          <div className="flex flex-col gap-8">
            <Link
              href="/maps"
              className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18"
            >
              <div className="bg-primary-foreground hover:bg-secondary rounded-[calc(1rem-1px)] w-full lg:w-[592px] h-45 px-5 py-4 overflow-hidden transition-colors">
                <h2 className="font-medium text-xl">Map Rotation</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  View the lastest Hypixel Bedwars map rotation.
                </p>
                <Image
                  src="/map.png"
                  alt="map png"
                  width={200}
                  height={0}
                  className="ml-45 -mt-5 opacity-12 -rotate-10 dark:invert object-cover"
                />
              </div>
            </Link>
            <Link
              href="/session"
              className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18"
            >
              <div className="bg-primary-foreground hover:bg-secondary rounded-[calc(1rem-1px)] w-full lg:w-[592px] h-45 px-5 py-4 overflow-hidden transition-colors">
                <h2 className="font-medium text-xl">Session Tracking</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Start a session, then play Bedwars. View your session stats at
                  anytime, or stop the session.
                </p>
                <Image
                  src="/timer.png"
                  alt="Stopwatch png"
                  width={220}
                  height={0}
                  className="ml-40 opacity-12 rotate-10 dark:invert object-cover"
                />
              </div>
            </Link>
          </div>

          <a
            href="https://guess.bedwar.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18"
          >
            <div className="bg-primary-foreground hover:bg-secondary rounded-[calc(1rem-1px)] w-full md:w-[280px] px-5 py-4 overflow-hidden transition-colors h-40 md:h-full">
              <div className="flex justify-between items-center text-muted-foreground font-bold text-sm p-1">
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 fill-primary rotate-10" /> Also
                  check out
                </div>
                <ExternalLink className="w-5 h-5" />
              </div>
              <h2 className="font-medium text-xl">Guesswars</h2>
              <p className="text-sm text-muted-foreground mt-1">
                You'll be shown an image of a random spot in a random bedwars
                map, try to guess where you are. The closer your guess is, the
                more points you get.
              </p>
              <Image
                src="/location.png"
                alt="map pin png"
                width={220}
                height={0}
                className="hidden md:block ml-5 opacity-12 dark:invert object-cover"
              />
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}
