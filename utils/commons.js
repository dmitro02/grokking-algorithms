const fs = require("fs");
const readLine = require("readline");

const measureExecutionTime = (fun) => {
    const start = process.hrtime()
    const result = fun()
    const end = process.hrtime(start)
    console.info('Execution time: %ds %dms', end[0], end[1] / 1000000)
    return result
}

const measureExecutionTimeAsync = async (fun) => {
    const start = process.hrtime()
    const result = await fun()
    const end = process.hrtime(start)
    console.info('Execution time: %ds %dms', end[0], end[1] / 1000000)
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
    readFile,
    readLinesAsync,
    measureExecutionTime,
    measureExecutionTimeAsync,
    fileToSortedArray
}
