import Cursor from '@/components/cursor'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Marquee from '@/components/marquee'
import Services from '@/components/sections/services'
import Work from '@/components/sections/work'
import About from '@/components/sections/about'
import Contact from '@/components/sections/contact'
import Footer from '@/components/sections/footer'
// import { getServices, getWorks } from '@/lib/wordpress'
import {
  getPostsPaginated,
  getServices,
  getWorks,
} from "@/lib/wordpress";

export default async function Home() {
  // const [services, works] = await Promise.all([getServices(), getWorks()])
  const [postsResponse, services, works] = await Promise.all([
      getPostsPaginated(1, 3, {}),
      getServices(),
      getWorks(),
    ]);
  const { data: posts, headers } = postsResponse;
  console.log(posts)
  const { total, totalPages } = headers;
  console.log("Fetched services:", services)
  console.log("Fetched works:", works)
  return (
    <main>
      <Cursor />
      <Navbar />
      <Hero />
      <Marquee />
      <Services services={services} />
      <Work works={works} />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
