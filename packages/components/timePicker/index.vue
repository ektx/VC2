<template>
  <div class="vc-time-picker">
    <div :class="['vc-time-picker__header',{'is-active': visible}]">
      <i class="vc-icon-time"></i>
      <input ref="referenceArea" 
        type="text" 
        v-model="displayTime" 
        @click.stop="createPopperLayer"
      >
    </div>
    <teleport to="body">
      <transition name="vc-fade">
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
          <div class="arrow" data-popper-arrow></div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import vcClock from './clock.vue'

export default {
  name: 'VcTimePicker',
  components: {
    vcClock
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
              case 'm': type = 'minutes'; break;
              case 's': type = 'seconds'; break;
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
      set(val) {
        console.log(val)
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
        this.layer = createPopper(
          this.$refs.referenceArea,
          this.$refs.popper,
          {
            placement: 'bottom',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 15]
                }
              },
              {
                name: 'computeStyles',
                options: {
                  adaptive: false,
                  gpuAcceleration: false
                }
              }
            ]
          }
        )
      }
    },

    close() {
      this.visible = false
      this.layer && this.layer.destroy()
      this.layer = null
    },

    getFormatValue(date, format) {
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
          d.getDate() +1,
          this.newDate.hour,
          this.newDate.minutes,
          this.newDate.seconds
        )
      }

      this.$emit('update:modelValue', value)
      this.close()
    }
  }
}
</script>

<style lang="less">
.vc-time-picker {
  &__clock-mod {
    border-radius: 3px;
    border: 1px solid rgba(0,8,16,.15);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background-color: #fff;

    & > .arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #fff;
      transform: rotate(45deg);
      border: 1px solid rgba(0,8,16,.15);
    }

    &[data-popper-placement^='bottom'] > .arrow {
      top: -5px;
      border-right: none;
      border-bottom: none;
    }
    &[data-popper-placement^='top'] > .arrow {
      bottom: -5px;
      border-top: none;
      border-left: none;
    }
  }

  &__footer {
    padding: 0 5px;
    text-align: right;
    border-top: 1px solid #ddd;

    button {
      padding: 7px;
      color: #333;
      font-size: 12px;
      border: none;
      outline: none;
      background-color: #fff;
      cursor: pointer;

      &:last-child {
        color: #09f;
      }
    }
  }
}

.vc-time-picker__header {
  position: relative;
  font-size: 14px;
  color: #333;
  
  & input {
    padding: 5px 25px;
    width: 200px;
    border-radius: 3px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    outline: none;
    transition: border .3s;

    &:hover {
      border-color: #bbb;
    }
  }

  & > i {
    position: absolute;
    top: 50%;
    left: 6px;
    transform: translateY(-50%);
    color: #ccc;
    transition: color .3s;
  }

  &.is-active {
    input {
      border-color: #09f;
    }
    i {
      color: #09f;
    }
  }
}
</style>