import { withInstall } from '../../utils/withInstall'
import Layer from './index.vue'
import './index.css'

export const VcLayer = withInstall(Layer)
export default VcLayer

export * from './types'
