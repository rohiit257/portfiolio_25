"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  provider?: string;
}

// ── Constants ──────────────────────────────────────────────────────────────────
const QUICK_QUESTIONS = [
  "What's Rohit's main expertise?",
  "Where is he working now?",
  "Tell me about Versus platform",
  "What blockchain tech does he use?",
  "Is he available for hire?",
  "Best way to contact Rohit?",
];

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey! I'm Rohit's AI assistant 👋\n\nAsk me anything about his skills, projects, experience, or how to get in touch.",
  provider: "system",
};

// ── URL → clickable link renderer ─────────────────────────────────────────────
const URL_REGEX = /(https?:\/\/[^\s<>"')\]]+)/g;

function renderWithLinks(text: string) {
  const parts = text.split(URL_REGEX);
  return parts.map((part, i) => {
    if (URL_REGEX.test(part)) {
      // reset lastIndex after test()
      URL_REGEX.lastIndex = 0;
      const display = part
        .replace(/^https?:\/\/(www\.)?/, "")
        .replace(/\/$/, "");
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-emerald-500 hover:text-emerald-400 underline underline-offset-2 transition-colors duration-150 break-all"
        >
          {display}
          <ExternalLink className="h-2.5 w-2.5 shrink-0 opacity-70" />
        </a>
      );
    }
    // Render newlines as <br>
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

// ── Component ──────────────────────────────────────────────────────────────────
export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // ── Scroll helpers ──────────────────────────────────────────────────────────
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      // slight delay so panel is fully rendered
      setTimeout(scrollToBottom, 50);
    }
  }, [messages, isOpen, scrollToBottom]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 60);
  };

  // ── Focus on open ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 180);
  }, [isOpen]);

  // ── Close on Escape ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // ── Send message ────────────────────────────────────────────────────────────
  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed };
    const history = messages.filter((m) => m.id !== "welcome");

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply,
          provider: data.provider,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Sorry, something went wrong. Reach out directly at rohitshahi581@gmail.com",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
  };

  const resetChat = () => {
    setMessages([WELCOME]);
    setInput("");
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Toggle button — always at bottom-right, above the floating dock ── */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close assistant" : "Chat with Rohit's AI"}
        className={`
          fixed z-[60]
          bottom-[5.5rem] right-4
          sm:bottom-24 sm:right-6
          h-12 w-12 rounded-2xl
          flex items-center justify-center
          border shadow-lg
          transition-all duration-300 ease-out
          ${
            isOpen
              ? "bg-card border-border text-foreground hover:bg-secondary/60"
              : "bg-foreground text-background border-transparent hover:scale-110 hover:-translate-y-0.5 hover:shadow-xl"
          }
        `}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <div className="relative">
            <MessageSquare className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        )}
      </button>

      {/* ── Chat panel ── */}
      <div
        ref={panelRef}
        className={`
          fixed z-[59]
          /* Mobile: full-width sheet rising from the bottom */
          bottom-0 left-0 right-0
          /* Desktop: floating panel above toggle */
          sm:bottom-[8.5rem] sm:left-auto sm:right-6
          sm:w-[380px]
          transition-all duration-300 ease-out origin-bottom
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 translate-y-3 pointer-events-none"
          }
        `}
        role="dialog"
        aria-label="AI Assistant"
      >
        <div
          className="
            flex flex-col
            /* Mobile: taller sheet */
            h-[82dvh] max-h-[620px]
            /* Desktop */
            sm:h-[560px] sm:rounded-2xl
            rounded-t-2xl
            border border-border
            bg-card/98 backdrop-blur-2xl
            shadow-2xl overflow-hidden
          "
        >
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-card shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="h-8 w-8 rounded-xl bg-foreground/8 border border-border/50 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-card" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">Rohit&apos;s Assistant</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5 text-emerald-500/70" />
                  Powered by Groq · Mistral RAG
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={resetChat}
                aria-label="Reset conversation"
                title="Reset chat"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-200 sm:hidden"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* ── Messages ── */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-3 py-4 space-y-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} items-end`}
              >
                {/* Avatar */}
                <div
                  className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 mb-0.5 ${
                    msg.role === "user"
                      ? "bg-foreground text-background"
                      : "bg-secondary/80 border border-border/50 text-foreground"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-3 w-3" />
                  ) : (
                    <Bot className="h-3 w-3" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`
                    max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed
                    ${
                      msg.role === "user"
                        ? "bg-foreground text-background rounded-br-sm"
                        : "bg-secondary/50 border border-border/40 text-foreground rounded-bl-sm"
                    }
                  `}
                >
                  {renderWithLinks(msg.content)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-end">
                <div className="h-6 w-6 rounded-lg bg-secondary/80 border border-border/50 flex items-center justify-center shrink-0 mb-0.5">
                  <Bot className="h-3 w-3" />
                </div>
                <div className="bg-secondary/50 border border-border/40 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1.5 items-center">
                    <span
                      className="h-1.5 w-1.5 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="h-1.5 w-1.5 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "160ms" }}
                    />
                    <span
                      className="h-1.5 w-1.5 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "320ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Scroll-to-bottom fab */}
          {showScrollBtn && (
            <button
              onClick={scrollToBottom}
              className="absolute right-3 bottom-[140px] h-7 w-7 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 z-10"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          )}

          {/* ── Quick Questions ── */}
          <div className="px-3 pt-2.5 pb-1 border-t border-border/40 shrink-0 bg-card/50">
            <p className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-1.5 px-0.5">
              Quick questions
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  disabled={isLoading}
                  className="
                    whitespace-nowrap text-[10px] px-2.5 py-1 rounded-full
                    border border-border/50 bg-secondary/20 text-muted-foreground
                    hover:bg-secondary/70 hover:text-foreground hover:border-border
                    transition-all duration-200 shrink-0
                    disabled:opacity-30 disabled:cursor-not-allowed
                    active:scale-95
                  "
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* ── Input ── */}
          <div className="px-3 pb-4 pt-1.5 shrink-0">
            <div
              className="
                flex items-end gap-2
                bg-secondary/20 border border-border/50 rounded-xl
                px-3 py-2
                focus-within:border-foreground/25 focus-within:bg-secondary/40
                transition-all duration-200
              "
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about Rohit…"
                rows={1}
                disabled={isLoading}
                className="
                  flex-1 bg-transparent text-sm resize-none outline-none
                  placeholder:text-muted-foreground/40
                  leading-relaxed disabled:opacity-40
                  max-h-[100px]
                "
                style={{ height: "22px" }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                aria-label="Send"
                className="
                  h-7 w-7 rounded-lg flex items-center justify-center
                  bg-foreground text-background shrink-0
                  transition-all duration-200
                  hover:scale-105 hover:opacity-90
                  disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:scale-100
                  active:scale-95
                "
              >
                <Send className="h-3 w-3" />
              </button>
            </div>
            <p className="text-[9px] text-muted-foreground/30 text-center mt-1.5 select-none">
              ↵ to send · Shift+↵ for newline · Esc to close
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
