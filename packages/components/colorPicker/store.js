import { ref, watch } from 'vue'
import { rgb2hsv, hsv2rgb, hsv2hsl, toHex, hex2rgb, hsl2hsv } from './color'

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
  const currentColor = ref({})

  watch([Hue], ([h]) => {
    console.log('HSVA-H', h)
    isDrag.value = true
    updateVal()
  })
  watch([Saturation, Value], ([s, v]) => {
    console.log('HSVA', s, v)

    updateVal()
  })

  watch([alpha], () => {
    updateVal({ type: 'alpha' })
  })

  watch([hex], ([val]) => {
    if (isDrag.value) return

    console.log('hex', val)
    let h = 0,
      s = 0,
      v = 0
    const color = hex2rgb(val)
    if (color) {
      const { r, g, b } = color

      ;({ h, s, v } = rgb2hsv(r, g, b))
      Hue.value = h
      Value.value = v
      Saturation.value = s
    }
  })

  watch([red, green, blue], ([r, g, b]) => {
    console.log('REGA', r, g, b, isDrag.value)

    if (isDrag.value) return

    const { h, s, v } = rgb2hsv(r, g, b)
    Hue.value = h
    Value.value = v
    Saturation.value = s
  })

  watch([HSL_Hue, HSL_S, Lightness], ([h, s, l]) => {
    console.log('HSL', h, s, l)
    if (isDrag.value) return

    const hsv = hsl2hsv(h, s, l)
    Hue.value = hsv.h
    Value.value = hsv.v
    Saturation.value = hsv.s
  })

  function updateVal() {
    let h = Hue.value
    let s = Saturation.value
    let v = Value.value
    let a = alpha.value
    console.log('Update...')
    let { r, g, b } = hsv2rgb(h, s, v)

    currentColor.value = {
      backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`
    }

    if (isDrag.value) {
      // RGB
      red.value = r
      green.value = g
      blue.value = b

      // hex
      hex.value = toHex({ r, g, b })

      // HSL
      let hsl = hsv2hsl(h, s, v)
      HSL_Hue.value = hsl.h
      HSL_S.value = hsl.s
      Lightness.value = hsl.l
    }

    let result = getFormatStr()
    isDrag.value = false

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
    let h = Hue.value
    let s = Saturation.value
    let v = Value.value

    switch (format.value) {
      case 'hex': {
        body = hex.value
        body = body.startsWith('#') ? body : '#' + body
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
        body = `${h}, ${s}, ${v}`
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
    isDrag,
    currentColor
  }
}
