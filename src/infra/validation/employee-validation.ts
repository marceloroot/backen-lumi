import * as yup from 'yup';

export const employeeSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  role: yup.string().required('Cargo é obrigatório'),
  department: yup.string().required('Departamento é obrigatório'),
  date: yup.date().required('Data é obrigatória').max(new Date(), 'A data não pode ser no futuro'),
});