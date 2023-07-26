import React from 'react'

const Outlet = () => {
  let name = "Brik Oven..";
  let distance = "4.7 km";
  let cuisine  = "Indian";
  let imgUrl = "/assets/dummyOutlet.jpg";
  return (
    
    <div className='flex flex-col gap-2'>
         <div >
             <img className = "rounded-lg" src={imgUrl}/>
         </div>
         <div>
              <div className='font-semibold text-base'>
                {name}
              </div>
              <div>
                 <div className='flex gap-1 text-[#A7A7A7]'>
                      <div>{distance}</div>
                      <div>·</div>
                      <div>{cuisine}</div>
                 </div>
              </div>
         </div>
         </div>
  )
}

export default Outlet