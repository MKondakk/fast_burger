import React from "react";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import "../styles/buttons.css";
import "../styles/main_page.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*name is required"),
  price: Yup.number().required("*price is required"),
  type: Yup.string().required("*type is required"),
});
interface ProductEditFormProps {
  initialValues: {
    name: string;
    price: number;
    type: string;
  };
  onSubmit: (values: { name: string; price: number; type: string }) => void;
  onCancel: () => void;
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="product-edit-form">
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <div>{formik.errors.name}</div>
        )}
      </div>

      <div>
        <label htmlFor="price">Price: </label>
        <input
          type="number"
          id="price"
          name="price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price && (
          <div>{formik.errors.price}</div>
        )}
      </div>

      <div>
        <label htmlFor="type">Type: </label>
        <input
          type="text"
          id="type"
          name="type"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.type}
          disabled
        />
        {formik.touched.type && formik.errors.type && (
          <div>{formik.errors.type}</div>
        )}
      </div>
      <button type="submit" className="small-button yellow-button">Save</button>
      <button type="button" onClick={onCancel} className="small-button yellow-button">
        Cancel
      </button>
    </form>
  );
};

export { ProductEditForm };
