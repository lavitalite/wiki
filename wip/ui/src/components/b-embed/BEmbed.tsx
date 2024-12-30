import React,{ createElement, type FC } from 'react';
import { ASPECTS, TYPES, type EmbedType, type AspectRatio } from './types';
import "./embed.css"


interface BEmbedProps {
  aspect?: AspectRatio;
  tag?: keyof React.JSX.IntrinsicElements;// React.ElementType
  type?: EmbedType;
  src?: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const BEmbed: FC<BEmbedProps> = ({
  aspect = '16by9',
  tag = 'div',
  type = 'iframe',
  children,
  className = '',
  ...props
}) => {
  const wrapperClasses = [
    'embed-responsive',
    `embed-responsive-${aspect.replace('/', 'by')}`,
    className
  ].filter(Boolean).join(' ');

  const embedClasses = [
   'embed-responsive-item'
  ].join(' ');

  const resolvedType = type.startsWith('b-') ? 'img' : type;

  return createElement(
    tag, 
    { className: wrapperClasses },
    createElement(
      resolvedType,
      {
        className: embedClasses,
        ...props
      },
      type !== 'iframe' ? children : undefined
    )
  );
};