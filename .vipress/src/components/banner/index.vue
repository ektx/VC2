<template>
  <header>
    <div 
      class="control-aside" 
      @click="$emit('update:showAside', !showAside)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
      <path
        d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
      />
      </svg>
    </div>
    <h1>{{ title }}</h1>
    <div class="toggle-theme-box" @click="toggleThemeEvt">
      <i title="切换页面主题"></i>
    </div>
    <div 
      class="control-toc" 
      @click="$emit('update:showToc', !showToc)" 
    >
      <svg
        viewBox="0 0 1024 1024" 
        xmlns="http://www.w3.org/2000/svg" 
      >
        <path d="M170.666667 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"></path>
        <path d="M298.666667 469.333333m40.106666 0l517.12 0q40.106667 0 40.106667 40.106667l0 5.12q0 40.106667-40.106667 40.106667l-517.12 0q-40.106667 0-40.106666-40.106667l0-5.12q0-40.106667 40.106666-40.106667Z"></path>
        <path d="M128 682.666667m40.106667 0l687.786666 0q40.106667 0 40.106667 40.106666l0 5.12q0 40.106667-40.106667 40.106667l-687.786666 0q-40.106667 0-40.106667-40.106667l0-5.12q0-40.106667 40.106667-40.106666Z"></path>
        <path d="M128 256m40.106667 0l687.786666 0q40.106667 0 40.106667 40.106667l0 5.12q0 40.106667-40.106667 40.106666l-687.786666 0q-40.106667 0-40.106667-40.106666l0-5.12q0-40.106667 40.106667-40.106667Z"></path>
      </svg>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'

defineEmits([
  'update:showAside',
  'update:showToc'
])
defineProps({
  title: {
    type: String,
    default: 'ViPress'
  },
  showAside:{
    type: Boolean,
    default: false
  },
  showToc:{
    type: Boolean,
    default: false
  }
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
  background-color: var(--header-bg-color);
  backdrop-filter: blur(5px);
  box-sizing: border-box;
  transition: background-color .3s ease-in-out;
  will-change: bacground-color;
  
  svg {
    width: 18px;
    height: 18px;
    padding: 10px;
    cursor: pointer;

    path {
      fill: var(--page-txt-color);
    }
  }
 
  .control-aside,
  .control-toc {
    display: none;
  }
  
  h1 {
    flex: 1;
    margin-left: 10px;
    color: var(--page-txt-color);
    font-size: 1.6rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .toggle-theme-box {
    padding: 10px;

    i {
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      cursor: pointer;
      background-color: var(--page-txt-color);
      transition: background-color .3s ease-in-out;
    }
  }
}

@media screen and (max-width: 1100px) {
  header {
    .control-aside {
      display: block;
    }

    h1 {
      margin-left: 0;
    }
  }
}

@media screen and (max-width: 800px) {
  header {
    .control-toc {
      display: block;
    }
  }
}

@media screen and (max-width: 450px) {
  header {
    h1 {
      text-align: center;
      text-indent: 32px;
    }

  }
}
</style>
