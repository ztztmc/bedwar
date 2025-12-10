import axios from "axios";
import * as cheerio from "cheerio";

const TTL = 10 * 60 * 1000; // 10 min cache
const cache: Record<string, { expires: number; data: any }> = {};

export interface MapRotationData {
  entering: string[];
  leaving: string[];
}

export async function fetchMapRotation(): Promise<MapRotationData | null> {
  const cacheKey = "map-rotation";

  //check in cache
  const cached = cache[cacheKey];
  if (cached && Date.now() < cached.expires) {
    return cached.data;
  }

  try {
    const response = await axios.get(
      String(process.env.HYPIXEL_BEDWARS_MAP_ROTATION_RAW),
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "Content-Type": "application/json",
        },
      }
    );

    const html = response.data;
    const $ = cheerio.load(html);

    const bbWrappers = $(".bbWrapper");
    const latestPost = bbWrappers.last();

    if (!latestPost.length) return null;

    const enteringMaps: string[] = [];
    const leavingMaps: string[] = [];

    $(latestPost)
      .find("tr")
      .each((_, row) => {
        const cells = $(row).find("td");
        if (cells.length === 2) {
          const leftMap = $(cells[0]).text().trim();
          const rightMap = $(cells[1]).text().trim();

          if (leftMap) enteringMaps.push(leftMap);
          if (rightMap) leavingMaps.push(rightMap);
        }
      });

    const parsed: MapRotationData = {
      entering: enteringMaps,
      leaving: leavingMaps,
    };

    //save to cache
    cache[cacheKey] = {
      expires: Date.now() + TTL,
      data: parsed,
    };

    return parsed;
  } catch (error) {
    console.error("Error fetching map rotation:", error);
    return null;
  }
}
