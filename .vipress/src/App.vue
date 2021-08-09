<template>
  <Banner :title="title" />
  <section class="content">
    <aside v-if="menu.length">
      <Navs :value="menu" />
    </aside>
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade-slide-y" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <div class="toc-box">
        <TOC :list="TOCData" :offsetTop="100" />
      </div>
    </main>
  </section>
</template>

<script>
import Navs from "./components/navs/index.vue";
import Banner from "./components/banner/index.vue";
import { TOCData } from "./store";
import { menu } from "../client.js";
import config from "@@vipress-plugin-config";

export default {
  name: "app-view",
  components: { Navs, Banner },
  data() {
    return {
      menu,
      title: config.title,
      TOCData,
    };
  },
};
</script>

<style lang="less" scoped>
.content {
  & > aside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 60px 0 0;
    bottom: 0;
    width: 300px;
    overflow: auto;
    box-sizing: border-box;
    content-visibility: auto;
  }

  & > main {
    display: flex;
    padding: 60px 20px 20px 320px;
    box-sizing: border-box;

    &:only-child {
      padding: 60px 30px 20px;
    }

    .toc-box {
      padding: 0 0 0 20px;
    }
  }

  & > aside {
    &::-webkit-scrollbar {
      width: 3px;
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
</style>
