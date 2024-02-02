import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/modal.css";

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required("Code is required")
    .matches(/^\d{6}$/, "*code must be 6 digits"),
});
export interface BlikFormProps {
  onSubmit: (code: string) => void;
}
const BlikForm: React.FC<BlikFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ code: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values.code);
        resetForm();
      }}
    >
      <Form>
        <div className="form-group">
          <label htmlFor="code">Enter BLIK Code: </label>
          <Field type="text" id="code" name="code" />
          <ErrorMessage name="code" component="div" className="error" />
        </div>
        <button type="submit" className="small-button yellow-button">Submit</button>
      </Form>
    </Formik>
  );
};

export { BlikForm };
