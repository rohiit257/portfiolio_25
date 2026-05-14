"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageSquare, X, Send, Bot, User,
  RotateCcw, ChevronDown, ExternalLink, Zap,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  provider?: string;
}

const QUICK = [
  "What's Rohit's expertise?",
  "Current job?",
  "Best project?",
  "Blockchain skills?",
  "Available to hire?",
  "Contact info?",
];

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hey! 👋 I'm Rohit's AI. Ask me anything about his work, skills, or projects.",
};

// ── Link renderer ───────────────────────────────────────────────────────────
const URL_RE = /(https?:\/\/[^\s<>"')]+)/g;

function MessageContent({ text }: { text: string }) {
  const parts = text.split(URL_RE);
  return (
    <>
      {parts.map((part, i) => {
        if (/^https?:\/\//.test(part)) {
          const label = part.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-emerald-500 hover:text-emerald-400 underline underline-offset-2 break-all transition-colors"
            >
              {label}
              <ExternalLink className="h-2.5 w-2.5 shrink-0" />
            </a>
          );
        }
        return part.split("\n").map((line, j, arr) => (
          <span key={`${i}-${j}`}>
            {line}
            {j < arr.length - 1 && <br />}
          </span>
        ));
      })}
    </>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [atBottom, setAtBottom] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef    = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  // scroll to bottom
  const toBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { if (open) setTimeout(toBottom, 60); }, [msgs, open, toBottom]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 200); }, [open]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 50);
  };

  // send
  const send = async (text: string) => {
    const t = text.trim();
    if (!t || loading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: t };
    const hist = msgs.filter((m) => m.id !== "welcome");
    setMsgs((p) => [...p, userMsg]);
    setInput("");
    if (inputRef.current) { inputRef.current.style.height = "auto"; }
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: t,
          history: hist.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMsgs((p) => [...p, { id: crypto.randomUUID(), role: "assistant", content: data.reply, provider: data.provider }]);
    } catch {
      setMsgs((p) => [...p, { id: crypto.randomUUID(), role: "assistant", content: "Something went wrong. Try rohitshahi581@gmail.com" }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`;
  };

  return (
    <>
      {/*
        ── Chat toggle button
        bottom-[5.5rem] on mobile sits just above the dock (dock is at bottom-5 + ~52px height ≈ 5.5rem)
        On sm+ dock is at bottom-7 + ~52px ≈ 6.5rem → use sm:bottom-[6.5rem]
      */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with AI"}
        className={`
          fixed z-[60]
          bottom-[5.5rem] right-4
          sm:bottom-[6.5rem] sm:right-5
          h-11 w-11 rounded-2xl
          flex items-center justify-center
          border shadow-lg transition-all duration-300
          ${open
            ? "bg-card border-border text-foreground rotate-0 scale-100"
            : "bg-foreground text-background border-transparent hover:scale-110 hover:-translate-y-0.5 hover:shadow-xl"
          }
        `}
      >
        {open
          ? <X className="h-4 w-4" />
          : (
            <div className="relative">
              <MessageSquare className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full border border-background animate-pulse" />
            </div>
          )
        }
      </button>

      {/*
        ── Chat panel
        Mobile: rises from the bottom as a sheet
        Desktop: floating panel above the toggle button
      */}
      <div
        role="dialog"
        aria-label="AI Assistant"
        className={`
          fixed z-[59]
          /* mobile: full-width bottom sheet */
          inset-x-0 bottom-0
          /* desktop: floating panel */
          sm:inset-x-auto sm:bottom-[8rem] sm:right-5 sm:w-[370px]
          transition-all duration-300 ease-out origin-bottom-right
          ${open
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
            : "opacity-0 translate-y-3 pointer-events-none scale-[0.97]"
          }
        `}
      >
        <div className="
          flex flex-col overflow-hidden
          bg-card/98 backdrop-blur-2xl
          border border-border
          shadow-2xl shadow-black/20
          /* mobile: tall sheet with top corners */
          h-[80dvh] max-h-[600px] rounded-t-2xl
          /* desktop: fully rounded, shorter */
          sm:h-[540px] sm:max-h-none sm:rounded-2xl
        ">

          {/* ── Header ── */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 rounded-xl bg-secondary/60 border border-border/40 flex items-center justify-center">
                <Bot className="h-3.5 w-3.5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-card" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">Rohit&apos;s AI</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                  <Zap className="h-2.5 w-2.5 text-emerald-500/70" />
                  Groq · Mistral RAG
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => { setMsgs([WELCOME]); setInput(""); }}
                aria-label="Reset chat"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-150"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-150 sm:hidden"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* ── Messages ── */}
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-3 relative"
          >
            {msgs.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 items-end ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 mb-0.5 text-[10px] ${
                  msg.role === "user"
                    ? "bg-foreground text-background"
                    : "bg-secondary/70 border border-border/40 text-foreground"
                }`}>
                  {msg.role === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                </div>

                {/* Bubble */}
                <div className={`
                  max-w-[78%] text-sm leading-relaxed px-3 py-2 rounded-2xl
                  ${msg.role === "user"
                    ? "bg-foreground text-background rounded-br-sm"
                    : "bg-secondary/40 border border-border/30 text-foreground rounded-bl-sm"
                  }
                `}>
                  <MessageContent text={msg.content} />
                </div>
              </div>
            ))}

            {/* Typing dots */}
            {loading && (
              <div className="flex gap-2 items-end">
                <div className="h-6 w-6 rounded-lg bg-secondary/70 border border-border/40 flex items-center justify-center shrink-0 mb-0.5">
                  <Bot className="h-3 w-3" />
                </div>
                <div className="bg-secondary/40 border border-border/30 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1 items-center">
                    {[0, 160, 320].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 bg-muted-foreground/50 rounded-full animate-bounce"
                        style={{ animationDelay: `${d}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />

            {/* Scroll to bottom */}
            {!atBottom && (
              <button
                onClick={toBottom}
                className="sticky bottom-2 ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-card border border-border shadow-md text-muted-foreground hover:text-foreground transition-all hover:scale-110"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* ── Quick questions ── */}
          <div className="px-3 pt-2 pb-1 border-t border-border/40 shrink-0">
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="
                    whitespace-nowrap text-[10px] px-2.5 py-1 rounded-full shrink-0
                    border border-border/50 bg-secondary/20 text-muted-foreground
                    hover:bg-secondary/60 hover:text-foreground hover:border-border
                    transition-all duration-150 active:scale-95
                    disabled:opacity-30 disabled:cursor-not-allowed
                  "
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* ── Input ── */}
          <div className="px-3 pb-4 pt-1 shrink-0">
            <div className="
              flex items-end gap-2
              border border-border/50 rounded-xl
              bg-secondary/20 px-3 py-2
              focus-within:border-foreground/20 focus-within:bg-secondary/40
              transition-all duration-150
            ">
              <textarea
                ref={inputRef}
                value={input}
                onChange={onInput}
                onKeyDown={onKey}
                placeholder="Ask anything about Rohit…"
                rows={1}
                disabled={loading}
                style={{ height: "22px" }}
                className="flex-1 bg-transparent text-sm resize-none outline-none placeholder:text-muted-foreground/40 leading-relaxed disabled:opacity-40 max-h-[96px]"
              />
              <button
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="h-7 w-7 rounded-lg flex items-center justify-center bg-foreground text-background shrink-0 transition-all duration-150 hover:opacity-90 hover:scale-105 disabled:opacity-25 disabled:cursor-not-allowed active:scale-95"
              >
                <Send className="h-3 w-3" />
              </button>
            </div>
            <p className="text-[9px] text-muted-foreground/30 text-center mt-1 select-none">
              ↵ send · Shift+↵ newline · Esc close
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
