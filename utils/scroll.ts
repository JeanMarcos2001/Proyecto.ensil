/**
 * Easing function: easeInOutCubic
 * Smooth acceleration at the start and deceleration at the end
 * for a uniform, polished scroll transition.
 */
function easeInOutCubic(t: number): number {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Custom smooth scroll utility with configurable easing and duration.
 * @param targetId The ID of the element to scroll to
 * @param duration The duration of the scroll animation in milliseconds
 */
export function smoothScrollTo(targetId: string, duration: number = 1000) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        // Ensure progress doesn't exceed 1
        const progress = Math.min(timeElapsed / duration, 1);

        // Apply easing function
        const easeProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easeProgress);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}
