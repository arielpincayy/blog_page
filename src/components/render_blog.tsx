import { memo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { type AreaType } from "@/lib/types";
import Link from "next/link";
import 'katex/dist/katex.min.css';
import React from "react";


function ClasifyContent({cont}:{cont:AreaType[number]['cont']}){

  function renderText(text:string):Array<Array<string>>{
    const text_list:Array<Array<string>> = [];
    text.split('<*').forEach(e=>{
      const l = e.split('**>');
      l.forEach(i=>{
        if(i[0]=='*'){
          text_list.push(["inline",i.slice(1)]);
        }else{
          text_list.push(["text",i])
        }
      })
    })
    return text_list;
  }

  return(
    <>
      {cont.sel=='Text'&& typeof(cont.content)!=='string' &&
      <p className="mt-8">
        {cont.content.map((i,index)=>{
          const text_list = renderText(i);
          return(
          <React.Fragment key={index}>
          {
          text_list.map((u,k)=>{
            if(u[0]=='inline'){
              return <InlineMath key={k}>{u[1]}</InlineMath>
            }else{
              return <span key={k}>{u[1]}</span>
            }
          })
          }
          <br key={index}/>
          </React.Fragment>
        )
        })}
      </p>
      }
      {cont.sel=='Subtitle' && typeof(cont.content)=='string' &&
      <h2 className="font-bold text-2xl mt-8" >{cont.content}</h2>
      }
      {cont.sel=='Latex' && typeof(cont.content)=='string' &&
      <BlockMath math={cont.content}/>
      }
      {cont.sel=='Img'&& typeof(cont.content)==='string' &&
      <figure>
          <img
            alt="Cover image"
            className="aspect-video overflow-hidden rounded-lg object-cover mt-8 mx-auto"
            height={500}
            src={cont.content}
            width={500}
          />
      </figure>
      }
    </>
  )
}

const RenderingBlog = memo(function renderingBlog({initialContent,date,keywords}:{initialContent:{title:string,body:AreaType},date:string,keywords:string[]}){
    
    return(
      <>
        <div className="flex flex-col mt-2">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <h1 className="text-lg font-bold">{initialContent.title}</h1>
          </div>
          <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-6">
            <article className="prose prose-zinc max-w-none mx-auto dark:prose-invert">
              <h1 className="text-4xl font-bold">{initialContent.title}</h1>
              <p className="text-gray-500 dark:text-gray-400">{`Posted on ${date}`}</p>

              {Object.keys(initialContent.body).map(e=>{
                return(
                    <ClasifyContent  key={e} cont={initialContent.body[+e].cont}/>
                )
              })}
            </article>
          </main>
          <aside className="w-full md:w-1/4 p-4 md:p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Categories</h2>
              <ul className="space-y-2">
                    {keywords.map((e,n)=>{
                        return(
                            <li key={n}>
                                <Link className="text-gray-500 hover:text-gray-900" href="#">{e}</Link>
                            </li>
                        )
                    })}
              </ul>
            </div>
          </aside>
        </div>
      </>
    )
})


export default RenderingBlog;