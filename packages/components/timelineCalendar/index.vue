<template>
  <div class="timeline-calendar" ref="rootEl">
    <div class="timeline-calendar__content">
      <div class="timeline-calendar__aside" :style="{ ...asideData.style }">
        <div class="table-head">
          <TimeTree :data="[head]">
            <div
              class="table-cell"
              v-for="item in head"
              :key="item.key"
              :style="{
                height: (calendarCellH ? calendarCellH : cellH) * 2 - 1 + 'px',
                width: item.width + 'px'
              }"
            >
              {{ item.label }}
            </div>
          </TimeTree>
        </div>

        <div
          ref="asideBodyEl"
          class="table-body"
          :style="{
            top: (calendarCellH ? calendarCellH : cellH) * 2 + 'px'
          }"
          @scroll="onScroll('asideBody', $event)"
        >
          <TimeTree :data="data" v-slot="{ item }">
            <div
              class="table-cell"
              v-for="(td, i) in head"
              :key="td.key"
              :style="{
                height: cellH + 'px',
                width: head[i].width + 'px'
              }"
            >
              {{ item[td.key] }}
            </div>
          </TimeTree>
        </div>
      </div>

      <div class="resize-handle-box">
        <div class="resize-handle-bar" @mousedown="onResizehandleDown"></div>
      </div>

      <div class="timeline-calendar__calendar">
        <div
          class="calendar-header"
          ref="calendarHeaderEl"
          @scroll="onScroll('calendarHead', $event)"
          @dblclick="gotoTody"
        >
          <div
            class="calendar-header--row"
            :style="{
              width: calendarWidth + 'px',
              height: (calendarCellH ? calendarCellH : cellH) + 'px'
            }"
          >
            <div
              class="calendar-header--col month"
              v-for="month in timeLine.months"
              :key="month.id"
              :style="month.style"
            >
              {{ month.id }}
            </div>
          </div>
          <div
            class="calendar-header--row"
            :style="{
              width: calendarWidth + 'px',
              height: (calendarCellH ? calendarCellH : cellH) + 'px'
            }"
          >
            <div
              v-for="week in timeLine.weeks"
              :key="week.id"
              :style="week.style"
              :class="[
                'calendar-header--col',
                'unit',
                { 'is-current': week.isCurrent, 'is-old': week.isOld }
              ]"
            >
              {{ week.week }}
            </div>
          </div>
        </div>

        <div
          ref="calendarBodyEl"
          class="calendar-body"
          :style="{
            top: (calendarCellH ? calendarCellH : cellH) * 2 + 'px'
          }"
          @scroll="onScroll('calendarBody', $event)"
        >
          <div
            class="calendar-body--grid"
            :style="{
              width: calendarWidth + 'px'
            }"
          >
            <TimeTree :data="data" :showLevel="false" v-slot="{ item, index }">
              <div
                class="calendar-body--col"
                :style="{
                  height: cellH + 'px'
                }"
              >
                <div
                  v-for="week in timeLine.weeks"
                  :key="week.id"
                  :style="week.style"
                  :class="[
                    'calendar-body--cell',
                    { 'is-current': week.isCurrent, 'is-old': week.isOld }
                  ]"
                  @click="$emit('onCellClick', item, week, index)"
                ></div>
              </div>

              <div v-if="item.calendar" class="calendar-body--project">
                <div
                  class="calendar-body--project-item"
                  v-for="(project, i) in item.calendar"
                  :key="i"
                  :style="getProjectItemStyle(project)"
                  @click="$emit('onLabelClick', item, project, i)"
                >
                  <slot name="project-item">
                    <div class="project-box" :item="project">
                      <div class="project-box--inner" :style="project.style">
                        {{ project.inner }}
                      </div>
                    </div>
                  </slot>
                </div>
              </div>
            </TimeTree>
          </div>

          <div class="calendar-body--list"></div>
        </div>
      </div>
    </div>

    <TimeIntervalTooltip :timeLine="timeLine" :unit="unit" />
  </div>
</template>

<script>
export default {
  name: 'VcTimelineCalendar'
}
</script>

<script setup>
import { computed, ref, onMounted, onUnmounted, reactive, watch } from 'vue'
import { getWeek } from './utils'
import TimeTree from './tree.vue'
import TimeIntervalTooltip from './timeIntervalTooltip.vue'

const props = defineProps({
  startTime: {
    type: [String, Date],
    default: () => new Date()
  },
  endTime: {
    type: [String, Date],
    default: () => {
      let d = new Date()
      d.setMonth(d.getMonth() + 13)

      return d
    }
  },
  head: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  },
  calendarCellW: {
    type: Number,
    default: 50
  },
  calendarCellH: {
    type: Number,
    default: 30
  },
  cellH: {
    type: Number,
    default: 40
  },
  /** 单位 */
  unit: {
    type: String,
    // Second Minute Hour Day Week  month quarter year
    default: 'second'
  },
  scale: {
    type: Number,
    default: 1,
    validator(val) {
      return val > 1
    }
  },
  asideWidth: {
    type: Number,
    default: 200
  }
})

defineEmits(['onCellClick', 'onLabelClick'])

const rootEl = ref(null)
const asideBodyEl = ref(null)
const calendarBodyEl = ref(null)
const calendarHeaderEl = ref(null)

