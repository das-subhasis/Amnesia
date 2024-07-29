import { useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { ProductInterface, useUserContext } from '../../context/userContext';
import client from '../../config/client';
import Skeletons from '../../components/ProductSkeletons';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const { userState, userDispatch, loading, setLoading } = useUserContext();
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuantity(parseInt(e.target.value));
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await client.get(`/products/id/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [id]);

  const addTocart = async (product: string, quantity: number) => {
    try {
      const response = await client.post('/user/cart', { _id: product, quantity: quantity }, { headers: { Authorization: `Bearer ${userState.token}` } });
      if (response.status === 200) {
        userDispatch({ type: 'SET_CART', payload: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='flex-1 flex px-20 py-20 justify-center w-full gap-10'>
      {
        loading ? <Skeletons/> : <div className='bg-white w-[250px] h-[300px] rounded-xl flex items-center justify-center'>
        <img src="https://shema-backend.vercel.app/public/men/images-1661721639781.jpg" className='w-[100%] h-[100%] object-contain hover:scale-105 transition-all duration-150 ease-in' />
      </div>
      }
      <div className='w-3/12 flex flex-col gap-5'>
        <p className='text-4xl font-medium'>{product?.name}</p>
        <p>{product?.description}</p>
        <div className='flex items-center gap-10'>
          <select className="w-[50px] h-[30px] ring-black ring-2 rounded-md outline-none font-bold px-2" value={selectedQuantity} onChange={changeHandler}>
            {Array.from({ length: 10 }).map((_, idx) => (
              <option key={idx} value={idx + 1}>{idx + 1}</option>
            ))}
          </select>
          <button className='bg-emerald-500 px-3 py-2 rounded-md font-medium' onClick={() => addTocart(product!._id, selectedQuantity)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
