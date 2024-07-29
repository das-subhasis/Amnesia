import { useUserContext } from '../../context/userContext'


import WishListCard from '../../components/WishListCard';
import client from '../../config/client';

const WishList = () => {

  const { userState, userDispatch } = useUserContext();

  const removeHandler = async (_id: string) => {
    userDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { _id } });
    try {
      const response = await client.post(`/user/wishlist/remove`, { _id }, { headers: { Authorization: `Bearer ${userState.token}` } });
      if (response.status !== 200) throw new Error(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='px-20 py-10 w-full float-start justify-center'>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <div className='w-[60%]'>
          Wishlist
        </div>
        {
          userState.wishList.map((product) => {
            if (!product) { console.log(product); return; }

            return <WishListCard key={product._id} product={product} removeHandler={removeHandler} />
          })
        }
      </div>
    </div>
  )
}

export default WishList