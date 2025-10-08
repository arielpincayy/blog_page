'use client';

import { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { convertToMDX } from "@/lib/utils";
import { mdxComponents } from "@/components/MDXComponents";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import { HeaderContentType, ContentType } from "@/types/types";
import BlogHeader from "./BlogHeader";

export default function MDXRender_draft({
  header,
  content,
}: {
  header: HeaderContentType;
  content: ContentType[];
}) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const renderPreview = async () => {
      try {
        const mdxText = convertToMDX(content);
        const result = await serialize(mdxText, {
          mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex, rehypePrism],
          },
        });
        setMdxSource(result);
      } catch (err) {
        setError("No se pudo renderizar el MDX");
      }
    };

    renderPreview();
  }, [header, content]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!mdxSource) return <p className="text-gray-500">Cargando vista previa…</p>;

  return (
    <BlogHeader title={header.title} keywords={header.keywords.join(",")}>
      <MDXRemote {...mdxSource} components={mdxComponents} />
    </BlogHeader>
  );
}
