import {
  Content,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Portal,
  Root,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './Select.module.css';

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  className?: string;
  placeholder?: string;
  options: Option[];
  name: string;
  error?: boolean;
};

export const Select = ({
  className,
  error,
  options,
  name,
  placeholder,
}: Props) => {
  const [open, setOpen] = useState(false);

  const context = useFormContext();

  const hasError = error || context?.formState.errors[name];

  const classes = clsx(styles.container, className, {
    [styles.error]: hasError,
  });

  const { watch, setValue, control } = context ?? {};
  const { ref } = control?.register?.(name) ?? {};

  const value = watch?.(name) ?? '';

  const handleChange = (value: string | number) => {
    setValue(name, value);
    context?.trigger(name);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Root
      open={open}
      onOpenChange={handleOpenChange}
      onValueChange={handleChange}
    >
      <input type="hidden" ref={ref} name={name} value={value} />
      <Trigger className={classes} value={value}>
        <Value placeholder={placeholder} />
        <Icon className={styles.icon} data-open={open} />
      </Trigger>

      <Portal>
        <Content className={styles.content} position="popper" sideOffset={4}>
          <ScrollUpButton />
          <Viewport className={styles.viewport}>
            {options?.map(({ label, value }, index) => (
              <Item
                key={index}
                value={value.toString()}
                className={styles.option}
              >
                <ItemText>{label}</ItemText>
                <ItemIndicator />
              </Item>
            ))}
          </Viewport>
        </Content>
      </Portal>
    </Root>
  );
};
