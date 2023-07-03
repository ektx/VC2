<template>
  <ul class="vc-tabs--nav">
    <li
      v-for="tab in list"
      :key="tab.props.label"
      :class="[
        'vc-tabs--item',
        {
          'is-active': tab.props.active,
          'is-disabled': tab.props.disabled
        }
      ]"
      @click="onClick(tab.props, $event)"
    >
      <slot v-if="tab.slots.label" name="label"></slot>

      <span :class="`vc-tab-pane--${tab.id}`" class="vc-tabs__item-label">
        <i v-if="tab.props.icon" :class="tab.props.icon"></i>
        {{ tab.props.label }}
      </span>
      <i
        v-if="tab.props.closable"
        class="vc-icon-close"
        @click="evt => closeEvt(evt, tab)"
      ></i>
    </li>
  </ul>
</template>

<script setup>
import { inject, renderSlot } from 'vue'

const props = defineProps({
  list: Array
})

const tabsRoot = inject('tabsRootContextKey')

function onClick(props, e) {
  console.log(props, e)
  console.log(tabsRoot.props.modelValue)
  tabsRoot.emits('update:modelValue', props.name)
}
</script>
