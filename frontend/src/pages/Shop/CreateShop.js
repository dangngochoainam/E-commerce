import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authAxios } from "../../lib/axios/axios.config";
import { useSelector } from "react-redux";
import { endpoints } from "../../configs/Apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateShop = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Trường bắt buộc phải điền"),
      description: Yup.string().required("Trường bắt buộc phải điền"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await authAxios(currentUser).post(
          `${endpoints.shop}`,
          {
            ...values,
            image: image,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 201) {
          toast.success("Tạo cửa hàng thành công", { theme: "colored" });
          navigate(`/shop/${res.data.id}/manage`);
        }

        console.log(res);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.data.error, { theme: "colored" });
      }
    },
  });
  return (
    <section className="flex justify-center mt-5 xl:text-xl">
      <form className="w-4/6" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-900 dark:text-gray-300"
          >
            Tên cửa hàng
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tên cửa hàng"
            value={formik.values.name}
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="ml-5 text-red-700 mb-3">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label
            htmlFor="description"
            className="block mb-2 font-medium text-gray-900 dark:text-gray-300"
          >
            Mô tả
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={formik.values.description}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Mô tả tổng quan về sản phẩm của cửa hàng của bạn"
            {...formik.getFieldProps("description")}
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <div className="ml-5 text-red-700 mb-3">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label
            className="block mb-2 font-medium text-gray-900 dark:text-gray-300"
            htmlFor="image"
          >
            Ảnh cửa hàng
          </label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="image"
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Tạo mới cửa hàng
        </button>
      </form>
    </section>
  );
};

export default CreateShop;
