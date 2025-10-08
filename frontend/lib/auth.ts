import { TypeUser, AuthContextType } from "@/types/types";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function authRequest(route: string, data: TypeUser): Promise<{ ok: boolean; message: string, user?:AuthContextType }> {
  try {
    let send_data;
    if (route === "register") {
      send_data = {
        name: data.firstName,
        last_name: data.lastName,
        username: data.username,
        email: data.email,
        password_hash: data.password,
      };
    } else {
      send_data = {
        username: data.username,
        password_hash: data.password,
      };
    }

    const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send_data),
    });

    const res_json = await res.json();

    return {
      ok: res.ok,
      message: res.ok ? res_json.message : res_json.error,
      user:{
        username:data.username,
        user_id:res_json.user_id,
        token:res_json.access_token,
      }
    };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      message: "Unexpected error",
    };
  }
}
