import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import overview1 from "@/assets/img/overview/overview_1.webp";
import overview2 from "@/assets/img/overview/overview_2.webp";
import overview3 from "@/assets/img/overview/overview_3.webp";

export const AboutPreview: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = [overview1, overview2, overview3];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <section>
      <div className="relative max-w-4xl mx-auto">
        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-lg group">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((img, i) => (
              <div key={i} className="min-w-full">
                <img
                  src={img}
                  alt={`App preview ${i + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons - Increased size for better touch targets */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 sm:p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 sm:p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div
          className="flex justify-center gap-3 mt-4"
          role="group"
          aria-label="Carousel navigation"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`min-w-[48px] min-h-[48px] flex items-center justify-center transition-colors ${
                currentSlide === index ? "bg-transparent" : "bg-transparent"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? "true" : "false"}
            >
              <span
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index
                    ? "bg-primary"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
