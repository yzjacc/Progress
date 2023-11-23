export default function example2() { 
  return {
    name: "example2",
    outputOptions(options) { 
      // console.log("outputOptions - options:", options)
    },
    renderStart(options) { 
      // console.log("renderStart - options:", options)
    },
    renderDynamicImport(options) { 
      // console.log("renderDynamicImport - options", options);
    },
    banner(chunk) { 
      // console.log("banner - chunk:", chunk);

      const comment = chunk.name === "index" ? `/*
* 
* 　　┏┓　　　┏┓+ +
* 　┏┛┻━━━┛┻┓ + +
* 　┃　　　　　　　┃ 　
* 　┃　　　━　　　┃ ++ + + +
*  ████━████ ┃+
* 　┃　　　　　　　┃ +
* 　┃　　　┻　　　┃
* 　┃　　　　　　　┃ + +
* 　┗━┓　　　┏━┛
* 　　　┃　　　┃　　　　　　　　　　　
* 　　　┃　　　┃ + + + +
* 　　　┃　　　┃
* 　　　┃　　　┃ +  神兽保佑
* 　　　┃　　　┃    代码无bug　　
* 　　　┃　　　┃　　+　　　　　　　　　
* 　　　┃　 　　┗━━━┓ + +
* 　　　┃ 　　　　　　　┣┓
* 　　　┃ 　　　　　　　┏┛
* 　　　┗┓┓┏━┳┓┏┛ + + + +
* 　　　　┃┫┫　┃┫┫
* 　　　　┗┻┛　┗┻┛+ + + +
* 
*/
` : "";
      return comment;
    },
    renderChunk(source) { 
      // console.log("renderChunk - source:", source)
    },
    augmentChunkHash(chunkInfo) { 
      // console.log("augmentChunkHash - chunkInfo:", chunkInfo)
    },
    generateBundle(options, bundle, isWrite) { 
      // console.log("generateBundle - options:", options)
      // console.log("generateBundle - bundle:", bundle)
      // console.log("generateBundle - isWrite:", isWrite)
      Object.keys(bundle).forEach(key => { 
        if (key.includes("sum")) { 
          delete bundle[key]
        }
      })
    },
    writeBundle(options, bundle) { 
      console.log("writeBundle - options:", options)
      console.log("writeBundle - bundle:", bundle)
    },
    closeBundle() { 
      console.log("closeBundle")
    }
  }
}