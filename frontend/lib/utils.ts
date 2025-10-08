import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BlogSectionType, ContentType, HeaderContentType } from "@/types/types";

// Base API URL loaded from environment variable
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const blogSectionOptions: { label: string; value: BlogSectionType }[] = [
  { label: "Subtitle", value: "subtitle" },
  { label: "Text", value: "text" },
  { label: "Code", value: "code" },
  { label: "Latex", value: "latex" },
  { label: "Image", value: "image" },
  { label: "PDF", value: "pdf" },
];

export const Status = {
  PUBLISHED:"PUBLISHED",
  DRAFT:"DRAFT",
  WAITING:"WAITING",
  REFUSED:"REFUSED"
} as const;

export const randomID =()=> Date.now().toString(36) + Math.random().toString(36).substring(2, 10);

export async function fetchUserPosts(user_id: number) {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/blog/users/${user_id}/posts`);

  if (!res.ok) {
    const errData = await res.json().catch(() => ({
      error: "Unknown error",
      details: "No details provided"
    }));

    const message = `${errData.error || "Error"}: ${errData.details || "No details"}`;
    throw new Error(message);
  }

  return res.json();
}


type BlogType = {
  header:HeaderContentType,
  content:ContentType[]
};

export function convertToMDX(content:ContentType[]){

  const body: string[] = [];
  var url;
  for (const section of content) {
    const typeContent = section.typeContent;
    const value = section.content ?? "";
    if (typeContent === "image") {
      url = URL.createObjectURL(value as File);
      body.push(`![imagen](${url})`);
    } else if (typeContent === "pdf") {
      url = URL.createObjectURL(value as File);
      body.push(`<PDF src="${url}" />`);
    } else if (typeContent === "subtitle") {
      body.push(`## ${value}`);
    } else if (typeContent === "text") {
      body.push(value as string);
    } else if (typeContent === "code") {
      body.push(`\`\`\`py\n${value}\n\`\`\``);
    } else if (typeContent === "latex") {
      body.push(`$$\n${value}\n$$`);
    } else {
      body.push("");
    }
  }

  const mdxContent = body.join("\n\n");
  return mdxContent;
}
