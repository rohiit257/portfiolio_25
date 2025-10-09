"use client";

import React, { useState } from "react";
import { Send, X } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus("sent");
    setShowDialog(true);
    
    setTimeout(() => {
      setShowDialog(false);
      setStatus("idle");
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-16 sm:py-20" id="contact">
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Get in Touch</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Have a project in mind? Let's talk about it.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 md:p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border border-border/40 bg-secondary/30 focus:bg-secondary/50 focus:border-foreground/50 focus:outline-none transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border border-border/40 bg-secondary/30 focus:bg-secondary/50 focus:border-foreground/50 focus:outline-none transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border border-border/40 bg-secondary/30 focus:bg-secondary/50 focus:border-foreground/50 focus:outline-none transition-all duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 text-sm sm:text-base bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {status === "idle" && (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
              {status === "sending" && (
                <>
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending...
                </>
              )}
              {status === "sent" && (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sent!
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Success Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl animate-scale-in">
            <div className="flex justify-between items-start mb-4">
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <button
                onClick={() => setShowDialog(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground text-sm">
              Thanks for reaching out! I'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
