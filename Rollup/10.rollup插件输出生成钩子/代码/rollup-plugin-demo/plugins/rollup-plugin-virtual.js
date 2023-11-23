const virtualModuleId = "virtual-module";
const resolvedVirtualModuleId = "\0" + virtualModuleId;

export default function virtualModule() { 
  return {
    name: "virtual-module",
    resolveId(source) { 
      if (source === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
      return null;
    },
    load(id) { 
      if (id === resolvedVirtualModuleId) { 
        // return `export default "this is virtual module"`;
        return `export default function fib(n) {return n <= 1 ? n : fib(n - 1) + fib(n - 2)}`
      }
      return null;
    }
  }
}