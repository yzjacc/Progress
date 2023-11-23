import { minify } from "uglify-js";

export default function uglifyPlugin() { 
  return {
    name: "uglify-plugin",
    renderChunk(code) { 
      const result = minify(code);
      if (result.error) { 
        throw new Error(`minify error: ${result.error}`)
      }
      return {
        code: result.code,
        map: {mapping: ""}
      }
    }
  }
}