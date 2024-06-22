import { useRef } from "react";
import { FiSearch } from "react-icons/fi";
const Search = ({getBlogs}) => {
    const searchRef=useRef('');
    const sortRef=useRef('latest');
    return (
        <div className='flex w-full justify-center gap-16 items-center'>
            <div className='relative w-[30%]'>
            <input type='text' className=' w-full rounded-full px-4' placeholder='search for a blog..' ref={searchRef} />
            <div className='absolute bottom-3 right-2 px-2 cursor-pointer' onClick={()=>{
                console.log(searchRef.current.value);
                getBlogs(`?searchTerm=${searchRef.current.value}&sortTerm=${sortRef.current.value}`)
            }}><FiSearch/></div>
            </div>
            <button onClick={()=>{
                searchRef.current.value='';
                getBlogs('');
            }}>Clear</button>
            <div>
            <label htmlFor='sort' className='font-medium text-xl'>Sort By : </label>
            <select name='sort' id='sort' className='px-2 py-2 outline-none font-medium text-lg' ref={sortRef} onChange={()=>{
                getBlogs(`?searchTerm=${searchRef.current.value}&sortTerm=${sortRef.current.value}`)
            }}>
                <option value='latest' className='font-medium'>Latest</option>
                <option value='trending' className='font-medium'>Trending</option>
                <option value='oldest' className='font-medium'>Oldest</option>
            </select>
            </div>
            
        </div>
    )
}

export default Search