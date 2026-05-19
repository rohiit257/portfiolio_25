import { getDb } from "@/lib/vector-store";
import { initPortfolioTables } from "@/lib/portfolio-schema";
import {
  collectAllTechNames,
  SEED_EXPERIENCES,
  SEED_FEATURED_STACK_NAMES,
  SEED_PROJECTS,
  seedPresetForName,
} from "@/lib/seed-data";
import { buildIconUrls, presetForName } from "@/lib/tech-icons";

export type TechStackRow = {
  id: number;
  name: string;
  simple_icon_slug: string;
  color_light: string;
  color_dark: string | null;
  icon_light_url: string;
  icon_dark_url: string;
  sort_order: number;
};

export type ExperienceRow = {
  id: number;
  title: string;
  company: string;
  company_url: string;
  period: string;
  type: string;
  description: string;
  sort_order: number;
  tags: string[];
};

export type ProjectRow = {
  id: number;
  title: string;
  description: string;
  year: string;
  featured: boolean;
  github_url: string;
  demo_url: string | null;
  sort_order: number;
  tech: string[];
};

export type FeaturedTechItem = {
  id: number;
  name: string;
  iconLight: string;
  iconDark: string;
  sort_order: number;
};

async function ensureTables() {
  await initPortfolioTables();
}

export async function getTechStacks(): Promise<TechStackRow[]> {
  await ensureTables();
  const sql = getDb();
  const rows = await sql`
    SELECT id, name, simple_icon_slug, color_light, color_dark,
           icon_light_url, icon_dark_url, sort_order
    FROM tech_stacks
    ORDER BY sort_order ASC, name ASC
  `;
  return rows as TechStackRow[];
}

export async function getFeaturedTechStack(): Promise<FeaturedTechItem[]> {
  await ensureTables();
  const sql = getDb();
  const rows = await sql`
    SELECT t.id, t.name, t.icon_light_url AS "iconLight",
           t.icon_dark_url AS "iconDark", f.sort_order
    FROM featured_tech_stacks f
    JOIN tech_stacks t ON t.id = f.tech_stack_id
    ORDER BY f.sort_order ASC
  `;
  return rows as FeaturedTechItem[];
}

export async function getExperiences(): Promise<ExperienceRow[]> {
  await ensureTables();
  const sql = getDb();
  const experiences = await sql`
    SELECT id, title, company, company_url, period, type, description, sort_order
    FROM experiences
    ORDER BY sort_order ASC, id ASC
  `;
  const result: ExperienceRow[] = [];
  for (const exp of experiences as Omit<ExperienceRow, "tags">[]) {
    const tags = await sql`
      SELECT t.name
      FROM experience_tech et
      JOIN tech_stacks t ON t.id = et.tech_stack_id
      WHERE et.experience_id = ${exp.id}
      ORDER BY t.name ASC
    `;
    result.push({
      ...exp,
      tags: (tags as { name: string }[]).map((t) => t.name),
    });
  }
  return result;
}

export async function getProjects(): Promise<ProjectRow[]> {
  await ensureTables();
  const sql = getDb();
  const projects = await sql`
    SELECT id, title, description, year, featured, github_url, demo_url, sort_order
    FROM projects
    ORDER BY sort_order ASC, id ASC
  `;
  const result: ProjectRow[] = [];
  for (const p of projects as Omit<ProjectRow, "tech">[]) {
    const tech = await sql`
      SELECT t.name
      FROM project_tech pt
      JOIN tech_stacks t ON t.id = pt.tech_stack_id
      WHERE pt.project_id = ${p.id}
      ORDER BY t.name ASC
    `;
    result.push({
      ...p,
      tech: (tech as { name: string }[]).map((t) => t.name),
    });
  }
  return result;
}

export async function countExperiences(): Promise<number> {
  await ensureTables();
  const sql = getDb();
  const rows = await sql`SELECT COUNT(*)::int AS cnt FROM experiences`;
  return Number((rows[0] as { cnt: number }).cnt);
}

export type UpsertTechInput = {
  name: string;
  simpleIconSlug: string;
  colorLight: string;
  colorDark?: string;
  sortOrder?: number;
};

