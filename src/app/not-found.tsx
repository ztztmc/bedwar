import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-[calc(100vh-70px)]">
      <div>
        <p className="text-center text-lg">
          The page you're looking for isn't available.
        </p>

        <p className="text-center text-muted-foreground mt-2">
          If you're trying to get a player's stats, go to
        </p>
        <div className="flex text-center bg-secondary max-w-68 gap-2 mx-auto rounded-md mt-1 px-2 py-1.5">
          <Check />
          <div>
            <span className="font-medium font-mono text-muted-foreground">
              bedwar.xyz
            </span>
            <span className="font-medium font-mono">/player/[ign]</span>
          </div>
        </div>
        <div className="flex text-center bg-secondary max-w-68 gap-2 mx-auto rounded-md mt-1 px-2 py-1.5">
          <X className="" />
          <div>
            <span className="font-medium font-mono text-muted-foreground">
              bedwar.xyz
            </span>
            <span className="font-medium font-mono">/[ign]</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Link href="/">
          <Button className="cursor-pointer font-bold">Home</Button>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