const asideData = reactive({
  startInfo: null,
  style: {
    width: props.asideWidth + 'px'
  }
})

watch(
  () => props.asideWidth,
  val => {
    asideData.style.width = val + 'px'
  },
  { immediate: true }
)

const unitVal = computed(() => {
  let val = 1
  switch (props.unit) {
    case 'minute':
      val = 60
      break
    case 'hour':
      val = 60 * 60
      break
    case 'day':
      val = 60 * 60 * 24
      break
    case 'week':
      val = 60 * 60 * 24 * 7
      break
    case 'month':
      val = 60 * 60 * 24 * 7 * 30
      break
    case 'quarter':
      val = 60 * 60 * 24 * 7 * 30 * 3
      break
    case 'year':
      val = 60 * 60 * 24 * 365
      break
  }

  return val
})
const diffSeconds = computed(() => {
  const start = new Date(props.startTime)
  const end = new Date(props.endTime)
  let diff = (end.getTime() - start.getTime()) / 1000

  return diff
})
const calendarUnitW = computed(() => diffSeconds.value / unitVal.value)
const calendarWidth = computed(() => calendarUnitW.value * props.scale * 10)
const timeLine = computed(() => {
  console.time('timeLine')
  let result = {
    years: [],
    months: {},
    weeks: {}
  }
  let i = new Date(props.startTime)
  let n = new Date(props.endTime)
  let now = Date.now()

  while (i < n) {
    let year = i.getFullYear()
    let month = i.getMonth()
    let week = getWeek(i)

    if (week in result.weeks) {
      result.weeks[week].end = i.toISOString()
      result.weeks[week].isOld = i.getTime() < now
    } else {
      result.weeks[week] = {
        id: week,
        year,
        month,
        week: getWeek(i, new Date(year, month + 1, 0)),
        start: i.toISOString(),
        end: i.toISOString(),
        isCurrent: i.getTime() < now,
        isOld: i.getTime() < now
      }
    }

    if (!(month in result.months)) {
      result.months[month] = {
        id: month + 1 + '/' + year,
        year,
        start: new Date(year, month, 1),
        end: new Date(
          year,
          month,
          new Date(year, month + 1, 0).getDate(),
          23,
          59,
          59
        )
      }
    }

    i.setDate(i.getDate() + 1)
  }

  Object.keys(result.weeks).forEach(key => {
    let obj = result.weeks[key]
    obj.end = new Date(obj.end)
    // 优化结束时间为 23:59:59
    obj.end.setHours(23, 59, 59)

    if (result.weeks[key].isCurrent)
      result.weeks[key].isCurrent = obj.end.getTime() > now

    let { left, right } = getProjectItemStyle(obj)
    result.weeks[key].style = { left, right }
  })

  Object.keys(result.months).forEach(k => {
    result.months[k].style = getProjectItemStyle(result.months[k])
  })
  console.timeEnd('timeLine')
  return result
})

onMounted(() => {
  window.addEventListener('mousemove', mouseMove)
  window.addEventListener('mouseup', mouseUp)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', mouseMove)
  window.removeEventListener('mouseup', mouseUp)
})

function onScroll(type, e) {
  let { scrollLeft, scrollTop } = e.target

  switch (type) {
    case 'calendarBody': {
      calendarHeaderEl.value && (calendarHeaderEl.value.scrollLeft = scrollLeft)
      asideBodyEl.value && (asideBodyEl.value.scrollTop = scrollTop)
      break
    }
    case 'calendarHead': {
      calendarBodyEl.value && (calendarBodyEl.value.scrollLeft = scrollLeft)
      break
    }
    case 'asideBody': {
      calendarBodyEl.value && (calendarBodyEl.value.scrollTop = scrollTop)
      break
    }
  }
}

function getProjectItemStyle(item) {
  let { start, end, type } = item

  if (type && type === 'week' && 'value' in item)
    return timeLine.value.weeks[item.value].style

  let startTime = new Date(props.startTime)
  let startTimeVal = startTime.getTime()
  let _s = new Date(start)
  let _e = new Date(end)

  let r = (_e.getTime() - startTimeVal) / 1000
  r = (1 - r / diffSeconds.value) * calendarWidth.value
  let left = (_s.getTime() - startTimeVal) / 1000
  left = (left / diffSeconds.value) * calendarWidth.value

  return {
    right: r + 'px',
    left: left + 'px'
  }
}

function gotoTody() {
  let { left } = rootEl.value.querySelector('.is-current').style

  calendarHeaderEl.value.scrollLeft = parseFloat(left)
}

/********** 以下为拖拽功能 **********/

function onResizehandleDown(e) {
  document.documentElement.style.cursor = 'move'

  asideData.startInfo = {
    x: e.x,
    width: parseFloat(asideData.style.width)
  }
  rootEl.value && (rootEl.value.style.userSelect = 'none')
}

function mouseMove(e) {
  if (asideData.startInfo) {
    let { x } = e

    asideData.style.width =
      asideData.startInfo.width + x - asideData.startInfo.x + 'px'
  }
}

function mouseUp() {
  asideData.startInfo = null
  document.documentElement.style.cursor = ''
  rootEl.value && (rootEl.value.style.userSelect = 'auto')
}
</script>

<style lang="less" src="./index.less"></style>
