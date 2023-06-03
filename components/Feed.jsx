"use client";

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard";

const PromptCardList=({data,handleTagClick})=>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post)=>(
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

export default function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange=(e)=>{
    setSearchText(e.target.value);
  }

  useEffect(()=>{
    const fetchPosts=async()=>{
      const res=await fetch("/api/prompt");
      const data=await res.json();
      // console.log(data);
      setPosts(data);
    }
    fetchPosts();
  },[])

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-senter">
        <input type="text"
          placeholder="Search for a tag/prompt/username"
          value={searchText} onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={()=>{}}
      ></PromptCardList>
    </section>
  )
}
