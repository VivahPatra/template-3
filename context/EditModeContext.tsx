'use client'
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { weddingData as defaultData } from '@/data/wedding-data'
import { WeddingConfig, WeddingEvent, StoryMilestone } from '@/types/wedding.types'

interface EditModeContextType {
  isEditing: boolean
  data: WeddingConfig
  updateField: (path: string, value: string) => void
  updateNestedField: (arrayField: string, index: number, field: string, value: string) => void
  updateEvent: (index: number, field: string, value: string) => void
  updateStory: (index: number, field: string, value: string) => void
}

const EditModeContext = createContext<EditModeContextType>({
  isEditing: false,
  data: defaultData,
  updateField: () => {},
  updateNestedField: () => {},
  updateEvent: () => {},
  updateStory: () => {},
})

function sendToParent(data: WeddingConfig) {
  if (window.parent !== window) {
    window.parent.postMessage({ type: 'VIVAHPATRA_SAVE', data }, '*')
  }
}

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false)
  const [data, setData] = useState<WeddingConfig>(defaultData)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setIsEditing(params.get('edit') === 'true')
  }, [])

  // Listen for saved data from parent editor
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'VIVAHPATRA_RESTORE' && event.data.data) {
        setData(prev => ({ ...prev, ...event.data.data }))
      }
    }
    window.addEventListener('message', handleMessage)
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'VIVAHPATRA_READY' }, '*')
    }
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const updateField = useCallback((path: string, value: string) => {
    setData(prev => {
      // Handle nested paths like "venue.name" or "rsvp.whatsappNumber"
      if (path.includes('.')) {
        const [parent, child] = path.split('.')
        const next = { ...prev, [parent]: { ...(prev as unknown as Record<string, Record<string, unknown>>)[parent], [child]: value } } as unknown as WeddingConfig
        sendToParent(next)
        return next
      }
      if (path === 'weddingDate') {
        const d = new Date(value)
        if (!isNaN(d.getTime())) {
          const next = { ...prev, weddingDate: d }
          sendToParent(next)
          return next
        }
        return prev
      }
      const next = { ...prev, [path]: value } as WeddingConfig
      sendToParent(next)
      return next
    })
  }, [])

  const updateEvent = useCallback((index: number, field: string, value: string) => {
    setData(prev => {
      const events = [...prev.events]
      events[index] = { ...events[index], [field]: value } as WeddingEvent
      const next = { ...prev, events }
      sendToParent(next)
      return next
    })
  }, [])

  const updateStory = useCallback((index: number, field: string, value: string) => {
    setData(prev => {
      const coupleStory = [...prev.coupleStory]
      coupleStory[index] = { ...coupleStory[index], [field]: value } as StoryMilestone
      const next = { ...prev, coupleStory }
      sendToParent(next)
      return next
    })
  }, [])

  const updateNestedField = useCallback((arrayField: string, index: number, field: string, value: string) => {
    switch (arrayField) {
      case 'events': return updateEvent(index, field, value)
      case 'coupleStory': return updateStory(index, field, value)
      default: break
    }
  }, [updateEvent, updateStory])

  return (
    <EditModeContext.Provider value={{ isEditing, data, updateField, updateNestedField, updateEvent, updateStory }}>
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  return useContext(EditModeContext)
}
