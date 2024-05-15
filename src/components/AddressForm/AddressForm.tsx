// import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
// import { RegisterFormData } from '../../pages/registration/registration';
// import { Input } from '../Input_/Input_';
// import styles from './AddressForm.module.scss';

// interface AddressFormProps<T extends FieldValues> {
//   register: UseFormRegister<T>;
//   errors: FieldErrors<RegisterFormData>;
// }
// export function AddressForm<T extends FieldValues>(props: AddressFormProps<T>) {
//   const { register, errors } = props;

//   return (
//     <>
//       <Input
//         name="addresses.0.country"
//         label="Country:"
//         placeholder="Country"
//         register={register}
//         validationSchema={{ required: 'This field is required' }}
//         isInvalid={!!errors.country}
//         required
//       />
//       <p className={styles.firstNameError}>{errors?.country?.message}</p>

//       <Input
//         name="city"
//         label="City:"
//         placeholder="City"
//         register={register}
//         validationSchema={{ required: 'This field is required' }}
//         isInvalid={!!errors.city}
//         required
//       />
//       <p className={styles.lastNameError}>{errors?.city?.message}</p>

//       <Input
//         name="postalCode"
//         label="Postal code:"
//         placeholder="Postal code"
//         // type="date"
//         register={register}
//         validationSchema={{ required: 'This field is required' }}
//         isInvalid={!!errors.postalCode}
//         required
//       />
//       <p className={styles.dateOfBirthError}>{errors?.postalCode?.message}</p>
//     </>
//   );
// }
