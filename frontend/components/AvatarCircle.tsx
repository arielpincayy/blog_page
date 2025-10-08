import { AuthContextType } from "@/types/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, Settings, User } from "lucide-react";

export default function AvatarCircle({user}:{user:AuthContextType}){
  return(
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-2 p-0 rounded-full">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={"#"} alt={user?.username || "User"} />
                    <AvatarFallback>
                        {user?.username ? user.username.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                    </AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {/* handle logout here */}}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}