
export const arrayToString = (arr) => {
    //returns string with space seperation
    if (arr) {
        return arr.join("|")
    } else {
        return []
    }
}

export const stringToArray = (str) => {
    //returns arr using split based |
    if (str) {
        return str.split("|")
    } else {
        return ""
    }
}

