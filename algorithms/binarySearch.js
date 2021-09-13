const { 
    fileToSortedArray, 
    measureExecutionTime, 
    log 
} = require("../utils/commons")
const path = require("path")

const dataFile = path.join(__dirname, "../datasets/names.txt")
const data = fileToSortedArray(dataFile)
const nameToSearch = 'Lisa'

const searchWithIndexOf = (data, name) => {
    return data.indexOf(name)
}

const serchWithIteration = (data, name, counter) => {
    for (i = 0; i < data.length; i++) {
        counter.iterations++
        if (data[i] === name) return i
    }
    return -1
}

const searchBinary = (data, name, counter) => {
    let firstIndex = 0
    let lastIndex = data.length - 1 

    while (true) {
        counter.iterations++

        if (lastIndex === firstIndex) {
            return data[firstIndex] === name ? firstIndex : -1
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

const res1 = measureExecutionTime(searchWithIndexOf, [data, nameToSearch])
log("index:", res1, "\nname:", data[res1], "\n")

const res2 = measureExecutionTime(serchWithIteration, [data, nameToSearch])
log("index:", res2, "\nname:", data[res2], "\n")

const res3 = measureExecutionTime(searchBinary, [data, nameToSearch])
log("index:", res3, "\nname:", data[res3], "\n")
