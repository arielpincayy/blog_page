'use client';
import { useEffect, useState } from "react";
import CardPosts from "@/components/card_post";

type Post = {
  user_id: string;
  blog_id: number;
  title: string;
  date: string;
  key_words: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL_DB}/blogsTitles`)
    .then((response) => response.json())
    .then((data: Post[]) => {
      setPosts(data);
    });
  }, []);

  return (
    <section className="flex flex-wrap gap-6 p-4 md:p-6">
      {
        posts.map((post,i)=>{
          return(
            <CardPosts key={i} image="/pluma-bg.jpg" title={post.title} blog_id={post.blog_id} uid={post.user_id}/>
          )
        })
      }
    </section>
  )
}