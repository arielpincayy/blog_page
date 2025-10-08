import type { NextConfig } from "next";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import withMDX from "@next/mdx";

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // puedes conservar otras configuraciones que ya tengas aquí
};

export default withMDXConfig(nextConfig);