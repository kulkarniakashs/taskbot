import React from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

function page() {
  return (
    <div>
      <Navbar/>
      <div className='flex justify-center items-center min-h-[50vh] w-full flex-col gap-5'>
      <div><h1>Page Not Found</h1></div>

      <div><Link href='/'>
      <button className='min-h-5 bg-blue-500 hover:bg-blue-700 hover:scale-125 text-white font-bold rounded-2xl p-2'>Back to Home</button></Link>
      </div>
      </div>
    </div>
  )
}

export default page
