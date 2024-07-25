import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductInterface } from '../context/userContext';


const useProducts = (category: string) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products?category=${category}`);
        setProducts(response.data);
      } catch (error) {
        // setError('Error fetching products');
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  return { products };
};

export default useProducts;
