import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import OAuthSection from './OAuthSection';
import { SubmitButton } from './SubmitButton';
import { FormField } from '../common/FormField/FormField';
import useLogin from "@/hooks/authhooks/use-login";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { onSubmit, isLoading } = useLogin(); 

  const initialValues: LoginFormValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter your username or email address.'),
    password: Yup.string().required('Please enter your password'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Form className='pt-6' noValidate onSubmit={handleSubmit}>
          <FormField
            name="email"
            label="Email or username"
            placeholder="Email or username"
            type="email"
          />
          <FormField
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          <SubmitButton isLoading={isLoading}>Continue</SubmitButton>

          <OAuthSection />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