export async function upsertTechStack(
  input: UpsertTechInput,
  id?: number
): Promise<TechStackRow> {
  await ensureTables();
  const sql = getDb();
  const urls = buildIconUrls(
    input.simpleIconSlug,
    input.colorLight.replace(/^#/, ""),
    input.colorDark?.replace(/^#/, "")
  );
  const colorDark = input.colorDark?.replace(/^#/, "") ?? null;

  if (id) {
    await sql`
      UPDATE tech_stacks SET
        name = ${input.name},
        simple_icon_slug = ${input.simpleIconSlug},
        color_light = ${input.colorLight.replace(/^#/, "")},
        color_dark = ${colorDark},
        icon_light_url = ${urls.iconLight},
        icon_dark_url = ${urls.iconDark},
        sort_order = ${input.sortOrder ?? 0}
      WHERE id = ${id}
    `;
    const rows = await sql`SELECT * FROM tech_stacks WHERE id = ${id}`;
    return rows[0] as TechStackRow;
  }

  const rows = await sql`
    INSERT INTO tech_stacks (
      name, simple_icon_slug, color_light, color_dark,
      icon_light_url, icon_dark_url, sort_order
    ) VALUES (
      ${input.name},
      ${input.simpleIconSlug},
      ${input.colorLight.replace(/^#/, "")},
      ${colorDark},
      ${urls.iconLight},
      ${urls.iconDark},
      ${input.sortOrder ?? 0}
    )
    ON CONFLICT (name) DO UPDATE SET
      simple_icon_slug = EXCLUDED.simple_icon_slug,
      color_light = EXCLUDED.color_light,
      color_dark = EXCLUDED.color_dark,
      icon_light_url = EXCLUDED.icon_light_url,
      icon_dark_url = EXCLUDED.icon_dark_url,
      sort_order = EXCLUDED.sort_order
    RETURNING id, name, simple_icon_slug, color_light, color_dark,
              icon_light_url, icon_dark_url, sort_order
  `;
  return rows[0] as TechStackRow;
}

export async function deleteTechStack(id: number) {
  await ensureTables();
  const sql = getDb();
  await sql`DELETE FROM tech_stacks WHERE id = ${id}`;
}

export async function setFeaturedTechStackIds(ids: number[]) {
  await ensureTables();
  const sql = getDb();
  await sql`DELETE FROM featured_tech_stacks`;
  for (let i = 0; i < ids.length; i++) {
    await sql`
      INSERT INTO featured_tech_stacks (tech_stack_id, sort_order)
      VALUES (${ids[i]}, ${i})
      ON CONFLICT (tech_stack_id) DO UPDATE SET sort_order = ${i}
    `;
  }
}

export type ExperienceInput = {
  title: string;
  company: string;
  companyUrl: string;
  period: string;
  type: string;
  description: string;
  techStackIds: number[];
  sortOrder?: number;
};

export async function createExperience(input: ExperienceInput) {
  await ensureTables();
  const sql = getDb();
  const rows = await sql`
    INSERT INTO experiences (title, company, company_url, period, type, description, sort_order)
    VALUES (
      ${input.title}, ${input.company}, ${input.companyUrl},
      ${input.period}, ${input.type}, ${input.description},
      ${input.sortOrder ?? 0}
    )
    RETURNING id
  `;
  const id = (rows[0] as { id: number }).id;
  for (const techId of input.techStackIds) {
    await sql`
      INSERT INTO experience_tech (experience_id, tech_stack_id)
      VALUES (${id}, ${techId})
      ON CONFLICT DO NOTHING
    `;
  }
  return id;
}

export async function updateExperience(id: number, input: ExperienceInput) {
  await ensureTables();
  const sql = getDb();
  await sql`
    UPDATE experiences SET
      title = ${input.title},
      company = ${input.company},
      company_url = ${input.companyUrl},
      period = ${input.period},
      type = ${input.type},
      description = ${input.description},
      sort_order = ${input.sortOrder ?? 0}
    WHERE id = ${id}
  `;
  await sql`DELETE FROM experience_tech WHERE experience_id = ${id}`;
  for (const techId of input.techStackIds) {
    await sql`
      INSERT INTO experience_tech (experience_id, tech_stack_id)
      VALUES (${id}, ${techId})
    `;
  }
}

export async function deleteExperience(id: number) {
  await ensureTables();
  const sql = getDb();
  await sql`DELETE FROM experiences WHERE id = ${id}`;
}

export type ProjectInput = {
  title: string;
  description: string;
  year: string;
  featured: boolean;
  githubUrl: string;
  demoUrl?: string | null;
  techStackIds: number[];
  sortOrder?: number;
};

export async function createProject(input: ProjectInput) {
  await ensureTables();
  const sql = getDb();
  const rows = await sql`
    INSERT INTO projects (title, description, year, featured, github_url, demo_url, sort_order)
    VALUES (
      ${input.title}, ${input.description}, ${input.year}, ${input.featured},
      ${input.githubUrl}, ${input.demoUrl ?? null}, ${input.sortOrder ?? 0}
    )
    RETURNING id
  `;
  const id = (rows[0] as { id: number }).id;
  for (const techId of input.techStackIds) {
    await sql`
      INSERT INTO project_tech (project_id, tech_stack_id)
      VALUES (${id}, ${techId})
    `;
  }
  return id;
}

export async function updateProject(id: number, input: ProjectInput) {
  await ensureTables();
  const sql = getDb();
  await sql`
    UPDATE projects SET
      title = ${input.title},
      description = ${input.description},
      year = ${input.year},
      featured = ${input.featured},
      github_url = ${input.githubUrl},
      demo_url = ${input.demoUrl ?? null},
      sort_order = ${input.sortOrder ?? 0}
    WHERE id = ${id}
  `;
  await sql`DELETE FROM project_tech WHERE project_id = ${id}`;
  for (const techId of input.techStackIds) {
    await sql`
      INSERT INTO project_tech (project_id, tech_stack_id)
      VALUES (${id}, ${techId})
    `;
  }
}

export async function deleteProject(id: number) {
  await ensureTables();
  const sql = getDb();
  await sql`DELETE FROM projects WHERE id = ${id}`;
}

async function getOrCreateTechId(name: string): Promise<number> {
  const sql = getDb();
  const existing = await sql`SELECT id FROM tech_stacks WHERE name = ${name}`;
  if ((existing as { id: number }[])[0]) {
    return (existing as { id: number }[])[0].id;
  }
  const preset = presetForName(name) ?? seedPresetForName(name);
  const urls = buildIconUrls(
    preset.slug,
    preset.colorLight,
    preset.colorDark
  );
  const rows = await sql`
    INSERT INTO tech_stacks (
      name, simple_icon_slug, color_light, color_dark,
      icon_light_url, icon_dark_url, sort_order
    ) VALUES (
      ${name}, ${preset.slug}, ${preset.colorLight},
      ${preset.colorDark ?? null}, ${urls.iconLight}, ${urls.iconDark}, 0
    )
    RETURNING id
  `;
  return (rows[0] as { id: number }).id;
}

export async function migrateSeedData(force = false): Promise<{
  migrated: boolean;
  message: string;
}> {
  await ensureTables();
  const count = await countExperiences();
  if (count > 0 && !force) {
    return { migrated: false, message: "Data already exists. Use force=true to re-seed." };
  }

  const sql = getDb();
  if (force) {
    await sql`DELETE FROM featured_tech_stacks`;
    await sql`DELETE FROM experience_tech`;
    await sql`DELETE FROM project_tech`;
    await sql`DELETE FROM experiences`;
    await sql`DELETE FROM projects`;
    await sql`DELETE FROM tech_stacks`;
  }

  const techIdByName = new Map<string, number>();
  for (const name of collectAllTechNames()) {
    techIdByName.set(name, await getOrCreateTechId(name));
  }

  for (let i = 0; i < SEED_FEATURED_STACK_NAMES.length; i++) {
    const name = SEED_FEATURED_STACK_NAMES[i];
    const techId = techIdByName.get(name)!;
    await sql`
      INSERT INTO featured_tech_stacks (tech_stack_id, sort_order)
      VALUES (${techId}, ${i})
      ON CONFLICT (tech_stack_id) DO UPDATE SET sort_order = ${i}
    `;
  }

  for (const exp of SEED_EXPERIENCES) {
    const id = await createExperience({
      title: exp.title,
      company: exp.company,
      companyUrl: exp.companyUrl,
      period: exp.period,
      type: exp.type,
      description: exp.description,
      sortOrder: exp.sortOrder,
      techStackIds: exp.tags.map((t) => techIdByName.get(t)!),
    });
    void id;
  }

  for (const p of SEED_PROJECTS) {
    await createProject({
      title: p.title,
      description: p.description,
      year: p.year,
      featured: p.featured,
      githubUrl: p.githubUrl,
      demoUrl: p.demoUrl,
      sortOrder: p.sortOrder,
      techStackIds: p.tech.map((t) => techIdByName.get(t)!),
    });
  }

  return {
    migrated: true,
    message: `Migrated ${SEED_EXPERIENCES.length} experiences, ${SEED_PROJECTS.length} projects, ${techIdByName.size} tech stacks.`,
  };
}
