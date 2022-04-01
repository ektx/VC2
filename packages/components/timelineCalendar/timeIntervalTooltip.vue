<template>
  <div v-show="timeInfo.show" class="tool-tip--unit-time" :style="style">
    {{ timeInfo.start }} - {{ timeInfo.end }}
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs/esm'

const props = defineProps({
  timeLine: Object,
  unit: String
})

const timeInfo = ref({
  show: false,
  start: null,
  end: null
})
const style = ref({
  top: '',
  left: ''
})

onMounted(() => {
  bindEvent()
})

onUnmounted(() => {
  unBindEvent()
})

function bindEvent() {
  let el = document.querySelector('.calendar-header')
  el.addEventListener('mousemove', onMousemove)
  el.addEventListener('mouseleave', hideInfo)
}

function unBindEvent() {
  let el = document.querySelector('.calendar-header')
  el.removeEventListener('mousemove', onMousemove)
  el.removeEventListener('mouseleave', hideInfo)
}

function hideInfo() {
  timeInfo.value.show = false
}

function onMousemove(e) {
  let { target, clientX, clientY } = e

  if (target.classList.contains('unit')) {
    let { start, end } = props.timeLine[props.unit + 's'][target.innerText]

    timeInfo.value = {
      show: true,
      start: dayjs(start).format('MM/DD'),
      end: dayjs(end).format('MM/DD')
    }
    style.value = {
      top: clientY + 5 + 'px',
      left: clientX + 5 + 'px'
    }
  } else {
    timeInfo.value.show = false
  }
}
</script>
