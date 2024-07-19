import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { sendPost } from "../../../network/requests";
import "./create.scss";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { SignUpSchema } from "../../../utils/SchemaValidation";

const CreateUser = () => {
  const [loading, setLoading] = useState(false);

  const divStyle = {
    border: "1px solid black",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "20px",
  };

  return (
    <div>
      <h1>Thêm người dùng mới</h1>
      <div className="details-film">
        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { setSubmitting }) => {
            delete values.confirmPassword;
            const res = await sendPost("users/signup", values);
            if (res.status === 200) {
              window.history.back();
              toast.success("Tạo tài khoản thành công!!!");
            } else {
              toast.error(res.data.msg);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div style={divStyle}>
                <strong>Tên người dùng</strong>
                <br />
                <input
                  type="tex"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <br />
                <p style={{ color: "red" }}>
                  {errors.name && touched.name && errors.name}
                </p>
              </div>
              <div style={divStyle}>
                <strong>Email</strong>
                <br />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <br />
                <p style={{ color: "red" }}>
                  {errors.email && touched.email && errors.email}
                </p>
              </div>
              <div style={divStyle}>
                <strong>Mật khẩu</strong>
                <br />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <br />
                <p style={{ color: "red" }}>
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
              <div style={divStyle}>
                <strong>Xác nhận mật khẩu</strong>
                <br />
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <br />
                <p style={{ color: "red" }}>
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </p>
              </div>
              <button type="submit" disabled={isSubmitting}>
                <ClipLoader
                  color="black"
                  loading={loading}
                  size={18}
                  style={{ marginRight: 10 }}
                />
                Thêm người dùng
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateUser;
