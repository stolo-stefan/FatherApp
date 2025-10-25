import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { listUserBlogs, type BlogSummary } from "@/services/blog";


export default function BlogTeasers() {

  const [posts, setPosts] = useState<BlogSummary[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await listUserBlogs(); // wait for API response
        setPosts(data); // set the array of blogs
        

      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    }

    fetchBlogs(); // call the async function
  }, []);

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#284B63] mb-6">
        From the Blog
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((p) => (
          <Card key={p.title} className="border-[#D9D9D9]">
            <CardHeader>
              <CardTitle className="text-lg">{p.title}</CardTitle>
              <CardDescription className="text-[#353535]/75">
                Date Posted: {p.datePosted} 
                <br />
                Summary: {p.summary}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="secondary"
                className="bg-[#D9D9D9] text-[#353535]"
                asChild
              >
                <Link to={"/blog/"+p.id}>Read</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
