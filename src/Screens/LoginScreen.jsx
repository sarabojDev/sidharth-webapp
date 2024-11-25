import { Checkbox, Divider, message } from 'antd';
import React, { useState } from 'react'
import { LuLogIn, LuKeyRound } from "react-icons/lu";
import { CiShare1 } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { RiLoaderFill } from "react-icons/ri";
import useResponser from '../Hooks/useResponser';
import bannerImage from '../assets/images/bannerimage.png'
import ForgotPassModal from './components/ForgotPassModal';
import { useForm } from "react-hook-form"
import axios, { isAxiosError } from 'axios';
import { motion } from 'framer-motion'
import logoImage from "../assets/images/logo2.png"

const LoginScreen = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async (data) => {
        const url = `${process.env.REACT_APP_API_URL}api/auth/login`

        const key = 'loginFormMessage';

        setLoading(true)
        messageApi.open({
            key,
            type: 'loading',
            content: 'Please wait...',
            duration: 2
        });


        try {
            const loginresponse = await axios.post(url, data);
            console.log(loginresponse)
            messageApi.open({
                key,
                type: 'success',
                content: "Login Success!",
                duration: 2,
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
                duration: 2,
            });
            console.log(error, "EE")
        } finally {
            setLoading(false)
        }

    }

    const showPassowordHandler = (e) => {
        setShowPassword(e.target.checked)
    }
    const { isDesktopOrLaptop } = useResponser()
    const [showForgotPassModal, setForgotPassModal] = useState(false)

    return (
        <>

            <div className='w-full min-h-screen bg-gray-100 relative overflow-x-hidden'>
                <div className={`${isDesktopOrLaptop ? "top-[30%] left-[25%]" : "top-[5%] left-[5%]"} w-[200px] h-[200px] bg-yellow-400 rounded-full blur-3xl fixed   `}></div>
                <div className='w-[300px] h-[300px] bg-green-400 rounded-full blur-3xl fixed  top-[50%] left-[55%]'></div>
                <div className={`${isDesktopOrLaptop ? "w-11/12 mx-auto min-h-screen flex items-center justify-between" : "w-11/12 mx-auto min-h-screen flex items-center justify-center"}`}>
                    {isDesktopOrLaptop && <div className='z-30 text-center flex items-center flex-col gap-3 flex-1'>
                        <div>
                            <img width={150} src="https://sidharthhousing-app.firebaseapp.com/vendors/images/Sidharth-Logo-Final.png" alt="" />
                        </div>
                        <motion.h1
                            initial={{
                                y: 35,
                                opacity: 0
                            }}
                            animate={{
                                y: 0,
                                opacity: 1
                            }}
                            transition={{
                                duration: .6
                            }}
                            className='text-3xl text-slate-800 font-bold'>
                            Revolutionize Your Team’s Success with Our CRM Solutions
                        </motion.h1>
                        <motion.p
                            initial={{
                                y: 35,
                                opacity: 0
                            }}
                            animate={{
                                y: 0,
                                opacity: 1
                            }}
                            transition={{
                                delay: .5,
                                duration: .6
                            }}
                            className='text-lg text-slate-600'>
                            Elevate your business by empowering your team with tools that streamline communication and improve customer engagement effortlessly.
                        </motion.p>
                        <motion.div
                            initial={{
                                scale: .6,
                                opacity: 0
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1
                            }}
                            transition={{
                                delay: .3,
                                duration: .6
                            }}
                        >
                            <img width={300} src={bannerImage} alt="" />
                        </motion.div>
                    </div>}

                    <motion.div
                        initial={{ x: isDesktopOrLaptop ? 180 : 12, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            delay: .3,
                            duration: isDesktopOrLaptop ? .7 : .4,
                            ease: "easeIn",
                        }}
                        className='w-[400px] min-h-[600px] bg-white z-30 rounded-xl border px-6 py-12 space-y-6'>
                        <div>
                            <img width={150} src={logoImage} alt="" />
                        </div>
                        <div>
                            <h2 className='text-xl text-gray-700'>Welcome back!</h2>
                            <p className='text-sm text-gray-600'>Enter your credentials to access your account</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 mx-auto">

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
                                {/* Error Message */}
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>

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
                                        type={showPassword ? "text" : "password"}
                                        className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:ring-1 focus:ring-green-500 outline-none"
                                        placeholder="Enter password"
                                    />
                                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none text-gray-400">
                                        <LuKeyRound />
                                    </div>
                                </div>
                                {/* Error Message */}
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            <div>
                                <Checkbox checked={showPassword} onChange={showPassowordHandler}>Show Password</Checkbox>
                            </div>

                            <div>
                                <button disabled={loading} type="submit" className="py-2 px-4  w-full flex items-center justify-center gap-x-2  text-center font-medium rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:bg-green-600 disabled:opacity-50 disabled:pointer-events-none">
                                    {
                                        loading ? <>
                                            <span>
                                                <RiLoaderFill className='animate-spin' />
                                            </span>
                                            <span>Loading...</span>
                                        </> : <>
                                            <p>Login</p>
                                            <span>
                                                <LuLogIn />
                                            </span>
                                        </>
                                    }
                                </button>
                            </div>


                            <div>
                                <button type='button' onClick={() => setForgotPassModal(true)} className='text-blue-600 text-sm w-full text-center hover:underline'>
                                    Forgot Password?
                                </button>
                            </div>
                        </form>

                        <Divider variant='solid'>
                            <span className='text-xs text-gray-500'>or</span>
                        </Divider>
                        <div>
                            <button type="button" className="py-2 w-full justify-center px-4  flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-600 hover:border-green-600 hover:text-green-600 focus:outline-none focus:border-green-600 focus:text-green-600 disabled:opacity-50 disabled:pointer-events-none     ">
                                Register Now
                                <CiShare1 />
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
            <ForgotPassModal isModalOpen={showForgotPassModal} setIsModalOpen={setForgotPassModal} />
            {contextHolder}
        </>
    )
}

export default LoginScreen