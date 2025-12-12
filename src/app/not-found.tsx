import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-215px)]">
      <Image
        src="/huh.png"
        width={140}
        height={0}
        alt="huh emoji"
        className="opacity-50 -z-1"
      />
      <div className="-mt-10">
        <h1 className="text-center text-lg">
          The page you're looking for isn't available.
        </h1>

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
          <Button className="cursor-pointer font-bold mt-3">Home</Button>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
