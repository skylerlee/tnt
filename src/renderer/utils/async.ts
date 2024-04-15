export function nextTick(callback: () => void) {
  Promise.resolve().then(callback);
}
