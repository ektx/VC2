<template>
  <div class="vc-time-picker">
    <h1 ref="referenceArea" @click="createPopperLayer">{{ hour }}:{{ minutes }}: {{ seconds }}</h1>
    <teleport to="body">
      <transition name="vc-fade">
        <div ref="popper" v-show="visible" class="vc-time-picker__clock-mod">
          
          <vc-clock 
            :format="valueFormat"
            v-model:hour="hour"
            v-model:minutes="minutes"
            v-model:seconds="seconds"
          />
          <div class="vc-time-picker__footer">
            <button>取消</button>
            <button>确认</button>
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
      type: Date,
      default: () =>  new Date()
    },
    valueFormat: {
      type: String,
      default: 'H:m:s'
    }
  },
  data() {
    return {
      visible: false,
      layer: null,
      hour: null,
      minutes: null,
      seconds: null
    }
  },
  methods: {
    createPopperLayer() {
      this.getTimeValue()

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

    getTimeValue() {
      this.hour = this.modelValue.getHours()
      this.minutes = this.modelValue.getMinutes()
      this.seconds = this.modelValue.getSeconds()
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

    &[data-popper-placement^='bottom'] > .arrow {
      position: absolute;
      top: -5px;
      width: 8px;
      height: 8px;
      background: #fff;
      transform: rotate(45deg);
      border: 1px solid rgba(0,8,16,.15);
      border-right: none;
      border-bottom: none;
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
</style>