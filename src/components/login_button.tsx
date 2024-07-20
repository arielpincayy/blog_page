import { auth, GoogleAuthProvider, signInWithPopup } from "@/lib/firebase_config";
import { Button } from "./ui/button";
import { signOut } from "firebase/auth";
export default function Login({isUploading, toggleUploading}:{isUploading:boolean, toggleUploading:(isUploading:boolean)=>void}){

  const handleGoogleLogin = async () => {
    toggleUploading(isUploading);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
    toggleUploading(!isUploading);
  };

  const handleGoogleSignOut = async () =>{
    toggleUploading(isUploading);
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out with Google: ", error);
    }
    toggleUploading(!isUploading);
  }

  return (
    <div className="flex flex-col gap-2">
      <Button className="mx-auto" onClick={handleGoogleLogin}>Sign in with Google</Button>
      <Button className="mx-auto bg-red-500" onClick={handleGoogleSignOut}>Sign out</Button>
    </div>
  );
};