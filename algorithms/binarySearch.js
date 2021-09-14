const { 
    fileToSortedArray, 
    measure 
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

const input = [data, nameToSearch]

measure(searchWithIndexOf, input)

measure(serchWithIteration, input)

measure(searchBinary, input)
