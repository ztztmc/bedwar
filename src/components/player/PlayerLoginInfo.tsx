import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { CircleAlertIcon, CircleQuestionMark } from "lucide-react";
import { formatRelativeTime, formatDate } from "@/lib/date-time-formatter";

type Player = {
  firstLogin?: number;
  lastLogin?: number;
};

type PlayerLoginInfoProps = {
  player: Player;
  online?: boolean;
};

export function PlayerLoginInfo({ player, online }: PlayerLoginInfoProps) {
  const hasLastLogin =
    typeof player.lastLogin === "number" &&
    typeof player.firstLogin === "number";

  if (!hasLastLogin && player.firstLogin) {
    return (
      <p className="text-muted-foreground mt-2">
        <span className="font-bold">First Login</span>{" "}
        {formatDate(player.firstLogin)}
      </p>
    );
  }

  if (!player.firstLogin || !player.lastLogin) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p className="cursor-help select-none flex w-fit items-center gap-2 mt-2 text-muted-foreground">
          {online ? (
            <span>Online</span>
          ) : (
            <span className="underline underline-offset-2">
              Last online {formatRelativeTime(player.lastLogin)}
            </span>
          )}
        </p>
      </TooltipTrigger>

      <TooltipContent>
        <p>
          <span className="font-bold">First Login</span>{" "}
          {formatDate(player.firstLogin)}
        </p>
        <p>
          <span className="font-bold">Last Login</span>{" "}
          {formatDate(player.lastLogin)}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
