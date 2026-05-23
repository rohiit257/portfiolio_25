import { NextResponse } from "next/server";

export const revalidate = 3600;

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

function levelForCount(count: number) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_GRAPHQL_TOKEN;

  if (!token) {
    return NextResponse.json(
      { totalContributions: 0, contributions: [] },
      { headers: { "Cache-Control": "public, max-age=300" } }
    );
  }

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
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
    next: { revalidate },
  });

  if (!response.ok) {
    return NextResponse.json(
      { totalContributions: 0, contributions: [] },
      { status: 200, headers: { "Cache-Control": "public, max-age=300" } }
    );
  }

  const json = await response.json();
  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    return NextResponse.json({ totalContributions: 0, contributions: [] });
  }

  const contributions: ContributionDay[] = [];
  calendar.weeks.forEach((week: any) => {
    week.contributionDays.forEach((day: any) => {
      const count = Number(day.contributionCount) || 0;
      contributions.push({
        date: day.date,
        count,
        level: levelForCount(count),
      });
    });
  });

  return NextResponse.json(
    {
      totalContributions: calendar.totalContributions,
      contributions,
    },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
