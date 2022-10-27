import React, { useMemo } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { axiosClient } from '../../lib/axios/axios.config';
import { endpoints } from '../../configs/Apis';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFail } from '../../lib/redux/authSlide';
import { countProduct } from '../../lib/redux/cartSlide';
import { counterProductInCart } from '../../utils';

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Trường bắt buộc phải điền'),
      password: Yup.string().required('Trường bắt buộc phải điền'),
    }),
    onSubmit: async (values) => {
      try {
        const { data: res } = await axiosClient.post(
          `${endpoints.login}`,
          values
        );
        if (res.status === 200) {
          toast.success('Đăng nhập thành công', { theme: 'colored' });
          dispatch(loginSuccess({ ...res.data, accessToken: res.accessToken }));
          localStorage.setItem(
            'auth',
            JSON.stringify({ ...res.data, accessToken: res.accessToken })
          );


          dispatch(
            countProduct(
              counterProductInCart(
                JSON.parse(localStorage.getItem(`${res.data.id}`)) || []
              )
            )
          );

          setShowModal(false);
        }
      } catch (error) {
        console.log(error);
        dispatch(loginFail());
        toast.error(error.response.data.error, { theme: 'colored' });
      }
      setShowModal(false);
    },
  });

  const handlerClickRegister = () => {
    setShowModal(false);
  };
  return (
    <>
      <button
        className="flex flex-col justify-start"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <span className="capitalize block text-xs">đăng nhập / đăng ký</span>
        <span className="inline-block text-sm">
          Tài khoản <MdOutlineArrowDropDown className="inline-block text-xl" />
        </span>
      </button>
      {showModal ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-primary">
            <div className="relative z-50 w-[35rem] my-6 mx-auto max-w-[35rem]">
              {/*content*/}
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  container__login">
                {/*header*/}
                <div className="flex justify-between p-5 border-b border-solid border-slate-200 rounded-t relative z-50">
                  <h3 className="text-3xl font-semibold">Đăng nhập</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red-500 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-red-500  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <section className="container__login w-full bg-main">
                    <div className="flex flex-col justify-center overflow-hidden">
                      <div className="w-full  bg-white rounded-md shadow-xl shadow-rose-600/40">
                        <form
                          className="mt-6"
                          onSubmit={formik.handleSubmit}
                          method="post"
                        >
                          <div className="mb-2">
                            <label
                              htmlFor="text"
                              className="block text-sm font-semibold text-gray-800 capitalize"
                            >
                              tên đăng nhập
                            </label>
                            <input
                              type="text"
                              name="username"
                              value={formik.values.username}
                              className="block w-full px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-[#158dff] focus:ring-[#158dff] focus:outline-none focus:ring focus:ring-opacity-40"
                              {...formik.getFieldProps('username')}
                            />
                            {formik.touched.username &&
                            formik.errors.username ? (
                              <div className="ml-5 text-red-700 mb-3">
                                {formik.errors.username}
                              </div>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="password"
                              className="block text-sm font-semibold text-gray-800 capitalize"
                            >
                              mật khẩu
                            </label>
                            <input
                              type="password"
                              name="password"
                              value={formik.values.password}
                              className="block w-full px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-[#158dff] focus:ring-[#158dff] focus:outline-none focus:ring focus:ring-opacity-40"
                              {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
                              <div className="ml-5 text-red-700 mb-3">
                                {formik.errors.password}
                              </div>
                            ) : null}
                          </div>
                          <Link
                            to="#"
                            className="text-xs text-primary hover:underline"
                          >
                            Forget Password?
                          </Link>
                          <div className="mt-6">
                            <button
                              type="submit"
                              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-[#158dff] focus:outline-none focus:bg-[#158dff]"
                            >
                              Đăng nhập
                            </button>
                          </div>
                        </form>

                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                          {' '}
                          Nếu bạn chưa có tài khoản?{' '}
                          <Link
                            to="/register"
                            className="font-medium text-primary hover:underline"
                            onClick={handlerClickRegister}
                          >
                            Đăng ký tại đây
                          </Link>
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
