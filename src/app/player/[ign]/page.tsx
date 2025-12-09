import { getHypixelPlayer } from "@/lib/hypixel";

export default async function PlayerPage(props: {
  params: Promise<{ ign: string }>;
}) {
  const { ign } = await props.params;

  const hypixelData = await getHypixelPlayer(ign);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Player Stats: {ign}</h1>

      {hypixelData.player ? (
        <pre>{JSON.stringify(hypixelData.player, null, 2)}</pre>
      ) : (
        <p>No Hypixel profile found.</p>
      )}
    </div>
  );
}
