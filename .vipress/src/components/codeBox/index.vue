<template>
  <div :class="['code-box', { 'is-open': open }]">
    <div class="code-display">
      <slot name="child" />
    </div>
    <div :class="['code-source', { 'is-open': open }]">
      <div
        class="code-source--main"
        :style="sourceStyle"
        @transitionend="transitionend"
      >
        <slot />
      </div>
      <ul class="code-source--footer" @click="open = !open">
        <li>{{ open ? '收起' : '查看' }}</li>
        <li @click.stop="toggleScreen">
          {{ isFullScreen ? '退出' : '全屏' }}
        </li>
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
      height: 0
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
    window.addEventListener('mousemove', this.resizeScreen)
    window.addEventListener('mouseup', this.clearHoldBar)
    this.$el.addEventListener('fullscreenchange', this.winResize)
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
  will-change: background, box-shadow;
  transition:
    background .3s ease-out,
    border-color 0.3s ease-in-out,
    box-shadow 0.3s ease-out;

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

      if (this.clickCount >= 2) {
        this.style = { '--height': '50vh' }
      }
    },
    resizeScreen(evt) {
      if (this.isHolderBar && this.isFullScreen) {
        let h = evt.clientY / window.innerHeight
        let footerH = 33 / window.innerHeight

    &--main {
      overflow: hidden;
      transition: height .3s ease-in-out;
      background-color: var(--page-bg-color);

        if (h > 0) {
          h = h > 90 ? 90 : h
          this.open = true
        } else {
          h = 0
          this.open = false
        }

        this.varHeight = h + 'vh'

        this.style = {
          '--height': this.varHeight
        }
        document.documentElement.style.cursor = 'n-resize'
      }
    },
    winResize(evt) {
      this.isFullScreen = document.fullscreenElement === evt.target
    },
    clearHoldBar() {
      this.isHolderBar = false
      document.documentElement.style = ''
    }
  },
  beforeUnmount() {
    let sentinel = this.$el.querySelector('.code-source--sentinel')

      font-size: 12px;
      color: #666;
      line-height: 2.8em;
      text-align: center;
      border-top: 1px solid var(--codebox-border);
      background-color: var(--codebox-footer-bg);
      backdrop-filter: blur(5px);
      cursor: pointer;
      transition:
        color 0.3s ease-in-out,
        background-color 0.3s ease-in-out;
    }
  }
}
</script>

<style lang="less" src="./style.less">
</style>
