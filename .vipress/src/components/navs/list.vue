<template>
  <ul class="navs-list">
    <li 
      :class="[`space-lock-${level}`]" 
      v-for="nav in data" :key="nav.name"
    >
      <router-link 
        v-if="nav.to" :to="nav.to"
        class="nav-item"
      >
        {{ nav.label }}
      </router-link>
      <span 
        v-else
        class="nav-item is-parent"
      >{{ nav.label }}</span>
      <nav-list 
        v-if="nav.children" 
        :data="nav.children" 
        :level="level+1"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'nav-list',
  props: {
    data: {
      type: Array,
      default: []
    },
    // 当前层级
    level: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="less">
.navs-list {

  li {
    each(range(5), {
      &.space-lock-@{value} {

        .nav-item {
          padding-left: (@value * 1em);
        }
      }
    })
  }

  .nav-item {
    display: block;
    padding: .3rem 1.5rem .3rem;
    color: var(--page-txt-color);
    line-height: 1.6;
    border-left: 4px solid transparent;
    user-select: none;
    will-change: color, background-color, border;
    transition: 
      color .4s ease-out,
      border .4s ease-out,
      background-color .4s ease-out;

    &.is-parent {
      color: var(--page-info-color);
      font-weight: 500;
    }

    &:not(.is-parent):hover {
      color: var(--page-hold-color);
    }

    &.router-link-exact-active {
      color: var(--page-hold-color);
      border-left-color: var(--page-hold-color);
      background-color: var(--page-hold-bg-color);
    }
  }
}
</style>
