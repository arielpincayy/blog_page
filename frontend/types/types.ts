import { Status } from "@/lib/utils";

export type TypeUser = {
  firstName:string,
  lastName:string,
  username:string,
  email:string,
  password:string
}

export type SignProps = {
    handleFormType: () => void;
};

export type AuthContextType = {
  username:string,
  user_id:number,
  token:string
}

export type BlogSectionType = "subtitle" | "text" | "latex" | "image" | "pdf" | "code";
export type StatusType = "DRAFT" | "WAITING" | "PUBLISHED" | "REFUSED";
export type StatusValue = (typeof Status)[StatusType];

export type HeaderContentType = {
  title:string,
  keywords:string[]
}

export type ContentType = {
  typeContent:BlogSectionType,
  content:string | File,
  id:string
}

export type PostType = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  status: string;
  url:string;
  tags: string[];
};
