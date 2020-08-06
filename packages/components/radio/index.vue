<template>
  <div :class="['el-radio']">
    <span class="el-radio__input">
      <span class="el-radio__inner">
        <input 
        type="radio" 
        class="el-radio__original"
        :value="label"
        v-model="model"
       />
      </span>
    </span>
    <span class="el-radio__label">备选项</span>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  watchEffect,
  onMounted,
  getCurrentInstance,
  onUpdated,
  watch
} from "vue";
export default {
  name: "VcRadio",
  props: {
    label: {},
    value: {},
  },
  setup(props, context) {
    let model = ref("");


    onMounted(()=>{
      console.log(1111,model)
    })
    return {
      model,
    }
  }
};
</script>

<style lang="less">
.el-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  margin-right: 30px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.el-radio:last-child {
    margin-right: 0;
}
.el-radio__input {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}
.el-radio__inner {
  border: 1px solid #dcdfe6;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
}

.el-radio__inner:after {
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #fff;
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.15s ease-in;
}
.el-radio__original {
  opacity: 0;
  outline: none;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
}
.el-radio__label {
  font-size: 14px;
  padding-left: 10px;
}
</style>