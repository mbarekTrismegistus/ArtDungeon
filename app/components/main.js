import React from 'react'
import ArtCard from './card'
import { Button } from '@nextui-org/react'
import { ArrowDownCircle, ArrowDownCircleFill } from 'react-bootstrap-icons'

export default function Main() {
  return (
    <div>
      <div className='flex flex-col items-center h-[100vh] justify-center relative mb-5'>
        <div className='absolute top-[-500px] heroGradient rounded-full dark:opacity-25 opacity-[0.3]'></div>
        <div className='absolute top-0 z-10 h-[50vh] w-full bg-gradient-to-b from-slate-100 to-transparent dark:from-zinc-950'></div>
        <div className='z-20 text-center'>
          <div>
            <p className='tracking-tight inline font-semibold from-slate-950 to-slate-600 dark:from-slate-100 dark:to-slate-400 text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b'>
              Welcome&nbsp;
            </p>
            <h1 className='tracking-tight inline font-semibold from-slate-950 to-slate-600 dark:from-slate-100 dark:to-slate-400 text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b'>
              To&nbsp;
            </h1>
          </div>
          <div>
            <p className='tracking-tight inline font-semibold from-teal-400 to-teal-500 text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b'>
              Art&nbsp;
            </p>
            <h1 className='tracking-tight inline font-semibold from-teal-400 to-teal-500 text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b'>
              Dungeon&nbsp;
            </h1>
          </div>
          <div className='my-4 w-[50vw] text-center'>
            <h2 className='text-3xl text-slate-900 dark:text-slate-400'>
              A place to share what your hands did, and to be proud of it
            </h2>
          </div>
          <div className='my-4 w-[50vw] text-center'>
            <h2 className='dark:text-slate-400 text-slate-900 font-thin'>
              This is merely another random space in the wired world, A place for artists to share their art and thoughts with other fellow artist :)
            </h2>
          </div>
          <div className='flex gap-4 pt-5 justify-center'>
            <Button color='primary' size='lg' variant='shadow' radius='full' endContent={<ArrowDownCircle size={25}/>}>Explore</Button>
            <Button color='primary' size='lg' variant='bordered' radius='full'>Add Art</Button>
          </div>
        </div>
        <div className='absolute bottom-0 z-10 h-[50vh] w-full bg-gradient-to-t from-slate-100 to-transparent dark:from-zinc-950'>
          <span className='white absolute bottom-0 h-[1px] w-full bg-gradient-to-r from-zinc-800 from-10% via-teal-400 via-20% to-zinc-900 to-40% opacity-75'></span>
        </div>
      </div>
      <div className='container mx-auto'>
        <h1 className='text-5xl font-bold py-[70px] text-center '>Explore Latest Art</h1>
        <div className='flex flex-wrap gap-7 '>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
        </div>
      </div>
    </div>
  )
}
