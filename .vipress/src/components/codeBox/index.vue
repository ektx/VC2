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
        :style="style"
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
      style: { height: 0 },
      isFullScreen: false
    }
  },
  watch: {
    open(val) {
      if (this.isFullScreen) {
        this.style = { '--height': val ? '50vh' : 0 }
      } else {
        let H = this.$el.querySelector('.code-source--main').scrollHeight
  
        this.style.height = H + 'px'
  
        if (!val) {
          requestAnimationFrame(() => {
            this.style.height = 0
          })
        }
      }
    },
  },
  mounted() {
    this.setSticky()
  },
  methods: {
    transitionend() {
      this.open && (this.style.height = '')
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
        this.style = this.open ? {'--height': '50vh'} : this.style
      } else {
        document.exitFullscreen()
        this.style = this.open ? {} : { height: 0 }
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

<style lang="less" src="./style.less"></style>