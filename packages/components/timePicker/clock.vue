<template>
  <div class="vc-time-picker__clock">
    <div class="vc-time-picker__clock-dial">
      <div v-show="currentType === 'hour'" class="vc-time-picker__clock-hour-mod">
        <ul class="vc-time-picker__clock-index">
          <li 
            v-for="index in mainIndex" 
            :key="index.label"
            :class="[{
              'is-active': index.active,
              'is-disabled': index.disabled
            }]"
            @click="setHour(index)"
          >
            <span>{{index.label}}</span>
          </li>
        </ul>
        <ul class="vc-time-picker__clock-sub-index">
          <li 
            v-for="index in subIndex" 
            :key="index.label"
            :class="[{
              'is-active': index.active,
              'is-disabled': index.disabled
            }]"
            @click="setHour(index)"
          >
            <span>{{index.label}}</span>
          </li>
        </ul>
      </div>
      <div 
        v-show="currentType !== 'hour'" 
        class="vc-time-picker__clock-minutes-mod"
      >
        <div class="vc-time-picker__clock-placeholder">
          {{ placeholderIndex }}
        </div>
        <ul :class="['vc-time-picker__clock-minutes', currentType]">
          <li 
            v-for="index in minutesIndex" 
            :key="index.label"
            :class="[{
              'is-active': index.active,
              'is-leader': index.isLeader,
            }]"
            @mouseover="updatePlaceholer(index)"
            @mouseleave="placeholderIndex = ''"
            @click="setScale(index)"
          >
            <span>{{index.label}}</span>
          </li>
        </ul>
      </div>
    </div>
    <ul class="vc-time-picker__clock-time">
      <li v-for="item in iFormat" :key="item.type">
        <input 
          v-if="item.type === 'H'"
          type="number" 
          :class="[{'is-active': currentType === 'hour'}]"
          v-model.number="iHour"
          @focus="changeCurrentType('hour')"
        >
        <input 
          v-else-if="item.type === 'm'"
          type="number"
          :class="[{'is-active': currentType === 'minutes'}]"
          v-model.number="iMinutes"
          @focus="changeCurrentType('minutes')"
        >
        <input
          v-else-if="item.type === 's'" 
          type="number"
          :class="[{'is-active': currentType === 'seconds'}]"
          v-model.number="iSeconds"
          @focus="changeCurrentType('seconds')"
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { getTimeLine, string2time } from './time'

export default {
  props: {
    hour: {
      type: Number,
      default: 0
    },
    minutes: {
      type: Number,
      default: 0
    },
    seconds: {
      type: Number,
      default: 0
    },
    // 时间显示格式
    format: {
      type: String,
      default: 'H:m:s'
    },
    timeBlock: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentType: 'hour',
      placeholderIndex: ''
    }
  },
  computed: {
    ableTimeLine() {
      if (!this.timeBlock) return

      let block = this.timeBlock.split('|')
      let timeBlock = []
      console.log(this.timeBlock, block)

      block.map(blockItem => {
        let arr = blockItem.split('-')

        timeBlock.push([string2time(arr[0]), string2time(arr[1])])
      })

      // console.log(timeBlock)
      return getTimeLine(timeBlock)
    },
    mainIndex() {
      let result = []

      for (let i = 0; i < 12; i++) {
        let hour = i +1
        result.push({
          label: hour,
          active: hour === this.hour,
          disabled: this.getHoursIsAble(hour)
        })
      }
      return result
    },
    subIndex() {
      let result = []

      for (let i = 13; i < 24; i++) {
        result.push({
          label: i,
          active: i === this.hour,
          disabled: this.getHoursIsAble(i)
        })
      }
      return result.concat({
        label: 0,
        active: this.hour === 0 || this.hour === 24,
        disabled: this.getHoursIsAble(0)
      })
    },
    minutesIndex() {
      console.log('update index ...')
      let result = []

      for (let i = 0; i < 60; i++) {
        result.push({
          label: i ,
          isLeader: i % 10 === 0,
          active: this.currentType === 'seconds' ? i === this.seconds : i === this.minutes,
          disabled: false
        })
      }

      return result
    },
    iHour: {
      get() {
        return this.hour
      },
      set(val) {
        if (val === '') return

        if (val < 0) {
          val = 23
        } else if (val > 23) {
          val = 0
        }

        this.$emit('update:hour', val)
      }
    },
    iMinutes: {
      get() {
        return this.minutes
      },
      set(val) {
        this.updateMinOrSec('minutes', val)
      }
    },
    iSeconds: {
      get() {
        return this.seconds
      },
      set(val) {
        this.updateMinOrSec('seconds', val)
      }
    },
    iFormat() {
      let val = this.format.split(':')

      let result = val.map(item => ({
        type: item
      }))
      
      return result
    }
  },
  methods: {
    changeCurrentType(type) {
      console.log(type)
      this.currentType = type
    },
    updateMinOrSec(type, val) {
      if (val === '') return

      if (val > 59) {
        val = 0
      } else if (val < 0) {
        val = 59
      }
      console.log(`set ${type}:`, val)
      this.$emit(`update:${type}`, val)
    },
    setHour(index) {
      if (index.disabled) return
      console.log(index)
      this.$emit('update:hour', index.label)
    },
    updatePlaceholer(index) {
      this.placeholderIndex = index.label
    },
    setScale(index) {
      this.$emit(`update:${this.currentType}`, index.label)
    },
    getHoursIsAble(hour) {
      let d = new Date()
      let result = false

      if (!this.ableTimeLine) return result

      // debugger
      d.setHours(hour, this.minutes, this.seconds)
      console.log(hour, d)
      this.ableTimeLine.line.forEach(arr => {
      // debugger
        if (!result) {
          let [start, end] = arr

          result = d >= start && d <= end
        }
      })
      console.log(!result)
      return !result
    }
  }
}
</script>

