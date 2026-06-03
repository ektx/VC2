// 推荐：方案1
import type { ExtractPropTypes } from 'vue'

export const layerProps = {
  title: { type: String, default: '' },
  show: { type: Boolean, default: false }
} // 不写 as const

export type LayerProps = ExtractPropTypes<typeof layerProps> // 正常工作
