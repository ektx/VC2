<template>
  <header>
    <h1>{{ title }}</h1>
    <div class="toggle-theme-box">
      <i @click="toggleThemeEvt"></i>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'ViPress'
  },
})

function toggleThemeEvt () {
  let html = document.documentElement.classList
  html.toggle('dark')

  localStorage.setItem('prefersColorScheme', html.contains('dark'))
}

function setTheme(type) {
  type = typeof type === 'boolean' ? type : type === 'true'

  if (type) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const theme = localStorage.getItem('prefersColorScheme')

  darkModeMediaQuery.addEventListener('change', e => {
    if (theme) return

    setTheme(e.matches)
  })

  setTheme(theme ? theme : darkModeMediaQuery.matches)
})
</script>

<style lang="less" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 30px;
  background-color: var(--header-bg-color);
  backdrop-filter: blur(5px);
  box-sizing: border-box;
  transition: background-color .4s ease-in-out;

  h1 {
    flex: 1;
    color: var(--page-txt-color);
  }

  .toggle-theme-box {
    i {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      cursor: pointer;
      background-color: var(--page-txt-color);
      transition: background-color .4s ease-in-out;
    }
  }
}
</style>
