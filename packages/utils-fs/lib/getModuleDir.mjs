import path from "path";
import url from "url";

export const getModuleDir = (importMetaUrl) => path.dirname(
  url.fileURLToPath(importMetaUrl)
)
