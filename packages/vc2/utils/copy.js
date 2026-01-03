export function copyArray (arr) {
  let result = []

  for (let i = 0, l = arr.length; i < l; i++) {
    if (typeof arr[i] === 'object') {
      if (Array.isArray(arr[i])) {
        result.push( copyArray(arr[i]) )
      } else {
        result.push( copyObject(arr[i]) )
      }
    }
    else {
      result.push(arr[i])
    }
  }

  return result
}

export function copyObject (obj) {
  let result = {}

  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      if (Array.isArray(obj[key])) {
        result[key] = copyArray( obj[key] )
      } else {
        result[key] = copyObject( obj[key] )
      }
    } else {
      result[key] = obj[key]
    }
  }

  return result
}