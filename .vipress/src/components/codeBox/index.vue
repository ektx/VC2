<template>
  <div :class="[
    'code-box',
    { 'is-full-screen': isFullScreen, 'is-open': open}
  ]">
    <div class="code-display">
      <slot name="child" />
    </div>
    <div class="code-source">
      <div 
        class="code-source--main" 
        :style="{ height }"
        @transitionend="transitionend"
      >
        <slot />
      </div>
      <ul class="code-source--footer" @click="open = !open">
        <li>{{ open ? '收起' : '查看' }}</li>
        <li @click.stop="toggleScreen">
          {{ isFullScreen ? '退出' : '全屏' }}</li>
      </ul>
      <div class="code-source--sentinel"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'code-box',
  data() {
    return {
      open: false,
      intersectionObserver: null,
      height: 0,
      isFullScreen: false
    }
  },
  watch: {
    open(val) {
      let H = this.$el.querySelector('.code-source--main').scrollHeight

      this.height = H + 'px'

      if (!val) {
        requestAnimationFrame(() => {
          this.height = 0
        })
      }
    },
  },
  mounted() {
    this.setSticky()
  },
  methods: {
    transitionend() {
      this.open && (this.height = 'auto')
    },
    setSticky() {
      let footer = this.$el.querySelector('.code-source--footer')
      let sentinel = this.$el.querySelector('.code-source--sentinel')

      this.intersectionObserver = new IntersectionObserver((entries) => {
        let { intersectionRatio } = entries[0]

        if (intersectionRatio <= 0) {
          footer.style.borderRadius = '0'
        } else {
          footer.style.borderRadius = '0 0 10px 10px'
        }
      })

      this.intersectionObserver.observe(sentinel)
    },
    toggleScreen() {
      if (!document.fullscreenEnabled) return

      if (!document.fullscreenElement) {
        this.$el.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
      this.isFullScreen = !document.fullscreenElement
    }
  },
  beforeUnmount() {
    let sentinel = this.$el.querySelector('.code-source--sentinel')

    this.intersectionObserver.unobserve(sentinel)
  },
}
</script>

<style lang="less">
.code-box {
  margin: 1em 0;
  border-radius: 10px;
  border: 1px solid var(--codebox-border);
  background-color: var(--codebox-bg);
  will-change: background-color, box-shadow;
  // transition: 
  //   background .3s ease-out,
  //   border-color .3s ease-in-out, 
  //   box-shadow .3s ease-out;
  transition: all .3s ease-in-out;

  &:hover {
    box-shadow: 2px 2px 15px var(--codebox-hover-shadow);
  }

  .code-display {
    padding: 10px;
  }

  .code-source {
    border-radius: 0 0 10px 10px;
    border-top: 1px solid transparent;
    transition: border-color .3s ease-in-out;

    &.is-open {
      border-top-color: var(--codebox-border);
    }

    &--main {
      overflow: hidden;
      transition: height .3s ease-in-out;
      background-color: var(--page-bg-color);

      & pre[class*='language-'] {
        margin: 0;
        background-color: transparent;
      }

      blockquote {
        margin: 1em 1em 0;
      }
    }

    &--footer {
      position: sticky;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      margin: 0;
      padding: 0;
      height: 30px;
      list-style: none;
      font-size: 12px;
      color: var(--page-info-color);
      border-top: 1px solid var(--codebox-border);
      background-color: var(--codebox-footer-bg);
      backdrop-filter: blur(5px);
      box-sizing: border-box;
      cursor: pointer;

      li {
        padding: 0 10px;
        transition: color 0.3s ease-in-out;

        &:hover {
          color: var(--page-hold-color);
        }
      }
    }
  }
  
  &.is-full-screen {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    position: relative;

    .code-display {
      flex: 1;
      overflow: auto;
      word-break: break-word;
      transition: height .3s ease-in-out;
    }

    .code-source {
      // position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      max-height: 70vh;
      height: 30px;
      // overflow: auto;
      transition: height .3s ease-in-out;

      &--main {
        height: 100%;
        overflow: auto;
      }
    }

    &.is-open {
      .code-display {
        height: 30vh;
      }

      .code-source {
        height: 70vh;
      }
    }
  }
}
</style>