const fs = require("fs")
const readLine = require("readline")

const log = (...args) => {
  console.log(...args)
}

const measure = (fun, funArgs) => {
    const fun1 = () => { return 6 }
    const counter = { iterations: 0 } 
    const start = process.hrtime()
    const result = fun.call(this, ...funArgs, counter)
    const end = process.hrtime(start)
    log(`
      Function: ${fun.name}
      Result: ${result}
      Execution time: ${end[0]} ${end[1]/1000000}
      Iterations: ${counter.iterations}
    `)
    return result
}

const measureAsync = async (fun) => {
    const counter = { iterations: 0 }
    const start = process.hrtime()
    const result = await fun(counter)
    const end = process.hrtime(start)
    log(`
      Function: ${fun.name}
      Result: ${result}
      Execution time: ${end[0]} ${end[1]/1000000}
      Iterations: ${counter.iterations}
    `)
    return result
}

const readLinesAsync = (file, linesNumber) => {
  const readStream = fs.createReadStream(file);

  const lineReader = readLine.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  const lines = [];

  return new Promise((resolve, reject) => {
    readStream.on('error', reject)

    lineReader.on("line", (line) => {
      if (lines.length < linesNumber || !linesNumber) {
        lines.push(line);
      } else {
        lineReader.close();
      }
    });

    lineReader.on('close', () => {
        resolve(lines);
    })
  });
};

const readFile = (file) => {
    return fs.readFileSync(file, 'utf8')
}

const fileToSortedArray = (file) => {
    return readFile(file)
            .split('\n')
            .filter((el) => el)
            .sort()
}

module.exports = {
    log, 
    readFile,
    readLinesAsync,
    measure,
    measureAsync,
    fileToSortedArray
}
