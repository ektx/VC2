// 推荐：方案1
import type { ExtractPropTypes } from 'vue'

export const layerProps = {
  /**
   * 标题
   */
  title: { type: String, default: '' },
  /**
   * 是否显示
   */
  show: { type: Boolean, default: false },
  /**
   * 是否全屏
   */
  fullscreen: { type: Boolean, default: false }
} // 不写 as const

export type LayerProps = ExtractPropTypes<typeof layerProps> // 正常工作
