import React, {useState, useEffect} from 'react'


interface AlertProps {
  title?: string
  description?: string
  icon: React.ReactNode
  closeable?: boolean
  onClose?: () => void
  color: 'primary' | 'success' | 'warning' | 'error'
  border?: 'top' | 'right' | 'bottom' | 'left' | ''
  outline: boolean
  dense: boolean
  center: boolean
  children?: React.ReactNode
}


export function Alert({
  title,
  description,
  icon,
  closeable = false,
  onClose,
  dense = false,
  outline = false,
  center = false,
  border = '',
  color = 'primary',
  children
}:AlertProps){

  const [isVisible, setIsVisible] = useState(true)

  const colorMap = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200'
  }

  const borderPosMap = {
    top: 'top-0 left-0 w-full h-1',
    right: 'top-0 right-0 h-full w-1',
    bottom: 'bottom-0 left-0 w-full h-1',
    left: 'top-0 left-0 h-full w-1'
  }

  const borderColorMap = {
    info: 'border-blue-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    error: 'border-red-500'
  }

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if(!isVisible) return null

  const wrapperStyle = [
    'relative flex items-start p-4 mb-4 rounded-lg border',
    colorMap[color],
    dense ? 'py-2': 'px-4',
    center ? 'items-center': '',
    outline ? 'bg-transparent border-2' : '',
    'transition-opacity duration-200'
  ].join(' ')

  const borderStyles = [
    'absoulte',
    borderPosMap[border],
    borderColorMap[color],
  ].join(' ')



  return (
    <div
      role="alert"
      className={wrapperStyle}
    >
      {border && <div className={borderStyles}> </div>}
      {icon && <div className="flex-shrink-0 mr-3"> {icon}</div>}
      <div className={dense ? 'text-sm' : 'text-base'}>{description}</div>
      {closeable && <button className="ml-4 text-gray-500 hover:text-gray-700 focs:outline-none"> </button>}
    </div>  
  )

}


