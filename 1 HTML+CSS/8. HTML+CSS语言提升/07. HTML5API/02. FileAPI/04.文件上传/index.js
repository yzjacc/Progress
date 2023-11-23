const scanFile = document.querySelector(".scan-file");
const scanDir = document.querySelector(".scan-dir");
const upload = document.querySelector(".upload");
const dropContent = document.querySelector(".drop-content");
const list = document.querySelector("tbody");
const fileInput = document.querySelector("input.file");
const fileInputDir = document.querySelector("input.dir");

const tempFileList = [];

// 01. 单、多文件
scanFile.addEventListener("click", function () {
  fileInput.click();
});

fileInput.addEventListener("change", function (e) {
  // console.log(e.target.files);
  tempFileList.push(...e.target.files);
  renderFilelist();
});

// 02. 文件夹上传
scanDir.addEventListener("click", function () {
  fileInputDir.click();
});
fileInputDir.addEventListener("change", function (e) {
  // console.log(e.target.files);
  tempFileList.push(...e.target.files);
  renderFilelist();
});

// 03. 拖拽上传
dropContent.addEventListener("dragover", (e) => e.preventDefault());
dropContent.addEventListener("drop", (e) => {
  e.preventDefault();
  // console.log(e.dataTransfer.items);
  for (const item of e.dataTransfer.items) {
    // console.log(item.webkitGetAsEntry());
    getFileByEntry(item.webkitGetAsEntry());
  }
});

function getFileByEntry(entry, path = "") {
  if (entry.isFile) {
    // 文件
    entry.file((file) => {
      // console.log(file);
      file.path = `${path}${file.name}`
      tempFileList.push(file);
      renderFilelist();
    });
  } else {
    // 文件夹
    const reader = entry.createReader();
    reader.readEntries((entries) => {
      // console.log(entries);
      for (const item of entries) {
        getFileByEntry(item, `${path}${entry.name}/`);
      }
    });
  }
}

function renderFilelist() {
  list.innerHTML = "";
  tempFileList.forEach((file, index) => {
    const tr = document.createElement("tr");
    list.appendChild(tr);
    tr.innerHTML = `
            <td>${file.name}</td>
            <td>${file.webkitRelativePath || file.path}</td>
            <td>${file.type}</td>
            <td>${transformByte(file.size)}</td>
            <td onclick=delFile(${index})>删除</td>
    `;
  });
}

function transformByte(size) {
  // 1024 => 1KB
  // 1024KB => 1MB
  // 1024MB => 1GB
  if (size < 1024 ** 2) {
    return (size / 1024).toFixed(1) + "KB";
  } else if (size < 1024 ** 3) {
    return (size / 1024 ** 2).toFixed(1) + "MB";
  } else {
    return (size / 1024 ** 3).toFixed(1) + "GB";
  }
}

function delFile(index) {
  tempFileList.splice(index, 1);
  renderFilelist();
}
