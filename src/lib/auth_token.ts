import { auth } from "./firebase_config";
import { type UserInfo, ErrorMessage } from "./types";

export default function authToken(): Promise<UserInfo>{
    return new Promise((resolve,reject)=>{auth.onAuthStateChanged(async(user) => {
        if (user) {
            await user.getIdToken().then(async(token) => {
                await fetch('http://127.0.0.1:5000/session', {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'name':user.displayName,
                        'email':user.email
                    })
                })
                .then(response => response.json())
                .then((data:UserInfo) => resolve(data))
                .catch((error:ErrorMessage) => {
                    console.error('Error:', error);
                    reject(error);
                });
            });
        }
    })})
}