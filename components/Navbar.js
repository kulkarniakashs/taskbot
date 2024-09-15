import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
function Navbar() {
  return (
    <>
    <nav className='flex justify-between items-center bg-green-300 gap-6 px-8 py-5 m-0 sticky top-0 z-10' >
      <div>
        <Link href="/">
        <div className='flex items-center gap-3 text-3xl font-medium font-serif'>
        <Image src="/newLogo.png" height={50} width={50} alt="Logo"/>
        <div className='hidden sm:inline-block roboto-condensed '>TaskBot</div>
        </div>
        </Link>
      </div>
      <ul className='flex justify-between items-end gap-6 kanit-semibold'>
       <li> <Link href="/">Home</Link></li>
       <li> <Link href="/todo" >TodoList</Link></li>
       <li> <Link href="/chatbot">Chatbot</Link></li>
       <li> <Link href="/summarizer">Summarizer</Link></li>
      </ul>
    </nav>
    <div className='border'></div>
    </>
  )
}
export default Navbar


