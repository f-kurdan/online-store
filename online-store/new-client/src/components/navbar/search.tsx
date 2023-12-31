import React, { useRef, useState } from 'react' 
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import useProducts from '@/hooks/useProducts'
import { montserrat } from '@/styles/fonts'
import { useDebouncedCallback } from 'use-debounce'
import Link from 'next/link'

function onlyUnique(value: string, index: number, array: string[]) {
    return array.indexOf(value) === index;
}

const Search = () => {
    const [query, setQuery] = useState('')
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathName = usePathname()
    const { replace } = useRouter()

    const inputRef = useRef<HTMLInputElement>(null)

    const { data } = useProducts({query: query})

    const [searchOptions, setSearchOptions] = useState<string[]>()

    const placeholder = 'Введите название товара'

    const handleChange = useDebouncedCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        // if (value) {
        //     let products = data?.products.filter(product => product.name.toLowerCase().includes(value.toLowerCase()))

        //     let options: string[] | undefined = []
        //     options = products?.map(p => p.name)
        //         .filter(onlyUnique)
        //         .slice(0, 10)

        //     setSearchOptions(!!options?.length ? options : [`По запросу ${value} ичего не найдено`])
        // }
        // else setSearchOptions([])
    }, 500)

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (inputRef.current?.value) {
                params.set('query', inputRef.current?.value)
            } else {
                params.delete('query')
            }

            replace(`${pathName}?${params.toString()}`)
        }
    }

    const onIconClick = () => {
        if (inputRef.current?.value) {
            params.set('query', inputRef.current?.value)
        } else {
            params.delete('query')
        }

        replace(`${pathName}?${params.toString()}`)
    }

    // const onOptionClick = (slug: string) => {
    //     if (value) {
    //         params.set('query', value)
    //     } else {
    //         params.delete('query')
    //     }

    //     replace(`${pathName}?${params.toString()}`)
    // }

    return (
        <div className={`${montserrat.className} group relative flex w-3/5 flex-shrink-0 `}>
            <input
                className="peer active:outline bg-gray-100 focus:outline-cyan-200 w-full block rounded-xl py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={handleChange}
                ref={inputRef}
                onKeyDown={handleSearch}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <MagnifyingGlassIcon onClick={onIconClick} className="absolute cursor-pointer left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <div className='bg-white w-fit absolute top-full px-3 rounded-md shadow-md hidden group-focus-within:block hover:block'>
                {!!data?.products?.length && data?.products?.map((option, index) =>
                (
                    <Link href={`/products/${option.slug}`} key={index}>
                    <div  className='cursor-pointer text-sm p-2 my-2 hover:bg-gradient-to-br hover:text-white hover:from-indigo-500 hover:via-sky-600 hover:to-blue-700 block active:from-purple-950 active:via-red-700 active:to-yellow-600 rounded-md ' >{option.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Search