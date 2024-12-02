
export interface RouterLinkOptions {
    /**
     * Route Location the link should navigate to when cilcked on
     */
    to: RouteLocationNameRaw,
    /**
     * replace the current entry in history instead of `router.push`
     */
    replace?: boolean
}

export interface RouteLinkProps extends RouterLinkOptions {

    /**
     * class to apply when link is active
     */
    activeClass?: string
    /**
     * class to apply whne the link is exact active
     */
    exactActiveClass?: string

    /**
     * Value passed to the attribute `aria-current` when the link is exact active
     * @defaultValue: `'page'`
     */
    ariaCurrentValue?: 
        | 'page'
        | 'step'
        | 'location'
        | 'date'
        | 'time'
        | 'true'
        | 'false'    
}
export const RouterLinkImpl = /*#__PURE__*/ defineComponent({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
      to: {
        type: [String, Object] as PropType<RouteLocationRaw>,
        required: true,
      },
      replace: Boolean,
      activeClass: String,
      // inactiveClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String as PropType<RouterLinkProps['ariaCurrentValue']>,
        default: 'page',
      },
    },
