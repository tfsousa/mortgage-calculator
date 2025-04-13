import { clsx } from 'clsx';
import styles from './Input.module.css';
import { useMemo } from 'react';
import { NUMERIC_REGEX } from './utils';
import { Controller, useFormContext } from 'react-hook-form';

export type InputFormats = 'currency' | 'percentage' | 'number';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  format?: InputFormats;
  error?: boolean;
};

export const Input = ({
  className,
  format,
  label,
  name,
  type,
  error,
  ...rest
}: Props) => {
  const context = useFormContext();

  const classes = clsx(styles.container, className, { [styles.error]: error });

  const sign = useMemo(() => {
    if (format === 'currency') return '$';
    if (format === 'percentage') return '%';
    return '';
  }, [type]);

  const handleChange =
    (onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'number' && !NUMERIC_REGEX.test(e.target.value)) {
        e.preventDefault();
        return;
      }

      onChange?.(e);
    };

  return (
    <div className={classes}>
      <label htmlFor={rest.id} className={styles.label}>
        {label}
        {sign && <span className={styles.sign}>{sign}</span>}
        {context && (
          <Controller
            name={name}
            control={context.control}
            render={({ field: { value = '', onChange, ...field } }) => (
              <input
                {...rest}
                {...field}
                name={name}
                className={styles.input}
                value={value}
                onChange={handleChange(onChange)}
              />
            )}
          />
        )}
        {!context && (
          <input
            {...rest}
            name={name}
            className={styles.input}
            onChange={handleChange()}
          />
        )}
      </label>
    </div>
  );
};
