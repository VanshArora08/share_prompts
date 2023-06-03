// import React from 'react'
"use client";
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


import Profile from "@components/Profile";

const ProfilePage = () => {
    const router=useRouter();
    const {data:session}=useSession();
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        
        const fetchPosts=async()=>{
            const res=await fetch(`/api/users/${session?.user.id}/posts`);
            const data=await res.json();
            // console.log(data);
            setPosts(data);
        }
        if (session?.user.id) fetchPosts();
    },[session?.user.id]);


    const handleEdit=(post)=>{
        router.push(`/update-prompt?id=${post._id}`)
    };


    const handleDelete = async(post)=>{
        const userConfirmed=confirm('Are you sure you want to delete this post?')
        if(userConfirmed){
            try{
                await fetch(`/api/prompt/${post._id.toString()}` , {
                    method:"DELETE"
                });
                const filteredPosts=posts.filter((p)=>p._id!==post._id)
                setPosts(filteredPosts)
            }catch(err){
                console.log(err);
            }
        }
    }
  return (
    <Profile
        name="My"
        desc="welcome to my profile"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    >  
    </Profile>
  )
}

export default ProfilePage
