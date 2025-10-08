'use client';

import React, { useState, useEffect, createContext, useContext } from "react";
import { AuthContextType } from "@/types/types";

export const UserContext = createContext<{user:AuthContextType | undefined, setUser:(user:AuthContextType|undefined)=>void}>({user:undefined, setUser: ()=>{}});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthContextType|undefined>(undefined);

    useEffect(()=>{
        const user_stored_raw = sessionStorage.getItem('user_stored');
        if(user_stored_raw){
            const user_stored:AuthContextType = JSON.parse(user_stored_raw);
            setUser(user_stored);
        }
    },[])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser=()=>useContext(UserContext);

