const { fileToSortedArray, measureExecutionTime } = require("../utils/commons")
const path = require("path")

const dataFile = path.join(__dirname, "../datasets/names.txt")
const data = fileToSortedArray(dataFile)

const serchName1 = (data, name) => {
    return data.indexOf(name)
}

const serchName2 = (data, name) => {
    for (i = 0; i < data.length; i++) {
        if (data[i] === name) return i
    }
}

const res1 = measureExecutionTime(() => serchName1(data, "Lisa"))
console.log("index:", res1)

const res2 = measureExecutionTime(() => serchName2(data, "Lisa"))
console.log("index:", res2)
