import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface GlobalErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function GlobalErrorState({
  title = "Error",
  message = "An error occurred. Please try again.",
  onRetry,
}: GlobalErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full p-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      {onRetry && (
        <Button onClick={onRetry} className="mt-4">
          Retry
        </Button>
      )}
    </div>
  );
}
