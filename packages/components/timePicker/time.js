function string2time(str) {
  if (!str) return
  let d = new Date()
  let [hours = 0, min = 0, sec = 0] = str.match(/\d+/g)
  d.setHours(parseInt(hours), parseInt(min), parseInt(sec), 0)
  return d
}
function getTimeLine(arr) {
  let newArr = arr.flat()
  let min = new Date(Math.min(...newArr))
  let max = new Date(Math.max(...newArr))
  let result = []
  arr = arr.sort((a, b) => {
    if (a[0] > b[0]) return 1
    else if (a[0] < b[0]) return -1
    else return 0
  })
  result.push(...arr.slice(0, 1))
  for (let i = 1; i < arr.length; i++) {
    let [start, end] = arr[i]
    result.forEach((item, i2) => {
      let [S, E] = item
      if (start <= S) {
        if (end > S) {
          if (end > E) {
            result[i2][1] = end
          }
        }
        result[i2][0] = start
      } else {
        if (start < E) {
          if (end > E) {
            result[i2][1] = end
          }
        } else {
          if (i2 + 1 === result.length) result.push([start, end])
        }
      }
    })
  }
  return {
    line: result,
    min,
    max
  }
}
function getCloseTime(arr, time) {
  let minTime = {}
  let date = null
  arr.forEach(date2 => {
    let step = Math.abs(date2.getTime() - time.getTime())
    minTime[step] = date2
  })
  date = minTime[Math.min(...Object.keys(minTime))]
  return {
    date,
    hours: date.getHours(),
    min: date.getMinutes(),
    sec: date.getSeconds()
  }
}

export { getCloseTime, getTimeLine, string2time }
