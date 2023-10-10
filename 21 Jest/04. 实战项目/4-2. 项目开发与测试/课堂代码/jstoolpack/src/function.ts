type FuncType = (...args: any[]) => any;
export function debounce<T extends FuncType>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>): void {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
