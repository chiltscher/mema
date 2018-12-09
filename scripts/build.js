let exec = require("child_process").exec;
let path = require("path");

const workspace = path.resolve(path.join(__dirname, ".."));
const build = path.resolve(path.join(workspace, "build"));



console.log(`Workspace: ${workspace}`);
console.log(`Build: ${build}`);
console.log(`#############################`);
console.log("Running typed-css-modules ...");
let tcm = exec(`tcm ${workspace}/src --watch`);

tcm.on("error", (e) => console.log(e.message));
tcm.on("message", (msg) => console.log(msg));
tcm.on("close", () => console.log(`-tcm- Process has been closed!`));

console.log("Running typescript compiler ...");
let tsc = exec(`tsc --watch`);
tsc.on("error", (e) => console.log(e.message));
tsc.on("message", (msg) => console.log(msg));
tsc.on("close", () => console.log(`-tsc- Process has been closed!`));

console.log("Running Webpack ...");
let webpack = exec(`webpack --watch`);
webpack.on("error", (e) => console.log(e.message));
webpack.on("message", (msg) => console.log(msg));
webpack.on("close", () => console.log(`-webpack- Process has been closed!`));

console.log("Compiling scss Files ...");
let sass = exec(`node-sass ${workspace}/src -o ${build} --watch`);
sass.on("error", (e) => console.log(e.message));
sass.on("message", (msg) => console.log(msg));
sass.on("close", () => console.log(`-sass- Process has been closed!`));

