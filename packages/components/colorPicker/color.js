const hsv2hsl = function (hue = 0, sat = 0, val = 0) {
  sat /= 100
  val /= 100
  let h = hue
  let s = (sat * val) / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue) || 0
  let l = Math.round((hue / 2) * 100)
  s = Math.round(s * 100)
  const s_str = s + '%'
  const l_str = `${l}%`
  return { h, s, l, s_str, l_str }
}
const isOnePointZero = function (n) {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1
}
const isPercentage = function (n) {
  return typeof n === 'string' && n.indexOf('%') !== -1
}
const bound01 = function (value, max) {
  if (isOnePointZero(value)) value = '100%'
  const processPercent = isPercentage(value)
  value = Math.min(max, Math.max(0, parseFloat(value)))
  if (processPercent) {
    value = parseInt(value * max, 10) / 100
  }
  if (Math.abs(value - max) < 1e-6) {
    return 1
  }
  return (value % max) / parseFloat(max)
}
const INT_HEX_MAP = { 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F' }
const toHex = function ({ r, g, b }) {
  const hexOne = function (value) {
    value = Math.min(Math.round(value), 255)
    const high = Math.floor(value / 16)
    const low = value % 16
    return '' + (INT_HEX_MAP[high] || high) + (INT_HEX_MAP[low] || low)
  }
  if (isNaN(r) || isNaN(g) || isNaN(b)) return ''
  return '#' + hexOne(r) + hexOne(g) + hexOne(b)
}
const HEX_INT_MAP = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 }
const parseHexChannel = function (hex) {
  if (hex.length === 2) {
    return (
      (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 +
      (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1])
    )
  }
  return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1]
}
const hsl2hsv = function (hue, sat, light) {
  sat = sat / 100
  light = light / 100
  let smin = sat
  const lmin = Math.max(light, 0.01)
  let sv
  let v
  light *= 2
  sat *= light <= 1 ? light : 2 - light
  smin *= lmin <= 1 ? lmin : 2 - lmin
  v = (light + sat) / 2
  sv = light === 0 ? (2 * smin) / (lmin + smin) : (2 * sat) / (light + sat)
  return {
    h: hue,
    s: Math.round(sv * 100),
    v: Math.round(v * 100)
  }
}
const rgb2hsv = function (r, g, b) {
  r = bound01(r, 255)
  g = bound01(g, 255)
  b = bound01(b, 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s
  let v = max
  const d = max - min
  s = max === 0 ? 0 : d / max
  if (max === min) {
    h = 0
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return { h: h * 360, s: s * 100, v: v * 100 }
}
const hsv2rgb = function (h, s, v) {
  h = bound01(h, 360) * 6
  s = bound01(s, 100)
  v = bound01(v, 100)
  const i = Math.floor(h)
  const f = h - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  const mod = i % 6
  const r = [v, q, p, p, t, v][mod]
  const g = [t, v, v, q, p, p][mod]
  const b = [p, p, t, v, v, q][mod]
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}
function formatString(value) {
  let hsv = Object.create(null)
  let alpha = 1
  if (value.startsWith('#')) {
    const _hex = value.replace('#', '').trim()
    if (!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(_hex)) return
    let r, g, b
    if (_hex.length === 3) {
      r = parseHexChannel(_hex[0] + _hex[0])
      g = parseHexChannel(_hex[1] + _hex[1])
      b = parseHexChannel(_hex[2] + _hex[2])
    } else if (_hex.length === 6 || _hex.length === 8) {
      r = parseHexChannel(_hex.substring(0, 2))
      g = parseHexChannel(_hex.substring(2, 4))
      b = parseHexChannel(_hex.substring(4, 6))
    }
    if (_hex.length === 8) {
      alpha = Math.floor(_hex.substring(6) / 255)
    }
    hsv = rgb2hsv(r, g, b)
  } else if (value.startsWith('hsv')) {
    const parts = value
      .replace(/hsva|hsv|\(|\)/gm, '')
      .split(/\s|,/g)
      .filter(val => val !== '')
      .map((val, index) => (index > 2 ? parseFloat(val) : parseInt(val, 10)))
    if (parts.length === 4) alpha = parseFloat(parts[3])
    if (parts.length >= 3) {
      let h = parts[0]
      let s = parts[1]
      let v = parts[2]
      hsv = { h, s, v }
    }
  } else if (value.startsWith('rgb')) {
    const parts = value
      .replace(/rgba|rgb|\(|\)/gm, '')
      .split(/\s|,/g)
      .filter(val => val !== '')
      .map((val, index) => (index > 2 ? parseFloat(val) : parseInt(val, 10)))
    if (parts.length === 4) alpha = parseFloat(parts[3])
    if (parts.length >= 3) {
      hsv = rgb2hsv(parts[0], parts[1], parts[2])
    }
  } else if (value.indexOf('hsl') !== -1) {
    const parts = value
      .replace(/hsla|hsl|\(|\)/gm, '')
      .split(/\s|,/g)
      .filter(val => val !== '')
      .map((val, index) => (index > 2 ? parseFloat(val) : parseInt(val, 10)))
    if (parts.length === 4) alpha = parseFloat(parts[3])
    if (parts.length >= 3) {
      hsv = hsl2hsv(parts[0], parts[1], parts[2])
    }
  }
  return { hsv, alpha }
}
function hex2rgb(hex) {
  let r = 0
  let g = 0
  let b = 0
  hex = hex.startsWith('#') ? hex.slice(1) : hex
  if (!hex || hex.length % 3 !== 0) return null
  if (hex.length === 3) {
    r = hex[0].repeat(2)
    g = hex[1].repeat(2)
    b = hex[2].repeat(2)
  } else {
    r = hex.slice(0, 2)
    g = hex.slice(2, 4)
    b = hex.slice(4, 6)
  }
  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16)
  }
}

export { formatString, hex2rgb, hsl2hsv, hsv2hsl, hsv2rgb, rgb2hsv, toHex }
