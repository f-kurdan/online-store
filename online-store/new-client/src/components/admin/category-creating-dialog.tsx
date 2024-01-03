import React, { useContext, useRef } from 'react'
import CancelButton from './cancel-button'
import SaveButton from './save-button'
import { HandlerContext, NameContext } from '@/contexts/Contexts'
import { useMutation, useQueryClient } from 'react-query'
import { useCreateCategory } from '../../hooks/useCreateCategory'

const CategoryCreatingDialog = ({ state, title }: { state: boolean, title: string }) => {
  const mutation = useCreateCategory()
  const nameInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (imageInputRef.current?.files && nameInputRef.current) {
      formData.append('categoryImage', imageInputRef.current?.files[0]);
      formData.append('name', nameInputRef.current?.value);
    }
    mutation.mutate(formData)
  }

  console.log(mutation)

  return (
    <dialog open={state} className='fixed top-1/4 transition-all duration-100 z-10 bg-white rounded-lg shadow-lg min-h-[350px] w-1/2' >
      <> {mutation.isLoading ? (
        <h1 className='text-center'>
          'Создание категории...'
        </h1>) :
        (
          <>
            {
              mutation.isSuccess ?
                (
                  <>
                  <h1 className='text-center'>
                    Категоря успешно создана!
                  </h1>
                  <div className={`flex gap-16 flex-col items-center justify-start p-5`}>
                    <div className='font-bold text-3xl text-center text-gray-600'>
                      {title}
                    </div>
                    <form action="#" method="POST" encType="multipart/form-data">
                      <label htmlFor="name">
                        <input aria-required ref={nameInputRef} type="text" id='name' placeholder='Введите название' className='bg-gray-100 rounded-lg h-14 w-11/12 p-4' />
                      </label>
                      <label htmlFor="categoryIamge">
                        <input aria-required type="file" ref={imageInputRef} name='categoryImage' id='categoryImage' />
                      </label>
                      <SaveButton onSubmit={onSubmit} />
                    </form>
                    <CancelButton />
                  </div>                  
                  </>
                  ) :
                (
                  <div className={`flex gap-16 flex-col items-center justify-start p-5`}>
                    <div className='font-bold text-3xl text-center text-gray-600'>
                      {title}
                    </div>
                    <form action="#" method="POST" encType="multipart/form-data">
                      <label htmlFor="name">
                        <input aria-required ref={nameInputRef} type="text" id='name' placeholder='Введите название' className='bg-gray-100 rounded-lg h-14 w-11/12 p-4' />
                      </label>
                      <label htmlFor="categoryIamge">
                        <input aria-required type="file" ref={imageInputRef} name='categoryImage' id='categoryImage' />
                      </label>
                      <SaveButton onSubmit={onSubmit} />
                    </form>
                    <CancelButton />
                  </div>
                )
            }
          </>
        )}
      </>
    </dialog>
  )
}

export default CategoryCreatingDialog