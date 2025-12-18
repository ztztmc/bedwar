import { HypixelRecentGame, formatBedwarsMode } from "@/lib/hypixel";
import { formatRelativeTime } from "@/lib/date-time-formatter";

type RecentGamesProps = {
  recentGames: HypixelRecentGame[] | undefined;
};

export default function RecentGames({ recentGames }: RecentGamesProps) {
  if (
    !recentGames ||
    recentGames.length === 0 ||
    recentGames[0].gameType != "BEDWARS" ||
    recentGames[1].gameType != "BEDWARS" ||
    recentGames[2].gameType != "BEDWARS"
  ) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground">Recent Games</p>
      {recentGames.map((game, index) => (
        <div
          key={index}
          className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18"
        >
          <div className="bg-primary-foreground rounded-[calc(1rem-1px)] px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm font-medium gap-2">
                {formatBedwarsMode(game.mode)}
                {game.map && (
                  <div className="text-xs text-muted-foreground">
                    {game.map}
                  </div>
                )}
              </div>

              <div className="text-xs text-muted-foreground">
                {formatRelativeTime(game.date)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
