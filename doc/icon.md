# 图标

::: demo
```html
<template>
  <vc-icon name="search"/>
</template>
```
:::

### 图标集合

::: demo
```html
<template>
  <ul class="icon-list">
    <li v-for="icon in $icon" :key="icon.icon_id">
      <i :class="'vc-icon-' + icon.font_class"></i>
      <span class="icon-name">{{'vc-icon-' + icon.font_class}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  setup() {
    let $icon = ref([])

    fetch('/api/icons')
      .then(res => res.json())
      .then(res => {
        console.log(res)

        $icon.value = res.glyphs
      })

    return {
      $icon
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