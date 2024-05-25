import * as yup from 'yup';

export const userSchema = yup.object({
  id: yup.string().required('Id é obrigatório'),

});