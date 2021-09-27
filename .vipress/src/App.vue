<template>
  <Banner 
    :title="title" 
    v-model:showAside="showAside" 
    v-model:showToc="showToc" 
    @click.stop
  />
  <section class="content">
    <aside 
      v-if="menu.length" 
      :class="{ open: showAside }" 
      @click.stop
    >
      <Navs :value="menu" />
    </aside>
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade-slide-y" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <div 
        class="toc-box" 
        :class="{ open: showToc }"
        @click.stop
      >
        <TOC :list="TOCData" :offsetTop="100"/>
      </div>
    </main>
  </section>
</template>

<script>
import Navs from './components/navs/index.vue'
import Banner from './components/banner/index.vue'
import { TOCData } from './store'
import { menu } from '../client.js'
import config from '@@vipress-plugin-config'

export default {
  name: 'app-view',
  components: { Navs, Banner },
  data() {
    return {
      menu,
      title: config.title,
      TOCData,
      // 动态展示左侧栏
      showAside: false,
      // 动态展示toc-box侧栏
      showToc: false
    }
  },
  mounted(){
    // 监听点击空白区域收回侧边栏
    window.addEventListener('click', () => {
      this.showAside = false
      this.showToc = false
    })
  }
}
</script>

<style lang="less" scoped>
.content {
  & > aside {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    padding: 60px 0 0;
    width: 280px;
    overflow-y: auto;
    box-sizing: border-box;
    content-visibility: auto;
    transform: translateX(0%);
    transition: transform 0.3s ease-in-out;
    will-change: transform;

    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--scroll-thumb-color);
      border-radius: 5px;
    }
    &::-webkit-scrollbar-track {
      margin: 62px 0 2px 0;
    }
  }
  & > main {
    position: relative;
    display: flex;
    padding: 60px 0 0 280px;
    box-sizing: border-box;

    article {
      padding: 0 20px 0;
    }
    
    .toc-box {
      width: 12rem;
      transition: width 0.3s ease;

      .top-of-centent{
        display: block;
        width: 12rem;
      }
    }
  }
  
  .fade-slide-y-leave-active,
  .fade-slide-y-enter-active {
    transition: 
      opacity .35s ease-in-out,
      transform .35s ease-in-out;
  }

  .fade-slide-y-enter-from,
  .fade-slide-y-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
}

@media (max-width: 1100px) {
  .content {
    & > main {
      padding-left: 0;
    }

    & > aside {
      background-color: var(--header-bg-color);
      backdrop-filter: blur(5px);
      transform: translateX(-100%);

      &.open {
        transform: translateX(0);
      }
    }
  }
}

@media (max-width: 800px) {
 .content {
    & > main {
      .toc-box {
        position: fixed;
        top: 60px;
        right: 0;
        bottom: 0;
        width: 200px;
        padding: 0 10px;
        background-color: var(--header-bg-color);
        backdrop-filter: blur(5px);
        transform: translateX(100%);
        transition: transform .3s ease-in-out;
        will-change: transform;
        overflow: auto;

        .top-of-centent {
          position: static;
        }

        &.open {
          transform: translateX(0);
        }
      }
    }
  }
}

@media (max-width: 450px) {
 .content {
    & > aside {
      width: 70vw;
    }

    main {
      .toc-box {
        width: 70vw;
      }
    }
  }
}
</style>
