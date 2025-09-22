﻿import { TooltipStyled } from '../Common/TooltipStyled'
import { useCallback, useState } from 'react'
import { Modal } from '../Common/Modal'
import { Button } from '../Common/Button'

interface Props {
  idx: number
  handlePaste: (text: string) => void
}

export function PasteButton({ handlePaste, idx }: Props) {
  const [input, setInput] = useState('')
  const [inputModalOpen, setInputModalOpen] = useState(false)

  const onCloseModal = useCallback(() => {
    setInputModalOpen(false)
    setInput('')
  }, [])

  const onConfirmModal = useCallback(() => {
    handlePaste(input)
    onCloseModal()
  }, [onCloseModal, handlePaste, input])

  const handleClick = async () => {
    if (navigator.clipboard.readText) {
      const text = await navigator.clipboard.readText()
      if (text) {
        handlePaste(text)
        return
      }
    }

    setInputModalOpen(true)
  }

  return (
    <div>
      <div
        className="cursor-pointer text-teal-500 select-none"
        onClick={handleClick}
        data-tooltip-id={`paste-character-${idx}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
      </div>
      <TooltipStyled id={`paste-character-${idx}`}>Paste from addon</TooltipStyled>
      {inputModalOpen && (
        <Modal
          title="Paste MDT string"
          onConfirm={onConfirmModal}
          onClose={onCloseModal}
          closeOnEscape
          closeOnClickOutside
          contents={
            <textarea
              autoFocus
              className="p-2 w-full h-[200px] resize-none "
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Paste MDT string here"
            />
          }
          buttons={
            <>
              <Button onClick={onCloseModal}>Cancel</Button>
              <Button onClick={onConfirmModal}>Confirm</Button>
            </>
          }
        />
      )}
    </div>
  )
}
