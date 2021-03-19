const { fileToSortedArray, measureExecutionTime } = require("../utils/commons")
const path = require("path")

const dataFile = path.join(__dirname, "../datasets/names.txt")
const data = fileToSortedArray(dataFile)
const nameToSearch = 'Lisa1'

const searchWithIndexOf = (data, name) => {
    return data.indexOf(name)
}

const serchWithIteration = (data, name) => {
    for (i = 0; i < data.length; i++) {
        if (data[i] === name) return i
    }
    return -1
}

const searchBinary = (data, name) => {
    let firstIndex = 0
    let lastIndex = data.length - 1 

    while (true) {
        if (lastIndex === firstIndex) {
            return data[firstIndex] === name ? 0 : -1
        }

        let index = Math.floor((lastIndex + firstIndex) / 2)

        let item = data[index]
    
        if (item === name) {
            return index
        } else if (item > name) {
            lastIndex = index - 1
        } else if (item < name) {
            firstIndex = index + 1
        } else {
            return -1
        }
    }
}

const res1 = measureExecutionTime(() => searchWithIndexOf(data, nameToSearch))
console.log("index:", res1)
console.log("name:", data[res1])

const res2 = measureExecutionTime(() => serchWithIteration(data, nameToSearch))
console.log("index:", res2)
console.log("name:", data[res2])

const res3 = measureExecutionTime(() => searchBinary(data, nameToSearch))
console.log("index:", res3)
console.log("name:", data[res3])


