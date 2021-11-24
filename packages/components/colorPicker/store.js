import { ref, watch } from 'vue'
import { rgb2hsv, hsv2rgb, hsv2hsl, toHex } from './color'

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

  const HSL_Hue = ref('0%')
  const HSL_S = ref('0%')
  const Lightness = ref('0%')

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

  function updateVal() {
    let result = getFormatStr(
      Hue.value,
      Saturation.value,
      Value.value,
      alpha.value,
      format.value
    )

    emit('update:modelValue', result)
    emit('change', result)

    // if (this.vcFormItem) this.vcFormItem.checkValidate('change')
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

function getFormatStr(h, s, v, a, format) {
  let result = ''

  if (h !== undefined) {
    switch (format) {
      case 'hex': {
        let rgb = hsv2rgb(h, s, v)
        result = toHex(rgb)
        break
      }
      case 'rgb': {
        let { r, g, b } = hsv2rgb(h, s, v)

        if (a === 1) {
          result = `rgb(${r}, ${g}, ${b})`
        } else {
          result = `rgba(${r}, ${g}, ${b}, ${a})`
        }
        break
      }
      case 'hsl': {
        let { h: _h, s: _s, l } = hsv2hsl(h, s, v)
        if (a === 1) result = `hsl(${_h}, ${_s}, ${l})`
        else result = `hsla(${_h}, ${_s}, ${l}, ${a})`
        break
      }
      case 'hsv': {
        if (a === 1) result = `hsv(${h}, ${s}, ${v})`
        else result = `hsva(${h}, ${s}, ${v}, ${a})`
      }
    }
  }

  return result
}
