import { useMemo } from 'react';

interface AlertStyleProps {
  color: 'info' | 'success' | 'warning' | 'error';
  dense?: boolean;
  outline?: boolean;
  borderPos?: 'top' | 'right' | 'bottom' | 'left' | '';
  center?: boolean;
}

const colorMap = {
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-200',
  },
  success: {
    bg: 'bg-green-50',
    text: 'text-green-800',
    border: 'border-green-200',
  },
  error: {
    bg: 'bg-red-50',
    text: 'text-red-800',
    border: 'border-red-200',
  },
  warning: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
  },
};

const borderPosMap = {
  top: 'top-0 left-0 w-full h-1',
  right: 'top-0 right-0 h-full w-1',
  bottom: 'bottom-0 left-0 w-full h-1',
  left: 'w-1 h-full top-0 left-0'
};

export const useAlertStyles = (props: AlertStyleProps) => {
  return useMemo(() => {
    const baseColor = colorMap[props.color];
    const borderPos = props.borderPos ? borderPosMap[props.borderPos] : '';

    const containerClasses = [
      'relative flex items-start rounded-lg transition-opacity duration-200',
      props.dense ? 'p-2' : 'p-4',
      props.outline ? [
        'bg-transparent',
        'border-2',
        baseColor.border
      ].join(' ') : '',
      props.borderPos ? 'bg-transparent shadow-md' : ''
    ].filter(Boolean);

    const contentClasses = [
      'flex-1',
      props.center ? 'text-center' : '',
      baseColor.text
    ].filter(Boolean);

    const titleClasses = [
      'font-medium font-bold',
      'mb-1',
      props.dense ? 'text-sm' : 'text-base',
      baseColor.text
    ].filter(Boolean);

    const stripeClasses = props.borderPos ? [
      'absolute',
      borderPos,
      baseColor.bg
    ].filter(Boolean) : [];

    return {
      container: containerClasses.join(' '),
      content: contentClasses.join(' '),
      title: titleClasses.join(' '),
      stripe: stripeClasses.join(' ')
    };
  }, [props]);
};