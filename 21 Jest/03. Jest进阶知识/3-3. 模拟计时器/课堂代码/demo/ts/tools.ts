/**
 * 工具函数库
 */

/**
 * 开始计时器
 */
export function startTimer(callback: () => void, interval: number) {
  if (interval < 0) {
    return;
  }
  const timerId = setInterval(() => {
    callback();
  }, interval);
  return timerId;
}

/**
 * 停止计时器
 */
export function stopTimer(timerId: NodeJS.Timeout|undefined) {
  if (timerId) {
    clearInterval(timerId);
  }
}

/**
 * 开始延时器
 */
export function startTimeout(callback: () => void, timeout: number) {
  if (timeout < 0) {
    return;
  }
  const timeoutId = setTimeout(() => {
    callback();
  }, timeout);
  return timeoutId;
}

/**
 * 停止延时器
 */
export function stopTimeout(timeoutId: NodeJS.Timeout|undefined) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
}
