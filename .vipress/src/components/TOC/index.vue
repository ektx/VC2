<template>
  <div class="top-of-centent">
    <div class="inner">
      <a 
        v-for="h in headers" :key="h.inner" 
        :href="`#${h.id}`"
        :title="h.inner"
        :class="[`level-${h.tag}`, {'is-active': h.active}]"
      >{{ h.inner }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // head 的 element 标题组
    list: {
      type: Array,
      default: []
    },
    // 头部偏移量
    offsetTop: {
      type: Number,
      default: 0
    }
  },
  watch: {
    list() {
      this.toggleActive()
    }
  },
  data() {
    return {
      timer: null,
      headers: []
    }
  },
  mounted() {
    window.addEventListener('scroll', this.toggleActive)
  },
  methods: {
    toggleActive() {
      if (this.timer) clearTimeout(this.timer)

      this.timer = setTimeout(async () => {
        let activeItem = []

        this.headers = []
        this.list.forEach((h, i) => {
          let item = {
            id: h.id,
            tag: h.tagName,
            inner: h.innerText,
            top: ~~h.getBoundingClientRect().top,
            active: false,
          }

          this.headers.push(item)
          item.top <= this.offsetTop && activeItem.push(item)
        });

        this.activeItem = []
        
        if (activeItem.length) {
          const current = activeItem.reverse()[0]
          current.active = true
        }
      }, 50)
    }
  },
  unmounted() {
    window.removeEventListener('scroll', this.toggleActive)
  }
}
</script>

<style lang="less" scoped>
.top-of-centent {
  position: sticky;
  top: 70px;
  right: 0;
  width: 200px;

  .inner {
    margin: 10px 0;

    a {
      display: block;
      color: var(--page-txt-color);
      border-left: 1px solid var(--article-line-color);
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
      line-height: 2;
      overflow: hidden;
      transition: 
        color .2s ease-in,
        border .2s ease-in;

      &.is-active {
        color: var(--page-hold-color);
        border-left-color: inherit;
      }

      &:hover {
        color: var(--page-hold-color);
      }
    }

    each(range(6), {
      a.level-H@{value} {
        padding-left: (@value * 1em) - 0.5em;
      }
    })
  }
}
</style>