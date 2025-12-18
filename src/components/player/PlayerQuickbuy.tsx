"use client";

type PlayerQuickbuyProps = {
  favourites: string;
};

export default function PlayerQuickbuy({ favourites }: PlayerQuickbuyProps) {
  if (!favourites) return null;

  const items: string[] = favourites.split(",").slice(0, 21);

  return (
    <div className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18">
      <div className="grid grid-cols-7 grid-rows-3 gap-1 bg-primary-foreground rounded-[calc(1rem-1px)] p-2 w-fit">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-lg p-px bg-linear-to-br dark:from-foreground/18 via-secondary dark:to-foreground/18"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-[calc(1rem-1px)] border-neutral-600">
              {item ? (
                <img
                  src={`/bedwars-items/${item}.png`}
                  alt={item}
                  className="w-8 h-8 select-none pointer-events-none"
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.textContent = "-";
                  }}
                />
              ) : (
                <span className="text-lg font-bold">-</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
