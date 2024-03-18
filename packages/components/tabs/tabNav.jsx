import { defineComponent, inject } from 'vue'

const TabNav = defineComponent({
  props: {
    list: Array
  },
  setup(props, { emit }) {
    const tabsRoot = inject('tabsRootContextKey')

    const onTabClick = (tabProps, e) => {
      if (tabProps.disabled) return

      console.log(tabProps, e)
      console.log(tabsRoot.props.modelValue)
      tabsRoot.emits('update:modelValue', tabProps.name)
    }

    const closeEvt = (id, tabProps, index, e) => {
      tabsRoot.removePanel(id)
      tabsRoot.emits('remove', tabProps, index, e)
    }

    return () => {
      const tabs = props.list.map((item, index) => {
        const { id } = item
        const { label, name, disabled, icon } = item.props
        const tabIcon = icon ? <i class={icon}></i> : null
        const tabLabel = item.slots.label
          ? item.slots.label?.()
          : [tabIcon, label]
        const active = (name || label) === tabsRoot.props.modelValue

        return (
          <li
            key={`tab-nav-${id}`}
            class={[
              'vc-tabs--item',
              {
                'is-active': active,
                'is-disabled': disabled
              }
            ]}
            onClick={e => onTabClick(item.props, index, e)}
          >
            <span class={[`vc-tab-pane--${id}`, 'vc-tabs__item-label']}>
              {tabLabel}
            </span>

            {item.props.closable ? (
              <i
                class="vc-icon-close"
                onClick={e => closeEvt(id, item.props, index, e)}
              ></i>
            ) : (
              ''
            )}
          </li>
        )
      })

      return <ul className="vc-tabs--nav">{...[tabs]}</ul>
    }
  }
})

export default TabNav
