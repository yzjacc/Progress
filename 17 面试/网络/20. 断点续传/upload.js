var domControls = {
  /**
   * 设置进度条区域
   * @param {number} percent 百分比 0-100
   */
  setProgress(percent) {
    const inner = $('.progress').show().find('.inner');
    inner[0].clientHeight; // force reflow
    inner.css('width', `${percent}%`);
    inner.find('span').text(`${percent}%`);
  },
  /**
   * 设置上传按钮状态
   */
  setStatus() {
    const btn = $('.btn.control');
    const status = btn[0].dataset.status;
    switch (status) {
      case 'unchoose': // 未选择文件
        btn.hide();
        break;
      case 'choose': // 刚刚选择了文件
        btn.show();
        btn.text('开始上传');
        break;
      case 'uploading': // 上传中
        btn.show();
        btn.text('暂停');
        break;
      case 'pause': // 暂停中
        btn.show();
        btn.text('继续');
        break;
      case 'finish': // 已完成
        btn.hide();
        break;
    }
  },
  /**
   * 设置文件链接
   */
  setLink(link) {
    $('#link').show().find('a').prop('href', link).text(link);
  },
};

/**
 * 文件分片
 * @param {File} file
 * @returns
 */
async function splitFile(file) {
  return new Promise((resolve) => {
    // 分片尺寸（1M）
    const chunkSize = 1024 * 1024;
    // 分片数量
    const chunkCount = Math.ceil(file.size / chunkSize);
    // 当前chunk的下标
    let chunkIndex = 0;
    // 使用ArrayBuffer完成文件MD5编码
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader(); // 文件读取器
    const chunks = []; // 分片信息数组
    // 读取一个分片后的回调
    fileReader.onload = function (e) {
      spark.append(e.target.result); // 分片数据追加到MD5编码器中
      // 当前分片单独的MD5
      const chunkMD5 = SparkMD5.ArrayBuffer.hash(e.target.result) + chunkIndex;
      chunkIndex++;
      chunks.push({
        id: chunkMD5,
        content: new Blob([e.target.result]),
      });
      if (chunkIndex < chunkCount) {
        loadNext(); // 继续读取下一个分片
      } else {
        // 读取完成
        const fileId = spark.end();
        resolve({
          fileId,
          ext: extname(file.name),
          chunks,
        });
      }
    };
    // 读取下一个分片
    function loadNext() {
      const start = chunkIndex * chunkSize,
        end = start + chunkSize >= file.size ? file.size : start + chunkSize;

      fileReader.readAsArrayBuffer(file.slice(start, end));
    }

    /**
     * 获取文件的后缀名
     * @param {string} filename 文件完整名称
     */
    function extname(filename) {
      const i = filename.lastIndexOf('.');
      if (i < 0) {
        return '';
      }
      return filename.substr(i);
    }

    loadNext();
  });
}

// 选择文件
$('.btn.choose').click(function () {
  $('#file').click();
});
let fileInfo;
let needs;
function setProgress() {
  const total = fileInfo.chunks.length;
  let percent = ((total - needs.length) / total) * 100;
  percent = Math.ceil(percent);
  domControls.setProgress(percent);
}
$('#file').change(async function () {
  $('.modal').show();
  fileInfo = await splitFile(this.files[0]);
  const resp = await fetch('http://localhost:8000/api/upload/handshake', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      fileId: fileInfo.fileId,
      ext: fileInfo.ext,
      chunkIds: fileInfo.chunks.map((it) => it.id),
    }),
  }).then((resp) => resp.json());
  $('.modal').hide();
  if (Array.isArray(resp.data)) {
    needs = resp.data;
    setProgress();
    $('.btn.control')[0].dataset.status = 'choose';
    domControls.setStatus();
  } else {
    needs = [];
    setProgress();
    $('.btn.control')[0].dataset.status = 'finish';
    domControls.setStatus();
    domControls.setLink(resp.data);
  }
});

$('.btn.control').click(function () {
  const status = this.dataset.status;
  switch (status) {
    case 'unchoose':
    case 'finish':
      return;
    case 'uploading':
      this.dataset.status = 'pause';
      domControls.setStatus();
      break;
    case 'choose':
    case 'pause':
      this.dataset.status = 'uploading';
      uploadPiece();
      domControls.setStatus();
      break;
  }
});

async function uploadPiece() {
  if (!needs) {
    return;
  }
  if (needs.length === 0) {
    // 上传完成
    setProgress();
    $('.btn.control')[0].dataset.status = 'finish';
    domControls.setStatus();
    domControls.setLink(
      `http://localhost:8000/upload/${fileInfo.fileId}${fileInfo.ext}`
    );
    return;
  }
  const status = $('.btn.control')[0].dataset.status;
  if (status !== 'uploading') {
    return;
  }
  const nextChunkId = needs[0];
  const file = fileInfo.chunks.find((it) => it.id === nextChunkId).content;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('chunkId', nextChunkId);
  formData.append('fileId', fileInfo.fileId);
  const resp = await fetch('http://localhost:8000/api/upload', {
    method: 'POST',
    body: formData,
  }).then((resp) => resp.json());
  needs = resp.data;
  setProgress();
  uploadPiece();
}
