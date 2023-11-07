import Image from 'next/image'
import React, { useState, ChangeEvent } from 'react'
import NoItems from './no-items'
import { productsList } from '@/types'
import Filter from './filters/filter'
import FilterService  from '@/services/firter.service'
import Link from 'next/link'

// type tuple = {
//   [key:string] : string[]
// }

const ProductsList = ({ products, categoryId }: { products: productsList, categoryId?: string }) => {
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  const handleCharacteristicsChange = (e: ChangeEvent<HTMLInputElement>) => {
   FilterService.handleChange(e, setSelectedCharacteristics, selectedCharacteristics)
  }

  const handleBrandsChange = (e: ChangeEvent<HTMLInputElement>) => {
    FilterService.handleChange(e, setSelectedBrands, selectedBrands)
  }

  const handleCategoriesChange = (e: ChangeEvent<HTMLInputElement>) => {
    FilterService.handleChange(e, setSelectedCategories, selectedCategories)
  }

  // products = FilterService.filterProducts(products);
  
  if (selectedCategories.length > 0) {
    products = products.filter(product => selectedCategories.includes(product.category_id.toString()))
  }

  if (selectedBrands.length > 0) {
    products = products.filter(product => selectedBrands.includes(product.brand_id.toString()))
  }

  if (selectedCharacteristics.length > 0) {
    for (let i = 0; i < selectedCharacteristics.length; i++) {     
      products = products.filter(prod => prod.characteristics.some(char => selectedCharacteristics[i] === char.value))
    }
  }

  return (
    <div className='flex flex-row justify-center h-max gap-4 items-start my-3'>
      <Filter categoryId={categoryId}
        handleCharacteristicsChange={handleCharacteristicsChange}
        handleBrandsChange={handleBrandsChange}
        handleCategoriesChange={handleCategoriesChange} />
      {products?.length ? (
        <div className='flex flex-row flex-wrap justify-start items-center gap-4 w-2/3 min-h-fit mr-10'>
          {products.map((product) =>
          (<div key={product.id} className='flex flex-col  w-60  justify-center items-center p-5 bg-slate-50  rounded-xl shadow-lg shadow-black/30 '>
            <Link href={`/products/${product.id}`}>
              <p className='text-sm font-semibold hover:text-blue-600 active:text-lime-400 hover:cursor-pointer'>{product.name}</p>
              </Link>
            <Image className='max-w-48 max-h-48' src={product.photo} alt={product.name} width={160} height={160} />              
          </div>)
          )}
        </div>
      ) : (<NoItems />)}
    </div>
  )
}

export default ProductsList