<style lang="less">
.loop( @count )when( @count > 0) {
  li:nth-child(@{count}){
    transform: rotate(@count * 30deg);
    
    span {
      transform: translate(0, -50%) rotate( (9 - @count) * 30deg)
    }
  }
  
  .loop((@count - 1))
}

.loop2( @count )when( @count > 0) {
  li:nth-child(@{count}){
    transform: rotate(@count * 6deg);
  }
  
  .loop2((@count - 1))
}

.vc-time-picker__clock {
  width: 100%;
  padding: 10px 10px 0;
  background-color: #fff;
  border-radius: 3px;
  box-sizing: border-box;

  &-dial {
    position: relative;
    width: 180px;
    height: 180px;
    border-radius: 100%;
    background-color: #f5f5f5;
  }

  &-hour-mod {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  &-minutes,
  &-sub-index,
  &-index {
    position: absolute;
    top: 3px;
    left: 3px;
    bottom: 3px;
    right: 3px;
    transform: rotate(90deg);
    pointer-events: none;

    li {
      position: absolute;
      top: 50%;
      left: 0;
      width: 50%;
      height: 1px;
      line-height: 20px;
      font-size: 12px;
      transform-origin: center right;

      span {
        position: absolute;
        width: 20px;
        height: 20px;
        color: #333;
        text-align: center;
        line-height: 20px;
        border-radius: 100%;
        cursor: pointer;
        pointer-events: all;

        &:hover {
          color: #fff;
          background-color: #333;
          transition: background-color .3s, color .3s;
        }
      }


    }
  }

  &-sub-index,
  &-index {
    li {
      &.is-active {
        background-color: #333;

        span {
          color: #fff;
          background-color: #333;
        }
      }
      &.is-disabled {
        span {
          color: #aaa;
        }
      }
    }
    .loop(12)
  }


  &-minutes-mod {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 48px;
    text-align: center;
    line-height: 180px;
    color: #ddd;
  }

  &-minutes {
    transform: rotate(84deg);

    li {
      font-size: 0;

      &.is-active {
        background-color: #333;

        span {
          border-radius: 3px;
          background-color: #fff;
          border: 1px solid #333;

          &::after {
            background-color: #333;
          }
        }
      }

      span {
        height: 7px;
        border-radius: 2px;
        background-color: transparent;
        border: 1px solid transparent;
        transform: translate(0, -50%);

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 10%;
          width: 6px;
          height: 1px;
          background-color: #4e4e4e;
          transform: translate(2px, -60%);
        }

        &:hover {
          background-color: rgba(0, 0, 0, .3);

          &::after {
            background-color: #fff;
          }
        }
      }

      &.is-leader {
        span {
          &::after {
            height: 2px;
            width: 12px;
          }
        }
      }
    }

    &.seconds{
      li {
        &.is-active {
          background-color: #f00;

          span {
            border-radius: 3px;
            background-color: #fff;
            border: 1px solid #f00;

            &::after {
              background-color: #f00;
            }
          }
        }
      }
    }

    .loop2(60)
  }

  &-sub-index {
    top: 23px;
    left: 23px;
    right: 23px;
    bottom: 23px;

    li {
      span {
        color: #4c4c4c;
      }
    }
  }

  &-time {
    margin: 8px 0;
    text-align: center;

    li {
      display: inline-block;

      & + li {
        &::before {
          content: ':';
          display: inline-block;
          font-size: 20px;
          vertical-align: text-bottom;
        }
      }
    }

    input {
      width: 40px;
      font-size: 24px;
      text-align: center;
      outline: none;
      border: none;
      border-radius: 3px;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        appearance: none;
      }

      &.is-active {
        background: #eee;
      }
    }
  }
}
</style>