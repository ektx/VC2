<script>
import { compile, h } from 'vue'
import 'prismjs/themes/prism.css'
import './layout.less'

export default {
  name: "v-markdown-it",
  // components: {
  //   demo,
  //   demoTheme
  // },
  props: {
    value: {
      type: String,
      default: '<p>aa</p>'
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
