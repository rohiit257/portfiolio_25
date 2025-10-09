"use client";

import { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export function GitHubContributions({ username = "rohitdebugbugs" }: { username?: string }) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        // Calculate date range for last 365 days
        const today = new Date();
        const oneYearAgo = new Date(today);
        oneYearAgo.setDate(today.getDate() - 365 );

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
        console.log(response)
        const json = await response.json();
        const calendar =
          json.data.user.contributionsCollection.contributionCalendar;

        setTotalContributions(calendar.totalContributions);

        const days: ContributionDay[] = [];
        calendar.weeks.forEach((week: any) => {
          week.contributionDays.forEach((day: any) => {
            const count = day.contributionCount;
            days.push({
              date: day.date,
              count,
              level:
                count === 0
                  ? 0
                  : count <= 2
                  ? 1
                  : count <= 4
                  ? 2
                  : count <= 6
                  ? 3
                  : 4,
            });
          });
        });

        setContributions(days);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    }

    fetchContributions();
  }, [username]);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-secondary";
      case 1:
        return "bg-foreground/20";
      case 2:
        return "bg-foreground/40";
      case 3:
        return "bg-foreground/60";
      case 4:
        return "bg-foreground/80";
      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              GitHub Activity
            </h2>
            <p className="text-muted-foreground">Loading contribution data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              GitHub Activity
            </h2>
            <p className="text-muted-foreground">
              Unable to load contribution data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            GitHub Activity
          </h2>
          <p className="text-muted-foreground">
            {totalContributions} contributions in the last year
          </p>
          <p className="text-muted-foreground">@{username}</p>
        </div>

        <div className="space-y-4">
          <div className="overflow-x-auto">
            <div className="inline-flex gap-1 p-6 bg-secondary/30 rounded-lg min-w-max">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-2.5 h-2.5 rounded-sm ${getLevelColor(day.level)} transition-colors hover:ring-2 hover:ring-foreground/50`}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-2.5 h-2.5 rounded-sm ${getLevelColor(level)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
