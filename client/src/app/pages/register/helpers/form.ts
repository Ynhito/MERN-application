import * as yup from 'yup';

export interface FormValues {
  email: string;
  password: string;
}

export const defaultValues: FormValues = {
  email: '',
  password: ''
}

export const schema = yup.object().shape({
  email: yup
    .string()
    .required('Обязательное поле')
    // .email('Некорректный Email')
    .min(4, 'Минимум 4 символа')
    .max(100, 'Максимум 100 символов'),
  password: yup
    .string()
    .required('Обязательное поле')
})