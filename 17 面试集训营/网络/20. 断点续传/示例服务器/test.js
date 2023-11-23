const md5 = require('md5');
const _ = require('lodash');
const txt = `滚滚长江东逝水，浪花淘尽英雄。
是非成败转头空。
青山依旧在，几度夕阳红。
白发渔樵江渚上，惯看秋月春风。
一壶浊酒喜相逢。
古今多少事，都付笑谈中。`;

const buffer = Buffer.from(txt, 'utf8');
const segment = 10;
const fileId = md5(buffer);
console.log(fileId);
// const ext = '.txt';
// const chunks = _.chunk(buffer, segment).map((it, i) => ({
//   id: md5(it) + i,
//   content: Buffer.from(it),
// }));
// const chunkIds = chunks.map((it) => it.id);

// const file = require('./file');

// file.getFileInfo(fileId, ext).then((info) => {
//   console.log(info);
// });

// // file.createFileInfo(fileId, ext, chunkIds).then((resp) => {
// //   console.log(resp);
// // });
// // (async function () {
// //   for (const chunk of chunks) {
// //     await file.handleChunk(chunk.id, fileId, chunk.content);
// //   }
// //   console.log('ok');
// // })();
