<template>
  <header>
    <h1>🍋 VC 2</h1>
    <div class="toggle-theme-box">
      <i @click="toggleThemeEvt"></i>
    </div>
  </header>
  <section class="content">
    <aside>
      <Navs :value="menu" @change="getEvt" />
    </aside>
    <main>
      <VCMarkedIt :value="htmlStr"/>
    </main>
  </section>
</template>


<script>
import Navs from './components/navs/index.vue'
import { ref } from 'vue'
import menu from './menu'

let htmlStr = ''

export default {
  name: 'HelloWorld',
  components: { Navs },
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  },
  setup () {
    htmlStr = ref('')

    return {
      htmlStr,
      menu,
      getEvt,
      toggleThemeEvt
    }
  }
}

function getEvt (item) {
  fetch(`/api/doc?file=${item.file}`)
    .then(res => res.json())
    .then(res => {
      // 将字符串中 `{{}}` 的 {{ 转换成 ASCII CODE 123
      // 防止解析报错
      // https://theasciicode.com.ar/ascii-printable-characters/braces-curly-brackets-opening-ascii-code-123.html
      htmlStr.value = res.data.replace(/(?<!\{)\{{2}(?!\{)/g, '&#123;&#123;')
    })
}

function toggleThemeEvt () {
  document.querySelector("#app").classList.toggle("dark-scheme")
}
</script>

<style lang="less">
html {
  background-color: var(--gray100);
}

#app {
  transition: background-color .4s ease-in-out;
}
.dark-scheme {
  background-color: var(--gray80);
}
</style>

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
  background: #fff;
  border-bottom: 1px solid var(--gray85);
  transition: 
    background-color 0.3s ease-in-out,
    border-color .3s ease-in-out;

  @supports (backdrop-filter: blur(5px)) {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
  }

  .DARK_header {
    background-color: var(--gray85);
    @supports (backdrop-filter: blur(5px)) {
      background-color: rgba(33, 33, 33, 0.8);
      backdrop-filter: blur(5px);
      border-bottom: transparent;
    }
  }

  .dark-scheme & {
    .DARK_header;
  }

  @media (prefers-color-scheme: dark) {
    .DARK_header;
  }

  h1 {
    flex: 1;
    color: var(--gray10);
  }

  .toggle-theme-box {
    i {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      cursor: pointer;
      background-color: var(--gray20);
    }
  }
}

.content {
  display: flex;
  flex-direction: row;

  & > aside {
    padding: 80px 0 20px;
    height: 100vh;
    width: 300px;
    overflow: auto;
    box-sizing: border-box;
  }

  & > main {
    flex: 1;
    height: 100vh;
    padding: 60px 20px 20px;
    overflow: auto;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
}
</style>