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
