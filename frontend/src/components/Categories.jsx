import React from 'react'

const Categories = ({catList}) => {
    return (
        <div className='flex gap-2'>
        {catList.map((elem,index)=>{
            return <div key={index} className='category-box'>
                {elem}
            </div>
        })}
        </div>
    )
}

export default Categories