import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Kbd } from "./ui/kbd";

const Navbar = () => {
  return (
    <header className="sticky top-0 flex justify-between items-center mx-auto max-w-6xl bg-background shadow-lg shadow-background p-4">
      <div className="flex justify-between items-center gap-3 md:gap-5 transition-all">
        <Link className="flex justify-center items-center gap-2" href="/">
          <Image
            src="/logo-transparent-black.png"
            width={35}
            height={0}
            alt="bedwar logo"
            className="dark:invert"
          />
          <h1 className="font-bold">bedwar.xyz</h1>
        </Link>
        <nav className="flex justify-center items-center gap-2 md:gap-4 transition-all">
          <Link
            href="/maps"
            className="font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Maps
          </Link>
          <Link
            href="/session"
            className="font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Session
          </Link>
        </nav>
      </div>
      <div className="md:hidden flex items-center gap-2">
        <Button variant="secondary" size="icon">
          <Search />
        </Button>
        <ModeToggle />
      </div>
      <div className="hidden md:flex justify-center items-center gap-2">
        <Button
          variant="secondary"
          className="cursor-pointer items-center text-sm text-muted-foreground px-3 py-2 justify-between w-45"
        >
          <div className="flex items-center gap-2">
            <Search />
            Search Player
          </div>
          <Kbd className="rounded-[6px] bg-input">/</Kbd>
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
};
export default Navbar;
