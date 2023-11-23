import { createFilter } from '@rollup/pluginutils';
import path from "path";

export default function customPlugin(options = {}) { 
  const filter = createFilter(options.include, options.exclude);

  return {
    name: "custom-plugin",
    transform(code, id) { 
      if (!filter(id)) { 
        return null;
      }

      const parsedCode = this.parse(code);

      const source = `${code} \n\n ${JSON.stringify(parsedCode, null, 2)}`;

      const fileName = path.basename(id, path.extname(id));

      console.log(fileName);

      if (options.emitFile) { 
        this.emitFile({
          type: "asset",
          fileName: fileName + ".txt",
          source
        })
      }
    }
  }

}