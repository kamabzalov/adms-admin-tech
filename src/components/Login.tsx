import {AxiosError} from "axios";
import clsx from "clsx";
import {useFormik} from "formik";
import React, {useState} from 'react';
import {NavigateFunction, useNavigate} from "react-router-dom";
import * as Yup from 'yup';

import {login} from '../services/auth.service';

const loginSchema = Yup.object().shape({
    username: Yup.string().trim().required('Username is required'),
    password: Yup.string().trim().required('Password is required'),
})

const initialValues = {
    username: '',
    password: '',
}

export default function Login() {
    let navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true)
            setStatus(false);
            try {
                login(values.username, values.password).then(() => navigate('/dashboard'));
            } catch (error) {
                if (error instanceof AxiosError) {
                    setStatus(error?.response?.data.error)
                }
                setSubmitting(false)
                setLoading(false)
            }
        },
    })
    return (
        <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
            <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'>
                <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
                    <div className='w-lg-500px p-10'>
                        <form
                            className='form w-100'
                            onSubmit={formik.handleSubmit}
                            noValidate
                        >
                            <div className='text-center mb-11'>
                                <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
                            </div>

                            {formik.status && (
                                <div className='mb-lg-15 alert alert-danger'>
                                    <div className='alert-text font-weight-bold'>{formik.status}</div>
                                </div>
                            )}

                            <div className='fv-row mb-8'>
                                <label className='form-label fs-6 fw-bolder text-dark'>Username</label>
                                <input
                                    placeholder='Username'
                                    {...formik.getFieldProps('username')}
                                    className={clsx(
                                        'form-control bg-transparent',
                                        {'is-invalid': formik.touched.username && formik.errors.username},
                                        {
                                            'is-valid': formik.touched.username && !formik.errors.username,
                                        }
                                    )}
                                    type='text'
                                    name='username'
                                    autoComplete='off'
                                />
                                {formik.touched.username && formik.errors.username && (
                                    <div className='fv-plugins-message-container'>
                                        <span role='alert'>{formik.errors.username}</span>
                                    </div>
                                )}
                            </div>

                            <div className='fv-row mb-3'>
                                <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    autoComplete='off'
                                    {...formik.getFieldProps('password')}
                                    className={clsx(
                                        'form-control bg-transparent',
                                        {
                                            'is-invalid': formik.touched.password && formik.errors.password,
                                        },
                                        {
                                            'is-valid': formik.touched.password && !formik.errors.password,
                                        }
                                    )}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.password}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
                                <div/>
                            </div>

                            <div className='d-grid mb-10'>
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    disabled={formik.isSubmitting || !formik.isValid}
                                >
                                    {!loading && <span className='indicator-label'>Continue</span>}
                                    {loading && (
                                        <span className='indicator-progress' style={{display: 'block'}}>
                            Please wait...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                                    )}
                                </button>
                            </div>

                            <div className='text-gray-500 text-center fw-semibold fs-6'></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
