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
        class="control-bar" 
        @mousedown="isHolderBar = true"
        @mouseup="setControlBar"
      ></div>
      <div 
        :class="['code-source--main',{'no-animate': isHolderBar}]" 
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
      isFullScreen: false,
      isHolderBar: false,
      varHeight: '50vh',
      clickCount: 0
    }
  },
  watch: {
    open(val) {
      if (this.isFullScreen) {
        this.style = { '--height': val ? this.varHeight : 0 }
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
    window.addEventListener('mousemove', this.resizeScreen, false)
    window.addEventListener('mouseup', this.clearHoldBar, false)
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
        this.style = this.open ? { '--height': this.varHeight } : this.style
        this.isFullScreen = true
      } else {
        document.exitFullscreen()
        this.style = this.open ? {} : { height: 0 }
        this.isFullScreen = false
      }
    },
    setControlBar() {
      if (!this.isFullScreen) return
      this.clickCount ++

      setTimeout(() => {
        this.clickCount--
      }, 400)

      if (this.clickCount >= 2) {
        this.style = { '--height': '50vh' }
      }
    },
    resizeScreen(evt) {
      if (this.isHolderBar && this.isFullScreen) {
        let h = evt.clientY / window.innerHeight
        let footerH = 33 / window.innerHeight 

        h = (1 - footerH - h) * 100

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
    clearHoldBar() {
      this.isHolderBar = false
      document.documentElement.style = ''
    }
  },
  beforeUnmount() {
    let sentinel = this.$el.querySelector('.code-source--sentinel')

    this.intersectionObserver.unobserve(sentinel)
    window.removeEventListener('mousemove', this.resizeScreen)
    window.removeEventListener('mouseup', this.clearHoldBar)
  },
}
</script>

<style lang="less" src="./style.less"></style>