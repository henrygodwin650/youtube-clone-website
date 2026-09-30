import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};
const TRANSLATE_AMOUNT = 200;
const CategoryPills = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) => {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const updateButtons = () => {
    const container = containerRef.current;
    if (!container) return;
    const { clientWidth, scrollWidth } = container;
    setIsLeftVisible(translate > 0);
    setIsRightVisible(translate + clientWidth < scrollWidth);
  };
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    updateButtons();
    const observer = new ResizeObserver(() => {
      updateButtons();
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);
  const handleLeftClick = () => {
    setTranslate((currentTranslate) => {
      const newTranslate = currentTranslate - TRANSLATE_AMOUNT;
      return Math.max(newTranslate, 0);
    });
  };
  const handleRightClick = () => {
    const container = containerRef.current;
    if (!container) return;
    setTranslate((currentTranslate) => {
      const { clientWidth, scrollWidth } = container;
      const maxTranslate = Math.max(scrollWidth - clientWidth, 0);
      const newTranslate = currentTranslate + TRANSLATE_AMOUNT;
      return Math.min(newTranslate, maxTranslate);
    });
  };
  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {" "}
      <div
        className="flex w-max gap-3 whitespace-nowrap transition-transform duration-300"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {" "}
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={`rounded-lg px-3 py-1 whitespace-nowrap ${selectedCategory === category ? "dark" : "default"}`}
          >
            {" "}
            {category}{" "}
          </button>
        ))}{" "}
      </div>{" "}
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 z-20 flex h-full w-24 -translate-y-1/2 items-center bg-gradient-to-r from-white via-white/70 to-transparent dark:from-zinc-900 dark:via-zinc-900/70">
          {" "}
          <button
            type="button"
            onClick={handleLeftClick}
            aria-label="Scroll categories left"
            className="ghost icon aspect-square h-full w-auto p-1.5"
          >
            {" "}
            <FiChevronLeft size={22} />{" "}
          </button>{" "}
        </div>
      )}{" "}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 z-20 flex h-full w-24 -translate-y-1/2 items-center justify-end bg-gradient-to-l from-white via-white/70 to-transparent dark:from-zinc-900 dark:via-zinc-900/70">
          {" "}
          <button
            type="button"
            onClick={handleRightClick}
            aria-label="Scroll categories right"
            className="ghost icon aspect-square h-full w-auto p-1.5"
          >
            {" "}
            <FiChevronRight size={22} />{" "}
          </button>{" "}
        </div>
      )}{" "}
    </div>
  );
};
export default CategoryPills;
