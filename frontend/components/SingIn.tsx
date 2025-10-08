'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { authRequest } from "@/lib/auth";
import {toast} from "react-toastify";
import { TypeUser, SignProps } from "@/types/types";
import { useUser } from "./context/AuthContext";

export default function SignIn({handleFormType}: SignProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<TypeUser>();
  const [issubmitting, setissubmitting] = useState(false);

  const {user, setUser} = useUser();

  const onSubmit: SubmitHandler<TypeUser> = async (data) => {
    setissubmitting(true);
    const res = await authRequest('login', data);
    if (res.user) {
      sessionStorage.setItem('user_stored', JSON.stringify(res.user));
      setUser(res.user);
    }
    setissubmitting(false);

    if (res.ok) {
      toast.success(res.message);
      setTimeout(() => {
        window.location.href = '/';
      }, 1200);
    } else {
      toast.error(res.message);
    }
  }


  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Sign in to your account
        </CardTitle>
        <CardDescription className="text-gray-600">
          Welcome back! Please enter your credentials
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="john_doe"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                {...register("username", { required: "Username is required." })}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                {...register("password", { required: "Password is required." })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
          </div>

          <Button type="submit" disabled={issubmitting} className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-md py-3 mt-6 mb-4">
            {issubmitting?"Wait...":"Login"}
          </Button>
          <div className="flex flex-col gap-2 items-center">
              <p className="text-sm text-center text-gray-700/70">Don't you have an account?</p>
              <span onClick={handleFormType} className="text-blue-500">SignUp</span>
          </div>

        </form>
      </CardContent>
    </Card>
  );
}
