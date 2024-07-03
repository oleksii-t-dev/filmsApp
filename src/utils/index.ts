export function debounce<T extends (...args: any[]) => void>(
  func: T,
  timeout = 300,
) {
  let timer: number;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}