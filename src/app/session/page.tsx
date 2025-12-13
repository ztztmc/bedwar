import Image from "next/image"

const SessionPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-215px)]">
      <Image
              src="/construction.png"
              width={120}
              height={0}
              alt="construction icon"
              className="opacity-40 -z-1 dark:invert"
            />
            <div className="-mt-8 text-center">
          <h1 className="text-lg">Coming Soon</h1>
          <p className="text-muted-foreground mt-1">Sessions will be available soon!</p></div>
        </div>
  )
}

export default SessionPage