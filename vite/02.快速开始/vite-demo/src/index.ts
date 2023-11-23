import { setupCounter } from "./counter";

document.querySelector('#app')!.innerHTML = `
  <div>
    <button id="counter" type="button"></button>
  </div>
`;
setupCounter(document.querySelector('#counter') as HTMLButtonElement);