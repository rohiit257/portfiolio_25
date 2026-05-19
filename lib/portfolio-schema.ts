import { getDb } from "@/lib/vector-store";

export async function initPortfolioTables() {
  const sql = getDb();

  await sql`
    CREATE TABLE IF NOT EXISTS tech_stacks (
      id              SERIAL PRIMARY KEY,
      name            TEXT NOT NULL UNIQUE,
      simple_icon_slug TEXT NOT NULL,
      color_light     TEXT NOT NULL,
      color_dark      TEXT,
      icon_light_url  TEXT NOT NULL,
      icon_dark_url   TEXT NOT NULL,
      sort_order      INT NOT NULL DEFAULT 0,
      created_at      TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS featured_tech_stacks (
      id            SERIAL PRIMARY KEY,
      tech_stack_id INT NOT NULL REFERENCES tech_stacks(id) ON DELETE CASCADE,
      sort_order    INT NOT NULL DEFAULT 0,
      UNIQUE (tech_stack_id)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS experiences (
      id           SERIAL PRIMARY KEY,
      title        TEXT NOT NULL,
      company      TEXT NOT NULL,
      company_url  TEXT NOT NULL,
      period       TEXT NOT NULL,
      type         TEXT NOT NULL,
      description  TEXT NOT NULL,
      sort_order   INT NOT NULL DEFAULT 0,
      created_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS experience_tech (
      experience_id INT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
      tech_stack_id INT NOT NULL REFERENCES tech_stacks(id) ON DELETE CASCADE,
      PRIMARY KEY (experience_id, tech_stack_id)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id           SERIAL PRIMARY KEY,
      title        TEXT NOT NULL,
      description  TEXT NOT NULL,
      year         TEXT NOT NULL,
      featured     BOOLEAN NOT NULL DEFAULT false,
      github_url   TEXT NOT NULL,
      demo_url     TEXT,
      sort_order   INT NOT NULL DEFAULT 0,
      created_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS project_tech (
      project_id    INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      tech_stack_id INT NOT NULL REFERENCES tech_stacks(id) ON DELETE CASCADE,
      PRIMARY KEY (project_id, tech_stack_id)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS admin_otp (
      id         SERIAL PRIMARY KEY,
      email      TEXT NOT NULL,
      otp_hash   TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      attempts   INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}
