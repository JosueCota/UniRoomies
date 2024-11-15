
export const arrayToString = (arr) => {
    //returns string with space seperation
    if (arr) {
        return arr.join("|")
    } else {
        return ""
    }
}

export const stringToArray = (str) => {
    //returns arr using split based |
    if (str !== null || str!== undefined) {
        return str.split("|")
    } else {
        return null
    }
}

//Array of objects of objects, extracts a value from it (for some reason storing is [ { 0 : { val : value } } , ] )
export const extractObjectArrayVal= (arr, val) => {
    let newArr = []
    for (const key in arr) {
        newArr.push(arr[key][val]);
    }

    return newArr
}