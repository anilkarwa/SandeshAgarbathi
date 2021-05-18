import * as Yup from 'yup';

export default Yup.object().shape({
  customerCode: Yup.string().required('This field is required'),
  customerName: Yup.string().required('This field is required'),
  group: Yup.object().required('This field is required'),
  mobileNumber: Yup.string().required('This field is required'),
  email: Yup.string().required('This field is required'),
});
