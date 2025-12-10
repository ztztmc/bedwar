const TTL = 3 * 60 * 1000; //3 min cache
const cache: Record<string, { expires: number; data: any }> = {};

export async function getUUIDFromUsername(username: string): Promise<string> {
  const res = await fetch(`https://api.minetools.eu/uuid/${username}`);
  if (!res.ok) {
    throw new Error("Failed to fetch UUID from username.");
  }

  const data = await res.json();
  if (!data.id) {
    throw new Error("UUID not found for this username.");
  }

  return data.id;
}

export async function getHypixelPlayer(username: string) {
  const cacheKey = `hypixel-${username.toLowerCase()}`;

  //check in cache
  const cached = cache[cacheKey];
  if (cached && Date.now() < cached.expires) {
    return cached.data;
  }

  const uuid = await getUUIDFromUsername(username);

  const res = await fetch(
    `https://api.hypixel.net/player?key=${process.env.HYPIXEL_API_KEY}&uuid=${uuid}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Hypixel data.");
  }

  const data = await res.json();

  //save data to cache
  cache[cacheKey] = {
    expires: Date.now() + TTL,
    data,
  };

  return data;
}
