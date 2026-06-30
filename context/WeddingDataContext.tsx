'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { weddingData as defaultData } from '@/data/wedding-data'
import type { WeddingConfig, WeddingEvent, GalleryImage, StoryMilestone, FamilyMember } from '@/types/wedding.types'

const WeddingDataContext = createContext<WeddingConfig>(defaultData)

export function useWeddingData() {
  return useContext(WeddingDataContext)
}

/** Map incoming editor payload to this template's WeddingConfig shape. */
function mapEditorData(editor: Record<string, unknown>): WeddingConfig {
  const d = { ...defaultData }

  // Simple string fields
  if (typeof editor.groomName === 'string') d.groomName = editor.groomName
  if (typeof editor.brideName === 'string') d.brideName = editor.brideName
  if (typeof editor.groomParents === 'string') d.groomParents = editor.groomParents
  if (typeof editor.brideParents === 'string') d.brideParents = editor.brideParents
  if (typeof editor.hashtag === 'string') d.hashtag = editor.hashtag
  if (typeof editor.tagline === 'string') d.tagline = editor.tagline
  if (typeof editor.invitationText === 'string') d.invitationText = editor.invitationText
  if (typeof editor.heroImage === 'string') d.heroImage = editor.heroImage
  if (typeof editor.heroSubtitle === 'string') d.heroSubtitle = editor.heroSubtitle
  if (typeof editor.invitationHeading === 'string') d.invitationHeading = editor.invitationHeading
  if (typeof editor.invitationSubtitle === 'string') d.invitationSubtitle = editor.invitationSubtitle
  if (typeof editor.invitationBlessing === 'string') d.invitationBlessing = editor.invitationBlessing
  if (typeof editor.rsvpHeading === 'string') d.rsvpHeading = editor.rsvpHeading
  if (typeof editor.rsvpText === 'string') d.rsvpText = editor.rsvpText
  if (typeof editor.rsvpDeadline === 'string') d.rsvpDeadline = editor.rsvpDeadline

  // Wedding date (string -> Date)
  if (typeof editor.weddingDate === 'string') {
    const parsed = new Date(editor.weddingDate)
    if (!isNaN(parsed.getTime())) d.weddingDate = parsed
  }

  // Events
  if (Array.isArray(editor.events)) {
    d.events = (editor.events as Record<string, unknown>[]).map((ev): WeddingEvent => ({
      id: String(ev.id ?? ''),
      name: String(ev.name ?? ''),
      emoji: String(ev.emoji ?? ''),
      date: String(ev.date ?? ''),
      time: String(ev.time ?? ''),
      venue: String(ev.venue ?? ''),
      venueAddress: String(ev.venueAddress ?? ''),
      color: String(ev.color ?? 'var(--color-accent)'),
      ...(ev.description ? { description: String(ev.description) } : {}),
      ...(ev.image ? { image: String(ev.image) } : {}),
      hidden: Boolean(ev.hidden),
    }))
  }

  // Gallery images
  if (Array.isArray(editor.galleryImages)) {
    d.galleryImages = (editor.galleryImages as Record<string, unknown>[]).map((img): GalleryImage => ({
      src: String(img.src ?? ''),
      alt: String(img.alt ?? ''),
      ...(img.span ? { span: String(img.span) as GalleryImage['span'] } : {}),
    }))
  }

  // Couple story
  if (Array.isArray(editor.coupleStory)) {
    d.coupleStory = (editor.coupleStory as Record<string, unknown>[]).map((s): StoryMilestone => ({
      date: String(s.date ?? ''),
      title: String(s.title ?? ''),
      description: String(s.description ?? ''),
      icon: String(s.icon ?? ''),
      ...(s.image ? { image: String(s.image) } : {}),
    }))
  }

  // Family members
  if (Array.isArray(editor.familyBride)) {
    d.familyBride = (editor.familyBride as Record<string, unknown>[]).map((m): FamilyMember => ({
      name: String(m.name ?? ''),
      relation: String(m.relation ?? ''),
      photo: String(m.photo ?? ''),
      side: 'bride',
    }))
  }
  if (Array.isArray(editor.familyGroom)) {
    d.familyGroom = (editor.familyGroom as Record<string, unknown>[]).map((m): FamilyMember => ({
      name: String(m.name ?? ''),
      relation: String(m.relation ?? ''),
      photo: String(m.photo ?? ''),
      side: 'groom',
    }))
  }

  // Venue
  if (typeof editor.venueName === 'string' || typeof editor.venueAddress === 'string' || typeof editor.venueMapUrl === 'string') {
    d.venue = {
      name: typeof editor.venueName === 'string' ? editor.venueName : d.venue.name,
      address: typeof editor.venueAddress === 'string' ? editor.venueAddress : d.venue.address,
      mapUrl: typeof editor.venueMapUrl === 'string' ? editor.venueMapUrl : d.venue.mapUrl,
    }
  }

  // RSVP
  if (typeof editor.rsvpPhone === 'string' || typeof editor.rsvpMessage === 'string' || typeof editor.rsvpDeadline === 'string') {
    d.rsvp = {
      whatsappNumber: typeof editor.rsvpPhone === 'string' ? editor.rsvpPhone : d.rsvp.whatsappNumber,
      message: typeof editor.rsvpMessage === 'string' ? editor.rsvpMessage : d.rsvp.message,
      deadline: typeof editor.rsvpDeadline === 'string' ? editor.rsvpDeadline : d.rsvp.deadline,
    }
  }

  // Social links
  if (typeof editor.instagram === 'string') {
    d.socialLinks = { instagram: editor.instagram }
  }

  if (editor.sections) {
    d.sections = editor.sections as Record<string, boolean>
  }

  // Name order swap
  if (editor.groomFirst === false) {
    d.groomFirst = false
    const tmpName = d.groomName; d.groomName = d.brideName; d.brideName = tmpName
    const tmpParents = d.groomParents; d.groomParents = d.brideParents; d.brideParents = tmpParents
    if ("groomSubtitle" in d && "brideSubtitle" in d) { const tmpSub = d.groomSubtitle; d.groomSubtitle = d.brideSubtitle; d.brideSubtitle = tmpSub }
  }
  return d
}

export function WeddingDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WeddingConfig>(defaultData)
  const [ready, setReady] = useState(true)

  useEffect(() => {
    const inIframe = window.parent !== window
    if (inIframe) setReady(false)

    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'VIVAHPATRA_UPDATE' && event.data.data) {
        setData(mapEditorData(event.data.data as Record<string, unknown>))
        setReady(true)
      }
    }

    window.addEventListener('message', handleMessage)

    if (inIframe) {
      window.parent.postMessage({ type: 'VIVAHPATRA_READY' }, '*')
      setTimeout(() => setReady(true), 4000)
    }

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  if (!ready) return null

  return (
    <WeddingDataContext.Provider value={data}>
      {children}
    </WeddingDataContext.Provider>
  )
}
