import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/authContext'
import Carousel from '../../components/Carousel';
import image from './image.jpg'
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import bottomwear from './bottomwear.jpg'
import topwear from './topwear.jpg'
import footwear from './footwear.jpg'
import { topPicks } from '../../utils/constants';
import Card from '../../components/Card';

const Homepage = () => {

  const { userState } = useUserContext();
  const [count, setCount] = useState(0);

  console.log(userState);


  return (
    <div className='h-full flex flex-col justify-center gap-10'>
      <Carousel
        slidesPerView={1}
        autoPlay={true}
      />
      <div className='w-full flex flex-col items-center justify-center gap-14'>
        <h2 className='text-4xl'>Product Categories</h2>
        <div className='flex items-center justify-center gap-6'>
          <div className='w-[400px] h-[300px] flex flex-col '>
            <div className='h-[85%]'>
              <Link to={'/products/categories/topwear'}>
                <img src={topwear} alt="image" className='w-full h-full object-cover rounded-lg hover:shadow-2xl' />
              </Link>
            </div>
            <div className='w-full h-[15%] font-medium flex items-center justify-center text-lg'>Topwear</div>
          </div>
          <div className='w-[400px] h-[300px] flex flex-col '>
            <div className='h-[85%]'>
              <Link to={'/products/categories/bottomwear'}>
                <img src={bottomwear} alt="image" className='w-full h-full object-cover rounded-lg hover:shadow-2xl' />
              </Link>
            </div>
            <div className='w-full h-[15%] font-medium flex items-center justify-center text-lg'>Bottomwear</div>
          </div>
          <div className='w-[400px] h-[300px] flex flex-col '>
            <div className='h-[85%]'>
              <Link to={'/products/categories/footwear'}>
                <img src={footwear} alt="image" className='w-full h-full object-cover rounded-lg hover:shadow-2xl' />
              </Link>
            </div>
            <div className='w-full h-[15%] font-medium flex items-center justify-center text-lg'>Footwear</div>
          </div>
        </div>
      </div>
      {/* <div className='w-full flex flex-col items-center justify-center gap-14'>
        <h2 className='text-4xl'>Our Top Picks</h2>
        <div className='flex items-center justify-center gap-6'>
          {
            topPicks.map(p => <Card product={p} Handler={() => ''}/>)
          }
        </div>
      </div> */}
    </div>
  )
}

export default Homepage