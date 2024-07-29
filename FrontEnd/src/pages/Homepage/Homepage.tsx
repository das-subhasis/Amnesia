import Carousel from '../../components/Carousel';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import bottomwear from './bottomwear.jpg'
import topwear from './topwear.jpg'
import footwear from './footwear.jpg'

const Homepage = () => {


  return (
    <div className='h-full flex flex-col justify-center gap-16'>
      <Carousel
        slidesPerView={1}
        autoPlay={true}
      />
      <div className='w-full my-10 flex flex-col  items-center justify-center px-20 gap-10'>
        <h1 className='text-4xl'>Welcome to Amnesia</h1>
        <p className='text-center'>We offer a wide variety of <span className="text-[#3f51b5]">products</span>, ranging from clothing to footwear, including shirts, pants, dresses, <span className="text-[#3f51b5]">shoes</span>, boots, sandals, and more. Our products are designed to be <span className="text-[#3f51b5]">comfortable</span>, durable, and stylish. We use only the highest quality materials and construction methods to ensure that our products will last for years to come. From <span className="text-[#3f51b5]">casual wear</span> to formal attire, we have something for every occasion and every personal stuffs that you need.
</p>
      </div>
      <div className='w-full flex flex-col items-center justify-center gap-14'>
        <h2 className='text-4xl'>Product Categories</h2>
        <div className='flex flex-wrap items-center justify-center gap-6'>
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
    </div>
  )
}

export default Homepage