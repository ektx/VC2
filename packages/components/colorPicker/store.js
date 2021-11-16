import { ref, watch } from 'vue'
import { rgb2hsv, hsv2rgb, toHex } from './color'

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
    isDrag
  }
}
