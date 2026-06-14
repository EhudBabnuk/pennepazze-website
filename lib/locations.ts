export interface Location {
  id: string
  name: string
  city: string
  state: string
  region: "location-a" | "location-b"
  description: string
  address: string
  phone: string
  hours: {
    weekday: string
    weekend: string
  }
  image: string
  featured?: boolean
  order_link?: string
}

export const locations: Location[] = [
  {
    id: "location-a",
    name: "Location A",
    city: "City A",
    state: "ST",
    region: "location-a",
    description: "Our Location A offers authentic Italian cuisine in a welcoming atmosphere.",
    address: "123 Main Street, City A, ST 12345",
    phone: "(555) 123-0001",
    hours: {
      weekday: "Mon-Thu: 11am - 10pm",
      weekend: "Fri-Sun: 11am - 11pm",
    },
    image: "/images/location-branch-a.jpg",
    featured: true,
    order_link: "location-a",
  },
  {
    id: "location-b",
    name: "Location B",
    city: "City B",
    state: "ST",
    region: "location-b",
    description: "Our Location B provides an elegant Italian dining experience.",
    address: "456 Oak Avenue, City B, ST 67890",
    phone: "(555) 123-0002",
    hours: {
      weekday: "Mon-Thu: 11:30am - 10pm",
      weekend: "Fri-Sun: 11:30am - 11pm",
    },
    image: "/images/location-branch-b.jpg",
    featured: true,
    order_link: "location-b",
  },
]

export const locationsByRegion = {
  "location-a": locations.filter((l) => l.region === "location-a"),
  "location-b": locations.filter((l) => l.region === "location-b"),
}

export const featuredLocations = locations.filter((l) => l.featured)
