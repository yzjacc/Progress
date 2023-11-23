const rollup = require("rollup");

const inputOptions = {
  input: "src/index.js",
  external: [],
  plugins: []
}
const outputOptions = {
  dir: "dist",
  format: "esm",
  sourcemap: true,
  entryFileNames: "[name].[hash].js",
}

async function build() { 
  let bundle;
  let bundleFailed = false;
  try {
    bundle = await rollup.rollup(inputOptions)
    // console.log("🚀 ~ bundle:", bundle)
    // console.log("🌟 ~ bundle.cache.modules:", bundle.cache.modules);
    
    const resp = await bundle.write(outputOptions)
    // console.log("👏🏻 ~ resp:", resp)
  } catch (err) { 
    console.error("🚨 ~ err:", err)
    bundleFailed = true;
  }

  if (bundle) { 
    await bundle.close();
  }

  // process.exit(bundleFailed ? 1 : 0)
}

build();

const watchOptions = {
  ...inputOptions,
  output: [outputOptions],
}

const watcher = rollup.watch(watchOptions);

watcher.on('event', event => { 
  if (event.result) { 
    event.result.close();
  }
  console.log("🌺 ~ event:", event)
})