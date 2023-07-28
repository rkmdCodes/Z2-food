import Image from 'next/image'
import Container from './home/page'
import Modal from './modal/page'
import DataProvider from './context/page'
import "./globals.css";

export default function Home() {
  return (

    <main  className="flex min-h-screen flex-col items-center justify-between ">
      <div className="max-w-lg  z-0 w-full  items-center justify-between font-mono text-sm lg:flex mt-0 mb-0 ml-auto mr-auto">  
        <DataProvider>
           <Modal/>
            <Container />
        </DataProvider>
       </div>
    </main>
  )
}
