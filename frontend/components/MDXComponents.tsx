import React from "react";
import {BlockMath, InlineMath} from "react-katex";

type PDFProps = {
  src: string;
};

export default function PDF({ src }: PDFProps) {
  return (
    <iframe
      src={src}
      width="100%"
      height="600px"
      className="border rounded-md shadow"
      title="Embedded PDF"
    />
  );
}

export const mdxComponents = {
  PDF,
  BlockMath,
  InlineMath,
  h1: (props: any) => <h1 className="text-4xl font-bold my-4 text-center" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold my-3 text-slate-800 text-center" {...props} />,
  p: (props: any) => <p className="text-base leading-7 my-2 text-gray-800" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-5 my-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-5 my-2" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  img: (props: any) => <img className="rounded shadow-md my-4 mx-auto" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" {...props} />
  ),
  code: (props: any) => <code {...props} />,
};