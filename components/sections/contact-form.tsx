"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you! We'll be in touch soon.")
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border rounded-lg p-8 bg-white">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="font-heading font-bold text-foreground uppercase text-sm tracking-wider">Name *</Label>
          <Input id="name" placeholder="Your name" className="border border-border rounded h-12 text-foreground" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="font-heading font-bold text-foreground uppercase text-sm tracking-wider">Email *</Label>
          <Input id="email" type="email" inputMode="email" placeholder="your@email.com" className="border border-border rounded h-12 text-foreground" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="font-heading font-bold text-foreground uppercase text-sm tracking-wider">Message *</Label>
          <Textarea id="message" placeholder="Your message here..." className="border border-border rounded text-foreground" rows={5} required />
        </div>
        <Button type="submit" className="w-full md:w-auto px-8 py-3 bg-[#D5B13A] text-black font-heading font-bold uppercase text-sm tracking-wider hover:bg-[#C1A561] transition-colors rounded">
          Send Message
        </Button>
      </div>
    </form>
  )
}
