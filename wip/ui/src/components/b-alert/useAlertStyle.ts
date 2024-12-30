import { computed, toRef } from 'vue'
interface AlertStyleProps {
  color: 'info' | 'success' | 'warning' | 'error'
  dense?: boolean;
  outline?: boolean;
  borderPos?: 'top' | 'right' | 'bottom' | 'left' | '';
  center?: boolean
}


const colorMap = {
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-bule-200'
  },
  success: {
    bg: 'bg-green-50',
    text: 'text-green-800',
    border: 'border-green-200'
  },
  error: {
    bg: 'bg-red-50',
    text: 'text-red-800',
    border: 'border-red-200'
  },
  warning: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-800',
    border: 'border-yellow-200'
  },
}

const borderPosMap = {
  top: 'top-0 left-0 w-full h-1',
  right: 'top-0 right-0 h-full w-1',
  bottom: 'bottom-0 left-0 w-full h-1',
  left: 'w-1 h-full top-0 left-0'
}


export const useAlterStyles = (props: AlertStyleProps) => {
  const baseColor = colorMap[props.color]

  const alertStyle = computed(()=> {
    let background = baseColor.bg
    let boxShadow = 'none'
    let border =  '1px solid ${baseColor.border}'

    if(props.outline) {
      background = 'transparent'
      border.width = '2px'
    }

    if(props.border) {
      border = 'none'
      background = 'transparent'
      boxShadow =  'var(--vita-alter-box-shadow)'
    }

    return {
      border: props.outline ? `1px solid ${baseColor.border}` : '',
      padding: props.dense ?  `var(--vita-alert-padding-y-dense) var(--vita-alert-padding-x)`,
      backgroundColor: props.outline || props.border ? 'transparent': baseColor.bg,
      boxShadow
    }
  })


  const contentStyle = computed(() => {
    return {
      alignItems: props.center ? 'center': '',
      color: baseColor.text
    }
  })

  const titleStyle = computed(() => {
    return { color: baseColor.text}
  })

  const borderPos = props.borderPos ? borderPosMap[props.borderPos] : ''

  const stripeStyle = computed(() => {
    return {
      pos: `absoulte ${borderPos}`,
      bg: baseColor.bg
    }
  })

  return {
    alertStyle,
    contentStyle,
    titleStyle,
    stripeStyle
  }

}