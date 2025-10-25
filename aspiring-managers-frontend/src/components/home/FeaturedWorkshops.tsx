import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Link } from "react-router-dom"


//De modificat ca items sa-si traga lista de evenimente din backend
const items = [
  {
    title: "High-Performance Habits",
    where: "Online",
    when: "Oct 24",
    time: "10:00–13:00",
    availability: "8 of 30 left",
    cta: "View Details",
  },
  {
    title: "Leadership Sprint",
    where: "Bucharest",
    when: "Nov 4",
    time: "09:00–17:00",
    availability: "Waitlist",
    cta: "Join Waiting List",
  },
  {
    title: "Deep Work Bootcamp",
    where: "Online",
    when: "Nov 18",
    time: "17:00–20:00",
    availability: "15 seats",
    cta: "View Details",
  },
]

export default function FeaturedWorkshops() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#284B63] mb-6">
        Featured Workshops
      </h2>
      {items.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((w) => (
          <Card key={w.title} className="border-[#D9D9D9]">
            <CardHeader>
              <CardTitle className="text-lg">{w.title}</CardTitle>
              <CardDescription className="flex items-center gap-3 text-[#353535]/75">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {w.where}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {w.when}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {w.time}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Availability:{" "}
                <Badge
                  variant="secondary"
                  className="rounded-full bg-[#D9D9D9] text-[#353535]"
                >
                  {w.availability}
                </Badge>
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-[#3C6E71] hover:bg-[#284B63] text-white"
                asChild
              >
                <Link to="/workshops">{w.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      :
      <><p>Sorry, there are no workshops currently!</p></>
    }
    </div>
  )
}
