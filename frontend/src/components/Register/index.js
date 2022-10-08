import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.scss";
import { axiosClient } from "../../lib/axios/axios.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = () => {
  const [avatar, setAvatar] = useState();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      passwordRepeat: "",
      roles: "",
      // avatar: null,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Trường bắt buộc phải điền"),
      lastname: Yup.string().required("Trường bắt buộc phải điền"),
      email: Yup.string()
        .matches(regexEmail, "Email không hợp lệ")
        .required("Trường bắt buộc phải điền"),
      username: Yup.string()
        .min(6, "Tên đăng nhập tối thiểu 6 kí tự")
        .max(15, "Tên đăng nhập tối đa 15 kí tự")
        .required("Trường bắt buộc phải điền"),
      password: Yup.string()
        .min(6, "Mật khẩu tối thiểu 6 kí tự")
        .max(15, "Mật khẩu tối đa 15 kí tự")
        .required("Trường bắt buộc phải điền"),
      roles: Yup.string().required("Trường bắt buộc phải điền"),
      // avatar: Yup.mixed().required("Trường bắt buộc phải điền"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axiosClient.post(
          `http://localhost:8080/v1/ecommerce/register`,
          // `${endpoints.auth}/register`,

          {
            ...values,
            avatar: avatar,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res);
        if (res.status === 201) {
          toast.success("Tài khoản đã được tạo", { theme: "colored" });
          navigate("/");
        }
      } catch (error) {
        toast.error(error.response.data.error, {
          theme: "colored"
        });
      }
    },
  });
  return (
    <>
      <section className="container__register w-full bg-main">
        <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          className="bg-white m-auto w-6/12 px-4"
        >
          <div className="container">
            <h1 className="text-blue-900">Đăng Ký</h1>

            <label htmlFor="lastname">
              <b>Họ</b>
            </label>
            <input
              type="text"
              placeholder="VD: Đặng"
              id="lastname"
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="ml-5 text-red-700 mb-3">
                {formik.errors.lastname}
              </div>
            ) : null}

            <label htmlFor="firstname">
              <b>Tên</b>
            </label>
            <input
              type="text"
              placeholder="VD: Nam"
              id="firstname"
              name="firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div className="ml-5 text-red-700 mb-3">
                {formik.errors.firstname}
              </div>
            ) : null}

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="VD: dangngochoainam0601@gmail.com"
              id="email"
              name="email"
              // Tương tự 3 câu trên
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="ml-5 text-red-700 mb-3">
                {formik.errors.email}
              </div>
            ) : null}

            <label htmlFor="usename">
              <b>Tên đăng nhập</b>
            </label>
            <input
              type="text"
              id="username"
              placeholder="VD: namdng61"
              name="username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="ml-5 text-red-700 mb-3">
                {formik.errors.username}
              </div>
            ) : null}

            <label htmlFor="password">
              <b>Mật Khẩu</b>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nhập Mật Khẩu"
              name="password"
              {...formik.getFieldProps("password")}
            />

            {formik.touched.password && formik.errors.password ? (
              <div className="ml-5 text-red-700 mb-3">
                {formik.errors.password}
              </div>
            ) : null}

            <label htmlFor="passwordRepeat">
              <b>Nhập Lại Mật Khẩu</b>
            </label>
            <input
              type="password"
              placeholder="Nhập Lại Mật Khẩu"
              name="passwordRepeat"
              id="passwordRepeat"
              {...formik.getFieldProps("passwordRepeat")}
            />

            {formik.touched.passwordRepeat &&
            formik.values.password !== formik.values.passwordRepeat ? (
              <div className="ml-5 text-red-700 mb-3">
                Mật khẩu không khớp. Vui lòng nhập lại
              </div>
            ) : null}

            <div className="flex flex-col">
              <label htmlFor="roles">
                <b>Chức năng</b>{" "}
              </label>
              <select
                id="roles"
                name="roles"
                className="w-full"
                {...formik.getFieldProps("roles")}
              >
                <option value="CUSTOMER">Khách hàng</option>
                <option value="SELLER">Người bán hàng</option>
              </select>
            </div>

            {formik.touched.roles && formik.errors.roles ? (
              <div className="ml-5 text-red-700 mb-3">
                {formik.errors.roles}
              </div>
            ) : null}

            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
            />

            <div className="clearfix mt-5">
              <button type="submit" className="signupbtn">
                Đăng ký
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
