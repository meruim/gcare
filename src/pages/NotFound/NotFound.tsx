import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center px-4">
      <div className="text-center text-white">
        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-bold mb-4 animate-pulse">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Page Not Found
        </h2>
        <p className="text-lg md:text-xl opacity-90 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Countdown */}
        <p className="text-sm opacity-80 mb-6">
          Redirecting to download page in {countdown} second
          {countdown !== 1 ? "s" : ""}
          ...
        </p>

        {/* Button */}
        <button
          onClick={handleGoHome}
          className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
        >
          Go Download Page Now
        </button>
      </div>
    </div>
  );
};

export default NotFound;
