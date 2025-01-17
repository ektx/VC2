<template>
  <div class="vc-time-picker__clock" @click.stop>
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
          v-if="item.type.startsWith('H')"
          type="number" 
          :class="[{'is-active': currentType === 'hour'}]"
          v-model.number="iHour"
          @focus="changeCurrentType('hour')"
          @blur="blurEvt"
        >
        <input 
          v-else-if="item.type.startsWith('m')"
          type="number"
          :class="[{'is-active': currentType === 'minutes'}]"
          v-model.number="iMinutes"
          @focus="changeCurrentType('minutes')"
          @blur="blurEvt"
        >
        <input
          v-else-if="item.type.startsWith('s')" 
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
      let key = val === 0 ? 24 : val
      
      this.currentHour = key in this.mainIndex ? this.mainIndex[key] : this.subIndex[key]
    },
    currentMin(val, old) {
      val && (val.active = true)
      old && (old.active = false)
    },
    minutes(val) {
      if (this.currentType === 'minutes')
        this.currentMin = this.minutesIndex[val]
    },
    currentSec(val, old) {
      val && (val.active = true)
      old && (old.active = false)
    },
    seconds(val) {
      if (this.currentType === 'seconds')
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
      this.currentType = type

      if (type !== 'hour') {
        this.getMinutesIndex()
      }
    },
    blurEvt(evt) {
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
