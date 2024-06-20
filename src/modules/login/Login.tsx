import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { setAuthentication } from "@store/reducers/auth";
import { setWindowClass } from "@app/utils/helpers";
import { Checkbox } from "@profabric/react-components";
import * as Yup from "yup";

import { authLoginT } from "@app/utils/oidc-providers";
import { Form, InputGroup } from "react-bootstrap";
import { Button } from "@app/styles/common";
import { roleRedirects } from "@app/utils/apiConfig";
import "./login.css";
import logo from './logo.png'; // Importa la imagen del logo


const Login = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const [isGoogleAuthLoading, setGoogleAuthLoading] = useState(false);
  const [isFacebookAuthLoading, setFacebookAuthLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation();

  const login = async (email: string, password: string) => {
    try {
      setAuthLoading(true);
      const response = await authLoginT(email, password);
      dispatch(setAuthentication(response as any));
      toast.success("Logeado con Exito!");
      setAuthLoading(false);

      const userType: any = JSON.parse(
        localStorage.getItem("type_user") as string
      );
      const redirectPath = roleRedirects[userType] || "/";

      navigate(redirectPath);
    } catch (error: any) {
      setAuthLoading(false);
      toast.error(error.message || "Failed");
    }
  };

  const loginByGoogle = async () => {
    try {
      setGoogleAuthLoading(true);
      // const response = await GoogleProvider.signinPopup();
      // dispatch(setAuthentication(response as any));
      // toast.success('Login is succeeded!');
      // setGoogleAuthLoading(false);
      // navigate('/');
      throw new Error("Not implemented");
    } catch (error: any) {
      setGoogleAuthLoading(false);
      toast.error(error.message || "Failed");
    }
  };

  const loginByFacebook = async () => {
    try {
      setFacebookAuthLoading(true);
      // const response = await facebookLogin();
      // dispatch(setAuthentication(response as any));
      // setFacebookAuthLoading(false);
      // navigate('/');
      throw new Error("Not implemented");
    } catch (error: any) {
      setFacebookAuthLoading(false);
      toast.error(error.message || "Failed");
    }
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .max(30, "Minimo 30 Caracteres o Menos")
        .required("Obligatorio"),
        password: Yup.string()
        .min(5, "Minimo 5 Caracteres o Mas")
        .max(30, "Minimo 30 Caracteres o Menos")
        .required("Obligatorio"),
    }),
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  setWindowClass("hold-transition login-page");

  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">

        
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image">
          
          <div className="content">
            <h1>SSPC Matriculas</h1>
            <p>Gestor de Matriculas Estudiantiles</p>
            <button>Sitio Web</button>
            <button className="btn-inscripcion">Inscribir Alumno</button>
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
                  <h3 className="titulo">Hello Admin!</h3>
                  <h3 className="subtitulo">Bienvenido de vuelta</h3>

                  <form onSubmit={handleSubmit}>
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
                          type="text"
                          placeholder="Username / Correo Electronico"
                          onChange={handleChange}
                          value={values.email}
                          isValid={touched.email && !errors.email}
                          isInvalid={touched.email && !!errors.email}
                        />

                        {touched.email && errors.email ? (
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="password-input">
                      <InputGroup className="pass-input-div">
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <i className="fas fa-lock" />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Contraseña"
                          onChange={handleChange}
                          value={values.password}
                          isValid={touched.password && !errors.password}
                          isInvalid={touched.password && !!errors.password}
                        />
                        {touched.password && errors.password ? (
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="login-center-options">
                      <div className="remember-div">
                        <input type="checkbox" id="remember-checkbox" />
                        <label htmlFor="remember-checkbox">
                          Recordar Por 30 Dias
                        </label>
                      </div>
                    </div>
                    <div className="button">
                      <Button
                        loading={isAuthLoading}
                        disabled={isFacebookAuthLoading || isGoogleAuthLoading}
                        onClick={handleSubmit as any}
                      >
                        {t("Ingresar")}
                      </Button>
                    </div>
                  </form>
                  <p className="login-bottom-p ">
                    <Link to="/forgot-password">
                      {t("Recuperar Contraseña")}
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

export default Login;
