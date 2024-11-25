import React, { useEffect, useState } from 'react'
import { Modal, message } from 'antd'
import { useForm } from "react-hook-form"
import axios, { isAxiosError } from 'axios';
import { HiOutlineMail } from "react-icons/hi";

const ForgotPassModal = ({ isModalOpen, setIsModalOpen }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [messageApi, contextHolder] = message.useMessage();

    const [loading, setLoading] = useState(false);


    const onSubmitForm = async (data) => {

        setLoading(true)

        const key = "forgotForm"

        messageApi.open({
            key,
            type: "loading",
            content: "Please wait...",
        })


        try {
            const forgotFormResponse = await axios.post(`${process.env.REACT_APP_API_URL}api/auth/forgotpassword`, data)
            setIsModalOpen(false);
            messageApi.open({
                key,
                type: 'success',
                content: forgotFormResponse.data.message,
                duration: 2

            });
        } catch (error) {
            let errorMessage = "Please check your internet connection!"
            if (isAxiosError(error)) {
                console.log(error)
                if (error.message !== "Network Error") {
                    errorMessage = error.response.data.message
                }
            }
            messageApi.open({
                key,
                type: 'error',
                content: errorMessage,
                duration: 2

            });
        } finally {
            setLoading(false)
        }

    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            reset({ email: "" })
        }
    }, [isModalOpen,reset])

    return (
        <>
            <Modal

                title="Forgot password" open={isModalOpen} onCancel={handleCancel}

                footer={[
                    <button type="button" onClick={handleCancel} class="py-2 px-4 inline-flex items-center gap-x-2 text-sm mr-2 font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none">
                        Cancel
                    </button>,
                    <button
                        onClick={handleSubmit(onSubmitForm)}
                        type="button" class="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:bg-green-600 disabled:opacity-50 disabled:pointer-events-none">
                        Submit
                    </button>
                ]}
            >
                <div className='space-y-4'>
                    <p className='text-gray-500 text-sm'>Forgot your password? Please enter your email and we will send your reset link.</p>
                    <div>
                        <div className="relative">
                            <input
                                {...register("email", {
                                    required: "Email is required!",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                        message: "Please enter a valid email address."
                                    }
                                })}
                                disabled={loading}
                                type="email"
                                className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:ring-1 focus:ring-green-500 outline-none"
                                placeholder="Enter email address"
                            />
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none text-gray-400">
                                <HiOutlineMail />
                            </div>

                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>
                </div>
            </Modal>
            {contextHolder}
        </>
    )
}

export default ForgotPassModal