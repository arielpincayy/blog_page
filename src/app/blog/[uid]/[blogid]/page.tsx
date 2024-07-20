"use client";
import { useEffect, useState } from "react";
import { type AreaType, SelType } from "@/lib/types";
import RenderingBlog from "@/components/render_blog";

type Body = {
    content: string|string[],
    pos:number,
    type:SelType
}[];

export default function Component({params}:{params:{uid:string, blogid:number}}){
    
    const [blogData, setBlogData] = useState<{title:string,body:AreaType}|null>(null);
    const [additionalData, setAdditionalData] = useState<{date:string,keywords:string[]}>();

    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_URL_DB}/blog/${params.blogid}/${params.uid}`)
        .then((res)=>res.json())
        .then((data)=>{
            const title = data.header.title;
            const date = data.header.date;
            const keywords = data.header.keywords;
            const b:Body = data.body;
            
            const body:AreaType = {};
            b.map(e=>{
                body[e.pos]={
                    'father':(e.pos)-1,
                    'cont':{
                        'sel':e.type,
                        'content':e.content
                    }
                }
            })
            
            setBlogData({'title':title, 'body':body});
            setAdditionalData({'date':date,'keywords':keywords})
            
        })
        .catch((err)=>{
            console.error(err);
        })
    },[])

    return(
        <>
        {blogData && additionalData && <RenderingBlog initialContent={blogData} date={additionalData.date} keywords={additionalData.keywords}/>}
        </>
    )
}