import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../context/Context'
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

  const { showSearchBar, setSearchInput } = useContext(Context);
  const [search, setSearch] = useState(''); 
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const getSerchInput = async () => {
    setSearchInput(search);
  }

  useEffect(() => {
    if (location.pathname === '/products') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location])

  return visible && showSearchBar ? (
    <div className='flex justify-center items-center h-[10vh] pt-5 px-[10%]'>
      <input onChange={(e)=> setSearch(e.target.value)} value={search} className='border outline-none rounded-full w-full text-sm sm:text-base px-2 sm:px-3 py-[6px] sm:py-3' type="text" placeholder='Search new products' />
      <button onClick={getSerchInput} className='border outline-none rounded-full text-sm sm:text-base px-2 sm:px-6 py-[6px] sm:py-3 hover:bg-blue-400 hover:text-white transition-all duration-100'>Search</button>
    </div>
  ) : null
}

export default SearchBar
