import { Edit, Trash } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import Link from "next/link";
import { PostType } from "@/types/types";
import { removeBlog } from "@/lib/render";
import { Dispatch, SetStateAction } from "react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "PUBLISHED":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "DRAFT":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "WAITING":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export default function StatsCards({posts, setPosts}:{posts:PostType[], setPosts: Dispatch<SetStateAction<PostType[]>>}){
    return(
        <>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Blogs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{posts?.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {posts?.filter((post) => post.status === "publicado").length}
              </div>
            </CardContent>
          </Card>
        </div>
  
          {/* Blog Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">My Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium text-gray-900">Blog name</TableHead>
                    <TableHead className="font-medium text-gray-900">ID</TableHead>
                    <TableHead className="font-medium text-gray-900">State</TableHead>
                    <TableHead className="font-medium text-gray-900">URL</TableHead>
                    <TableHead className="font-medium text-gray-900 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts?.map((post) => (
                    <TableRow key={post.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">{post.title}</TableCell>
                      <TableCell className="text-gray-600">#{post.id}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusColor(post.status)}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900"><Link href={`/dashboard/blog/${post.id}`}>Visit</Link></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100" onClick={()=>removeBlog(post.id, setPosts)}>
                          <Trash className="h-4 w-4 text-red-700" />
                          <span className="sr-only">Remove blog blog</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        </>
    )
}