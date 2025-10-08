'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {useForm, SubmitHandler} from "react-hook-form";
import {toast} from "react-toastify";
import { useState } from "react";
import { authRequest } from "@/lib/auth";

import { SignProps, TypeUser } from "@/types/types";
import { useUser } from "./context/AuthContext";

type TypeSignUpFormValues = TypeUser & {
  confirmPassword: string;
}

export default function SignUp({ handleFormType}: SignProps) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<TypeSignUpFormValues>();
    const [checkbox, setCheckbox] = useState(false);
    const [issubmitting, setissubmitting] = useState(false);

    const {user, setUser} = useUser();
    
    const handleCheckboxChange = (value: boolean) => {
        setCheckbox(value);
    };

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    if (password && confirmPassword && password !== confirmPassword) {
        errors.confirmPassword = { type: "validate", message: "Passwords do not match." };
    } else {
        delete errors.confirmPassword;
    }

    const onSubmit: SubmitHandler<TypeUser> = async (data) => {
        setissubmitting(true);
        const res = await authRequest('register', data);
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
                Create your account
            </CardTitle>
            <CardDescription className="text-gray-600">
                Join our community and start blogging today
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-700">
                            First name
                        </Label>
                        <Input id="firstName" placeholder="John" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" {...register("firstName", {required:"Fist Name is required."})}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-700">
                            Last name
                        </Label>
                        <Input id="lastName" placeholder="Doe" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" {...register("lastName", {required:"Last name is required."})}/>
                    </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-gray-700">
                            Username
                        </Label>
                    <Input id="username" placeholder="jhon_doe" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" {...register("username", {required:"Email is required."})}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">
                            Email
                        </Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" {...register("email", {required:"Email is required."})}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-700">
                            Password
                        </Label>
                    <Input id="password" type="password" placeholder="Create a strong password" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" {...register("password", {required:"Password is required."})}/>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700">
                        Confirm password
                    </Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm your password" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" {...register("confirmPassword", {required:"Confirm password is required."})}/>
                    </div>
                </div>
    
                <div className="flex items-center  md:flex-row flex-col my-5">
                    <Checkbox id="terms" checked={checkbox} onCheckedChange={handleCheckboxChange} className="mb-4 md:mb-0 mr-0 md:mr-2"/>
                    <Label htmlFor="terms" className="text-sm text-gray-600 flex md:flex-row flex-col mx-auto md:mx-0">
                        I agree to the{" "}
                    <Link href="/terms" className="text-blue-500 hover:text-blue-600">
                        Terms of Service
                    </Link>{" "}
                        and{" "}
                    <Link href="/privacy" className="text-blue-500 hover:text-blue-600">
                        Privacy Policy
                    </Link>
                    </Label>
                </div>
    
                <Button type="submit" disabled={!checkbox && !issubmitting} className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-md py-3 mb-4">
                    Create account
                </Button>

                <div className="flex flex-col gap-2 items-center">
                    <p className="text-sm text-center text-gray-700/70">Already have an account?</p>
                    <span onClick={handleFormType} className="text-blue-500">SignIn</span>
                </div>

                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </form>

            </CardContent>
        </Card>
    )
}
