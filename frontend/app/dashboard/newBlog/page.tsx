'use client';

import RedactBlog from "@/components/RedactBlog"
import { blogSectionOptions, randomID } from "@/lib/utils";
import { BlogSectionType, ContentType, HeaderContentType } from "@/types/types";
import { UploadZIP } from "@/lib/render";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import MDXRender_draft from "@/components/MDXRender_draft";

export default function NewBlog(){
    const defaultValue:BlogSectionType = blogSectionOptions[1].value;
    // Title, keywords and all contents states
    const [headerContent, setHeaderContent] = useState<HeaderContentType>(
        {
            title:"",
            keywords:[]
        }
    );
    const [content, setContent] = useState<ContentType[]>(
        [{
            typeContent:defaultValue,
            content:"",
            id:randomID()
        }]
    );

    const [inzip, setInzip] = useState(true);
    const [render, setRender] = useState(true);

    const handleZIP=async(e:ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(!file) return;
        await UploadZIP(file, setHeaderContent, setContent);
        setInzip(false);
    }

    return(
        <>
        {render?
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="w-full text-center">
                <div className={clsx("fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center text-white flex-col gap-4", { "hidden": !inzip })}>
                    <Input type="file" accept="zip" onChange={e => handleZIP(e)} className="w-1/4"/>
                    <div className="flex flex-col gap-2">
                        <Button onClick={()=>setInzip(false)} className="bg-green-600">Start from zero</Button>
                        <Button className="hover:bg-white hover:text-black" asChild>
                            <Link href='/'>Home</Link>
                        </Button>
                    </div>
                </div>
                <h1 className="text-5xl font-bold mb-3">Start writing your blog</h1>
                <h2>
                    If you don't know how to start I recommend you read{" "}
                    <span className="text-blue-600 underline hover:text-blue-800">
                        <Link href="/">Get Started</Link>
                    </span>
                </h2>
            </div>
            <RedactBlog headerContent={headerContent} setHeaderContent={setHeaderContent} content={content} setContent={setContent}/>
        </main>:
        <MDXRender_draft header={headerContent} content={content}/>
        }
        <div className="flex justify-center mb-10">
            <Button onClick={()=>setRender(!render)}>{render?"Render":"Edit"}</Button>
        </div>
    </>
    );
}