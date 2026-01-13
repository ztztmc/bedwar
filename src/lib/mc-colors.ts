const COLOR_MAP: Record<string, string> = {
  "§0": "#000000",
  "§1": "#0000AA",
  "§2": "#00AA00",
  "§3": "#00AAAA",
  "§4": "#AA0000",
  "§5": "#AA00AA",
  "§6": "#FFAA00",
  "§7": "#AAAAAA",
  "§8": "#555555",
  "§9": "#5555FF",
  "§a": "#55FF55",
  "§b": "#55FFFF",
  "§c": "#FF5555",
  "§d": "#FF55FF",
  "§e": "#FFFF55",
  "§f": "#FFFFFF",
};

export function mcToHtml(text: string): string {
  let result = "";
  let currentColor = "#FFFFFF";

  for (let i = 0; i < text.length; i++) {
    if (text[i] === "§") {
      const code = `§${text[i + 1]}`;
      if (COLOR_MAP[code]) {
        currentColor = COLOR_MAP[code];
        i++;
        continue;
      }
    }

    result += `<span style="color:${currentColor}">${text[i]}</span>`;
  }

  return result;
}

const levelColorPalette: Record<string, string[]> = {
  "0": ["§7", "§7", "§7", "§7", "§7", "§7", "§7"],
  "100": ["§f", "§f", "§f", "§f", "§f", "§f", "§f"],
  "200": ["§6", "§6", "§6", "§6", "§6", "§6", "§6"],
  "300": ["§b", "§b", "§b", "§b", "§b", "§b", "§b"],
  "400": ["§2", "§2", "§2", "§2", "§2", "§2", "§2"],
  "500": ["§3", "§3", "§3", "§3", "§3", "§3", "§3"],
  "600": ["§4", "§4", "§4", "§4", "§4", "§4", "§4"],
  "700": ["§d", "§d", "§d", "§d", "§d", "§d", "§d"],
  "800": ["§9", "§9", "§9", "§9", "§9", "§9", "§9"],
  "900": ["§5", "§5", "§5", "§5", "§5", "§5", "§5"],
  "1000": ["§c", "§6", "§e", "§a", "§b", "§d", "§5"],
  "1100": ["§7", "§f", "§f", "§f", "§f", "§f", "§7"],
  "1200": ["§7", "§e", "§e", "§e", "§e", "§6", "§7"],
  "1300": ["§7", "§b", "§b", "§b", "§b", "§3", "§7"],
  "1400": ["§7", "§a", "§a", "§a", "§a", "§2", "§7"],
  "1500": ["§7", "§3", "§3", "§3", "§3", "§9", "§7"],
  "1600": ["§7", "§c", "§c", "§c", "§c", "§4", "§7"],
  "1700": ["§7", "§d", "§d", "§d", "§d", "§5", "§7"],
  "1800": ["§7", "§9", "§9", "§9", "§9", "§1", "§7"],
  "1900": ["§7", "§5", "§5", "§5", "§5", "§d", "§7"],
  "2000": ["§8", "§7", "§f", "§f", "§7", "§7", "§8"],
  "2100": ["§f", "§f", "§e", "§e", "§6", "§6", "§6"],
  "2200": ["§6", "§6", "§f", "§f", "§b", "§3", "§3"],
  "2300": ["§5", "§5", "§d", "§d", "§6", "§e", "§e"],
  "2400": ["§b", "§b", "§f", "§f", "§7", "§7", "§8"],
  "2500": ["§f", "§f", "§a", "§a", "§2", "§2", "§2"],
  "2600": ["§4", "§4", "§c", "§c", "§d", "§d", "§5"],
  "2700": ["§e", "§e", "§f", "§f", "§8", "§8", "§8"],
  "2800": ["§a", "§a", "§2", "§2", "§6", "§6", "§e"],
  "2900": ["§b", "§b", "§3", "§3", "§9", "§9", "§1"],
  "3000": ["§e", "§e", "§6", "§6", "§c", "§c", "§4"],
};

export function getStarIcon(level: number) {
  if (level < 1100) return "✫";
  if (level < 2100) return "✪";
  if (level < 3100) return "⚝";
  return "✫";
}

export function formatLevel(level: number) {
  if (!Number.isInteger(level)) {
    console.log(`${level} is not an integer`);
    return null;
  }
  const formattedLevel = "[" + level + getStarIcon(level) + "]";

  const prestige = Math.floor(level / 100) * 100;
  const colorPalette = levelColorPalette[prestige] || null;
  if (!colorPalette) return formattedLevel; //if colors arnt identified skips formatting
  let result = "";
  for (let i = 0; i < formattedLevel.length; i++) {
    result += colorPalette[i] + formattedLevel[i];
  } //This assumes the colorPaelette.length >= formattedLevel.length
  return result;
}
