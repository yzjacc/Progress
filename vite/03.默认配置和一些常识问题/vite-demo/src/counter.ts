export function setupCounter(element: HTMLButtonElement) { 
  let counter = 0;
  const setCounter = (count: number) => { 
    counter = count;
    element.innerHTML = `Counter: ${counter}`;
  }
  setCounter(0);
  element.addEventListener('click', () => setCounter(counter + 1));
}
