import React, { useState } from 'react';
import useResponser from '../Hooks/useResponser';
import resetPasswordImage from "../assets/images/resetpassword.png";
import { MdOutlineLockOpen } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { RiLoaderFill } from 'react-icons/ri';
import { LuCheck } from 'react-icons/lu';
import { TbLockCheck, TbLockExclamation } from "react-icons/tb";
import { message } from 'antd';
import axios, { isAxiosError } from 'axios';
import { motion } from "framer-motion"
import logoImage from "../assets/images/logo2.png"

const ResetPasswordScreen = () => {
    const [messageApi, messageRender] = message.useMessage()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch, // to watch the values of password and confirmPassword
    } = useForm();
    const [loading, setLoading] = useState(false);
    const { isDesktopOrLaptop } = useResponser();

    // Watching the password field to compare it with confirmPassword
    const password = watch('password');

    const submidHandler = async (data) => {
        setLoading(true);
        const messageKey = "resetpasswordMessage"
        messageApi.open({
            type: "loading",
            content: "Please wait....",
            key: messageKey
        })
        try {
            const resetpassResponse = await axios.post(`${process.env.REACT_APP_API_URL}api/auth/resetpassword`, {
                token: "44b36bf7-7f11-4bde-a5f5-3b98f47ed535",
                newPassword: data.password
            })
            console.log(resetpassResponse)

            messageApi.open({
                key: messageKey,
                type: 'success',
                content: resetpassResponse.data.message,
                duration: 2,
            });

            reset({
                password: "",
                confirmPassword: ""
            })

        } catch (error) {
            let errorMessage = "Please check your internet connection!"
            if (isAxiosError(error)) {
                console.log(error)
                if (error.message !== "Network Error") {
                    errorMessage = error.response.data.message
                }
            }
            messageApi.open({
                key: messageKey,
                type: 'error',
                content: errorMessage,
                duration: 2,
            });
        } finally {
            setLoading(false)
        }

        console.log(data);
    }

    return (
        <div className='w-full min-h-screen bg-gray-100 relative flex items-center justify-center'>

            <div className={`${isDesktopOrLaptop ? "top-[10%] left-[35%]" : "top-[5%] left-[5%]"} w-[200px] h-[200px] bg-yellow-400 rounded-full blur-3xl fixed`} />
            <div className='w-[200px] h-[200px] bg-green-400 rounded-full blur-3xl fixed top-[50%] left-[55%]' />

            <div className='z-30 relative  '>
                <motion.div
                    initial={{
                        y: -60,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    transition={{
                        delay: .3,
                        duration: .7
                    }}

                    className='w-[300px] h-[300px] mx-auto -z-10'>
                    <img src={resetPasswordImage} width={"100%"} alt="" className='-z-10' />
                </motion.div>
                <motion.div
                    initial={{
                        scale: .6,
                        opacity: 0,
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1
                    }}
                    transition={{

                        duration: .6
                    }}
                    className='min-w-[300px] mx-auto -mt-16 sm:min-w-[400px] min-h-[300px] bg-white z-20   border rounded-xl'>
                    <div className='pt-10 pb-8 px-8 space-y-3'>
                        <div>
                            <img width={150} src={logoImage} alt="" />
                        </div>
                        <p className='text-lg font-bold text-gray-500 flex items-center gap-2'>
                            <MdOutlineLockOpen />
                            Reset Password
                        </p>
                        <div>
                            <form onSubmit={handleSubmit(submidHandler)} className='space-y-5'>
                                <div>
                                    <div className="relative">
                                        <input
                                            {...register("password", {
                                                required: "Password is required!",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters long."
                                                }
                                            })}
                                            disabled={loading}
                                            type="password"
                                            className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:ring-1 focus:ring-green-500 outline-none"
                                            placeholder="Password"
                                        />
                                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none text-gray-400">
                                            <TbLockExclamation />
                                        </div>
                                    </div>
                                    {/* Error Message */}
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                    )}
                                </div>
                                <div>
                                    <div className="relative">
                                        <input
                                            {...register("confirmPassword", {
                                                required: "Confirm password is required!",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters long."
                                                },
                                                validate: value =>
                                                    value === password || "Passwords do not match"
                                            })}
                                            disabled={loading}
                                            type="password"
                                            className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:ring-1 focus:ring-green-500 outline-none"
                                            placeholder="Confirm Password"
                                        />
                                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none text-gray-400">
                                            <TbLockCheck />
                                        </div>
                                    </div>
                                    {/* Error Message */}
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                                    )}
                                </div>
                                <div>
                                    <button disabled={loading} type="submit" className="py-2 px-4  w-full flex items-center justify-center gap-x-2 text-center font-medium rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:bg-green-600 disabled:opacity-50 disabled:pointer-events-none">
                                        {
                                            loading ? <><span><RiLoaderFill className='animate-spin' /></span><span>Loading...</span></> :
                                                <> <p>Reset Password</p><span><LuCheck /></span> </>
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>

            {messageRender}
        </div>
    )
}

export default ResetPasswordScreen;
