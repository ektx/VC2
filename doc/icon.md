# 图标

## 使用方法

也可以直接通过设置类名为 `vc-icon-iconName` 来使用即可。例如：

::: codeBox
```vue
<template>
  <i class="vc-icon-search"></i>
  <vc-icon name="star-off"/>
</template>
```
:::

### 图标集合

点击图标可直接复制样式名。

::: codeBox
```vue
<template>
  <ul class="icon-list">
    <li v-for="icon in icons" :key="icon.icon_id" @click="copy(icon)">
      <i :class="'vc-icon-' + icon.font_class"></i>
      <span class="icon-name">{{'vc-icon-' + icon.font_class}}</span>
    </li>
  </ul>
</template>

<script>
import { inject, ref } from 'vue'

export default {
  setup() {
    let message = inject('vcMessage')
    let icons = ref([])

    fetch('/data/iconfont.json')
      .then(res => res.json())
      .then(res => {
        console.log(res)

        icons.value = res.glyphs
      })

    async function copy(icon) {
      const res = await navigator.permissions.query({ name: 'clipboard-write' })

      if (res.state === 'granted') {
        let name = `vc-icon-${icon.font_class}`
        message.success(`${name} 复制成功`)
        return navigator.clipboard.writeText(name);
      }

      return Promise.reject(res);
    }

    return {
      icons,
      copy
    }
  }
}
</script>

<style>
.icon-list {
  display: grid;
  grid-auto-rows: 100px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.icon-list li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.icon-list li i {
  font-size: 32px;
  color: #666;
}
.icon-list li span {
  margin: 10px 0 0;
  font-size: 12px;
  color: #777;
  text-align: center;
}
</style>
```
:::