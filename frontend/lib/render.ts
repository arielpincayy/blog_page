import { ContentType, HeaderContentType, PostType } from "@/types/types";
import JSZip from "jszip";
import { Dispatch, SetStateAction } from "react";
import { Status } from "./utils";

// Base API URL loaded from environment variable
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

// Uploads a single asset (image or PDF) and replaces the file content with its URL after upload
async function uploadAsset(blogTitle: string, number: string, content: ContentType) {
  const file = content.content as File;
  const type = content.typeContent;

  const formData = new FormData();
  formData.append("blog_name", blogTitle);
  formData.append("number", number);
  formData.append(type, file); // Field name corresponds to type: "image" or "pdf"

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/upload/${type}`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user_stored") as string).token}`
    }
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`${err.error}:${err.details}`);
  }

  // Save the uploaded asset URL into the content field
  const result = await response.json();
  content.content = result.url;
}

// Sends blog metadata (title and tags) to the backend to create a new post record
async function PostInfoBlog(header: HeaderContentType, url:string) {
  const body = {
    title: header.title,
    tags: header.keywords.map(k=>k.trim()),
    status:Status.WAITING,
    url:url
  }

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/blog/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user_stored") as string).token}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`${err.error}:${err.details}`);
  }
}

// Uploads JSON to the server
async function UploadJson(content: ContentType[], header: HeaderContentType){
  const blog_name = header.title;
  const fileName = blog_name.replace(/\s+/g, "-").toLowerCase() + ".json";

  const jsonBlob = new Blob(
    [JSON.stringify({ header, content }, null, 2)],
    { type: "application/json" }
  );

  const jsonFile = new File([jsonBlob], fileName, { type: "application/json" });

  const formData = new FormData();
  formData.append("blog_name", blog_name);
  formData.append("json", jsonFile);

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/upload/json`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user_stored") as string).token}`
    }
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`${err.error}:${err.details}`);
  }

  return response.json();
}

// Create JSON file and its URL for download
export async function CreateJsonBLog(content: ContentType[], header: HeaderContentType) {
  const zip = new JSZip();
  const blogName = header.title.replace(/\s+/g, "_").toLowerCase();

  // 1. Agregar el JSON al zip
  const jsonBlob = new Blob([JSON.stringify({ header, content }, null, 2)], {
    type: "application/json",
  });
  zip.file(`${blogName}.json`, jsonBlob);

  // 2. Agregar imágenes y PDFs al zip
  let counter = 1;
  let fileTxt = "";
  for (const section of content) {
    if (
      (section.typeContent === "image" || section.typeContent === "pdf") &&
      section.content instanceof File
    ) {
      const ext = section.content.name.split(".").pop() || section.typeContent;
      const filename = `${section.typeContent}_${counter}.${ext}`;
      fileTxt += `${filename}\n`;
      zip.file(filename, section.content);
      counter++;
    }
  }
  zip.file("file_list_text.txt", fileTxt);

  // 3. Generar el zip y retornar su URL
  const zipBlob = await zip.generateAsync({ type: "blob" });
  return URL.createObjectURL(zipBlob);
}


// Master function that uploads all assets, the MDX file, and registers the blog post
export async function uploadBlog(content: ContentType[], header: HeaderContentType) {
  try {
    let i = 1;
    for (const e of content) {
      if (e.typeContent === "image" || e.typeContent === "pdf") {
        await uploadAsset(header.title, i.toString(), e);
        i++;
      }
    }

    const response = await UploadJson(content, header);  // Upload JSON with header and content
    await PostInfoBlog(header, response.url);          // Register blog post in database
  } catch (err) {
    console.error(err); // Capture and show any error in the whole process
  }
}

// Read zip files
export async function UploadZIP(file: File, setHeader:Dispatch<SetStateAction<HeaderContentType>>, setContent:Dispatch<SetStateAction<ContentType[]>>){
  const zip = await JSZip.loadAsync(file);

  // Read .json
  const jsonFile = Object.keys(zip.files).find(name => name.endsWith(".json"));
  if (!jsonFile) throw new Error("JSON file not found");

  const jsonText = await zip.file(jsonFile)!.async("string");
  const { header, content }: { header: HeaderContentType, content: ContentType[] } = JSON.parse(jsonText);

  // Read file_list_text.txt
  const fileListRaw = await zip.file("file_list_text.txt")?.async("string");
  
  if (fileListRaw){
    const filenames = fileListRaw.trim().split("\n");
  
    // Name each file with its name
    let fileIndex = 0;
    for (const section of content) {
      if (section.typeContent === "image" || section.typeContent === "pdf") {
        const filename = filenames[fileIndex++];
        const blob = await zip.file(filename)!.async("blob");
        const file = new File([blob], filename, { type: blob.type });
        section.content = file;
      }
    }
  }

  setHeader(header);
  setContent(content);
}


// Remove Blog
export async function removeBlog(id: number, setPosts:Dispatch<SetStateAction<PostType[]>>) {
  const stored = sessionStorage.getItem("user_stored");
  if (!stored) throw new Error("No user in session");

  const user = JSON.parse(stored);
  
  if (!user.token) throw new Error("No token found in user object");

  const res = await fetch(`${NEXT_PUBLIC_API_URL}/blog/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || `Failed to delete blog (status ${res.status})`);
  }

  setPosts(prev=>prev.filter(post=>post.id!==id));

}
