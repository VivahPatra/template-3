'use client'
import { useWeddingData } from '@/context/WeddingDataContext'

export default function SectionGate({ name, children }: { name: string; children: React.ReactNode }) {
  const data = useWeddingData()
  if (data.sections && data.sections[name] === false) return null
  return <>{children}</>
}
