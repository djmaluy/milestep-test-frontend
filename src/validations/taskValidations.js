import * as yup from "yup";

export const taskSchema = yup.object().shape({
  title: yup.string().min(3).max(40).required(),
  description: yup.string(),
  priority: yup.number().min(1).max(5).positive(),
  dueDate: yup.date().required("Please enter expiry date"),
});
