import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchCategory } from '../../utils/apiCategory';
import { editProduct } from '../../utils/apiShop';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GrEdit } from 'react-icons/gr';

const EditProductModal = ({ product, setProduct }) => {
  const [showModal, setShowModal] = useState(false);
  const { shopId } = useParams();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState();
  const fetchAPI = async () => {
    const resCategory = await fetchCategory();
    if (resCategory.status === 200) {
      setCategories(resCategory.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      unitInStock: product.unitInStock,
      categoryId: product.categoryId,
      subCategoryId: product.subCategoryId,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Trường bắt buộc phải điền'),
      price: Yup.string().required('Trường bắt buộc phải điền'),
      unitInStock: Yup.number()
        .min(5, 'Số lượng nhập tối thiểu là 5')
        .required('Trường bắt buộc phải điền'),
      categoryId: Yup.number().min(1, 'Chọn danh mục phù hợp'),
      subCategoryId: Yup.number().min(1, 'Chọn danh mục phù hợp'),
    }),
    onSubmit: async (values) => {
      let product = {
        ...values,
        image: image,
        shopId: shopId,
      };

      try {
        const res = await editProduct(currentUser, product);
        console.log(res);
        if (res.status === 200) {
          setProduct();
          setShowModal(false);
          toast.success('Sửa thành công', { theme: 'colored' });
        
        }
      } catch (error) {
        toast.error(error.response.data.data.error);
        console.log(error);
      }
    },
  });

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <GrEdit className="text-white" />
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-7/12 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Thông tin sản phẩm</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black  text-3xl  font-semibold "
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                  <form onSubmit={formik.handleSubmit} method="post">
                    <div className="">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Tên sản phẩm
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="iPhone 14 ProMax"
                          value={formik.values.name}
                          {...formik.getFieldProps('name')}
                        />

                        {formik.touched.name && formik.errors.name ? (
                          <div className="ml-5 text-red-700 mb-3">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Giá tiền
                        </label>
                        <input
                          type="text"
                          id="price"
                          name="price"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={formik.values.price}
                          {...formik.getFieldProps('price')}
                        />
                        {formik.touched.price && formik.errors.price ? (
                          <div className="ml-5 text-red-700 mb-3">
                            {formik.errors.price}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Mô tả
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={formik.values.description}
                          {...formik.getFieldProps('description')}
                        ></textarea>
                        {formik.touched.description &&
                        formik.errors.description ? (
                          <div className="ml-5 text-red-700 mb-3">
                            {formik.errors.description}
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <label
                          htmlFor="unitInStock"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Số lượng sản phẩm
                        </label>
                        <input
                          id="unitInStock"
                          name="unitInStock"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={formik.values.description}
                          {...formik.getFieldProps('unitInStock')}
                        />
                        {formik.touched.unitInStock &&
                        formik.errors.unitInStock ? (
                          <div className="ml-5 text-red-700 mb-3">
                            {formik.errors.unitInStock}
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <label
                          htmlFor="categoryId"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Danh mục
                        </label>
                        <select
                          id="categoryId"
                          name="categoryId"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={formik.values.categoryId}
                          {...formik.getFieldProps('categoryId')}
                        >
                          {categories.map((category) => (
                            <>
                              <option value={category.id}>
                                {category.name}
                              </option>
                            </>
                          ))}
                        </select>
                        {formik.touched.categoryId &&
                        formik.errors.categoryId ? (
                          <div className="ml-5 text-red-700 mb-3">
                            {formik.errors.categoryId}
                          </div>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <label
                          className="block mb-2 font-medium text-gray-900 dark:text-gray-300"
                          htmlFor="image"
                        >
                          Ảnh sản phẩm
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
                        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-auto block sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Sửa
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default EditProductModal;
