/**
 * 返回浏览器是否为ie 
 * @returns 为ie时返回版本号,否则为false
 */
export function isIE() {
  let ua = window.navigator.userAgent;

  // IE 10 or older => return version number
  let msie = ua.indexOf('MSIE ')
  if (msie > 0) {
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
  }

  // IE 11 => return version number
  let trident = ua.indexOf('Trident/')
  if (trident > 0) {
    let rv = ua.indexOf('rv:')
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
  }

  // Edge (IE 12+) => return version number
  let edge = ua.indexOf('Edge/')
  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
  }

  // other browser
  return false
}