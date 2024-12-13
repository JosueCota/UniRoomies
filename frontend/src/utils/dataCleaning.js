//Array of objects of objects, extracts a value from it (for some reason storing is [ { 0 : { val : value } } , ] )
export const extractObjectArrayVal= (arr, val) => {
    let newArr = []
    for (const key in arr) {
        newArr.push(arr[key][val]);
    }

    return newArr
}