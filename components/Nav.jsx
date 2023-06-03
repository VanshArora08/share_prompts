"use client"; 
import Link from "next/link"
import Image from "next/image"
import {useState,useEffect} from 'react'
import { signIn,signOut,useSession,getProviders} from 'next-auth/react' 


export default function Nav() {
  const {data:session}=useSession();
  const [provider, setProvider] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);
  useEffect(()=>{
    const setUpProvider=async()=>{
      const response=await getProviders()
      setProvider(response);
    }
    setUpProvider();
  },[])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href='/' className="flex gap-2 flex-center">
        <Image src='/assets/images/logo.svg' alt='promptopia' width={30} height={30} className="object-contain"/>
        <p className="logo_text">Promptopia</p>

      </Link>
      <div className="sm:flex hidden">
        {session?.user?(
          <div className="flex gap-3 md:gap-5">
            <Link href='/create-prompt'
            className="black_btn">Create prompt</Link>
            <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ):(
          <>
          {provider && Object.values(provider).map((provider)=>(
            <button type="button" key={provider.name}onClick={()=>signIn(provider.id)} className="black_btn">Sign In</button>
          ))}
          </>
        )}
      </div>
      <div className="sm:hidden flex relative">
        {session?.user?(
          <div>

            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={()=>{settoggleDropdown((prev)=>!prev)}}
            />
            {toggleDropdown && (
            <div className="dropdown">
              <Link
                href='/profile'
                className="dropdown_link"
                onClick={()=>{settoggleDropdown(false)}}  
              >
                My Profile
              </Link>
              <Link
                href='/create-prompt'
                className="dropdown_link"
                onClick={()=>{settoggleDropdown(false)}}  
              >
                Create Prompt
              </Link>
              <button type="button" onClick={()=>{
                settoggleDropdown(false)
                signOut()
              }} className="mt-5 w-full black_btn">Sign out</button>
            </div>
          )}
          </div>
        ):(
          <>
          {provider && Object.values(provider).map((provider)=>(
            <button type="button" key={provider.name}onClick={()=>signIn(provider.id)} className="black_btn">Sign In</button>
          ))}
          </>
        )}

      </div>
    </nav>
  )
}
