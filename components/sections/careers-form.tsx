"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function CareersForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="border border-[#D5B13A]/40 rounded-lg p-12 bg-[#FAFAFA] text-center">
        <p className="font-heading font-bold text-foreground uppercase tracking-wider mb-2" style={{ fontSize: "1.25rem" }}>Thank You!</p>
        <p className="text-muted-foreground" style={{ fontFamily: "var(--font-body), 'Open Sans', sans-serif", fontSize: "1rem", lineHeight: 1.6 }}>
          We&apos;ve received your application and will be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="first-name" className="font-heading font-bold text-foreground uppercase text-xs tracking-wider">First Name *</Label>
          <Input id="first-name" required placeholder="Maria" className="border-[#E8E8E8] focus:border-[#D5B13A]" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="last-name" className="font-heading font-bold text-foreground uppercase text-xs tracking-wider">Last Name *</Label>
          <Input id="last-name" required placeholder="Rossi" className="border-[#E8E8E8] focus:border-[#D5B13A]" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="font-heading font-bold text-foreground uppercase text-xs tracking-wider">Email Address *</Label>
        <Input id="email" type="email" required placeholder="maria@example.com" className="border-[#E8E8E8] focus:border-[#D5B13A]" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" className="font-heading font-bold text-foreground uppercase text-xs tracking-wider">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="border-[#E8E8E8] focus:border-[#D5B13A]" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="position" className="font-heading font-bold text-foreground uppercase text-xs tracking-wider">Position Interested In</Label>
        <Input id="position" placeholder="e.g. Line Cook, Server, Delivery Driver" className="border-[#E8E8E8] focus:border-[#D5B13A]" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="font-heading font-bold text-foreground uppercase text-xs tracking-wider">Tell Us About Yourself</Label>
        <Textarea id="message" rows={5} placeholder="Share your experience and why you'd like to join PennePazze..." className="border-[#E8E8E8] focus:border-[#D5B13A] resize-none" />
      </div>
      <Button type="submit" className="bg-[#D5B13A] text-black hover:bg-[#C1A561] font-heading font-bold uppercase tracking-wider py-3 rounded transition-colors w-full md:w-auto md:px-12 self-start">
        Submit Application
      </Button>
    </form>
  )
}
