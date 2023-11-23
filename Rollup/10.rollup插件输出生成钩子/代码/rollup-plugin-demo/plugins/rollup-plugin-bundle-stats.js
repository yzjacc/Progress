export default function bundleStats() {
  let startTime;
  return {
    name: "bundle-stats",
    options() { 
      startTime = Date.now();
    },
    generateBundle(_, bundle) { 
      const fileSizes = {};

      for(const [fileName, output] of Object.entries(bundle)) { 
        if(output.type === "chunk") { 
          const content = output.code;
          const size = Buffer.byteLength(content, "utf-8");
          const sizeKB = (size / 1024).toFixed(2);

          fileSizes[fileName] = sizeKB + " KB";
        }
      }

      console.table(fileSizes);

    },
    closeBundle() { 
      console.log("--------------------")
      const totalTime = Date.now() - startTime;
      console.log("打包时间:" + totalTime + "ms");
      console.log("--------------------")
    }
  }
}