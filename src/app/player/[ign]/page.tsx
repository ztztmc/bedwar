import { PlayerLoginInfo } from "@/components/player/PlayerLoginInfo";
import PlayerQuickbuy from "@/components/player/PlayerQuickbuy";
import PlayerSkin from "@/components/player/PlayerSkin";
import { Button } from "@/components/ui/button";
import {
  getHypixelPlayer,
  getHypixelStatus,
  getHypixelGuildName,
} from "@/lib/hypixel";
import { mcToHtml } from "@/lib/mc-colors";
import { getPolsuAvgPing, getPolsuBedwars, parseFormattedName } from "@/lib/polsu";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const safeDiv = (a: number, b: number) => (b > 0 ? a / b : 0);

const safeDivString = (a: number, b: number): string => {
  if (b > 0) {
    return (a / b).toFixed(2);
  }
  return "0.00";
};

function normalizeUrl(url: string) {
  if (!url) return "#";

  const trimmed = url.trim();

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export default async function PlayerPage(props: {
  params: Promise<{ ign: string }>;
}) {
  const { ign } = await props.params;

  const hypixelData = await getHypixelPlayer(ign);
  const statusData = await getHypixelStatus(ign);
  const player = hypixelData?.player;
  const status = statusData?.session;

  if (hypixelData?.success && !player) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-230px)]">
        <Image
          src="/crying.png"
          width={125}
          height={0}
          alt="crying emoji"
          className="opacity-50 -z-1"
        />
        <div className="-mt-8">
          <h1 className="text-center text-lg">
            Couldn't find a player with the name "{ign}".
          </h1>
          <p className="text-center text-muted-foreground mt-1">
            Either a player with this ign does not exist or hasn't joined
            Hypixel
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

  if (!player || !status) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-230px)]">
        <Image
          src="/crying.png"
          width={125}
          height={0}
          alt="crying emoji"
          className="opacity-50 -z-1"
        />
        <div className="-mt-8">
          <h1 className="text-center text-lg">
            Couldn't get Hypixel Bedwars stats.
          </h1>
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

  const guild = await getHypixelGuildName(ign);

  const isStaff = player.rank ?? false;

  const bedwars = player.stats?.Bedwars ?? {};
  const achievements = player.achievements ?? {};

  const gamesPlayed = bedwars.games_played_bedwars ?? 0;
  const wins = achievements.bedwars_wins ?? 0;

  const winRate = safeDivString(wins, gamesPlayed) + " %";

  const uuid = player.uuid;
  const online = status.online;

  const polsu = await getPolsuBedwars(uuid);
  const ping = await getPolsuAvgPing(uuid)
  const formattedName = polsu?.formatted ?? player?.displayname;
  let { stars, rank, name } = parseFormattedName(formattedName);

  if (isStaff) {
    rank = "§cStaff";
  }

  return (
    <main className="max-w-6xl mx-auto mt-2 p-4">
      <div className="flex lg:flex-row flex-col gap-6 justify-center items-start">
        <div className="flex flex-col">
          {/* Skin Image */}
          <PlayerSkin uuid={uuid} ign={ign} />
          {/* View In */}
          <p className="text-muted-foreground mt-4">View in</p>
          <a
            href={"https://namemc.com/profile/" + ign}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex justify-between items-center gap-2 hover:text-primary/88 transition-colors"
          >
            NameMC <ExternalLink className="w-5 mb-1" />
          </a>
          <a
            href={"https://plancke.io/hypixel/player/stats/" + ign}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex justify-between items-center gap-2 hover:text-primary/88 transition-colors"
          >
            Plancke <ExternalLink className="w-5 mb-1" />
          </a>
          {/* Player Links */}
          {player.socialMedia?.links && (
            <div>
              <p className="text-muted-foreground mt-4">Player Links</p>
              {player.socialMedia.links.DISCORD && (
                <p className="font-bold text-sm text-muted-foreground flex items-center gap-2">
                  <Image
                    src="/discord.png"
                    width={20}
                    height={0}
                    alt="discord logo"
                    className="dark:invert"
                  />
                  <span className="font-normal text-[16px] text-primary">
                    {player.socialMedia.links.DISCORD}
                  </span>
                </p>
              )}
              {player.socialMedia.links.YOUTUBE && (
                <a
                  href={normalizeUrl(player.socialMedia.links.YOUTUBE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer flex justify-between items-center gap-2 hover:text-primary/88 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src="/youtube.png"
                      width={20}
                      height={0}
                      alt="youtube logo"
                      className="dark:invert"
                    />
                    Youtube{" "}
                  </div>
                  <ExternalLink className="w-5 mb-1" />
                </a>
              )}
            </div>
          )}
        </div>
        {/* Player Info */}
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18">
              <p
                className="font-bold text-lg bg-primary-foreground rounded-[calc(1rem-1px)] px-2 py-0.5"
                dangerouslySetInnerHTML={{ __html: mcToHtml(rank) }}
              />
            </div>
            <div className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18">
              <p
                className="font-bold text-lg bg-primary-foreground rounded-[calc(1rem-1px)] px-2 py-0.5"
                dangerouslySetInnerHTML={{ __html: mcToHtml(stars) }}
              />
            </div>
            {ping && (
              <div className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18">
                <p className="font-bold text-lg bg-primary-foreground rounded-[calc(1rem-1px)] px-2 py-0.5">
                  {ping}<span className="text-muted-foreground">ms</span>
                </p>
              </div>
            )}
            {guild && (
              <div className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18">
                <p className="font-bold text-lg text-green-600 bg-primary-foreground rounded-[calc(1rem-1px)] px-2 py-0.5">
                  {guild}
                </p>
              </div>
            )}
          </div>
          <h1
            className="text-4xl font-bold mt-2"
            dangerouslySetInnerHTML={{ __html: mcToHtml(name) }}
          />
          <PlayerLoginInfo player={player} online={online} />
          <p className="text-muted-foreground">
            {gamesPlayed} Bedwars games played
          </p>
          <div className="mt-4">
            <Stat
              label1="Wins"
              value1={achievements.bedwars_wins ?? 0}
              label2="Losses"
              value2={bedwars.losses_bedwars ?? 0}
              label3="WLR"
              value3={safeDiv(
                achievements.bedwars_wins ?? 0,
                bedwars.losses_bedwars ?? 0
              )}
              label4="Win Rate"
              value4={winRate}
            />
            <Stat
              label1="Beds Broken"
              value1={achievements.bedwars_beds ?? 0}
              label2="Beds Lost"
              value2={bedwars.beds_lost_bedwars ?? 0}
              label3="BBLR"
              value3={safeDiv(
                achievements.bedwars_beds ?? 0,
                bedwars.beds_lost_bedwars ?? 0
              )}
              label4="Beds/Game"
              value4={safeDiv(achievements.bedwars_beds ?? 0, gamesPlayed ?? 0)}
            />
            <Stat
              label1="Kills"
              value1={bedwars.kills_bedwars ?? 0}
              label2="Deaths"
              value2={bedwars.deaths_bedwars ?? 0}
              label3="KDR"
              value3={safeDiv(
                bedwars.kills_bedwars ?? 0,
                bedwars.deaths_bedwars ?? 0
              )}
              label4="Kills/Game"
              value4={safeDiv(bedwars.kills_bedwars ?? 0, gamesPlayed ?? 0)}
            />
            <Stat
              label1="Final Kills"
              value1={bedwars.final_kills_bedwars ?? 0}
              label2="Final Deaths"
              value2={bedwars.final_deaths_bedwars ?? 0}
              label3="FKDR"
              value3={safeDiv(
                bedwars.final_kills_bedwars ?? 0,
                bedwars.final_deaths_bedwars ?? 0
              )}
              label4="Finals/Game"
              value4={safeDiv(
                bedwars.final_kills_bedwars ?? 0,
                gamesPlayed ?? 0
              )}
            />
          </div>
        </div>
        <div className="mt-2">
          <PlayerQuickbuy favourites={bedwars.favourites_2} />
        </div>
      </div>
    </main>
  );
}

function Stat({
  label1,
  value1,
  label2,
  value2,
  label3,
  value3,
  label4,
  value4,
}: {
  label1: string;
  value1: number;
  label2: string;
  value2: number;
  label3: string;
  value3: number;
  label4: string;
  value4: number | string;
}) {
  return (
    <div className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18 mt-2">
      <div className="flex items-center w-105">
        <div className="bg-primary-foreground p-3 rounded-tl-[calc(1rem-1px)] rounded-bl-[calc(1rem-1px)] w-105">
          <p className="text-sm text-muted-foreground">{label1}</p>
          <p className="text-lg font-semibold">{value1.toLocaleString()}</p>
        </div>
        <div className="bg-secondary p-3 w-105">
          <p className="text-sm text-muted-foreground">{label2}</p>
          <p className="text-lg font-semibold">{value2.toLocaleString()}</p>
        </div>
        <div className="bg-primary-foreground p-3 w-105">
          <p className="text-sm text-muted-foreground">{label3}</p>
          <p className="text-lg font-semibold">{value3.toLocaleString()}</p>
        </div>
        <div className="bg-secondary p-3 rounded-tr-[calc(1rem-1px)] rounded-br-[calc(1rem-1px)] w-105">
          <p className="text-sm text-muted-foreground">{label4}</p>
          <p className="text-lg font-semibold">{value4.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
