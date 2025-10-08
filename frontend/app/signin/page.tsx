'use client';

import { useState } from "react";
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SingIn";


export default function SignUpPage() {

  const [formtype, setFormtype] = useState<boolean>(true)

  function handleFormType(){
    setFormtype(!formtype);
  }

  return (
    <>
      {/* Sign Up Form */}
      <main className="container mx-auto px-6 py-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </div>
          </div>
          {formtype ? <SignIn handleFormType={handleFormType} />  : <SignUp handleFormType={handleFormType} />}
        </div>
      </main>
    </>
  )
}