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
              'is-disabled': index.disabled
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
          @blur="blurEvt"
        >
        <input 
          v-else-if="item.type === 'm'"
          type="number"
          :class="[{'is-active': currentType === 'minutes'}]"
          v-model.number="iMinutes"
          @focus="changeCurrentType('minutes')"
          @blur="blurEvt"
        >
        <input
          v-else-if="item.type === 's'" 
          type="number"
          :class="[{'is-active': currentType === 'seconds'}]"
          v-model.number="iSeconds"
          @focus="changeCurrentType('seconds')"
          @blur="blurEvt"
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { getCloseTime, getTimeLine, string2time } from './time'

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
      currentHour: null,
      currentMin: null,
      currentSec: null,
      placeholderIndex: '',
      mainIndex: {},
      subIndex: {},
      minutesIndex: {}
    }
  },
  computed: {
    ableTimeLine() {
      if (!this.timeBlock) return

      let block = this.timeBlock.split('|')
      let timeBlock = []

      block.map(blockItem => {
        let arr = blockItem.split('-')

        timeBlock.push([string2time(arr[0]), string2time(arr[1])])
      })

      return getTimeLine(timeBlock)
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

        if (this.isSafe(val, this.minutes, this.seconds)) 
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
  watch: {
    currentHour(val, old) {
      val && (val.active = true)
      old && (old.active = false)
    },
    hour(val) {
      console.log(val)
      let key = val === 0 ? 24 : val
      
      this.currentHour = key in this.mainIndex ? this.mainIndex[key] : this.subIndex[key]
    },
    currentMin(val, old) {
      val && (val.active = true)
      old && (old.active = false)
    },
    minutes(val) {
      console.log('MM', val)
      this.currentMin = this.minutesIndex[val]
    },
    currentSec(val, old) {
      val && (val.active = true)
      old && (old.active = false)
    },
    seconds(val) {
      console.log('sec', val)
      this.currentSec = this.minutesIndex[val]
    }
  },
  mounted() {
    this.getMainIndex()
    this.getSubIndex()
  },
  methods: {
    getMainIndex() {
      this.mainIndex = {}

      for (let i = 0; i < 12; i++) {
        let hour = i +1
        this.mainIndex[hour] = {
          label: hour,
          active: hour === this.hour,
          disabled: this.getHourIsAble(hour)
        }
      }
    },
    getSubIndex() {
      this.subIndex = {}

      this.subIndex[24] = {
        label: 0,
        active: this.hour === 0 || this.hour === 24,
        disabled: this.getHourIsAble(0)
      }

      for (let i = 13; i < 24; i++) {
        this.subIndex[i] = {
          label: i,
          active: i === this.hour,
          disabled: this.getHourIsAble(i)
        }
      }
    },
    getHourIsAble(hour) {
      if (!this.timeBlock) return false

      let result = false
      this.ableTimeLine.line.forEach(arr => {
        if (!result) {
          let [start, end] = arr
          let startH = start.getHours()
          let endH = end.getHours()
          
          result = hour >= startH && hour <= endH
        }
      })

      return !result
    },

    getMinutesIndex() {
      console.log('update index ...')
      this.minutesIndex = {}

      for (let i = 0; i < 60; i++) {
        let active = this.currentType === 'seconds' ? i === this.seconds : i === this.minutes
        this.minutesIndex[i] = {
          label: i ,
          isLeader: i % 10 === 0,
          active,
          disabled: this.currentType === 'seconds' ? this.getHoursIsAble(this.hour, this.minutes, i) : this.getHoursIsAble(this.hour, i, this.seconds)
        }

        if (active) {
          if (this.currentType === 'seconds') this.currentSec = this.minutesIndex[i]
          else this.currentMin = this.minutesIndex[i]
        }
      }
    },

    changeCurrentType(type) {
      console.log(type)
      this.currentType = type

      if (type !== 'hour') {
        this.getMinutesIndex()
      }
    },
    blurEvt(evt) {
      console.log(this.currentType)
      if (evt.target.value != this.hour) {
        evt.target.value = this[this.currentType]
      }
    },
    updateMinOrSec(type, val) {
      let isSafe = true
      if (val === '') return

      if (val > 59) {
        val = 0
      } else if (val < 0) {
        val = 59
      }
      console.log(`set ${type}:`, val)
      if (type === 'minutes') {
        isSafe = this.isSafe(this.hour, val, this.seconds)
      } else {
        isSafe = this.isSafe(this.hour, this.minutes, val)
      }

      isSafe && this.$emit(`update:${type}`, val)
    },

    setHour(index) {
      if (index.disabled) return

      if (this.isSafe(index.label, this.minutes, this.seconds)) {
        this.$emit('update:hour', index.label)
      } else {
        let d = new Date()
        d.setHours(index.label, this.minutes, this.seconds, 0)

        let { hours, min, sec } = getCloseTime(this.ableTimeLine.line.flat(), d)

        this.$emit('update:hour', hours)
        this.$emit('update:minutes', min)
        this.$emit('update:seconds', sec)
      }
    },
    updatePlaceholer(index) {
      this.placeholderIndex = index.label
    },
    setScale(index) {
      if (index.disabled) return
      this.$emit(`update:${this.currentType}`, index.label)
    },
    getHoursIsAble(hour, min, sec) {
      if (!this.timeBlock) return false

      let d = new Date()
      let result = false

      if (!this.ableTimeLine) return result

      d.setHours(hour, min, sec, 0)

      this.ableTimeLine.line.forEach(arr => {
        if (!result) {
          let [start, end] = arr

          result = d >= start && d <= end
        }
      })
      return !result
    },
    isSafe(h, m, s) {
      if (!this.timeBlock) return true

      let result = false
      let d = new Date()

      d.setHours(h, m, s, 0)

      this.ableTimeLine.line.forEach(arr => {
        if (!result) {
          let [start, end] = arr

          result = d > start && d <= end
        }
      })
      return result
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
          cursor: not-allowed;
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
      &.is-disabled {
        span {
          cursor: not-allowed;

          &::after {
            background-color: #ddd;
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