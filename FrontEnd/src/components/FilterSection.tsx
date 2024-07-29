import React from 'react'
import { ProductInterface, useUserContext } from '../context/userContext'

interface FilterInterface {
  products: ProductInterface[];
  setFilter: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterSection: React.FC<FilterInterface> = ({ products, setFilter }) => {
  const { productDispatch } = useUserContext();
  return (
    <div className={`w-fit h-fit flex flex-col items-center justify-center absolute top-12 right-0 rounded-md ring-1 ring-black bg-white`}>
      <div className='px-3 py-1.5'>
        <button
          onClick={() => {
            productDispatch({ type: "SORT_BY_PRICE", payload: products });
            setFilter(false);
          }}
        >
          <p className='text-xs'>Sort By Price</p>
        </button>
      </div>
    </div>
  )
}

export default FilterSection