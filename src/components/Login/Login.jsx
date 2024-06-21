import React from 'react'
import './login.css'
import { FaCheckCircle } from "react-icons/fa";
import icon from '../../assets/logoNew2.png'

// IMPORT components
import { SignIn } from "@clerk/clerk-react";


function Login() {
  return (
    <section className="body relative w-full h-screen xl:h-full 2xl:h-screen min-[540px]:h-full min-[280px]:h-full min-[375px]:h-full min-[360px]:h-screen min-[412px]:h-screen min-[820px]:h-screen min-[768px]:h-screen lg:h-full">
    {/* LOGO */}
    <div className='logo flex absolute pb-2 sm:pt-4 sm:pl-[7rem] md:pt-4 md:pl-[12rem] lg:pt-4 lg:pl-[18rem] xl:pt-[5rem] xl:pl-[6rem] xl:pr-[5rem] 2xl:pt-[6rem] 2xl:pl-[6rem] 2xl:pr-[8rem]'>
      <img src={icon} className="w-28 h-28" /> 
      <p className='font-bold text-[4rem] pl-2 text-white'>CGT</p>
    </div>
    {/* CONTENT */}
    <div className='max-[430px]:hidden max-[640px]:hidden absolute sm:hidden md:hidden lg:hidden xl:block xl:pt-[5rem] xl:pl-[5rem] xl:pr-[5rem] 2xl:pt-[7rem] 2xl:pl-[5rem] 2xl:pr-[20rem]'>
      <div className='flex pl-[2.5rem] pt-[7rem] text-white '>
        <FaCheckCircle className='text-white mt-[0.3rem] size-6'/>
        <span className='pl-[1rem] text-2xl font-bold'>Linh hoạt</span>
      </div>
      {/* CONTENT CHILD */}
      <p className='pl-[5rem] text-white justify-evenly text-lg pr-[33rem] font-[500px] break-keep'>Cung cấp thông tin cần thiết cho chuyến đi, xây dựng lộ trình du lịch cho riêng bạn</p>
      
      <div className='flex pl-[2.5rem] pt-[1rem] text-white'>
        <FaCheckCircle className='text-white mt-[0.3rem] size-6'/>
        <span className='pl-[1rem] text-2xl font-bold'>Tối ưu</span>
      </div>
      {/* CONTENT CHILD */}
      <p className='pl-[5rem] text-white justify-evenly text-lg pr-[33rem] font-[500px] break-keep'>Cải thiện tốc độ truy cập, tăng khả năng tương tác, cung cấp thông tin hữu ích phù hợp cho chuyến du lịch của bạn </p>

      <div className='flex pl-[2.5rem] pt-[1rem] text-white'>
        <FaCheckCircle className='text-white mt-[0.3rem] size-6'/>
        <span className='pl-[1rem] text-2xl font-bold'>Trải nghiệm</span>
      </div>
      {/* CONTENT CHILD */}
      <p className='pl-[5rem] text-white justify-evenly text-lg pr-[33rem] font-[500px] break-keep'>Trải nghiệm văn hóa và ẩm thực Việt Nam, tìm hiểu những phong tục tập quán thú vị ở nhiều nơi khác nhau</p>

    </div>

    
    {/* FORM SIGNUP */}
    <div className='pt-[7rem] xl:pt-[6rem] sm:pb-6 sm:pl-24 sm:pr-0 pl-1.5 min-[430px]:pl-4 min-[540px]:pl-10 pr-0  md:pb-8 md:pl-[12rem] md:pr-0  lg:pb-8 lg:pl-[18rem] lg:pr-0  xl:pb-8 xl:pl-[45rem] xl:pr-0 2xl:pl-[50rem] 2xl:pr-0'>
      <SignIn />
    </div>
  </section>
  )
}

export default Login