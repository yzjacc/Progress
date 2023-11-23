import { setupCounter } from "./counter.ts";
document.querySelector('#app')!.innerHTML = `
  <div>
    <h2>hello!!</h2>
    <button id="counter" type="button"></button>
  </div>
`;
setupCounter(document.querySelector('#counter') as HTMLButtonElement);