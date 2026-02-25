import { useEffect, useRef, useState } from 'react';

/**
 * Hook to trigger animations when an element scrolls into view.
 * @param threshold The percentage of the element's visibility required to trigger the animation (0 to 1).
 * @param triggerOnce Whether the animation should only trigger the first time it comes into view.
 * @returns An object containing the visibility state and a ref to attach to the target element.
 */
export function useScrollReveal(threshold: number = 0.15, triggerOnce: boolean = true) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                // Trigger slightly before it comes fully into view for a smoother experience
                rootMargin: '0px 0px -50px 0px'
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, triggerOnce]);

    return { ref, isVisible };
}
