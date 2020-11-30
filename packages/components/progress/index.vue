<template>
  <div :class="['vc-progress', status, {'is-hide-text': textType !== 'outer'}]">
    <div class="vc-progress-bar" :style="barStyle">
      <div 
        :class="['vc-progress-bar__outer', {'is-active': !percentage.done}]" 
        :style="outStyle"
      >
        <span v-if="textType === 'inner'">{{ percentage.str }}</span>
      </div>
    </div>
    <div v-if="textType === 'outer'" class="vc-progress-text">
      <span v-if="status === 'default'">
        <slot>{{ percentage.str }}</slot>
      </span>
      <i v-else :class="statusIcon"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VcProgress',
  props: {
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    // 状态 default/success/warning/error
    status: {
      type: String,
      default: 'default'
    },
    // 文字控制 outer/inner/none
    textType: {
      type: String,
      default: 'outer'
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    /**
     * 自定义颜色
     * 1. string 具体的颜色值
     * 2. array  颜色数组
     */
    color: {
      type: [String, Array],
      default: ''
    }
  },
  computed: {
    total() {
      return this.max - this.min
    },
    percentage() {
      let val = this.value / this.total

      val = val > 1 ? 1 : val

      return {
        val,
        done: val === 1,
        str: val * 100 + '%'
      }
    },
    statusIcon() {
      return `vc-icon-${this.status}`
    },
    barStyle() {
      return {
        height: this.strokeWidth + 'px',
        borderRadius: this.strokeWidth + 'px'
      }
    },
    outStyle() {
      let obj = {
        width: this.percentage.str
      }

      if (this.color) {
        switch (typeof this.color) {
          case 'string': {
            obj.background = this.color
            break
          }
          case 'object': {
            for (let i = 0; i < this.color.length; i++) {
              if (this.value < this.color[i].percentage) {
                obj.background = this.color[i].color
                break
              }
            }
          }
        } 
      }

      return obj
    }
  }
}
</script>

<style lang="less">
.vc-progress {
  position: relative;
  display: grid;
  margin: 10px 0;
  grid-template-columns: 1fr 3em;
  column-gap: 10px;
  align-items: center;

  &.is-hide-text {
    grid-template-columns: 1fr;
  }

  &-bar {
    height: 6px;
    border-radius: 6px;
    background: #eee;

    &__outer {
      position: relative;
      height: 100%;
      border-radius: inherit;
      color: inherit;
      background-color: currentColor;
      overflow: hidden;
      transition: width .3s, background .3s;

      &.is-active::after {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        display: block;
        width: 40%;
        height: 100%;
        transform: translateX(-100%);
        background: rgb(255,255,255);
        background: linear-gradient(
          270deg, 
          rgba(255,255,255,0) 0%, 
          rgba(255,255,255,.2) 30%, 
          rgba(255,255,255,.2) 70%, 
          rgba(255,255,255,0) 100%
        );
        animation: vc-progress-active 1.5s infinite linear;
      }

      span {
        display: grid;
        height: 100%;
        margin: 0 3px;
        color: #fff;
        text-align: right;
        align-items: center;
      }
    }
  }
  &-text {
    font-size: 12px;
    color: inherit;

    & > span {
      color: #333;
    }
  }

  &.default {
    color: #09f;
  }
  &.success {
    color: #4caf50;
  }
  &.warning {
    color: #ff9800;
  }
  &.error {
    color: #ff4d4f;
  }

  @keyframes vc-progress-active {
    0% {
      left: 0%;
    }
    100% {
      left: 150%;
    }
  }
}
</style>