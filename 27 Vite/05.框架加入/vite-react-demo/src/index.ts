import { setupCounter } from "./counter.ts";
document.querySelector('#app')!.innerHTML = `
  <div>
    <button id="counter" type="button"></button>
  </div>
`;
setupCounter(document.querySelector('#counter') as HTMLButtonElement);