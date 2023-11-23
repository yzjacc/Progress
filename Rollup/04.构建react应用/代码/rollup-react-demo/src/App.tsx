import React, { useState, lazy, Suspense } from 'react';
import Loading from '@/components/Loading';
import styles from '@/styles/app.module.scss';
import rollupSvg from '@/assets/rollup.svg'
import reactPng from '@/assets/react.png'

const About = lazy(() => delayDemo(import('@/components/About'), 2000));

const App = () => { 
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <h2>hello world</h2>

      <img src={rollupSvg} className={ styles.image } />
      <img src={reactPng} className={ styles.image } />

      <br />

      <button
        className={ styles.button }
        onClick={() => setCount(count + 1)}>Count: {count}
      </button>

      <hr />

      <button
        className={styles.button}
        onClick={() => { 
          setVisible(!visible);
        }}
      >
        Show About
      </button>
      <br />
      {
        visible 
        &&
        <Suspense fallback={<Loading />}>
          <About />
        </Suspense>
      }

    </div>
  );
}

//添加一个固定延迟，以便看到加载效果
async function delayDemo(promise: Promise<any>, delay: number) { 
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  }).then(() => promise);
}

export default App;