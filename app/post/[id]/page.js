import React, { Suspense } from 'react'
import Art from '@/app/components/post'

export default function page() {


  return (
    <div className='mt-[80px]'>
        <Suspense fallback="loading.b..">
            <Art/>
        </Suspense>
    </div>
  )
}