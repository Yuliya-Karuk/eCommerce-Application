import React from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

export function List<T>({ items, renderItem, className, ...props }: ListProps<T>) {
  return (
    <ul className={`${className}__list`} {...props}>
      {items.map(renderItem)}
    </ul>
  );
}
