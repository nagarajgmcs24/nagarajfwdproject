import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <AlertCircle className="w-20 h-20 text-destructive/50" />
        </div>
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3">Page Not Found</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Sorry! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="flex flex-col gap-3">
          <Link to="/">
            <Button className="w-full font-semibold">Return to Home</Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="text-primary font-medium hover:underline text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
