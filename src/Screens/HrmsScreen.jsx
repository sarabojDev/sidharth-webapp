import React from 'react'
import logoImage from "../assets/images/logo2.png"
import { Avatar, Badge, Button } from 'antd'
import { FaRegBell } from "react-icons/fa6";


const HrmsScreen = () => {
    return (
        <div className='w-full min-h-screen bg-slate-100 pb-6'>

            <nav class="bg-white fixed w-full z-20 top-0 start-0 ">
                <div class=" md:w-11/12 flex flex-wrap items-center justify-between mx-auto py-3.5">
                    <div className='flex items-center gap-4'>
                        <div>
                            <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                                <img src={logoImage} class="h-5" alt="Flowbite Logo" />
                            </a>
                        </div>

                        <div>
                            sdfasdfasd fasdf
                        </div>

                    </div>

                    <div className='flex items-center gap-5'>
                        <div>
                            <Badge count={56}>
                                <Button size='large' icon={<FaRegBell size={20} />} className='text-gray-600' />
                            </Badge>
                        </div>
                        <div>
                            <Avatar size={"large"} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTNjkaQHLXfokbl1GiKnXl6v7GNgnG8rb3JA&s'} />
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default HrmsScreen