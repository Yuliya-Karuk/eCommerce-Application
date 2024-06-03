import classnames from 'classnames';
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  validationSchema: RegisterOptions;
  type?: string;
  isInvalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  autocomplete?: string | undefined;
}

export function Input<T extends FieldValues>(props: InputProps<T>) {
  const {
    name,
    label,
    register,
    validationSchema,
    type = 'text',
    isInvalid = false,
    required = false,
    disabled = false,
    autocomplete = undefined,
  } = props;

  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required ? (
          <span className={styles.orange} role="presentation">
            *
          </span>
        ) : null}
      </label>
      <input
        className={classnames(styles.input, { [styles.invalid]: isInvalid })}
        id={name}
        required={required}
        type={type}
        disabled={disabled}
        {...register(name, validationSchema)}
        {...(autocomplete && { autoComplete: autocomplete })}
      />
    </>
  );
}
