import { ReactNode } from "react";

export default function BlogHeader({title, keywords, children}:{title:string, keywords:string, children:ReactNode}){
    return(
        <article className="prose max-w-4xl mx-auto py-10">
            <div className="mb-5">
                <h1 className="text-4xl font-bold mb-4 text-center">{title}</h1>
                <p><span className="font-bold">Keywords: </span>{keywords}</p>
            </div>
            {children}
        </article>
    )
}