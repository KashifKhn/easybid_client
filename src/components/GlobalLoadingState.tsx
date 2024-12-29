import { LoadingSpinner } from "./ui/LoadingSpinner";

interface GlobalLoadingStateProps {
  message?: string;
  isFullScreen?: boolean;
}

export function GlobalLoadingState({
  message = "Loading...",
  isFullScreen = true,
}: GlobalLoadingStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center
${isFullScreen ? "min-h-screen" : "min-h-[200px]"}

w-full p-4`}
    >
      <LoadingSpinner />
      <p className="mt-4 text-lg text-muted-foreground">{message}</p>
    </div>
  );
}
