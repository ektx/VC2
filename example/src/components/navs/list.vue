<template>
  <ul class="navs-com">
    <li v-for="nav in data" :key="nav.label">
      <div 
        :class="[
          'nav-header', 
          {'active-link': nav.active}, 
          {'is-link': !nav.children}
        ]" 
      >
        <a 
          :href="nav.file"
          :style="getNavStyle(level)"
          @click="evt => clickEvt(nav, evt)" 
        >{{nav.label}}</a>
      </div>
      <div class="nav-children" v-if="nav.children">
        <nav-list :data="nav.children" :level="level+1"/>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'nav-list',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    // 当前层级
    level: {
      type: Number,
      default: 1
    }
  },
  inject: [
    'emitParent',
    'setCurrentNav'
  ],
  methods: {
    /**
     * 点击事件
     * 
     * @param {Object} nav 点击的菜单
     */
    clickEvt (nav, evt) {
      evt && evt.preventDefault()

      // 如果有文件 
      if ('file' in nav) {
        this.setCurrentNav(nav)
      }
      // 通知父级更新菜单
      this.emitParent(nav)
    },

    getNavStyle (level) {
      return {
        paddingLeft: level * 16 + 'px'
      }
    }
  }
}
</script>
<style lang="less">
.navs-com {
  font-size: 14px;

  .nav-header {
    color: #aaa;
    line-height: 2.5em;
    border-left: 3px solid transparent;
    background-color: transparent;
    pointer-events: none;

    a {
      color: inherit;
    }

    &.is-link {
      color: var(--gray10);
      pointer-events: auto;
     
      &.active-link {
        font-weight: bold;
        color: #42b983;
        border-left-color: #42b983;
      }

      a {
        cursor: pointer;
        transition: color .35s ease-in-out;
        
        &:hover {
          color: #42b983;
        }
      }
    }

    i {
      display: inline-block;
      width: 1em;
      height: 1em;
    }
  }
}
</style>

