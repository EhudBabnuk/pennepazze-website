"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface OrderModalContextValue {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const OrderModalContext = createContext<OrderModalContextValue>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
})

export function useOrderModal() {
  return useContext(OrderModalContext)
}

export function OrderModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <OrderModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </OrderModalContext.Provider>
  )
}
