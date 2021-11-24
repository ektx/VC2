import { ref, watch } from 'vue'
import { rgb2hsv, hsv2rgb, hsv2hsl, toHex, hex2rgb } from './color'

export default function store(emit) {
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

  const HSL_Hue = ref(0)
  // 定义饱和度; 0% 为灰色， 100% 全色
  const HSL_S = ref(0)
  // 定义亮度 0% 为暗, 50% 为普通, 100% 为白
  const Lightness = ref(0)

  const format = ref('hex')

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

    updateVal()
  })

  let watchEvent = null

  watch([alpha], ([val]) => {
    updateVal()
  })

  watch([hex], ([val]) => {
    let color = hex2rgb(val)

    console.log('hex', watchEvent)
    if (watchEvent !== 'RGBA') {
      watchEvent = 'hex'
      if (color) {
        let { r, g, b } = color
        red.value = r
        blue.value = b
        green.value = g
      }
    } else {
      watchEvent = ''
    }

    updateVal()
  })

  watch([red, green, blue], ([r, g, b]) => {
    console.log('REGA', r, g, b)

    if (watchEvent !== 'hex') {
      hex.value = toHex({ r, g, b })
    }

    if (watchEvent !== 'HSV') {
      watchEvent = 'RGB'
      const { h, s, v } = rgb2hsv(r, g, b)

      Hue.value = h
      Saturation.value = s
      Value.value = v
    } else {
      watchEvent = ''
    }

    watch([HSL_Hue, HSL_S, Lightness], ([h, s, l]) => {
      console.log(h, s, l)
    })
  })

  function updateVal() {
    let result = getFormatStr()

    emit('update:modelValue', result)
    emit('change', result)

    // if (this.vcFormItem) this.vcFormItem.checkValidate('change')
  }

  function getFormatStr() {
    const a = alpha.value
    let isOpacity = alpha.value === 1
    let start = ''
    let end = ''
    let body = ''

    switch (format.value) {
      case 'hex': {
        body = hex.value
        break
      }
      case 'rgb': {
        start = isOpacity ? 'rgb(' : 'rgba('
        end = isOpacity ? ')' : `, ${a})`
        body = `${red.value}, ${green.value}, ${blue.value}`
        break
      }
      case 'hsl': {
        start = isOpacity ? 'hsl(' : 'hsla('
        end = isOpacity ? ')' : `, ${a})`
        body = `${HSL_Hue.value}, ${HSL_S.value}%, ${Lightness.value}%`
        break
      }
      case 'hsv': {
        start = isOpacity ? 'hsv(' : 'hsva('
        end = isOpacity ? ')' : `, ${a})`
        body = `${Hue.value}, ${Saturation.value}, ${Value.value}`
      }
    }

    return start + body + end
  }

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
    format,
    isDrag
  }
}
