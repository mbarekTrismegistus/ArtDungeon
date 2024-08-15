import React from 'react'
import FormArt from '@/app/components/Form'
import { Stars } from 'react-bootstrap-icons'
import { getSession } from '../libs/session'

export default async function AddArt() {

  const session = await getSession()

  return (
    <div className='relative container mx-auto flex'>
      <div className='absolute top-[-900px] heroGradient rounded-full dark:opacity-25 opacity-[0.3]'></div>
      <div className='mt-[100px] grow z-10'>
        <div className='flex gap-4 items-center'>
          <h1 className='text-3xl font-bold mt-5 mb-[20px]'>Add Your Art!</h1>
          <Stars size={30}/>
        </div>
          <FormArt session={session}/>
      </div>
    </div>
  )
}
