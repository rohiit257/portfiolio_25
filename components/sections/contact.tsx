"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({
    title: "Message Sent!",
    description: "Thanks for reaching out! I'll get back to you as soon as possible.",
    isError: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: new Date().toISOString(),
          source: "portfolio-contact-form",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to send message: ${response.status} ${errorText}`);
      }

      try {
        await response.json();
      } catch {
        // Webhook can return a non-JSON success body.
      }

      setStatus("sent");
      setDialogMessage({
        title: "Message Sent!",
        description: "Thanks for reaching out! I'll get back to you as soon as possible.",
        isError: false,
      });
      setShowDialog(true);

      window.setTimeout(() => {
        setShowDialog(false);
        setStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    } catch (error) {
      setStatus("idle");
      setDialogMessage({
        title: "Error Sending Message",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again later or contact me directly.",
        isError: true,
      });
      setShowDialog(true);

      window.setTimeout(() => {
        setShowDialog(false);
      }, 3000);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <section className="border-t border-border/70 py-8 sm:py-9" id="contact">
      <div className="grid gap-7 lg:grid-cols-[140px_minmax(0,1fr)]">
        <Reveal className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {"//contact"}
          </p>
          <p className="max-w-[13rem] text-sm leading-6 text-muted-foreground">
            For deeper project conversations, use the full form here.
          </p>
        </Reveal>

        <Reveal>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-[1.35rem] border border-border/70 bg-background/45 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-5 lg:p-6"
          >
            <div className="mb-6 flex flex-col gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <h2 className="text-xl font-medium tracking-[-0.05em] text-foreground sm:text-[1.7rem]">
                  Get in touch
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
                  Have a project in mind? Tell me what you are building and I
                  will get back to you.
                </p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                response workflow active
              </span>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  name
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[1rem] border border-border/70 bg-card/75 px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-foreground/15"
                  placeholder="Your name"
                />
              </label>

              <label className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  email
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[1rem] border border-border/70 bg-card/75 px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-foreground/15"
                  placeholder="your@email.com"
                />
              </label>

              <label className="space-y-2 lg:col-span-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  message
                </span>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full resize-none rounded-[1rem] border border-border/70 bg-card/75 px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-foreground/15"
                  placeholder="Tell me about the product, timeline, or problem you want to solve..."
                />
              </label>

              <div className="lg:col-span-2">
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform duration-200 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto sm:min-w-[180px]"
                >
                  {status === "idle" && (
                    <>
                      <Send className="h-4 w-4" />
                      Send message
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                      Sending...
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Sent
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </Reveal>
      </div>

      {showDialog && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-status-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-sm rounded-[1.5rem] border border-border/70 bg-card/95 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full ${
                  dialogMessage.isError ? "bg-red-500/12" : "bg-emerald-500/12"
                }`}
              >
                {dialogMessage.isError ? (
                  <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <button
                type="button"
                aria-label="Close message status"
                onClick={() => setShowDialog(false)}
                className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3
                id="contact-status-title"
                className="text-lg font-medium tracking-[-0.03em] text-foreground"
              >
                {dialogMessage.title}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {dialogMessage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
