// Singletons
import { siteSettings } from './siteSettings'
import { homePage } from './homePage'
import { aboutPage } from './aboutPage'
import { menuPage } from './menuPage'
import { cateringPage } from './cateringPage'
import { gelatoPage } from './gelatoPage'
import { careersPage } from './careersPage'
import { pressPage } from './pressPage'
import { contactPage } from './contactPage'

// Collections
import { location } from './location'
import { menuCategory } from './menuCategory'
import { menuItem } from './menuItem'
import { award } from './award'
import { pressArticle } from './pressArticle'
import { updatesSlide } from './updatesSlide'
import { cateringBenefit } from './cateringBenefit'
import { careerRole } from './careerRole'

export const schemas = [
  // ─── Singletons ─────────────────────────────────────────
  siteSettings,
  homePage,
  aboutPage,
  menuPage,
  cateringPage,
  gelatoPage,
  careersPage,
  pressPage,
  contactPage,
  // ─── Collections ────────────────────────────────────────
  location,
  menuCategory,
  menuItem,
  award,
  pressArticle,
  updatesSlide,
  cateringBenefit,
  careerRole,
]
