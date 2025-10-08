import { evaluate } from "next-mdx-remote-client/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import { mdxComponents } from "@/components/MDXComponents";
import BlogHeader from "@/components/BlogHeader";
import { Metadata } from "next";

export type paramsType = Promise<{ name: string }>;

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL; 
const NEXT_PUBLIC_PAGE_URL = process.env.NEXT_PUBLIC_PAGE_URL;

/*export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/public`);
  const posts = await res.json();

  return posts.map((post: any) => ({
    name: post.title_slug,
  }));
}

export const revalidate = 60; 

export async function generateMetadata({ params }: { params: paramsType }): Promise<Metadata>{
  const {name} = await params;
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/blog/public/${name}`);
  const post = await res.json();

  const { frontmatter } = await evaluate({
    source: post.content,
    options: { parseFrontmatter: true }
  });

  return {
    title: frontmatter.title as string,
    description: (frontmatter.description || "Artículo del blog") as string,
    keywords: frontmatter.keywords as string,
    openGraph: {
      title: frontmatter.title as string,
      description: (frontmatter.description || "") as string,
      url: `${NEXT_PUBLIC_PAGE_URL}/blog/${name}`,
      type: "article"
    },
    alternates: {
      canonical: `${NEXT_PUBLIC_PAGE_URL}/blog/${name}`
    }
  };
}*/

export default async function BlogPage({ params }: { params: paramsType }) {
  const {name} = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/public/${name}`);
  if (!res.ok) throw new Error("No se pudo cargar el post");

  const post = await res.json();

  const { content, frontmatter, error } = await evaluate({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex, rehypePrism],
      },
      parseFrontmatter: true,
    },
    components: mdxComponents,
  });

  if (error) return <p className="text-red-500">Error al renderizar el blog</p>;

  return (
    <BlogHeader title={frontmatter.title as string} keywords={frontmatter.keywords as string}>
      {content}
    </BlogHeader>
  );
}
