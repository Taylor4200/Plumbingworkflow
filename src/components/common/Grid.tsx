import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'none' | 'small' | 'medium' | 'large';
  items?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  autoCols?: boolean;
  autoRows?: boolean;
  flow?: 'row' | 'col' | 'dense';
  padding?: 'none' | 'small' | 'medium' | 'large';
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6;
    md?: 1 | 2 | 3 | 4 | 5 | 6;
    lg?: 1 | 2 | 3 | 4 | 5 | 6;
    xl?: 1 | 2 | 3 | 4 | 5 | 6;
  };
}

const Grid = ({
  children,
  className = '',
  cols = 1,
  gap = 'medium',
  items = 'stretch',
  justify = 'start',
  autoCols = false,
  autoRows = false,
  flow = 'row',
  padding = 'none',
  responsive,
}: GridProps) => {
  const gapStyles = {
    none: 'gap-0',
    small: 'gap-4',
    medium: 'gap-6 md:gap-8',
    large: 'gap-8 md:gap-12',
  };

  const itemsStyles = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyStyles = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const paddingStyles = {
    none: '',
    small: 'p-4',
    medium: 'p-6 md:p-8',
    large: 'p-8 md:p-12',
  };

  const getColsClass = (breakpoint?: string) => {
    const colsValue = breakpoint ? responsive?.[breakpoint as keyof typeof responsive] : cols;
    return colsValue ? `grid-cols-${colsValue}` : '';
  };

  const gridClasses = [
    'grid',
    gapStyles[gap],
    itemsStyles[items],
    justifyStyles[justify],
    paddingStyles[padding],
    autoCols ? 'auto-cols-auto' : '',
    autoRows ? 'auto-rows-auto' : '',
    `grid-flow-${flow}`,
    getColsClass(),
    responsive?.sm ? `sm:${getColsClass('sm')}` : '',
    responsive?.md ? `md:${getColsClass('md')}` : '',
    responsive?.lg ? `lg:${getColsClass('lg')}` : '',
    responsive?.xl ? `xl:${getColsClass('xl')}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={gridClasses}>{children}</div>;
};

export default Grid; 