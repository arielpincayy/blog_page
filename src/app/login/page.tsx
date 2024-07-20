'use client';

import Loading_page from "@/components/loading_page";
import Login from "@/components/login_button";
import { useState } from "react";

function Login_buttons({isUploading, setIsUploading}:{isUploading:boolean, setIsUploading:(isUploading:boolean)=>void}){

    function toggleUploading(isUploading:boolean){
        setIsUploading(!isUploading);
    }

    return(
        <div className="mx-auto max-w-md space-y-6 px-4 sm:px-0 mt-8">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold sm:text-4xl">Login</h1>
                <p className="text-muted-foreground">Login with your account to get started.</p>
            </div>
            <Login isUploading={isUploading} toggleUploading={toggleUploading}/>
        </div>
    )
}

export default function Component() {
    const [isUploading, setIsUploading] = useState<boolean>(false);

    return (
        <>
        {isUploading? <Loading_page title="Logining" subtitle="Please wait while you are being logged."/>:<Login_buttons isUploading={isUploading} setIsUploading={setIsUploading}/>}
        </>
    )
}