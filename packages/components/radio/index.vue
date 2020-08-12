<template>
  <label :class="['vc-radio',{'is-checked': model === label}]" ref="vcRadio">
    <span :class="['vc-radio__input',{'is-checked': model === label}]">
      <span :class="['vc-radio__inner']">
        <input
          type="radio"
          class="vc-radio__original"
          :value="label"
          v-model="model"
          @change="handleChange"
        />
      </span>
    </span>
    <span class="vc-radio__label">备选项</span>
  </label>
</template>

<script>
import {
  ref,
  reactive,
  watchEffect,
  onMounted,
  getCurrentInstance,
  onUpdated,
  watch,
  computed
} from "vue";
export default {
  name: "VcRadio",
  props: {
    label: {},
    value: {}
  },
  setup(props, context) {
    //let model = ref("");
    let checked = ref("");
    let { ctx } = getCurrentInstance();

    const vcRadio = ref("");

    

    // 判断这是不是一个radio组
    const isGroup = computed(() => {
      let parent = ctx.$parent;
      while (parent) {
        if (parent.$options.name !== "ElRadioGroup") {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    });
    
    const model = computed({
      get:() => {
        return isGroup.value ? radioGroup.value : props.value;
        
      },
      set: val =>{
        if (isGroup.value) {
            //this.dispatch('ElRadioGroup', 'input', [val]);
          } else {
            console.log('val',val)
            context.emit("update:value", val);
          } 
      }
    })

    console.log(222,model.value)

    console.log(888888,ctx)

    const handleChange = (event) =>{
      setTimeout(()=>{
        console.log(9,model.value)
        context.emit("update:value", model.value);

      },100)
    }

    const changeValue = event =>{
      model.value = props.label
    }

    onMounted(() => {
      
    });

    return {
      model,

      vcRadio,
      handleChange,
      changeValue
      
    };
  }
};
</script>

<style lang="less">
.vc-radio {
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
.vc-radio:last-child {
  margin-right: 0;
}
.vc-radio__input {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}
.vc-radio__inner {
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

.vc-radio__inner:after {
  width: 4px;
  height: 4px;
  //border-radius: 100%;
  background-color: #fff;
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.15s ease-in;
}
.vc-radio__inner:hover {
  border-color: #409eff;
}

.vc-radio__input.is-checked .vc-radio__inner:after {
  transform: translate(-50%, -50%) scale(1);
}

.vc-radio.is-checked .vc-radio__inner {
  border-color: #409eff;
  background: #409eff;
}
.vc-radio__original {
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

.vc-radio__label {
  font-size: 14px;
  padding-left: 10px;
}
</style>