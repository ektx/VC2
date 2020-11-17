/**
 * 将字符串转换成时间
 * @param {string} str 字符串时间，eg:12:30:00 
 */
export function string2time(str) {
  if (!str) return

  let d = new Date()
  let [hours = 0, min = 0, sec = 0] = str.match(/\d+/g)

  d.setHours(parseInt(hours), parseInt(min), parseInt(sec), 0)
  
  return d
}

export function getTimeLine(arr) {
  let newArr = arr.flat()
  let min = new Date( Math.min( ...newArr ))
  let max = new Date( Math.max( ...newArr ))
  let result = []

  arr = arr.sort((a, b) => {
    if (a[0] > b[0]) return 1
    else if (a[0] < b[0]) return -1
    else return 0
  })
  
  result.push(...arr.slice(0, 1))
  
  for (let i = 1; i < arr.length; i++) {
    let [start, end] = arr[i]

    result.forEach((item, i) => {
      let [S, E] = item

      if (start <= S) {
        if (end > S){
          if (end > E) {
            result[i][1] = end
          }
        }
        
        result[i][0] = start
      } else {
        if (start < E) {
          if (end > E) {
            result[i][1] = end
          } 
        } else {
          // 当所有时间都对比完成后，依然无法匹配时
          if (i +1 === result.length) 
            result.push([start, end])
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

/**
 * 从数组中返回与指定时间最接近的时间
 * @param {Array} arr 时间数组
 * @param {Date} time 具体时间
 */
export function getCloseTime(arr, time) {
  let minTime = {}
  let date = null

  arr.forEach(date => {
    let step = Math.abs(date.getTime() - time.getTime())

    minTime[step] = date
  })

  date = minTime[Math.min(...Object.keys(minTime))]

  return {
    date,
    hours: date.getHours(),
    min: date.getMinutes(),
    sec: date.getSeconds()
  }

}