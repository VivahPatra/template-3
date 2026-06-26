import { WeddingConfig } from '@/types/wedding.types'

export const weddingData: WeddingConfig = {
  brideName: 'Simran',
  groomName: 'Kabir',
  groomParents: 'Mr. Amir Khan & Mrs. Zoya Khan',
  brideParents: 'Mr. Harjit Singh & Mrs. Gurpreet Kaur',
  weddingDate: new Date('2026-12-20T10:00:00'),
  hashtag: '#SimranWedKabir',
  tagline: 'A love story written in the stars',
  invitationText:
    'With the blessings of our families and the grace of the Almighty, Simran and Kabir joyfully invite you to witness the beginning of their forever. Your love and presence will make this moment truly complete.',
  heroImage: '/assets/2.jpg',

  events: [
    { id: 'engagement', name: 'Engagement', emoji: '💍', date: 'December 16, 2026', time: '6:00 PM', venue: 'The Grand Ballroom', venueAddress: 'Hotel Imperial, Delhi', image: '/assets/events/engagement.png', color: '#c9a84c', description: 'Rings, promises and the beginning of forever.' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', date: 'December 17, 2026', time: '4:00 PM', venue: 'The Garden Terrace', venueAddress: '12 Rosewood Lane, Delhi', image: '/assets/events/mehendi.png', color: '#4a7c59', description: 'Henna, laughter and the fragrance of mogra.' },
    { id: 'haldi',   name: 'Haldi',   emoji: '✨', date: 'December 18, 2026', time: '10:00 AM', venue: 'Family Courtyard', venueAddress: '45 Sunset Marg, Delhi', image: '/assets/events/haldi.png', color: '#c8922a', description: 'Turmeric, blessings and golden memories.' },
    { id: 'sangeet', name: 'Sangeet', emoji: '🎶', date: 'December 18, 2026', time: '7:00 PM', venue: 'The Grand Ballroom', venueAddress: 'Hotel Imperial, Delhi', image: '/assets/events/sangeet.png', color: '#8b2635', description: 'Dance, music and a night full of stars.' },
    { id: 'wedding', name: 'Wedding', emoji: '💍', date: 'December 20, 2026', time: '10:00 AM', venue: 'Shri Sai Mandir Banquet', venueAddress: 'Temple Road, Connaught Place, Delhi', image: '/assets/events/wedding.png', color: '#c4683a', description: 'Seven vows, one forever.' },
    { id: 'reception', name: 'Reception', emoji: '🥂', date: 'December 20, 2026', time: '7:00 PM', venue: 'The Grand Ballroom', venueAddress: 'Hotel Imperial, Delhi', image: '/assets/events/reception.png', color: '#9b6b9b', description: 'Dinner, dancing and a night to remember.' },
  ],

  galleryImages: [
    { src: '/assets/gallery/gallery-1.jpg', alt: 'Couple photo 1', span: 'wide' },
    { src: '/assets/gallery/gallery-2.jpg', alt: 'Couple photo 2', span: 'tall' },
    { src: '/assets/gallery/gallery-3.jpg', alt: 'Couple photo 3', span: 'normal' },
    { src: '/assets/gallery/gallery-4.jpg', alt: 'Couple photo 4', span: 'normal' },
    { src: '/assets/gallery/gallery-5.jpg', alt: 'Couple photo 5', span: 'wide' },
    { src: '/assets/gallery/gallery-6.jpg', alt: 'Couple photo 6', span: 'normal' },
  ],

  coupleStory: [
    { date: 'March 2019', title: 'First Hello', description: 'A rainy evening at a book fair — he spotted her arguing passionately about poetry. He had to know more.', icon: '📖', image: '/assets/story/story-1.jpg' },
    { date: 'August 2020', title: 'First Date', description: 'A rooftop café, terrible coffee and three hours of the best conversation either of them had ever had.', icon: '☕', image: '/assets/story/story-2.jpg' },
    { date: 'February 2023', title: 'The Proposal', description: 'A candlelit night in Jaipur, a ring hidden inside a book of her favourite poems. She cried. He cried. The waiter cried.', icon: '💍', image: '/assets/story/story-3.jpg' },
    { date: 'December 2026', title: 'Forever Starts Now', description: "And so the greatest chapter begins. We can't wait to celebrate with every soul who has been part of this story.", icon: '🌹', image: '/assets/story/story-4.jpg' },
  ],

  familyBride: [
    { name: 'Harjit Singh', relation: 'Father', photo: '/assets/family/bf.jpg', side: 'bride' },
    { name: 'Parminder Kaur', relation: 'Mother', photo: '/assets/family/bm.jpg', side: 'bride' },
    { name: 'Manpreet Singh', relation: 'Brother', photo: '/assets/family/bb.jpg', side: 'bride' },
    { name: 'Surjit Kaur', relation: 'Grandmother', photo: '/assets/family/bg.jpg', side: 'bride' },
  ],

  familyGroom: [
    { name: 'Vikram Malhotra', relation: 'Father', photo: '/assets/family/gf.jpg', side: 'groom' },
    { name: 'Sunita Malhotra', relation: 'Mother', photo: '/assets/family/gm.jpg', side: 'groom' },
    { name: 'Neha Malhotra', relation: 'Sister', photo: '/assets/family/gs.jpg', side: 'groom' },
    { name: 'Ratan Lal', relation: 'Grandfather', photo: '/assets/family/gg.jpg', side: 'groom' },
  ],

  venue: {
    name: 'Shri Sai Mandir Banquet',
    address: 'Temple Road, Connaught Place, New Delhi — 110001',
    mapUrl: 'https://maps.google.com',
  },

  rsvp: {
    whatsappNumber: '919876543210',
    message: 'Hi! I would like to RSVP for the wedding of Simran & Kabir on 20th December 2026.',
    deadline: 'December 5, 2026',
  },

  socialLinks: { instagram: 'https://instagram.com' },
}
