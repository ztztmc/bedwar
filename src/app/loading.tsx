import { WaveLoader } from "@/components/ui/wave-loader";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-225px)]">
      <WaveLoader />
    </div>
  );
}
