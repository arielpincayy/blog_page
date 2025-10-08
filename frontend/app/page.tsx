import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"


export default function BlogPlatform() {
  const blogPosts = [
    {
      title: "My First Blog Post",
      author: "John Doe",
      date: "April 22, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur-adipiscing elit...",
    },
    {
      title: "Exploring the Mountains",
      author: "John Doe",
      date: "Lorem ipsum dolor sit",
      excerpt: "amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.",
    },
    {
      title: "The Future of AI",
      author: "John Doe",
      date: "Aletrauls rus",
      excerpt: "Lorem ipsum dolor sit amit, et. consectetur adipiscing elit.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <div className="space-y-8 md:flex md:flex-row md:justify-between">
          <div className="space-y-4 md:flex md:flex-col md:gap-4 md:my-auto">
            <h1 className="text-center mx-auto text-7xl md:text-left md:text-5xl lg:text-9xl font-bold text-gray-900 leading-tight" style={{ fontFamily: "Times New Roman, Times, serif" }}>
              Blog Page
            </h1>
            <div className="flex flex-col gap-8">
              <p className="text-center mx-auto md:mx-1 text-xl text-gray-600 max-w-md">
                A modern platform for creating and reading blogs
              </p>
              <div className="flex justify-center md:justify-start">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 w-1/2 rounded-full text-lg">
                  Create Blog
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/images/hand_paper.png"
              alt="Blog illustration"
              width={600}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Link href="/blog" className="flex items-center text-gray-900 hover:text-gray-600 font-medium">
            View all
            <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
      </section>
    </>
  )
}