import { ref, watch } from 'vue'
import { rgb2hsv, hsv2rgb, hsv2hsl, toHex } from './color'

export default function store() {
  const alpha = ref(1)
  const red = ref(0)
  const green = ref(0)
  const blue = ref(0)
  // 0 ~ 360
  const Hue = ref(0)
  // 饱和度 0 ～ 100
  const Saturation = ref(0)
  const Value = ref(0)
  const hex = ref('')

  const HSL_Hue = ref('0%')
  const HSL_S = ref('0%')
  const Lightness = ref('0%')

  const isDrag = ref(false)

  watch([Hue, Saturation, Value], ([h, s, v]) => {
    console.log('HSVA', h, s, v)
    console.log(hsv2rgb(h, s, v))

    if (watchEvent !== 'RGB') {
      watchEvent = 'HSV'

      let { r, g, b } = hsv2rgb(h, s, v)
      red.value = r
      green.value = g
      blue.value = b

      const HSL = hsv2hsl(h, s, v)
      console.error(HSL)
      HSL_Hue.value = HSL.h
      HSL_S.value = HSL.s
      Lightness.value = HSL.l
    } else {
      watchEvent = ''
    }
  })

  let watchEvent = null

  watch([alpha], ([val]) => {
    console.log(val)
  })

  watch([red, green, blue], ([r, g, b]) => {
    console.log('REGA', r, g, b)

    hex.value = toHex({ r, g, b })

    if (watchEvent !== 'HSV') {
      watchEvent = 'RGB'
      const { h, s, v } = rgb2hsv(r, g, b)

      Hue.value = h
      Saturation.value = s
      Value.value = v
    } else {
      watchEvent = ''
    }
  })

  return {
    alpha,
    red,
    green,
    blue,
    Hue,
    Saturation,
    Value,
    hex,
    HSL_Hue,
    HSL_S,
    Lightness,
    isDrag
  }
}
