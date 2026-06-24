'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { WeddingDataProvider } from '@/context/WeddingDataContext'
import { EditModeProvider } from '@/context/EditModeContext'
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

export default function Page() {
  const [loaded, setLoaded] = useState(false)

  return (
    <EditModeProvider>
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
              <HeroSection />
              <WaveDivider fromColor="var(--color-bg)" toColor="var(--color-surface)" />

              <InvitationSection />
              <PondStrip />

              <EventsSection />
              <PondStrip />

              <CoupleStory />
              <PondStrip />

              <GallerySection />
              <PondStrip />

              <RSVPSection />
              <PondStrip />

              <CountdownSection />
              <WaveDivider fromColor="var(--color-surface)" toColor="var(--color-surface2)" />

              <FooterSection />
            </main>
          </div>
        </>
      )}
    </WeddingDataProvider>
    </EditModeProvider>
  )
}
