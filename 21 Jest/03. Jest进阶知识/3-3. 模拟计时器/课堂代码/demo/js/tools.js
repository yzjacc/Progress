/**
 * 工具函数库
 */
/**
 * 开始计时器
 */
export function startTimer(callback, interval) {
    const timerId = setInterval(() => {
        callback();
    }, interval);
    return timerId;
}
/**
 * 停止计时器
 */
export function stopTimer(timerId) {
    clearInterval(timerId);
}
/**
 * 开始延时器
 */
export function startTimeout(callback, timeout) {
    const timeoutId = setTimeout(() => {
        callback();
    }, timeout);
    return timeoutId;
}
/**
 * 停止延时器
 */
export function stopTimeout(timeoutId) {
    clearTimeout(timeoutId);
}
