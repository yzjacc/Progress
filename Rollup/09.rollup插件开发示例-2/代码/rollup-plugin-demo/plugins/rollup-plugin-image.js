import { createFilter,dataToEsm } from "@rollup/pluginutils";
import { extname,resolve,basename,relative,normalize,sep } from "path";
import fs from "fs";
import svgToMiniDataURI from "mini-svg-data-uri";

const defaults = {
  fileSize: 1024 * 4,
  target: "./dist",
  include: null,
  exclude: null,
}

const mimeTypes = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".avif": "image/avif"
}

const getDataUri = ({ format, isSvg, mime, source }) =>
  isSvg ? svgToMiniDataURI(source) : `data:${mime};${format},${source}`;


const ensureDirExists = async (dirPath) => { 
  try {
    await fs.promises.access(dirPath);
    return true;
  } catch (err) { 
    // 文件夹不存在就创建文件夹
    try {
      await fs.promises.mkdir(dirPath, { recursive: true });
      return true;
    }
    catch (err) { 
      console.error(err);
      return false;
    }
    
  }
}

export default function myImage(opts = {}) { 
  const options = Object.assign({}, defaults, opts);
  const filter = createFilter(options.include, options.exclude);
  return {
    name: "my-image",
    async transform(code, id) { 
      if (!filter(id)) return null;
      
      // 获取后缀
      const ext = extname(id);
      // 判断是否是图片
      if(!mimeTypes.hasOwnProperty(ext)) {
        return null;
      }

      // 获取图片的mime类型
      const mime = mimeTypes[ext];
      // 判断是否svg
      const isSvg = mime === mimeTypes[".svg"];
      // 图片format格式
      const format = isSvg ? "utf-8" : "base64";

      // 目标路径
      const assetsPath = resolve(process.cwd(), options.target);
      console.log("---",process.cwd())
      console.log("---",options.target)
      console.log("---", assetsPath);

      //获取文件名
      const fileName = basename(id);
      // 最终文件路径
      const filePath = resolve(assetsPath, fileName);
      console.log("===", filePath);

      let relativePath = normalize(relative(process.cwd(), filePath));
      relativePath = relativePath.substring(relativePath.indexOf(sep) + 1);

      console.log(relativePath);

      try {

        // 如果图片文件过大，就应该直接拷贝文件，返回文件路径
        // 读取图片文件大小与设置的大小进行比较
        const stat = await fs.promises.stat(id);
        if (stat.size > options.fileSize) {
          // 文件的拷贝，以及对象的返回
          // 文件拷贝，无非就是文件源路径，目标路径
          //copyFile 拷贝文件地址的文件夹必须存在
          // 如果文件夹不存在，那么就创建文件夹
          const dirExists = await ensureDirExists(assetsPath);
          dirExists && await fs.promises.copyFile(id, filePath);
          return {
            code: dataToEsm(relativePath), //返回拷贝之后处理的路径
            map: { mappings: "" }
          }

        } else {
          // 否则转换为base64格式
          // 读取文件
          const source = await fs.promises.readFile(id, format);

          return {
            code: dataToEsm(getDataUri({ format, isSvg, mime, source })),
            map: { mappings: "" }
          }
        }

      } catch (err) { 
        const message = "图片转换失败:" + id;
        this.error({ message, id, cause: err });
        return null;
      }

    }
  }
}