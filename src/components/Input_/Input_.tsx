import classnames from 'classnames';
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import styles from './Input_.module.scss';

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  validationSchema: RegisterOptions;
  type?: string;
  placeholder?: string;
  isInvalid?: boolean;
  required?: boolean;
}

export function Input<T extends FieldValues>(props: InputProps<T>) {
  const {
    name,
    label,
    register,
    validationSchema,
    type = 'text',
    placeholder = '',
    isInvalid = false,
    required = false,
  } = props;

  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required ? <span className={styles.orange}>*</span> : null}
      </label>
      <input
        className={classnames(styles.input, { [styles.invalid]: isInvalid })}
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validationSchema)}
      />
    </>
  );
}
