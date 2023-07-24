import Image from 'next/image'
import Container from './home/page'


export default function Home() {
  return (
    <main className=" flex min-h-screen flex-col items-center justify-between ">
      <div className="border-2 max-w-lg border-sky-500 z-10 w-full  items-center justify-between font-mono text-sm lg:flex mt-0 mb-0 ml-auto mr-auto">  
      <Container className="" />
      </div>
    </main>
  )
}
