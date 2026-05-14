"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Github,
  Mail,
  MessageSquareShare,
  NotebookPen,
  RadioTower,
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const channelLinks = [
  {
    href: "https://twitter.com/rohitdebugbugs",
    label: "X / Twitter",
    value: "@rohitdebugbugs",
  },
  {
    href: "https://rohitdebugbugs.hashnode.dev",
    label: "Hashnode",
    value: "Technical writing",
  },
  {
    href: "https://metabazaar.vercel.app/mint",
    label: "Mint NFT",
    value: "Launch app",
  },
];

const spotlightItems = [
  {
    icon: Github,
    label: "Open source",
    value: "Code and experiments",
  },
  {
    icon: NotebookPen,
    label: "Writing",
    value: "Technical notes",
  },
  {
    icon: RadioTower,
    label: "Focus",
    value: "Web3, AI, full-stack",
  },
];

export function SocialGrid() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);
  const [showContactDialog, setShowContactDialog] = useState(false);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const username = "rohiit257";
        const today = new Date();
        const oneYearAgo = new Date(today);
        oneYearAgo.setDate(today.getDate() - 365);

        const query = `
          query {
            user(login: "${username}") {
              contributionsCollection(from: "${oneYearAgo.toISOString()}", to: "${today.toISOString()}") {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `;

        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch contribution data");
        }

        const json = await response.json();
        const calendar = json.data.user.contributionsCollection.contributionCalendar;

        setTotalContributions(calendar.totalContributions);

        const days: ContributionDay[] = [];
        calendar.weeks.forEach((week: any) => {
          week.contributionDays.forEach((day: any) => {
            const count = day.contributionCount;
            days.push({
              date: day.date,
              count,
              level: count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4,
            });
          });
        });

        setContributions(days);
      } catch {
        // Keep the UI stable if GitHub data is unavailable.
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-secondary/80";
      case 1:
        return "bg-zinc-300 dark:bg-zinc-700";
      case 2:
        return "bg-zinc-400 dark:bg-zinc-600";
      case 3:
        return "bg-zinc-500 dark:bg-zinc-500";
      case 4:
        return "bg-zinc-700 dark:bg-zinc-300";
      default:
        return "bg-secondary/80";
    }
  };

  const weeks = [];
  for (let index = 0; index < contributions.length; index += 7) {
    weeks.push(contributions.slice(index, index + 7));
  }
  const mobileWeekStartIndex = Math.max(weeks.length - 26, 0);

  return (
    <section className="border-t border-border/70 py-7 sm:py-9">
      <div className="grid gap-6 lg:grid-cols-[140px_minmax(0,1fr)]">
        <Reveal className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {"//network"}
          </p>
          <p className="max-w-[13rem] text-sm leading-6 text-muted-foreground">
            Live activity, links, demos, and a quick route to reach out.
          </p>
        </Reveal>

        <RevealGroup className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <RevealItem className="sm:col-span-2 xl:col-span-3">
            <motion.article
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="rounded-[1.15rem] border border-border/70 bg-background/45 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.05)]"
            >
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {"//github activity"}
                  </p>
                  <h3 className="text-base font-medium text-foreground sm:text-lg">
                    Contribution graph
                  </h3>
                </div>
                <a
                  href="https://github.com/rohiit257"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  <Github className="h-3.5 w-3.5" />
                  {totalContributions} contributions
                </a>
              </div>

              {loading ? (
                <div className="flex h-20 items-center justify-center rounded-[0.9rem] border border-border/60 bg-card/55 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  syncing activity...
                </div>
              ) : (
                <div className="overflow-hidden rounded-[0.9rem] border border-border/60 bg-card/55 p-2.5 sm:overflow-x-auto sm:p-3">
                  <div className="inline-flex max-w-full gap-[3px] sm:min-w-max sm:gap-1">
                    {weeks.map((week, weekIndex) => (
                      <div
                        key={weekIndex}
                        className={`flex-col gap-[3px] sm:gap-1 ${
                          weekIndex < mobileWeekStartIndex ? "hidden sm:flex" : "flex"
                        }`}
                      >
                        {week.map((day, dayIndex) => (
                          <div
                            key={dayIndex}
                            className={`h-2 w-2 rounded-[3px] sm:h-2.5 sm:w-2.5 sm:rounded-[4px] ${getLevelColor(day.level)} transition-transform duration-150 hover:scale-110`}
                            title={`${day.date}: ${day.count} contributions`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>
          </RevealItem>

          {channelLinks.map((link) => (
            <RevealItem key={link.href}>
              <SocialCard href={link.href} label={link.label} value={link.value} />
            </RevealItem>
          ))}

          <RevealItem>
            <motion.button
              type="button"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setShowContactDialog(true)}
              className="flex h-full min-h-[7rem] w-full items-start justify-between gap-4 rounded-[1.15rem] border border-border/70 bg-background/45 p-4 text-left shadow-[0_14px_34px_rgba(15,23,42,0.05)] transition-colors duration-200 hover:border-foreground/15 hover:bg-card/60"
            >
              <div className="min-w-0 space-y-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/80">
                  <MessageSquareShare className="h-4 w-4 text-muted-foreground" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">Direct contact</p>
                  <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                    Email, GitHub, and socials
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </motion.button>
          </RevealItem>

          {spotlightItems.map((item) => (
            <RevealItem key={item.label}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex h-full min-h-[7rem] flex-col justify-between rounded-[1.15rem] border border-border/70 bg-background/45 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.05)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/80">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </span>
                <div className="mt-4 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {showContactDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 p-4 backdrop-blur-sm"
          onClick={() => setShowContactDialog(false)}
        >
          <div
            className="w-full max-w-md rounded-[1.25rem] border border-border/70 bg-card/95 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {"//direct contact"}
                </p>
                <h3 className="text-xl font-medium text-foreground">
                  Let&apos;s connect
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowContactDialog(false)}
                className="rounded-full border border-border/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                close
              </button>
            </div>

            <div className="space-y-3">
              <SocialLink
                href="mailto:rohitshahi581@gmail.com"
                label="Email"
                value="rohitshahi581@gmail.com"
                icon={Mail}
              />
              <SocialLink
                href="https://github.com/rohiit257"
                label="GitHub"
                value="@rohiit257"
                icon={Github}
              />
              <SocialLink
                href="https://twitter.com/rohitdebugbugs"
                label="X / Twitter"
                value="@rohitdebugbugs"
                icon={ArrowUpRight}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function SocialCard({
  href,
  label,
  value,
}: {
  href: string;
  label: string;
  value: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex h-full min-h-[7rem] items-start justify-between gap-4 rounded-[1.15rem] border border-border/70 bg-background/45 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.05)] transition-colors duration-200 hover:border-foreground/15 hover:bg-card/60"
    >
      <div className="min-w-0 space-y-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/80">
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </span>
        <div>
          <p className="truncate text-sm font-medium text-foreground">{label}</p>
          <p className="mt-1 truncate text-[11px] leading-5 text-muted-foreground">
            {value}
          </p>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </motion.a>
  );
}

function SocialLink({
  href,
  label,
  value,
  icon: Icon,
}: {
  href: string;
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex min-w-0 items-center justify-between gap-4 rounded-[1rem] border border-border/70 bg-background/45 px-4 py-3 transition-colors duration-200 hover:border-foreground/15 hover:bg-card/60"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card/80">
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-foreground">{label}</p>
          <p className="truncate text-[11px] text-muted-foreground">{value}</p>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </a>
  );
}
