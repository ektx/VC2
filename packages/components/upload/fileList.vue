<template>
  <div class="vc-upload__file-list">
    <ul>
      <li 
        class="vc-upload__file-list-item"
        v-for="(item, index) in list"
        :key="item.name"
      >
        <span class="item-name">
          <i class="vc-icon-document"></i>
          {{ item.name }}
        </span>
        <span class="item-status">
          <i v-if="item.__status === 'uploaded'" class="vc-icon-success"></i>
          <i v-if="item.__status === 'error'" class="vc-icon-error"></i>
          <i class="remove vc-icon-delete" @click="remove(item, index)"></i>
        </span>
        <VCProgress text-type="none" :stroke-width="2" :value="item.__progress"/>
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
  },
  methods: {
    remove(item, index) {
      this.$emit('remove', item, index)
    }
  }
}
</script>

<style lang="less">
.vc-upload__file-list {
  &-item {
    display: grid;
    padding: 5px;
    height: 30px;
    grid-template: 1fr 5px ~"/" 1fr 40px;
    border-radius: 2px;
    transition: background .35s;

    div.vc-progress {
      grid-column: 1 ~"/" 3;
      margin: 0;
    }

    .item-name {
      font-size: 14px;
    }
    .item-status {
      position: relative;
      text-align: right;

      .vc-icon-success {
        color: #4caf50;
      }
      .vc-icon-error {
        color: #ff4d4f;
      }
      .remove {
        position: absolute;
        right: 0;
        padding: 2px;
        font-size: 14px;
        color: transparent;
        background: transparent;
        transition: color .35s, background .35s;
        border-radius: 100%;
        cursor: pointer;

        &:hover {
          color: rgba(0, 0, 0, .6);
        }
      }
    }

    &:hover {
      background: rgba(0, 0, 0, .05);

      .remove {
        color: rgba(0, 0, 0, .3);
        background: #f5f5f5;
      }
    }
  }
}

</style>