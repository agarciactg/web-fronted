import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { setWindowClass } from "@app/utils/helpers";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form, InputGroup } from "react-bootstrap";
import { Button } from "@profabric/react-components";
import { useState } from "react";
import {
  forgotPasswordProvider,
  resetPasswordProvider,
} from "@app/services/forgot-password/forgot-password-provider";
import "./forgotpassword.css";
import logo from "./logo3.png"; // Importa la imagen del logo

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const [isRequest, setIsRequest] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const response = await forgotPasswordProvider(email);
      setIsLoading(false);
      setIsRequest(true);
      setEmail(email); // save email in form
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message || "Failed");
    }
  };

  const resetPassword = async ({ resetCode, newPassword }) => {
    try {
      setIsLoading(true);
      const response = await resetPasswordProvider({
        email,
        resetCode,
        newPassword,
      });
      setIsLoading(false);
      navigate("/login");
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message || "Failed");
    }
  };

  // Formulario para enviar el codigo de restablecimiento
  const formikForgotPassword = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("required"),
    }),
    onSubmit: (values) => forgotPassword(values.email),
  });

  // Formulario para restablecer la password
  const formikResetPassword = useFormik({
    initialValues: { resetCode: "", newPassword: "", confirmPassword: "" },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Required"),
      newPassword: Yup.string()
        .min(5, "Debe terner 5 caracteres o mas")
        .max(30, "Debe tener menos de 30 caracteres")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => resetPassword(values),
  });


  setWindowClass("hold-transition login-page");

  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image">
          <div className="content">
            <h1>SSPC Matriculas</h1>
            <p>Gestor de Matriculas Estudiantiles</p>
            <button className="btn-login-public">
              <NavLink to="/">Sitio Web</NavLink> 
            </button>
          </div>

          <div className="Logo">
            <img src={logo} alt="jose de la vega" />
          </div>
        </div>

        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading">
                    Web <span>Enrollment</span>
                  </h3>
                  <h3 className="login-heading">
                    Ingrese la dirección de correo electrónico que utilizó para
                    registrarse y le enviaremos un enlace para restablecer su
                    contraseña por Correo.
                  </h3>

                  <form onSubmit={formikForgotPassword.handleSubmit}>
                    <div className="Email-input">
                      <InputGroup className="pass-input-div">
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <i className="fas fa-envelope" />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          onChange={formikForgotPassword.handleChange}
                          value={formikForgotPassword.values.email}
                          isValid={
                            formikForgotPassword.touched.email &&
                            !formikForgotPassword.errors.email
                          }
                          isInvalid={
                            formikForgotPassword.touched.email &&
                            !!formikForgotPassword.errors.email
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formikForgotPassword.errors.email}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </div>

                    <div className="login-center-options"></div>
                    <div className="button">
                      <Button
                        onClick={formikForgotPassword.handleSubmit as any}
                        loading={isLoading}
                      >
                        {t("Recuperar Contraseña")}
                      </Button>
                    </div>
                  </form>
                  <p className="login-bottom-p ">
                  <Link to="/login">
                      {t("Volver a Inicio")}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;