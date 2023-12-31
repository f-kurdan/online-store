import React from 'react'
import BannerImage from './banner-image'
import { syne } from '@/styles/fonts'

const Banner = () => {
  return (
    <div className='flex flex-col justify-between items-center relative bg-transparent rounded-3xl mt-4'>
      <div  className={`${syne.className} text-7xl`}>
        SmartShop
      </div>
      <div  className='text-2xl text-center'>
        магазин гаджетов
      </div>
      <BannerImage />
    </div>
  )
}

export default Banner