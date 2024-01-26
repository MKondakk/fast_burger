import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Error } from "../components/Error";
import * as Yup from "yup";
import "../styles/login.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("*required"),
  password: Yup.string().required("*required"),
});
interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => void; message: string
}
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, message }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage
            name="email"
            render={(msg) => <div className="error-message">{msg}</div>}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage
            name="password"
            render={(msg) => <div className="error-message">{msg}</div>}
          />
        </div>
        {message && <Error message={message}/>}
        <button type="submit" className="yellow-button login-button">
          Login
        </button>
      </Form>
    </Formik>
  );
};

export { LoginForm };
