/* eslint-disable react/require-default-props */
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import styles from './input.module.scss';

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  validationSchema: RegisterOptions;
  type?: string;
  placeholder?: string;
}

export function Input<T extends FieldValues>(props: InputProps<T>) {
  const { name, label, register, validationSchema, type = 'text', placeholder = '' } = props;

  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validationSchema)}
      />
    </>
  );
}
