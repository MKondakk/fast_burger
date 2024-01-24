import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/login.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("*required"),
  password: Yup.string().required("*required"),
});
interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
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
            component="div"
            className="error-message"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage
            name="password"
            component="div"
            className="error-message"
          />
        </div>
        <button type="submit" className="yellow-button login-button">
          Login
        </button>
      </Form>
    </Formik>
  );
};

export { LoginForm };
