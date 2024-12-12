// tsconfig-paths-bootstrap.js
const tsConfigPaths = require("tsconfig-paths");
const tsConfig = require("./tsconfig.json");

const baseUrl = "./"; // This should be the same as in your tsconfig.json
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
