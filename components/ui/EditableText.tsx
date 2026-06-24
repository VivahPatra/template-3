'use client'
import React, { useRef, KeyboardEvent } from 'react'
import { useEditMode } from '@/context/EditModeContext'

interface Props {
  field: string
  index?: number
  arrayField?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  tag?: keyof React.JSX.IntrinsicElements
  multiline?: boolean
}

export default function EditableText({ field, index, arrayField, children, className = '', style, tag: Tag = 'span', multiline }: Props) {
  const { isEditing, updateField, updateNestedField } = useEditMode()
  const ref = useRef<HTMLElement>(null)

  if (!isEditing) {
    return React.createElement(Tag, { className, style }, children)
  }

  const handleBlur = () => {
    const text = ref.current?.textContent || ''
    if (typeof index === 'number' && arrayField) {
      updateNestedField(arrayField, index, field, text)
    } else {
      updateField(field, text)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault()
      ref.current?.blur()
    }
  }

  return React.createElement(Tag, {
    ref,
    className: `${className} editable-highlight`,
    style: {
      ...style,
      outline: 'none',
      cursor: 'text',
      borderBottom: '1px dashed rgba(196,104,58,0.5)',
      transition: 'border-color 0.2s',
    },
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  }, children)
}
