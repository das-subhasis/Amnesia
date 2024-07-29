import { useUserContext } from '../../context/userContext';
import CartListCard from '../../components/CartListCard';
import client from '../../config/client';

const Cart = () => {
    const { userState, userDispatch } = useUserContext();

    const removeHandler = async (_id: string) => {
        userDispatch({ type: 'REMOVE_FROM_CART', payload: { _id } });
        try {
            const response = await client.post(`/user/cart/remove`, { _id }, { headers: { Authorization: `Bearer ${userState.token}` } });
            if (response.status !== 200) throw new Error(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const updateCart = async (_id: string, quantity: number) => {
        if (!userState._id) return
        try {
            const response = await client.post('/user/cart', { _id, quantity }, { headers: { Authorization: `Bearer ${userState.token}` } });
            if (response.status === 200) {
                console.log(response.data);
                userDispatch({ type: 'SET_CART', payload: response.data });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='md:px-20 py-10 w-full '>
            <div className='flex flex-col gap-5 justify-center items-center'>
                <div className='w-[80%] md:w-[60%]'>
                    Orders
                </div>
                {
                    userState.cart.map((item) => {
                        if (!item) return;
                        const product = item.product;
                        return <CartListCard
                            key={product._id}
                            product={product}
                            removeHandler={removeHandler}
                            quantity={item.quantity}
                            updateCart={updateCart} />
                    })
                }
            </div>
        </div>
    )
}

export default Cart