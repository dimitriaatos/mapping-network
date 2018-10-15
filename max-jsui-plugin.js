const ModuleFilenameHelpers = require("webpack/lib/ModuleFilenameHelpers")
const ConcatSource = require("webpack-sources").ConcatSource


class MaxJsui {
  constructor(args) {
    if (typeof args !== 'object') throw new TypeError('Argument "args" must be an object.')
    this.message = args.hasOwnProperty('message') ? args.message : ''
    this.variables = args.hasOwnProperty('variables') ? `var ${String(args.variables)} ;` : ''
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('MaxJsui', compilation => {
      compilation.hooks.optimizeChunkAssets.tapAsync('MaxJsui', (chunks, done) => {
        chunks.forEach(chunk => {
          chunk.files.forEach(fileName => {
            if (ModuleFilenameHelpers.matchObject({test: /\.m?js$/}, fileName)) {
              compilation.assets[fileName] = new ConcatSource(
                String('// ' + this.message + '\n\n'),
                String(this.variables),
                String('var paint, msg_int, onclick, ondrag, onidle, onidleout, onresize;'),
                compilation.assets[fileName]
              )
            }
          })
        })
        done()
      })
    });
  }
}

module.exports = MaxJsui
