import React from 'react'


function Maps() {
  return (
    <div className="p-[1rem_0.5rem] ">
     <sl-carousel autoplay loop pagination >
      <sl-carousel-item>
        <img
          alt="Biology"
          src="https://52hz.vn/wp-content/uploads/2022/09/dao-khi-can-gio-52hz.jpg"
        />
        <h1 className='pb-[2rem] text-gray-500'>Đảo khỉ</h1>
      </sl-carousel-item>
      <sl-carousel-item>
        <img
          alt="Nature"
          src="https://vcdn1-dulich.vnecdn.net/2023/11/08/DJI0209-1699437506-5640-1699438966.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=SHzepfNLcu877rOlbIwlGg"
        />
        <h1 className='pb-[2rem] text-gray-500'>Cảnh quan</h1>
      </sl-carousel-item>
      <sl-carousel-item>
        <img
          alt="Culture"
          src="https://svhtt.hochiminhcity.gov.vn/documents/10184/349032/no+6.jpg/0401ded4-7fee-4808-a495-a22eb61e8ef2?t=1663320300963"
        />
        <h1 className='pb-[2rem] text-gray-500'>Lễ hội</h1>
      </sl-carousel-item>
      <sl-carousel-item>
        <img
          alt="Cuisine"
          src="https://wiki-travel.com.vn/Uploads/Picture/camnhi-211423101404-du-lich-can-gio-co-quan-nao-ngon.jpg"
        />
        <h1 className='pb-[2rem] text-gray-500'>Ẩm thực</h1>
      </sl-carousel-item>
      <sl-carousel-item>
        <img
          alt="Doi Nghe in Can Gio"
          src="https://www.rungngapmancangio.org/public/upload/2021/05/27/b951f84222b161ffaad284e712c81208.jpg"
        />
        <h1 className='pb-[2rem] text-gray-500'>Đầm dơi</h1>
      </sl-carousel-item>
    </sl-carousel>

    </div>
  )
}

export default Maps