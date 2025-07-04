import React from 'react'
import Sidebar from '../components/Sidebar'
import FilterBar from '../components/FilterBar'
import ItemGrid from '../components/ItemGrid'
import AdPlacement from '../components/AdPlacement';

const Home = () => {
  return (
    <div className='bg-black box-border px-8 mb-5 flex-1 flex flex-col'>
      <div className='flex flex-row gap-8 flex-1'>
        <div className='flex-[1.2]'>
          <Sidebar />
        </div>
        <div className='flex-5 flex flex-col'>
          <FilterBar/>
          <ItemGrid />
          <AdPlacement/>
        </div>
        <div className='flex-[0.7] flex'>
          <AdPlacement/>
        </div>
      </div>
    </div>
  )
}

export default Home
