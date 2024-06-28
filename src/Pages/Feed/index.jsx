
import Main from "./Main"
import Aside from "./Aside"
import Nav from "./Nav"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase"
const Feed = () => {
    const [user, setUser] = useState()
    useEffect(()=>{
      const unsub =  onAuthStateChanged(auth, (user_data)=>{
            // console.log(user_data);
            setUser(user_data)
        })

        // componentWillUnMount tetiklendiginde yani kullanici sayfadan ayrildihinda 
       // aboneligi sonlandiriyoruz
       return ()=> unsub()
    },[])
  return (
    <div className="feed h-screen bg-black text-white overflow-hidden">
     <Nav user={user}/>
     <Main user={user}/>
     <Aside/>
    </div>
  )
}

export default Feed
