'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { WeddingDataProvider } from '@/context/WeddingDataContext'
import CustomCursor from '@/components/layout/CustomCursor'
import FloatingFABs from '@/components/layout/FloatingFABs'
import LoadingScreen from '@/components/layout/LoadingScreen'
import FloralPetals from '@/components/ui/FloralPetals'
import WaveDivider from '@/components/ui/WaveDivider'
import PondStrip from '@/components/ui/PondStrip'
import HeroSection from '@/components/sections/HeroSection'
import InvitationSection from '@/components/sections/InvitationSection'
import CoupleStory from '@/components/sections/CoupleStory'
import EventsSection from '@/components/sections/EventsSection'
import GallerySection from '@/components/sections/GallerySection'
import RSVPSection from '@/components/sections/RSVPSection'
import CountdownSection from '@/components/sections/CountdownSection'
import FooterSection from '@/components/sections/FooterSection'
import SectionGate from '@/components/ui/SectionGate'

export default function Page() {
  const [loaded, setLoaded] = useState(false)

  return (
    <WeddingDataProvider>
      <CustomCursor />
      <AnimatePresence>
        {!loaded && <LoadingScreen key="loading" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
      {loaded && (
        <>
          <FloralPetals count={22} />
          <FloatingFABs />
          <div className="relative overflow-x-hidden">
            <main>
              <SectionGate name="hero">
                <HeroSection />
              </SectionGate>
              <WaveDivider fromColor="var(--color-bg)" toColor="var(--color-surface)" />

              <SectionGate name="invitation">
                <InvitationSection />
              </SectionGate>
              <PondStrip />

              <SectionGate name="events">
                <EventsSection />
              </SectionGate>
              <PondStrip />

              <SectionGate name="coupleStory">
                <CoupleStory />
              </SectionGate>
              <PondStrip />

              <SectionGate name="gallery">
                <GallerySection />
              </SectionGate>
              <PondStrip />

              <SectionGate name="rsvp">
                <RSVPSection />
              </SectionGate>
              <PondStrip />

              <SectionGate name="countdown">
                <CountdownSection />
              </SectionGate>
              <WaveDivider fromColor="var(--color-surface)" toColor="var(--color-surface2)" />

              <SectionGate name="footer">
                <FooterSection />
              </SectionGate>
            </main>
          </div>
        </>
      )}
    </WeddingDataProvider>
  )
}
