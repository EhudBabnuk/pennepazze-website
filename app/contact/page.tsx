import { getLocations, getContactPage } from "@/sanity/lib/queries"
import { ContactPageClient } from "./contact-client"

export default async function ContactPage() {
  const [rawLocations, pageData] = await Promise.all([
    getLocations(),
    getContactPage(),
  ])
  const locations = rawLocations.map((loc) => ({
    id: loc.slug,
    name: loc.name,
    city: loc.city,
    state: loc.state,
    address: loc.address,
    phone: loc.phone,
    featured: loc.featured,
  }))
  return <ContactPageClient locations={locations} pageData={pageData} />
}
