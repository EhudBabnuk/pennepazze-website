export interface PressArticle {
  id: string
  title: string
  publication: string
  date: string
  excerpt: string
  link: string
  featured?: boolean
}

export const pressArticles: PressArticle[] = [
  {
    id: "seed-free-announcement",
    title: "Penne Pazze Goes 100% Seed Oil-Free",
    publication: "Food & Wine Magazine",
    date: "March 2026",
    excerpt:
      "In a bold move for health-conscious dining, Penne Pazze announces complete removal of seed oils from all locations, switching to premium olive oil and butter.",
    link: "#",
    featured: true,
  },
  {
    id: "expansion-ny",
    title: "Beloved Florida Restaurant Brings Authentic Italian to New York",
    publication: "Eater NY",
    date: "February 2026",
    excerpt:
      "Penne Pazze, the acclaimed Italian restaurant group, opens its first New York location with the same commitment to quality and authenticity.",
    link: "#",
    featured: true,
  },
  {
    id: "chef-interview",
    title: "From Family Recipes to Fine Dining: An Interview with the Founders",
    publication: "Saveur Magazine",
    date: "January 2026",
    excerpt:
      "The founders of Penne Pazze discuss their journey from running a family kitchen to building one of Florida's most respected Italian restaurant groups.",
    link: "#",
    featured: true,
  },
  {
    id: "award-winner",
    title: "Penne Pazze Named Best Italian Restaurant 2025",
    publication: "Miami Dining Awards",
    date: "December 2025",
    excerpt: "The prestigious Miami Dining Awards recognize Penne Pazze's commitment to quality and innovation in Italian cuisine.",
    link: "#",
  },
  {
    id: "sustainability",
    title: "How Penne Pazze is Leading Sustainable Fine Dining",
    publication: "The Plate",
    date: "November 2025",
    excerpt:
      "From locally-sourced ingredients to zero-waste initiatives, Penne Pazze demonstrates how restaurants can be both delicious and responsible.",
    link: "#",
  },
  {
    id: "community",
    title: "Penne Pazze Gives Back: Restaurant Supports Local Charities",
    publication: "Miami Community News",
    date: "October 2025",
    excerpt:
      "The restaurant group announces a new charitable giving program, committing 1% of proceeds to local food security initiatives.",
    link: "#",
  },
]

export const featuredPress = pressArticles.filter((a) => a.featured)
