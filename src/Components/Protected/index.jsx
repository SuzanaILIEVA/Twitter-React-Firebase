import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../../firebase'

const Protected = () => {
    const [isAuth , setIsAuth] = useState()
   

    useEffect(()=>{
        // kullanicinin oturumunu izler ve oturumda bir degisiklik oldugunda
        //call back function'u tetikler
        onAuthStateChanged(auth , (user)=>{
            setIsAuth(user ? true : false)
        })
    },[])

    // kullanicinin yetkisi yoksa login page'e yonlendir
    if(isAuth === false){
      return  <Navigate to="/" replace/>
    }

// console.log(isAuth);

    // eger yetkisi varsa alt Route'taki elementi goster
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default Protected
