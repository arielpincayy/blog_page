"use client";

// Only for visualize drafts and waiting blogs
import { useEffect, useState } from "react";
import { useUser } from "@/components/context/AuthContext";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "@/components/MDXComponents";
import { useParams } from "next/navigation";
import matter from "gray-matter";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import BlogHeader from "@/components/BlogHeader";

type PostData = {
  title: string;
  url: string;
};

export default function BlogPost() {
  const { user } = useUser();
  const { id } = useParams();
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult>();
  const [error, setError] = useState("");
  const [fron, setFron] = useState<Record<string, unknown>>();

  useEffect(() => {
    if (!user?.token) return;

    // Getting post data
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(async res => {
        if (!res.ok) throw new Error("No se pudo cargar el post");
        const data: PostData = await res.json();

        // Getting MDX content from tue URL
        const mdxRes = await fetch(data.url);
        if (!mdxRes.ok) throw new Error("No se pudo cargar el archivo MDX");

        const mdxText = await mdxRes.text();
        const { content, data: frontmatter } = matter(mdxText);
        setFron(frontmatter);
        const serialized = await serialize(content, {
          mdxOptions:{
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex, rehypePrism]
          }
        });
        setMdxSource(serialized);
      })
      .catch(err => {
        console.error(err);
        setError("Error loading blog.");
      });
  }, [user]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!mdxSource) return <p>Cargando...</p>;

  return (
    <BlogHeader title={fron?.title as string} keywords={fron?.keywords as string}>
      <MDXRemote {...mdxSource} components={mdxComponents} />
    </BlogHeader>
  );
}