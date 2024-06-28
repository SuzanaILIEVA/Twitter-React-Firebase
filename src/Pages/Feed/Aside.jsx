import React from 'react';
import { FiSearch } from 'react-icons/fi';

import NewsCard from './NewsCard';
import { newsArr } from './news';



const Aside = () => {
  return (
    <div className="max-xl:hidden overflow-auto">
      <div className='flex relative p-5 px-14 '>
        <div className='flex '>
          <input className='bg-black outline-none p-1 rounded-e-md ' type="text" placeholder='Search Twitter' />
         <span className='flex absolute left-6 bottom-5 bg-gray-800 p-2 rounded-l-md'> <FiSearch/></span>
        </div>
      </div>

      <div className='flex flex-col gap-4 p-4 '>
         <h1 className='text-xl'>News for you</h1>
      </div>
      <div>
        {newsArr.map((news)=> <div key={news.id}> <NewsCard news={news} /> </div>)}
      </div>
    </div>
  )
}

export default React.memo (Aside);

/**
 ** React.memo:Bilesenin aldigi proplar degismedigi surece bilesenin tekrardan
 * render olmasinin onune gecer
 * 
 * *burda: bir ust bilesen olan feed bileseninde user state'inin degismesi
 * Feed bileseninin tekrardan render olmasina ardindan aside bilesenininde tekrardan
 * gereksiz yere render olmasina sebep oluyordu React.memo ile bunun onune gectik .
 * 
 */