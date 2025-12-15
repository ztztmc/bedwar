const POLSU_ENDPOINT = "https://api.polsu.xyz/polsu/bedwars/formatted";

export async function getPolsuBedwars(uuid: string) {
  try {
    const res = await fetch(`${POLSU_ENDPOINT}?uuid=${uuid}`, {
      method: "GET",
      headers: {
        "API-Key": process.env.POLSU_API_KEY!,
      },
      next: { revalidate: 180 }, //3 min cache
    });

    if (!res.ok) {
      console.log("Polsu HTTP error:", res.status);
      return null;
    }

    const json = await res.json();

    if (!json.success || !json.data) {
      return null;
    }

    return json.data;
  } catch (err) {
    console.error("Polsu fetch failed:", err);
    return null;
  }
}

type ParsedPlayerName = {
  stars: string;
  rank: string;
  name: string;
};

const COLOR_CODE_REGEX = /§[0-9a-fk-or]/gi;

function stripBrackets(text: string): string {
  return text.replace(/[\[\]]/g, "");
}

function getLastColor(str: string): string {
  const matches = str.match(COLOR_CODE_REGEX);
  return matches ? matches[matches.length - 1]! : "";
}

export function parseFormattedName(formatted: string): ParsedPlayerName {
  const bracketRegex = /(§[0-9a-fk-or])*?\[[^\]]+\]/gi;
  const matches = [...formatted.matchAll(bracketRegex)];

  let stars = "§7 0✫";
  let rank = "§7 No rank";
  let remaining = formatted;

  if (matches.length >= 1) {
    stars = stripBrackets(matches[0][0]);
    remaining = remaining.replace(matches[0][0], "").trim();
  }

  if (matches.length >= 2) {
    rank = matches[1][0];
    remaining = remaining.replace(matches[1][0], "").trim();
  }

  const nameColor = getLastColor(formatted.replace(remaining, ""));
  const name = nameColor + remaining.replace(COLOR_CODE_REGEX, "");

  return {
    stars,
    rank,
    name,
  };
}
