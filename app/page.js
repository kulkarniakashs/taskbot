import Navbar from '@/components/Navbar'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
function page() {
  return (
    <div className=''>
      <Navbar />
      <div className="hero-section py-20 px-4 text-black flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-5xl font-bold mb-4">Boost Your Productivity with TaskBot</h1>
        <p className="text-xl mb-6">Manage tasks, summarize notes, and get instant help with our powerful chatbot.</p>
        <Link href="/todo" className="text-white bg-blue-700 px-5 py-2 rounded-xl text-lg font-semibold hover:bg-black hover:scale-110 transition duration-300">
          Get Started
        </Link>
      </div>


      <div className='banner flex sm:h-max-[50vh] justify-around sm:flex-row items-center flex-col  py-5 '>
      <div className='max-w-[80vw] sm:max-w-[45vw] ele'>
      <Image src="/todoImg-removebg-preview.png" width={300} height={300} alt="Picture of the author" />
      </div>
      <div className='text-xl sm:max-w-[45vw] max-w-[80vw] flex flex-col gap-2 items-start'>
      <h2 className="text-2xl font-bold">To-Do List</h2>
      <p>Organize your tasks efficiently and stay on top of your deadlines with a simple and intuitive to-do list.</p>
      <Link className="bg-blue-700 px-6 py-2 my-2 rounded-2xl text-lg font-semibold hover:bg-black hover:scale-110 transition duration-300 text-white" href="/todo">Manage Task</Link>  
      </div>
    </div>

    <div className='banner flex sm:h-max-[50vh] justify-around items-center flex-col-reverse  py-5 sm:flex-row bg-gray-100'>
      <div className='text-xl sm:max-w-[45vw] max-w-[80vw] flex flex-col items-start gap-2'>
      <h2 className="text-2xl font-bold">GyanGuru</h2>
      <p>Need study help? Chat with our AI-powered assistant for instant answers and resources.</p>
          <Link className="bg-blue-700 px-6 py-2 my-2 rounded-2xl text-lg font-semibold hover:bg-black hover:scale-110 transition duration-300 text-white" href="/gyanguru">Chat with GyanGuru</Link>  
      </div>
      <div className='max-w-[80vw] sm:max-w-[45vw] ele' >
        <Image src="/image-removebg-preview.png" width={350} height={350} alt="Picture of the chatbot" />
      </div>
    </div>

    <div className='banner flex sm:h-max-[50vh] justify-around sm:flex-row items-center flex-col  py-5 '>
      <div className='max-w-[80vw] sm:max-w-[45vw] ele'>
      <Image src="/6895824-removebg-preview.png" width={350} height={350} alt="Picture of the author" />
      </div>
      <div className='text-xl sm:max-w-[45vw] max-w-[80vw] flex flex-col gap-2 items-start'>
      <h2 className="text-2xl font-bold">Summarizer</h2>
      <p>Summarize lengthy notes or articles in seconds, saving you valuable time.</p>
      <Link className="bg-blue-700 px-6 py-2 my-2 rounded-2xl text-lg font-semibold hover:bg-black hover:scale-110 transition duration-300 text-white" href="/summarizer">Summarize Your Notes</Link>  
      </div>
    </div>

    </div>
  )
}

export default page
