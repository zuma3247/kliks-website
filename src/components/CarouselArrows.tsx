import "./carousel-arrows.css";

type CarouselArrowsProps = {
  onPrevious: () => void;
  onNext: () => void;
  previousLabel: string;
  nextLabel: string;
  className?: string;
};

// Figma: "Carousel navigation" (previous / next 36px circles).
export default function CarouselArrows({ onPrevious, onNext, previousLabel, nextLabel, className }: CarouselArrowsProps) {
  return (
    <div className={["carousel-arrows", className].filter(Boolean).join(" ")}>
      <button type="button" onClick={onPrevious} aria-label={previousLabel}><img src="/icons/chevron-left.svg" alt="" aria-hidden="true" /></button>
      <button type="button" onClick={onNext} aria-label={nextLabel}><img src="/icons/chevron-right.svg" alt="" aria-hidden="true" /></button>
    </div>
  );
}
