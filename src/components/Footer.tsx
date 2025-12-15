import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="max-w-6xl mx-auto mt-10 p-4 w-full mb-2">
      <div className="sm:flex mt-2 justify-between items-center gap-2 md:gap-5 transition-all">
        <Link className="flex-col justify-center items-center gap-5" href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-transparent-black.png"
              width={32}
              height={0}
              alt="bedwar logo"
              className="dark:invert"
            />
            <h1 className="font-bold">bedwar.xyz</h1>
          </div>
          <p className="text-sm text-muted-foreground max-w-[250px]">
            View Hypixel Bedwars stats, track sessions, view map pool and
            rotations.
          </p>
        </Link>
        <div className="text-muted-foreground text-sm mt-5 sm:mt-0 -mb-1">
          <div>&nbsp;</div>
          <div className="flex items-center gap-1">
            Made with
            <Heart stroke="0" className="fill-secondary-foreground w-5" />
            by
            <a
              href="https://ztzt.is-a.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              ztzt
            </a>{" "}
            | ztztalt@gmail.com
          </div>
          <div className="flex items-center gap-1">
            Powered by the
            <a
              href="https://api.hypixel.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Hypixel API
            </a>{" "}
            and{" "}
            <a
              href="https://api.polsu.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Polsu API
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
