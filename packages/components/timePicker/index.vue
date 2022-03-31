<template>
  <div class="vc-time-picker">
    <div
      :class="[
        'vc-time-picker__header',
        { 'is-active': visible, 'is-disabled': disabled }
      ]"
    >
      <i class="vc-icon-time"></i>
      <input
        ref="referenceArea"
        type="text"
        v-model="displayTime"
        :disabled="disabled"
        :readonly="disabled"
        :placeholder="placeholder"
        @click.stop="createPopperLayer"
        @blur="modelBlurEvt"
      />
    </div>
    <teleport to="body">
      <transition name="vc-zoom-in-top">
        <div ref="popper" v-show="visible" class="vc-time-picker__clock-mod">
          <vc-clock
            :format="format"
            :time-block="timeBlock"
            v-model:hour="newDate.hour"
            v-model:minutes="newDate.minutes"
            v-model:seconds="newDate.seconds"
          />
          <div class="vc-time-picker__footer">
            <button @click.stop="close">取消</button>
            <button @click.stop="setUpdate">确认</button>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom'
import vcClock from './clock.vue'

export default {
  name: 'VcTimePicker',
  components: {
    vcClock
  },
  inject: {
    vcFormItem: {
      default: null
    }
  },
  props: {
    modelValue: {
      type: [Date, String],
      default: ''
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    // 输出值格式，默认为 Date 格式
    valueFormat: {
      type: String,
      default: ''
    },
    // 时间块
    timeBlock: {
      type: String,
      default: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      visible: false,
      layer: null,
      newDate: {
        hour: null,
        minutes: null,
        seconds: null
      }
    }
  },
  computed: {
    oldDate() {
      let result = null

      if (this.modelValue) {
        result = {}

        if (typeof this.modelValue === 'string') {
          let formatArr = this.format.match(/\w/g)
          // 暂定用户只使用 英文冒号(:)
          let valueArr = this.modelValue.split(':')

          formatArr.forEach((item, i) => {
            let type = 'hour'
            switch (item) {
              case 'm':
                type = 'minutes'
                break
              case 's':
                type = 'seconds'
                break
            }
            result[type] = parseInt(valueArr[i]) || 0
          })
        } else {
          result = {
            hour: this.modelValue.getHours(),
            minutes: this.modelValue.getMinutes(),
            seconds: this.modelValue.getSeconds()
          }
        }
      }

      return result
    },
    displayTime: {
      get() {
        return this.getFormatValue(this.oldDate, this.format)
      },
      set() {
        // .ignore 不做任何处理工作
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.close)
  },
  unmounted() {
    document.removeEventListener('click', this.close)
  },
  methods: {
    createPopperLayer() {
      // 先触发全局的事件
      document.body.click()

      if (this.oldDate) {
        this.newDate = { ...this.oldDate }
      } else {
        let d = new Date()

        this.newDate = {
          hour: d.getHours(),
          minutes: d.getMinutes(),
          seconds: d.getSeconds()
        }
      }

      this.visible = true
      if (!this.layer) {
        const { referenceArea, popper } = this.$refs

        this.layer = autoUpdate(referenceArea, popper, () => {
          computePosition(referenceArea, popper, {
            placement: 'bottom',
            middleware: [flip(), offset(5)]
          }).then(({ x, y }) => {
            Object.assign(popper.style, {
              left: x + 'px',
              top: y + 'px'
            })
          })
        })
      }
    },

    close() {
      if (this.visible) {
        this.vcFormItem && this.vcFormItem.checkValidate('blur')

        this.visible = false
        this.layer = null
        this.$emit('close')
      }
    },

    getFormatValue(date, format) {
      if (!date) return ''

      let result = []
      let { hour, minutes, seconds = 0 } = date

      format.match(/\w+/g).forEach(item => {
        switch (item) {
          case 'HH': {
            result.push(String(hour).padStart(2, '0'))
            break
          }
          case 'H': {
            result.push(hour)
            break
          }
          case 'mm': {
            result.push(String(minutes).padStart(2, '0'))
            break
          }
          case 'm': {
            result.push(minutes)
            break
          }
          case 'ss': {
            result.push(String(seconds).padStart(2, '0'))
            break
          }
          case 's': {
            result.push(seconds)
          }
        }
      })

      return result.join(':')
    },

    setUpdate() {
      let d = new Date()
      let value = ''

      if (this.valueFormat) {
        value = this.getFormatValue(this.newDate, this.valueFormat)
      } else {
        value = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDate() + 1,
          this.newDate.hour,
          this.newDate.minutes,
          this.newDate.seconds
        )
      }

      this.$emit('update:modelValue', value)
      this.$emit('change', value)
      this.vcFormItem && this.vcFormItem.checkValidate('change')
      this.close()
    },
    // 失焦更新时间
    modelBlurEvt(evt) {
      let val = evt.target.value

      if (val === this.displayTime) return

      let [hour = 0, min = 0, sec = 0] = val.match(/\d+/g)

      this.newDate = {
        hour: ~~hour,
        minutes: ~~min,
        seconds: ~~sec
      }
      this.setUpdate()
    }
  }
}
</script>
