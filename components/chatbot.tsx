"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  RotateCcw,
  ChevronDown,
  ExternalLink,
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
  content:
    "Hey! I'm Rohit's AI. Ask me anything about his work, skills, projects, or contact details.",
};

const URL_RE = /(https?:\/\/[^\s<>"')]+)/g;

function MessageContent({ text }: { text: string }) {
  const parts = text.split(URL_RE);

  return (
    <>
      {parts.map((part, index) => {
        if (/^https?:\/\//.test(part)) {
          const label = part
            .replace(/^https?:\/\/(www\.)?/, "")
            .replace(/\/$/, "");

          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 break-all text-foreground underline underline-offset-4 transition-opacity duration-150 hover:opacity-70"
            >
              {label}
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
          );
        }

        return part.split("\n").map((line, lineIndex, array) => (
          <span key={`${index}-${lineIndex}`}>
            {line}
            {lineIndex < array.length - 1 && <br />}
          </span>
        ));
      })}
    </>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [atBottom, setAtBottom] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const toBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open) {
      window.setTimeout(toBottom, 60);
    }
  }, [msgs, open, toBottom]);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 180);
    }
  }, [open]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const onScroll = () => {
    const element = scrollRef.current;
    if (!element) return;

    setAtBottom(
      element.scrollHeight - element.scrollTop - element.clientHeight < 48
    );
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    const history = msgs.filter((message) => message.id !== "welcome");

    setMsgs((current) => [...current, userMsg]);
    setInput("");

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: history.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setMsgs((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply,
          provider: data.provider,
        },
      ]);
    } catch {
      setMsgs((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Something went wrong. Try rohitshahi581@gmail.com",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send(input);
    }
  };

  const onInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${Math.min(event.target.scrollHeight, 110)}px`;
  };

  return (
    <>
      <button
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`fixed bottom-4 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-[1.1rem] border shadow-[0_16px_40px_rgba(0,0,0,0.16)] transition-all duration-300 sm:bottom-5 sm:right-5 ${
          open
            ? "border-border/80 bg-card/90 text-foreground backdrop-blur-xl"
            : "border-border/70 bg-card/92 text-foreground backdrop-blur-xl hover:-translate-y-0.5 hover:scale-105"
        }`}
      >
        {open ? (
          <X className="h-4 w-4" />
        ) : (
          <div className="relative">
            <MessageSquare className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        )}
      </button>

      <div
        role="dialog"
        aria-label="AI Assistant"
        className={`fixed inset-x-0 bottom-0 z-[59] transition-all duration-300 ease-out sm:inset-x-auto sm:bottom-[5rem] sm:right-5 sm:w-[340px] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <div className="flex h-[78dvh] max-h-[640px] flex-col overflow-hidden rounded-t-[1.4rem] border border-border/80 bg-card/95 shadow-[0_26px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:h-[510px] sm:rounded-[1.4rem]">
          <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {"//assistant"}
                </p>
                <p className="text-sm font-medium text-foreground">
                  Rohit&apos;s AI
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setMsgs([WELCOME]);
                  setInput("");
                }}
                aria-label="Reset chat"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-colors duration-150 hover:border-border/70 hover:bg-secondary/50 hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-colors duration-150 hover:border-border/70 hover:bg-secondary/50 hover:text-foreground sm:hidden"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="border-b border-border/70 px-4 py-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Portfolio context active
            </div>
          </div>

          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex-1 space-y-3 overflow-y-auto px-3 py-3"
          >
            {msgs.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[0.85rem] border text-[10px] ${
                    msg.role === "user"
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/70 bg-secondary/45 text-foreground"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-3 w-3" />
                  ) : (
                    <Bot className="h-3 w-3" />
                  )}
                </div>

                <div
                  className={`max-w-[82%] rounded-[1.1rem] px-3 py-2.5 text-[13px] leading-6 ${
                    msg.role === "user"
                      ? "rounded-br-sm bg-foreground text-background"
                      : "rounded-bl-sm border border-border/70 bg-secondary/30 text-foreground"
                  }`}
                >
                  <MessageContent text={msg.content} />
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-end gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[0.85rem] border border-border/70 bg-secondary/45 text-foreground">
                  <Bot className="h-3 w-3" />
                </div>
                <div className="rounded-[1.1rem] rounded-bl-sm border border-border/70 bg-secondary/30 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {[0, 160, 320].map((delay) => (
                      <span
                        key={delay}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/55"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={endRef} />

            {!atBottom && (
              <button
                onClick={toBottom}
                className="sticky bottom-1 ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-card/95 text-muted-foreground shadow-sm transition-all duration-150 hover:text-foreground"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="border-t border-border/70 px-3 py-2">
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="shrink-0 rounded-full border border-border/70 bg-secondary/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-150 hover:border-foreground/15 hover:bg-secondary/45 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="px-3 pb-4 pt-2">
            <div className="rounded-[1.15rem] border border-border/70 bg-background/55 p-2">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={onInput}
                  onKeyDown={onKey}
                  placeholder="Ask anything about Rohit..."
                  rows={1}
                  disabled={loading}
                  style={{ height: "22px" }}
                  className="max-h-[110px] flex-1 resize-none bg-transparent px-1 py-1 text-[13px] leading-6 text-foreground outline-none placeholder:text-muted-foreground/55 disabled:opacity-40"
                />
                <button
                  onClick={() => send(input)}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="flex h-9 w-9 items-center justify-center rounded-[0.95rem] border border-foreground bg-foreground text-background transition-all duration-150 hover:opacity-88 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <p className="mt-1.5 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/45">
              Enter send · Shift + Enter newline
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
