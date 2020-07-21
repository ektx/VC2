import { ref } from 'vue'

const lightness = ref('')
const saturation = ref('')
const hue = ref(0)
const HSV_V = ref(0)
const HSV_S = ref(0)
const alpha = ref(1)
const R = ref(0)
const G = ref(0)
const B = ref(0)
const hex = ref('')
const isVisible = ref(false)
const isOpened = ref(false)

const hsv2hsl = function(hue, sat, val) {
  sat /= 100
  val /= 100
  let h = hue
  let s = (sat * val / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue)) || 0
  let l = Math.round(hue / 2 * 100)

  s = `${Math.round(s * 100)}%`
  l = `${l}%`

  return {h, s, l}
};

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
const isOnePointZero = function(n) {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
}

const isPercentage = function(n) {
  return typeof n === 'string' && n.indexOf('%') !== -1;
}

// Take input from [0, n] and return it as [0, 1]
const bound01 = function(value, max) {
  if (isOnePointZero(value)) value = '100%';

  const processPercent = isPercentage(value);
  value = Math.min(max, Math.max(0, parseFloat(value)));

  // Automatically convert percentage into number
  if (processPercent) {
    value = parseInt(value * max, 10) / 100;
  }

  // Handle floating point rounding errors
  if ((Math.abs(value - max) < 0.000001)) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return (value % max) / parseFloat(max);
}

const INT_HEX_MAP = { 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F' };

const toHex = function({ r, g, b }) {
  const hexOne = function(value) {
    value = Math.min(Math.round(value), 255);
    const high = Math.floor(value / 16);
    const low = value % 16;
    return '' + (INT_HEX_MAP[high] || high) + (INT_HEX_MAP[low] || low);
  };

  if (isNaN(r) || isNaN(g) || isNaN(b)) return '';

  return '#' + hexOne(r) + hexOne(g) + hexOne(b);
};

const HEX_INT_MAP = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 };

const parseHexChannel = function(hex) {
  if (hex.length === 2) {
    return (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 + (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1]);
  }

  return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1];
};

const hsl2hsv = function(hue, sat, light) {
  sat = sat / 100;
  light = light / 100;
  let smin = sat;
  const lmin = Math.max(light, 0.01);
  let sv;
  let v;

  light *= 2;
  sat *= (light <= 1) ? light : 2 - light;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  v = (light + sat) / 2;
  sv = light === 0 ? (2 * smin) / (lmin + smin) : (2 * sat) / (light + sat);

  return {
    h: hue,
    s: sv * 100,
    v: v * 100
  };
};

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
const rgb2hsv = function(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s;
  let v = max;

  const d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, v: v * 100 };
};

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
const hsv2rgb = function(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);

  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const r = [v, q, p, p, t, v][mod];
  const g = [t, v, v, q, p, p][mod];
  const b = [p, p, t, v, v, q][mod];

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

function formatString (value) {
  if (value.startsWith('#')) {
    const _hex = value.replace('#', '').trim();
    if (!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(_hex)) return;
    let r, g, b;
  
    if (_hex.length === 3) {
      r = parseHexChannel(_hex[0] + _hex[0]);
      g = parseHexChannel(_hex[1] + _hex[1]);
      b = parseHexChannel(_hex[2] + _hex[2]);
    } else if (_hex.length === 6 || _hex.length === 8) {
      r = parseHexChannel(_hex.substring(0, 2));
      g = parseHexChannel(_hex.substring(2, 4));
      b = parseHexChannel(_hex.substring(4, 6));
    }
  
    if (_hex.length === 8) {
      alpha.value = Math.floor(_hex.substring(6) / 255)
    } else if (_hex.length === 3 || _hex.length === 6) {
      alpha.value = 1
    }
  
    const { h, s, v } = rgb2hsv(r, g, b)
    HSV_S.value = s
    HSV_V.value = v
    
    setHSL(h, s, v)
    setRGB(h, s, v)
    // Hex
    hex.value = value
  }
}

function setHSL(h, s, v) {
  let hsl = hsv2hsl(h, s, v)

  hue.value = hsl.h
  saturation.value = hsl.s
  lightness.value = hsl.l
}

function setRGB(h, s, v) {
  let { r, g, b} = hsv2rgb(h, s, v)

  R.value = r
  G.value = g
  B.value = b

  return {r, g, b}
}

function update(type, value) {
  console.log(type, value)
  switch (type) {
    case 'hsv': {
      let {h, s, v} = value
      HSV_S.value = s
      HSV_V.value = v

      setHSL(h, s, v)
      let {r, g, b} = setRGB(h, s, v)
      
      hex.value = toHex({r, g, b})
      break
    }
  }
}

export {
  lightness,
  saturation,
  hue,
  HSV_S,
  HSV_V,
  alpha,
  R, G, B,
  hex,
  isVisible,
  isOpened,

  formatString,
  hsv2rgb,
  update,
}

export function getHSL() {
  return { lightness, saturation, hue }
}