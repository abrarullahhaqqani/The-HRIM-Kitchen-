import React from 'react'
import { Header } from '../components';

//for method 1 
// export const Main = () => {
//   return (
//     <div>main</div>
//   )
// }
//for method 2
const Main = () => {
  return <main className="w-screen min-h-screen flex items-center justify-center flex-col bg-primary " > 
    <Header/> 

    
  </main>
  
}
export default Main;