import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const posts = [
  { title: "Why Focus Beats Time", reading: "5 min read" },
  { title: "Habits That Stick", reading: "7 min read" },
  { title: "Design Your Week", reading: "6 min read" },
]

export default function BlogTeasers() {
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
                {p.reading}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="secondary"
                className="bg-[#D9D9D9] text-[#353535]"
                asChild
              >
                <Link to="/blog">Read</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
