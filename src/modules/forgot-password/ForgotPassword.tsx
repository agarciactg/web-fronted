import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { setWindowClass } from '@app/utils/helpers';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Form, InputGroup } from 'react-bootstrap';
import { Button } from '@profabric/react-components';
import { useState } from 'react';
import { forgotPasswordProvider, resetPasswordProvider } from '@app/services/forgot-password/forgot-password-provider';

const ForgotPassword = () => {

  const navigate = useNavigate();
  const [t] = useTranslation();
  const [isRequest, setIsRequest] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const response = await forgotPasswordProvider(email);
      setIsLoading(false);
      setIsRequest(true);
      setEmail(email); // save email in form

    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message || 'Failed');
    }
  }


  const resetPassword = async ({ resetCode, newPassword }) => {
    try {
      setIsLoading(true);
      const response = await resetPasswordProvider({ email, resetCode, newPassword });
      setIsLoading(false);
      navigate('/login');
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message || 'Failed');
    }
  };


  // Formulario para enviar el codigo de restablecimiento
  const formikForgotPassword = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('required'),
    }),
    onSubmit: (values) => forgotPassword(values.email),
  });


  // Formulario para restablecer la password
  const formikResetPassword = useFormik({
    initialValues: { resetCode: '', newPassword: '', confirmPassword: '' },
    validationSchema: Yup.object({
      resetCode: Yup.string().required('Required'),
      newPassword: Yup.string()
        .min(5, 'Debe terner 5 caracteres o mas')
        .max(30, 'Debe tener menos de 30 caracteres')
        .required('Required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => resetPassword(values),
  });

  setWindowClass('hold-transition login-page');

  if (isRequest) {
    return (
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <Link to="/" className="h1">
              <b>Olvidaste tu contraseña?</b>
              <span>contraseña?</span>
            </Link>
          </div>
          <div className="card-body">
            <p className="login-box-msg">{t('recover.resetPassword')}</p>
            <form onSubmit={formikResetPassword.handleSubmit}>
              <div className="mb-3">
                <InputGroup className="mb-3">
                  <Form.Control
                    id="resetCode"
                    name="resetCode"
                    type="text"
                    placeholder="Código de restablecimiento"
                    onChange={formikResetPassword.handleChange}
                    value={formikResetPassword.values.resetCode}
                    isValid={formikResetPassword.touched.resetCode && !formikResetPassword.errors.resetCode}
                    isInvalid={formikResetPassword.touched.resetCode && !!formikResetPassword.errors.resetCode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formikResetPassword.errors.resetCode}
                  </Form.Control.Feedback>
                </InputGroup>
              </div>
              <div className="mb-3">
                <InputGroup className="mb-3">
                  <Form.Control
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="Nueva Contraseña"
                    onChange={formikResetPassword.handleChange}
                    value={formikResetPassword.values.newPassword}
                    isValid={formikResetPassword.touched.newPassword && !formikResetPassword.errors.newPassword}
                    isInvalid={formikResetPassword.touched.newPassword && !!formikResetPassword.errors.newPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formikResetPassword.errors.newPassword}
                  </Form.Control.Feedback>
                </InputGroup>
              </div>
              <div className="mb-3">
                <InputGroup className="mb-3">
                  <Form.Control
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirmar Nueva Contraseña"
                    onChange={formikResetPassword.handleChange}
                    value={formikResetPassword.values.confirmPassword}
                    isValid={formikResetPassword.touched.confirmPassword && !formikResetPassword.errors.confirmPassword}
                    isInvalid={formikResetPassword.touched.confirmPassword && !!formikResetPassword.errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formikResetPassword.errors.confirmPassword}
                  </Form.Control.Feedback>
                </InputGroup>
              </div>
              <Button
                onClick={formikResetPassword.handleSubmit as any}
                loading={isLoading}
              >
                {t('recover.resetPasswordButton')}
              </Button>
              <p className="mb-1">
                <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

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
          <form onSubmit={formikForgotPassword.handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={formikForgotPassword.handleChange}
                  value={formikForgotPassword.values.email}
                  isValid={formikForgotPassword.touched.email && !formikForgotPassword.errors.email}
                  isInvalid={formikForgotPassword.touched.email && !!formikForgotPassword.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formikForgotPassword.errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </div>
            <Button
              onClick={formikForgotPassword.handleSubmit as any}
              loading={isLoading}
            >
              {t('recover.requestNewPassword')}
            </Button>
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
