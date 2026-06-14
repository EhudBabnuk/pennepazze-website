export type UpdatesSlide = {
  id: string
  image: string
  label: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export const updatesSlides: UpdatesSlide[] = [
  {
    id: "coming-soon-location",
    image: "/images/updates-coming-soon.jpg",
    label: "Coming Soon",
    title: "New Location Opening",
    description:
      "We're thrilled to announce an exciting new Penne Pazze location coming to your neighborhood. Experience the same authentic Italian cuisine and warm hospitality you love.",
    buttonText: "Learn More",
    buttonLink: "/locations",
  },
  {
    id: "new-seasonal-dish",
    image: "/images/updates-new-dish.jpg",
    label: "New Dish",
    title: "Spring Menu Now Available",
    description:
      "Discover our latest seasonal creation featuring fresh spring ingredients and traditional Italian techniques. Available for a limited time only.",
    buttonText: "View Menu",
    buttonLink: "/menu",
  },
  {
    id: "chefs-special",
    image: "/images/updates-special.jpg",
    label: "Featured",
    title: "Chef's Special Selection",
    description:
      "Our culinary team has crafted an exclusive tasting experience featuring the finest ingredients and time-honored recipes. Reserve your table today.",
    buttonText: "Make Reservation",
    buttonLink: "/",
  },
]
