import React from 'react'

const FilterBar = () => {
    return (
        <>
            <div className='flex justify-between text-2xl mr-12 ml-12'>
                <div className='mt-10'>
                    <label className='ml-20 mt-10 '>Sort by: </label>
                    <select style={{ backgroundColor: '#f6f4f9' }} className='font-bold' >
                        <option value="Recommended">Recommended</option>
                        <option value="PriceLowToHigh">Price - Low to High</option>
                        <option value="PriceHighToLow">Price - High to Low</option>
                    </select>
                </div>

                <div className='mr-20 mt-10 '>Avg Fare: $225</div>
            </div>
        </>
    )
}

export default FilterBar