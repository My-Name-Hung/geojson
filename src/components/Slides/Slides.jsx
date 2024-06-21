import React from 'react'

function Slides() {
  return (
    <div>
      <div className='pt-[4rem] pb-[13rem] xl:pb-[5rem] 2xl:pb-[3rem] md:pb-[5rem]'>
        <h1 className='text-2xl p-[0_3rem] xl:text-4xl 2xl:text-4xl text-black font-bold text-center justify-center'>Khám phá Cần Giờ cùng chúng tôi!</h1>
        <span className='pt-[1rem] p-[0_2rem] xl:pl-[10rem] xl:pr-[10rem] 2xl:pl-[15rem] 2xl:pr-[15rem] absolute text-center justify-center break-keep'>Khám phá những điều kỳ diệu của thiên nhiên với vẻ đẹp của văn hóa truyền thống Cần Giờ từ hướng dẫn của chúng tôi đến những địa điểm tham quan thú vị. Bắt đầu lên kế hoạch cho chuyến phiêu lưu của bạn ngay hôm nay và hưởng thụ chúng</span>
      </div>
      <div className="bg-white dark:bg-gray-800 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <div className="grid grid-cols gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8"> 
                  <a href="/travel"
                       className="group relative flex h-[26rem] items-end overflow-hidden rounded-lg bg-gray-100 shadow-xl md:h-80">
                      <img src="https://ik.imagekit.io/tvlk/blog/2022/03/khu-du-lich-vam-sat-3-1024x536.jpg?tr=dpr-2,w-675" loading="lazy" alt="Cần Giờ" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                      <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                      </div>

                      <span className="relative ml-4 mb-3 inline-block text-xl text-white md:ml-5 md:text-lg">Không gian xanh</span>
                  </a>
                

                  
                  <a href="/travel"
                      className="group relative flex h-[26rem] items-end overflow-hidden rounded-lg bg-gray-100 shadow-xl md:col-span-2 md:h-80">
                      <img src="https://ktmt.vnmediacdn.com/images/2022/10/24/30-1666598225-can-gio.jpg" loading="lazy" alt="Phú Yên" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                      <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                      </div>

                      <span className="relative ml-4 mb-3 inline-block text-xl text-white md:ml-5 md:text-lg">Khu du lịch sinh thái Vàm Sát</span>
                  </a>
                

                  
                  <a href="/travel"
                      className="group relative flex h-[26rem] items-end overflow-hidden rounded-lg bg-gray-100 shadow-xl md:col-span-2 md:h-80">
                      <img src="https://danviet.mediacdn.vn/296231569849192448/2023/4/13/photo-1681346478682-16813464793951402345575.jpg" loading="lazy" alt="Đà Nẵng" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                      <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                      </div>

                      <span className="relative ml-4 mb-3 inline-block text-xl text-white md:ml-5 md:text-lg">Bãi biển 30/4</span>
                  </a>
                
                  
                  <a href="/travel"
                      className="group relative flex h-[26rem] items-end overflow-hidden rounded-lg bg-gray-100 shadow-xltr md:h-80">
                      <img src="https://gaohouse.vn/wp-content/uploads/2023/07/khu-du-lich-sinh-thai-dan-xay-1_1d57d536561148758ca2718299f4d931_grande.jpg" loading="lazy" alt="Đà Lạt" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                      <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                      </div>

                      <span className="relative ml-4 mb-3 inline-block text-xl text-white md:ml-5 md:text-lg">Khu du lịch sinh thái Dần Xây</span>
                  </a>
                
              </div>
          </div>
      </div>
    </div>
  )
}

export default Slides