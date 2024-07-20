'use client';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { useState } from "react"
import Image from 'next/image'
import { uploadImg } from "@/lib/firebase_config";
import { type AreaType, SelType } from "@/lib/types";
import RenderingBlog from "./render_blog";


function SelectText({onAdd, onDelete, onChange, n, select, content}:{onAdd:()=>void, onDelete:()=>void, onChange:(n:number,c:string,e:string|ArrayBuffer|null)=>void, n:number, select:SelType,content:AreaType[number]['cont']['content']}){


    function changeValue(e:string){
        onChange(n,'sel',e);
    }

    function handleImage({target}:{target:HTMLInputElement}){
        if(target.files){
            const reader = new FileReader(); 

            reader.onloadend = () => {
                onChange(n,'content',reader.result); 
            }
            reader.readAsDataURL(target.files[0]); 
        }
        
    }

    return (
        <div data-comp='Area'>
        <div className="grid gap-1.5">
          <Label htmlFor="category" className="text-blue-500">Type</Label>
              <Select onValueChange={changeValue} defaultValue={select}>
                <SelectTrigger aria-label="Category" id="category">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    {['Text','Subtitle','Img','Latex'].map(e=>{
                        return(
                            <SelectItem key={e} value={e}>{e}</SelectItem>
                        )
                    })}
                </SelectContent>
              </Select>
        </div>
        <div className="grid gap-1.5">
            {select==="Text"&&
            <>
            <Label htmlFor="message-1" className="font-bold text-2xl">Text</Label>
            <Textarea id="message-2" value={content} onChange={({target})=>onChange(n,'content',target.value)} placeholder="Write a text."/>
            </>
            }
            {select==="Latex"&&
            <>
            <Label htmlFor="message-1" className="font-bold text-2xl">Latex</Label>
            <Textarea id="message-2" value={content} onChange={({target})=>onChange(n,'content',target.value)} placeholder="Write Latex code."/>
            {/*typeof(content)=='string' &&     
            <BlockMath math={content}/>*/}
            </>
            }
            {select==="Subtitle"&&
            <>
            <Label htmlFor="message-1" className="font-bold text-2xl">Subtitle</Label>
            <Textarea id="message-2" value={content} onChange={({target})=>onChange(n,'content',target.value)} placeholder="Write a Subtitle." />
            </>
            }
            {select==="Img"&&
            <>
            <Label htmlFor="message-1" className="font-bold text-2xl">Imagen</Label>
            {content!='' && content!=null && typeof(content)=='string'?
            <Image
                className="mx-auto"
                src={content}
                width={300}
                height={300}
                alt="Image choosen"
            />:
            <Input id="image" type="file" onChange={handleImage}/>
            }
            </>
            }
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Complete
            </p>
            <div className="max-w-full flex items-center justify-center gap-8">
                <Button onClick={onAdd}>+</Button>
                {n===0?<></>:<Button className="bg-red-600 hover:bg-red-500" onClick={onDelete}>-</Button>}
            </div>
        </div>
        </div>
    )
}

export default function BlogPage({user_data,isUploading,toggleUploading}:{user_data: any,isUploading:boolean, toggleUploading:(isUploading:boolean)=>void}) {

    const [comps, setComps] = useState<{title:string,keywords:string,body:AreaType}>({
        title:'Title',
        keywords:' ',
        body:{
            1:{
                father:-1,
                cont:{
                    sel:'Text',
                    content:['Random text written with a random purpose']
                }
            }
        }  
    })

    const [cant, setCant] = useState<AreaType>({
        0:{
            father:-1,
            cont:{
                sel:'Text',
                content:''
            }
        }
    });

    function addComponent(s:AreaType,current:number,cont:AreaType[number]['cont']){
        let c = s[current].father+2;
        if (s[c]===undefined){
            s[c]={father:current,cont:cont}
            return s
        };
        let fa = s[c].father;
        let content = s[c].cont;
        s[c]={father:fa,cont:cont};
        return addComponent(s,c,content);
    }
    
    function deleteComponent(s:AreaType,current:number){
        if (current === Object.keys(s).length-1){
            const n = s[current].cont;
            delete s[current];
            return n
        }
        const c = deleteComponent(s,current+1)
        const n = s[current].cont;
        s[current].cont=c;
        return n
    }

    function addArea(n:number,cont:AreaType[number]['cont']){
        const newCant = addComponent(cant,n,cont);
        setCant({...newCant});
    }

    function deleteArea(n:number){
        const newCant = {...cant}
        deleteComponent(newCant,n);
        setCant({...newCant});
    }

    function changeCant(n:number,c:string,e:string|ArrayBuffer|null){
        setCant(s=>({
            ...s,
            [n]:{father:n-1,
                cont:{
                    ...s[n].cont,
                    [c]:e
                }
            }
        }))
    }

    function formatContent(newData:AreaType){
        Object.keys(newData).forEach(e=>{
            const newCont = [] as string[];
            if (newData[+e].cont.sel==='Text'){
                const x = newData[+e].cont.content as string;
                const c = x.split('\n');
                c.forEach(i=>{
                    newCont.push(i);
                })
                newData[+e].cont.content = newCont;
            }
        })
        const t = document.querySelector('.title-area')as HTMLInputElement;
        const k = document.querySelector('.keywords-area')as HTMLInputElement;
        const n = {
            title:t.value,
            keywords:k.value,
            body:newData
        }
        return n
    }

    const onSubmit=()=>{
        const c = JSON.parse(JSON.stringify(cant));
        const x = formatContent(c);
        setComps(x);
        
    };

    const onUpload=async()=>{
       
        toggleUploading(isUploading);

        const blogs_contents = {...comps};
        const promises = Object.entries(blogs_contents.body).map(async ([n, val]) => {
            if (val.cont.sel === 'Img') {
                try {
                    const url_img = await uploadImg(val.cont.content as string, comps.title + (parseInt(n) + 1).toString());
                    if (typeof url_img === 'string') {
                        val.cont.content = url_img;
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        });

        await Promise.all(promises);

        setComps(blogs_contents);

        fetch(`${process.env.NEXT_PUBLIC_URL_DB}/createBlogPage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({'user':user_data,'blog':comps})
        })
        .then(()=>toggleUploading(!isUploading))
        .catch((err)=>console.log(err))
        
    }

    return (
        <>
        <div className="grid gap-1.5">
            <Label htmlFor="message-1" className="font-bold text-4xl text-red-500 text-center">Write a Title</Label>
            <Textarea id="message-1" className="text-2xl font-bold text-center title-area" placeholder="Write your title." />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Write your title.
            </p>
        </div>
        <div className="grid gap-1.5">
        <Label htmlFor="message-1" className="text-sm">Keywords</Label>
            <Textarea id="message-1" className="keywords-area" placeholder="Write your keywords." />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Write your keywords.
            </p>
        </div>
        {Object.keys(cant).map(e=>{
              return(
                  <SelectText key={e} n={+e} select={cant[+e].cont.sel} content={cant[+e].cont.content} onChange={changeCant} onAdd={()=>addArea(+e,{sel:'Text',content:''})} onDelete={()=>deleteArea(+e)}/>
              )
          })}
        <Button onClick={onSubmit}>Load</Button>
        <RenderingBlog initialContent={comps} date={''} keywords={[]}/>
        <Button onClick={onUpload}>Upload</Button>
        <br />
        </>
    )
}

