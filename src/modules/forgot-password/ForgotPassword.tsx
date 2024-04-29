import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { setWindowClass } from '@app/utils/helpers';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Form, InputGroup } from 'react-bootstrap';
import { Button } from '@profabric/react-components';
import { useState } from 'react';
import { forgotPasswordProvider } from '@app/services/forgot-password/forgot-password-provider';

const ForgotPassword = () => {

  const navigate = useNavigate();
  const [t] = useTranslation();


  const [isLoading, setIsLoading] = useState(false)


  const forgotPassword = async ( email: string) => {
    try {
      setIsLoading(true);
      const response = await forgotPasswordProvider(email);
      console.log("response: ", response);
      setIsLoading(false);
      navigate('/login');

    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message || 'Failed');
    }
  }

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      forgotPassword(values.email);
    },
  });

  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>Admin</b>
            <span>LTE</span>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t('recover.forgotYourPassword')}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-envelope" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="row">
              <div className="col-12">
                <Button
                  onClick={handleSubmit as any}
                >{t('recover.requestNewPassword')}</Button>
              </div>
            </div>
          </form>
          <p className="mt-3 mb-1">
            <Link to="/login">{t('login.button.signIn.label')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
