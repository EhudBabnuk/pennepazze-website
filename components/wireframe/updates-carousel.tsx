"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PrimaryCTAButton } from "@/components/ui/primary-cta-button"
import { updatesSlides } from "@/lib/updates"

export function UpdatesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const slides = updatesSlides

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setIsAutoplay(false)
  }, [slides.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setIsAutoplay(false)
  }, [slides.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsAutoplay(false)
  }, [])

  // Autoplay effect
  useEffect(() => {
    if (!isAutoplay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoplay, slides.length])

  // Resume autoplay on interaction pause
  useEffect(() => {
    if (!isAutoplay) {
      const timer = setTimeout(() => setIsAutoplay(true), 8000)
      return () => clearTimeout(timer)
    }
  }, [isAutoplay])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToPrevious, goToNext])

  const slide = slides[currentIndex]

  return (
    <section
      className="w-full py-16 md:py-24 bg-white border-b border-border"
      aria-label="Updates and highlights carousel"
    >
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-foreground mb-3">Updates & Highlights</h2>
          <p
            className="text-muted-foreground max-w-2xl"
            style={{
              fontFamily: "var(--font-body), 'Open Sans', sans-serif",
              fontWeight: 500,
              fontSize: "1.125rem",
              lineHeight: 1.7,
            }}
          >
            Stay up to date with the latest from Penne Pazze
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Slide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image - Left (Desktop), Top (Mobile) */}
            <div
              className="relative aspect-square md:aspect-auto md:h-96 overflow-hidden rounded-lg"
              role="group"
              aria-label={`Slide ${currentIndex + 1} of ${slides.length}`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Content - Right (Desktop), Bottom (Mobile) */}
            <div className="flex flex-col gap-4">
              {/* Label */}
              <p
                className="text-[#D5B13A] uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-heading), 'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  letterSpacing: "0.1em",
                }}
              >
                {slide.label}
              </p>

              {/* Title */}
              <h3
                className="text-foreground"
                style={{
                  fontFamily: "var(--font-heading), 'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: "2rem",
                  lineHeight: 1.2,
                  letterSpacing: "0.025em",
                  textTransform: "uppercase",
                }}
              >
                {slide.title}
              </h3>

              {/* Description */}
              <p
                className="text-muted-foreground"
                style={{
                  fontFamily: "var(--font-body), 'Open Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: 1.7,
                }}
              >
                {slide.description}
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <PrimaryCTAButton
                  asChild
                  className="px-8 py-3 text-sm"
                >
                  <Link href={slide.buttonLink}>
                    {slide.buttonText}
                  </Link>
                </PrimaryCTAButton>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 md:mt-12">
            {/* Previous Button */}
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Slide Indicators */}
            <div
              className="flex gap-2 justify-center flex-1 px-4"
              role="tablist"
              aria-label="Slide indicator"
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all rounded-full ${
                    index === currentIndex
                      ? "w-8 h-2 bg-primary"
                      : "w-2 h-2 bg-muted-foreground hover:bg-foreground"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-selected={index === currentIndex}
                  role="tab"
                />
              ))}
            </div>

            {/* Next Button */}
            <Button
              onClick={goToNext}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Slide Counter */}
          <p
            className="text-center text-sm text-muted-foreground mt-6"
            aria-live="polite"
            aria-atomic="true"
            style={{
              fontFamily: "var(--font-body), 'Open Sans', sans-serif",
              fontWeight: 400,
            }}
          >
            {currentIndex + 1} of {slides.length}
          </p>
        </div>
      </div>
    </section>
  )
}
