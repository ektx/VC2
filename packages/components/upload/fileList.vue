<template>
  <div class="vc-upload__file-list">
    <ul>
      <li 
        class="vc-upload__file-list-item"
        v-for="item in list"
        :key="item.name"
      >
        <span class="item-name">
          <i class="vc-icon-document"></i>
          {{ item.name }}
        </span>
        <span class="item-status">{{item.__status}}</span>
        <VCProgress text-type="none" :value="item.__progress"/>
      </li>
    </ul>
  </div>
</template>

<script>
import VCProgress from '../progress/index.vue'

export default {
  components: {
    VCProgress
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="less">
.vc-upload__file-list {
  &-item {
    display: grid;
    height: 30px;
    grid-template: 1fr 15px ~"/" 1fr 20px;
    border-radius: 5px;

    div {
      grid-column: 1 ~"/" 3;
    }

    &:hover {
      background: #eee;
    }
  }
}

</style>