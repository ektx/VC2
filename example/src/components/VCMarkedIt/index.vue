<script>
import { compile, h } from 'vue'
import 'prismjs/themes/prism.css'
import './layout.less'

export default {
  name: "v-markdown-it",
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    HTML() {
      return compile(this.value)
    }
  },
  render() {
    return h(this.HTML)
  }
}
</script>
