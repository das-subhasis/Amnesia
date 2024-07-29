import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Authentication/Login'
import Signup from './pages/Authentication/Signup'
import Homepage from './pages/Homepage/Homepage'
import Navbar from './components/Navbar'
import Products from './pages/Products/Products'
import Protected from './routes/Protected'
import Profile from './pages/Profile/Profile'
import WishList from './pages/WishList/WishList'
import Cart from './pages/Cart/Cart'
import ProductDetails from './pages/Products/ProductDetails'

export const App = () => {
  return (
    <>
      <div className='min-h-screen h-full flex flex-col font-fira'>
        <Navbar />
        <Routes>
          <Route path='/' Component={Homepage} />
          <Route path='/productItem' Component={Products} />
          <Route path='/wishlist' element={<Protected><WishList /></Protected>} />
          <Route path='/cart' element={<Protected><Cart /></Protected>} />
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={Signup} />
          <Route path='/products' Component={Products} />
          <Route path='/products/item/:id' Component={ProductDetails} />
          <Route path='/user-profile' element={<Protected><Profile /></Protected>} />
          <Route path='/products/categories/:id' Component={Products} />
          <Route path='/user-profile' element={<Protected><Profile /></Protected>} />
        </Routes>
      </div>
    </>
  )
}

export default App
