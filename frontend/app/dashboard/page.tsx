'use client';

import { Button } from "@/components/ui/button"
import Link from "next/link";
import StatsCards from "@/components/StatsCards"
import AvatarCircle from "@/components/AvatarCircle";
import { LogOut, Plus } from "lucide-react"

import { useUser } from "@/components/context/AuthContext"
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { AuthContextType, PostType } from "@/types/types";
import { fetchUserPosts } from "@/lib/utils";

export default function Dashboard() {

    const {user, setUser} = useUser();
    const [posts, setPosts] = useState<PostType[]>();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);

    const handleLogOut =()=>{
        sessionStorage.removeItem('user_stored');
        setUser(undefined);
    }

    useEffect(()=>{
      if(user?.user_id){   
        fetchUserPosts(user?.user_id)
          .then(data=>setPosts(data))
          .catch(error=>setErr(error.message))
          .finally(()=>setLoading(false))
      };
      
    },[user])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8 flex md:flex-row flex-col justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome again!, {user?.username}</h2>
          <p className="text-gray-600">Manage your blogs and check their performance</p>
        </div>
        <div className="flex flex-row align-baseline gap-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            <Link href="/dashboard/newBlog">Create new blog</Link>
          </Button>
          <Button variant="outline" className="ml-2" onClick={handleLogOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
          </Button>
          <AvatarCircle user={user as AuthContextType}/>
        </div>
      </div>
      <StatsCards posts={posts as PostType[]} setPosts={setPosts as Dispatch<SetStateAction<PostType[]>>}/>
    </main>
  )
}
