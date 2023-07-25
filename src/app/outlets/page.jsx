import React , {useContext} from 'react';
import { DataContext } from '../context/page';

const Outlets = () => {
  
  const {outlets} = useContext(DataContext);
  console.log("outlets is = ",outlets)
  return (
    <div>
     <h1>{outlets.length} outlets find near you.</h1>
     {outlets?.map((outlet)=>{
     
      return (<>
      <p>{outlet.name}</p>
      <p>{outlet.cuisine}</p>
      </>
      )
     }
     )}
    </div>
  )
}

export default Outlets