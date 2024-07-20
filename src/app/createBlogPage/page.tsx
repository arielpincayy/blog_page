'use client';

import BlogPage from "@/components/blogpage_article"
import Loading_page from "@/components/loading_page";
import NoRegister from "@/components/no_register";
import authToken from "@/lib/auth_token";
import { useEffect, useState, JSX, SVGProps } from "react";
import { type UserInfo } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function createBlogPage(){
    const [isUploading, setIsUploading] = useState(false);
    const [user_data, setUserData] = useState<UserInfo|null>(null)

    function toggleUploading(isUploading:boolean){
        setIsUploading(!isUploading);
    }
    
    useEffect(()=>{
        authToken().then((data:UserInfo)=> {setUserData(data)})
    },[])

    return(
        <div className="min-h-screen w-full absolute top-20 md:top-1/4">
            <div className="grid w-full px-8 gap-4">
                {
                user_data!=null?
                !isUploading? <BlogPage user_data={user_data} isUploading={isUploading} toggleUploading={toggleUploading}/>: <Loading_page title="Uploading Post" subtitle="Please wait while your post is being uploaded."/>
                :<NoRegister/>
                }
            </div>
            <footer className="bg-[#1e1e1e] dark:bg-[#1e1e1e] py-8 md:py-12">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:gap-12 lg:max-w-7xl">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <Link href="#" className="flex items-center gap-2" prefetch={false}>
                <MountainIcon className="h-6 w-6 fill-[#f1f1f1]" />
                <span className="text-lg font-bold text-[#f1f1f1]">Blog</span>
              </Link>
              <nav className="flex flex-col items-center gap-2 md:items-start">
                <Link href="#" className="text-sm hover:underline text-[#f1f1f1]" prefetch={false}>
                  About
                </Link>
                <Link href="#" className="text-sm hover:underline text-[#f1f1f1]" prefetch={false}>
                  Contact
                </Link>
                <Link href="#" className="text-sm hover:underline text-[#f1f1f1]" prefetch={false}>
                  Privacy Policy
                </Link>
              </nav>
            </div>
            <div className="flex flex-col items-center gap-4 md:items-start">
              <h4 className="text-lg font-bold text-[#f1f1f1]">Recent Posts</h4>
              <nav className="flex flex-col items-center gap-2 md:items-start">
                <Link href="#" className="text-sm hover:underline text-[#f1f1f1]" prefetch={false}>
                  The Future of Web Development
                </Link>
                <Link href="#" className="text-sm hover:underline text-[#f1f1f1]" prefetch={false}>
                  Mastering React Hooks
                </Link>
                <Link href="#" className="text-sm hover:underline text-[#f1f1f1]" prefetch={false}>
                  Serverless Architectures Explained
                </Link>
              </nav>
            </div>
            <div className="flex flex-col items-center gap-4 md:items-start">
              <h4 className="text-lg font-bold text-[#f1f1f1]">Subscribe</h4>
              <form className="flex w-full max-w-md flex-col gap-2">
                <Input type="email" placeholder="Enter your email" className="w-full bg-[#2c2c2c] text-[#f1f1f1]" />
                <Button type="submit" className="w-full bg-[#2c2c2c] text-[#f1f1f1]">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t pt-4 text-center text-sm text-[#f1f1f1] md:mt-12">
            &copy; 2024 Blog. All rights reserved.
          </div>
        </footer>
        </div>
    )
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }