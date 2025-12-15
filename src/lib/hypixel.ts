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
  const cacheKey = `hypixel-player-${username.toLowerCase()}`;

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

export type HypixelStatusResponse = {
  success: boolean;
  uuid: string;
  session: {
    online: boolean;
    gameType?: string;
    mode?: string;
    map?: string;
  };
};

export async function getHypixelStatus(
  username: string
): Promise<HypixelStatusResponse> {
  const cacheKey = `hypixel-status-${username.toLowerCase()}`;

  const cached = cache[cacheKey];
  if (cached && Date.now() < cached.expires) {
    return cached.data;
  }

  const uuid = await getUUIDFromUsername(username);

  const res = await fetch(
    `https://api.hypixel.net/status?key=${process.env.HYPIXEL_API_KEY}&uuid=${uuid}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Hypixel status data.");
  }

  const data = (await res.json()) as HypixelStatusResponse;

  cache[cacheKey] = {
    expires: Date.now() + TTL,
    data,
  };

  return data;
}

export type HypixelGuildNameResponse = string | null;

export async function getHypixelGuildName(
  username: string
): Promise<HypixelGuildNameResponse> {
  const cacheKey = `hypixel-guild-${username.toLowerCase()}`;

  //check in cache
  const cached = cache[cacheKey];
  if (cached && Date.now() < cached.expires) {
    return cached.data;
  }

  const uuid = await getUUIDFromUsername(username);

  const res = await fetch(
    `https://api.hypixel.net/guild?key=${process.env.HYPIXEL_API_KEY}&player=${uuid}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Hypixel guild data.");
  }

  const data = await res.json();

  //player has no guild
  if (!data.success || !data.guild) {
    cache[cacheKey] = {
      expires: Date.now() + TTL,
      data: null,
    };
    return null;
  }

  const guildName = data.guild.name ?? null;

  cache[cacheKey] = {
    expires: Date.now() + TTL,
    data: guildName,
  };

  return guildName;
}
