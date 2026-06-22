export interface WeddingEvent {
  id: string
  name: string
  emoji: string
  date: string
  time: string
  venue: string
  venueAddress: string
  image?: string
  color: string
  description?: string
}

export interface GalleryImage {
  src: string
  alt: string
  span?: 'normal' | 'wide' | 'tall'
}

export interface StoryMilestone {
  date: string
  title: string
  description: string
  icon: string
  image?: string
}

export interface FamilyMember {
  name: string
  relation: string
  photo: string
  side: 'bride' | 'groom'
}

export interface WeddingConfig {
  brideName: string
  groomName: string
  groomParents?: string
  brideParents?: string
  weddingDate: Date
  hashtag: string
  tagline: string
  invitationText: string
  heroImage: string
  events: WeddingEvent[]
  galleryImages: GalleryImage[]
  coupleStory: StoryMilestone[]
  familyBride: FamilyMember[]
  familyGroom: FamilyMember[]
  venue: { name: string; address: string; mapUrl: string }
  rsvp: { whatsappNumber: string; message: string; deadline: string }
  socialLinks?: { instagram?: string }
}
