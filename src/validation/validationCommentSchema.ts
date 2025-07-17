import * as Yup from 'yup';

export const validationCommentSchema = Yup.object({
  title: Yup.string().trim().required('عنوان الزامی است'),
  content: Yup.string().trim().required('متن دیدگاه الزامی است'),
  isRecommended: Yup.boolean().optional(),
});
