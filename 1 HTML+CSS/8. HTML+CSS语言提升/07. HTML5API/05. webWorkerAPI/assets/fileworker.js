import "./md5.min.js";
console.log("我滴任务开始啦");
self.onmessage = async function(e) {
    const [file, CHUNK_SIZE, startIndex, endIndex] = e.data;
    const result = [];
    for (let i = startIndex; i < endIndex; i++) {
      const chunk = await getChunk(file, CHUNK_SIZE, i);
      result.push(chunk);
    }
    self.postMessage(result);
}

function getChunk(file, size, index) {
  return new Promise((resolve, reject) => {
    const start = index * size;
    const end = start + size;
    const chunkFile = file.slice(start, end);
    const fr = new FileReader();
    fr.onload = function (e) {
      const arrbuffer = e.target.result;
      const hash = SparkMD5.ArrayBuffer.hash(arrbuffer);
      resolve({
        start,
        end,
        chunkFile,
        index,
        hash,
      });
    };
    fr.readAsArrayBuffer(chunkFile);
  });
}
