<template>
  <div
    v-for="(item, index) in data"
    :key="item.id"
    :class="[{ open: item.open }, 'timeline-tree-item']"
  >
    <div class="timeline-tree-head">
      <div
        v-if="showLevel"
        class="level-box"
        :style="{ padding: level * 5 + 'px' }"
      ></div>
      <div
        v-if="showLevel"
        :class="['has-child-ico', { open: item.open }]"
        @click="item.open = !item.open"
      >
        <i v-show="item.children" class="vc-icon-caret-right" />
      </div>
      <div class="timeline-tree-head--body">
        <slot :item="item" :index="index" />
      </div>
    </div>
    <div v-if="item.children" class="timeline-tree-children">
      <TimeTree
        :data="item.children"
        :level="level + 1"
        :show-level="showLevel"
      >
        <template v-slot="{ item, index }">
          <slot :item="item" :index="index" />
        </template>
      </TimeTree>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TimeTree',
  props: {
    data: {
      type: Array,
      default: () => []
    } as any,
    level: {
      type: Number,
      default: 0
    },
    showLevel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      msg: 'hello'
    }
  },
  methods: {
    hello() {
      this.msg
    }
  }
})
</script>
