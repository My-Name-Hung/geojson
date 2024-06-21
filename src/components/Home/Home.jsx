import React from 'react'
import {Button, ButtonGroup} from "@nextui-org/button";

function Home() {
  return (
    <section className='relative'>
      <div className='bg-bghome bg-cover bg-center h-screen w-full'>
        <div>
          <p className='uppercase absolute text-white text-3xl font-bold text-center justify-center bottom-[30rem] max-[430px]:top-[10rem] min-[640px]:pl-[2rem] min-[768px]:pl-[6rem] max-[768px]:bottom-[17rem] min-[768px]:text-shadow min-[820px]:pl-[6.5rem] max-[820px]:bottom-[20rem] lg:pl-[13.5rem] lg:top-[25rem] lg:text-4xl xl:pl-[20rem] xl:bottom-[12rem] xl:text-4xl 2xl:pl-[12.5rem] max-[1536px]:bottom-[20rem] 2xl:text-6xl'>Du lịch là sự gắn kết thiên nhiên <br /> <Button color="success" variant="solid"> <a className='font-medium' href='/travel'> Trải nghiệm </a> <p className='text-xl font-bold'>&#8594;</p> </Button></p>
        </div>
      </div>
    </section>
  )
}

export default Home