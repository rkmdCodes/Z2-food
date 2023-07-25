import Image from 'next/image'
import Container from './home/page'
import { Modal } from './modal/page'
import Modal2 from './modal2/page'
import DataProvider from './context/page'
import "./globals.css";

export default function Home() {
  return (

    <main  className="flex min-h-screen flex-col items-center justify-between ">
      <div className="border-2 max-w-lg border-sky-500 z-0 w-full  items-center justify-between font-mono text-sm lg:flex mt-0 mb-0 ml-auto mr-auto">  
        <DataProvider>
           <Modal2/>
            <Container />
        </DataProvider>
       </div>
    </main>
  )
}
