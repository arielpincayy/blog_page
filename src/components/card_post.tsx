import Link from "next/link";
import Image from "next/image";
  
export default function CardPosts({image,title,blog_id,uid}:{image:string, title:string, blog_id:number, uid:string}){
    return(
        <div className="relative overflow-hidden rounded-lg group shadow-sm hover:shadow-md w-2/5 md:w-1/5 mx-auto static">
          <Link href={`/blog/${uid}/${blog_id}`} className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <Image src={image} alt="Product 1" width={100} height={100} priority={false} className="object-cover w-full"/>
          <div className="p-1 bg-transparent absolute left-0 top-0 ">
            <h3 className="text-sm font-semibold text-neutral-400">{title}</h3>
          </div>
        </div>
    )
}