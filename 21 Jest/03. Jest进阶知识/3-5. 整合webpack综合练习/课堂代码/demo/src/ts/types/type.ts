export type getTimerType = {
  start: () => void;
  stop: () => void;
};

export type pipeType = {
  dom: HTMLElement;
  height: number;
  width: number;
  top: number;
  left: number;
  pass: boolean;
};
