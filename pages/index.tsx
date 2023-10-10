import { Heading } from "@chakra-ui/react";
import PageContentLayout from "../Components/Layout/PageContent";
import Navbar from "@/Components/Dashboard";
import Login from "@/Components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import {useSession} from "next-auth/react"


export default function Home() {
  const { data: session } = useSession();

  if(!session){
    return <Login/>
  }

  return (

    <Navbar/>
  
 
   
    
  )
}
