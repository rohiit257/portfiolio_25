"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TechMultiSelect } from "@/components/admin/tech-multi-select";
import { TECH_ICON_PRESETS, urlsFromPreset } from "@/lib/tech-icons";
import type {
  ExperienceRow,
  ProjectRow,
  TechStackRow,
} from "@/lib/portfolio-queries";

async function adminFetch(path: string, init?: RequestInit) {
  const res = await fetch(path, { ...init, credentials: "include" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data;
}

export function AdminDashboard() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [stacks, setStacks] = useState<TechStackRow[]>([]);
  const [featuredIds, setFeaturedIds] = useState<number[]>([]);
  const [experiences, setExperiences] = useState<ExperienceRow[]>([]);
  const [projects, setProjects] = useState<ProjectRow[]>([]);

  const loadAll = useCallback(async () => {
    const [s, featured, exp, proj] = await Promise.all([
      adminFetch("/api/admin/tech-stacks"),
      adminFetch("/api/admin/featured-stack"),
      adminFetch("/api/admin/experiences"),
      adminFetch("/api/admin/projects"),
    ]);
    setStacks(s);
    setFeaturedIds(featured.map((f: { id: number }) => f.id));
    setExperiences(exp);
    setProjects(proj);
  }, []);

  useEffect(() => {
    fetch("/api/admin/auth/me", { credentials: "include" })
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (authed) loadAll().catch((e) => toast.error(e.message));
  }, [authed, loadAll]);

  const requestOtp = async () => {
    setSendingOtp(true);
    try {
      const data = await adminFetch("/api/admin/auth/request-otp", {
        method: "POST",
      });
      toast.success(data.message);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to send code");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    setVerifying(true);
    try {
      await adminFetch("/api/admin/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      setAuthed(true);
      toast.success("Signed in");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Invalid code");
    } finally {
      setVerifying(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST", credentials: "include" });
    setAuthed(false);
    setOtp("");
  };

  const migrate = async (force = false) => {
    try {
      const data = await adminFetch("/api/admin/migrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force }),
      });
      toast.success(data.message);
      await loadAll();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Migration failed");
    }
  };

  if (authed === null) {
    return (
      <p className="text-center text-sm text-muted-foreground py-20">Loading…</p>
    );
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md space-y-6 py-16">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Portfolio Admin</h1>
          <p className="text-sm text-muted-foreground">
            OTP is sent to your admin email. Enter the 6-digit code to continue.
          </p>
        </div>
        <Button onClick={requestOtp} disabled={sendingOtp} className="w-full">
          {sendingOtp ? "Sending…" : "Send login code"}
        </Button>
        <div className="flex flex-col items-center gap-4">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <Button onClick={verifyOtp} disabled={verifying || otp.length !== 6} className="w-full">
            {verifying ? "Verifying…" : "Verify & enter"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-10 px-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Portfolio Admin</h1>
          <p className="text-sm text-muted-foreground">
            Manage experience, projects, and tech stack from Neon DB.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => migrate(false)}>
            Migrate seed data
          </Button>
          <Button variant="outline" onClick={() => migrate(true)}>
            Force re-seed
          </Button>
          <Button variant="ghost" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>

      <Tabs defaultValue="experience">
        <TabsList className="flex flex-wrap h-auto">
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="featured">Featured stack</TabsTrigger>
          <TabsTrigger value="catalog">Tech catalog</TabsTrigger>
        </TabsList>

        <TabsContent value="experience" className="space-y-6 mt-6">
          <ExperiencePanel
            stacks={stacks}
            items={experiences}
            onSaved={loadAll}
          />
        </TabsContent>

        <TabsContent value="projects" className="space-y-6 mt-6">
          <ProjectPanel stacks={stacks} items={projects} onSaved={loadAll} />
        </TabsContent>

        <TabsContent value="featured" className="space-y-6 mt-6">
          <FeaturedStackPanel
            stacks={stacks}
            featuredIds={featuredIds}
            onSaved={loadAll}
          />
        </TabsContent>

        <TabsContent value="catalog" className="space-y-6 mt-6">
          <TechCatalogPanel stacks={stacks} onSaved={loadAll} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ExperiencePanel({
  stacks,
  items,
  onSaved,
}: {
  stacks: TechStackRow[];
  items: ExperienceRow[];
  onSaved: () => Promise<void>;
}) {
  const empty = {
    title: "",
    company: "",
    companyUrl: "",
    period: "",
    type: "",
    description: "",
    sortOrder: 0,
    techStackIds: [] as number[],
  };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<number | null>(null);

  const save = async () => {
    const payload = {
      ...form,
      companyUrl: form.companyUrl,
    };
    if (editId) {
      await adminFetch(`/api/admin/experiences/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await adminFetch("/api/admin/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    toast.success(editId ? "Experience updated" : "Experience added");
    setForm(empty);
    setEditId(null);
    await onSaved();
  };

  const startEdit = (item: ExperienceRow) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      company: item.company,
      companyUrl: item.company_url,
      period: item.period,
      type: item.type,
      description: item.description,
      sortOrder: item.sort_order,
      techStackIds: stacks
        .filter((s) => item.tags.includes(s.name))
        .map((s) => s.id),
    });
  };

  const remove = async (id: number) => {
    await adminFetch(`/api/admin/experiences?id=${id}`, { method: "DELETE" });
    toast.success("Deleted");
    await onSaved();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        className="space-y-4 rounded-lg border border-border/70 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          save().catch((err) => toast.error(err.message));
        }}
      >
        <h2 className="font-medium">{editId ? "Edit experience" : "Add experience"}</h2>
        <Field label="Job title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
        <Field label="Company URL" value={form.companyUrl} onChange={(v) => setForm({ ...form, companyUrl: v })} />
        <Field label="Period" value={form.period} onChange={(v) => setForm({ ...form, period: v })} placeholder="2024 - Present" />
        <Field label="Type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} placeholder="Full-time / Remote" />
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
          />
        </div>
        <Field label="Sort order" type="number" value={String(form.sortOrder)} onChange={(v) => setForm({ ...form, sortOrder: Number(v) })} />
        <TechMultiSelect
          stacks={stacks}
          value={form.techStackIds}
          onChange={(techStackIds) => setForm({ ...form, techStackIds })}
          label="Technologies"
        />
        <div className="flex gap-2">
          <Button type="submit">{editId ? "Update" : "Create"}</Button>
          {editId && (
            <Button type="button" variant="ghost" onClick={() => { setEditId(null); setForm(empty); }}>
              Cancel
            </Button>
          )}
        </div>
      </form>
      <ListPanel
        title="Existing"
        items={items.map((i) => ({
          id: i.id,
          title: `${i.company} — ${i.title}`,
          subtitle: i.period,
        }))}
        onEdit={(id) => startEdit(items.find((x) => x.id === id)!)}
        onDelete={remove}
      />
    </div>
  );
}

function ProjectPanel({
  stacks,
  items,
  onSaved,
}: {
  stacks: TechStackRow[];
  items: ProjectRow[];
  onSaved: () => Promise<void>;
}) {
  const empty = {
    title: "",
    description: "",
    year: new Date().getFullYear().toString(),
    featured: false,
    githubUrl: "",
    demoUrl: "",
    sortOrder: 0,
    techStackIds: [] as number[],
  };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<number | null>(null);

  const save = async () => {
    const payload = {
      ...form,
      demoUrl: form.demoUrl || null,
    };
    if (editId) {
      await adminFetch(`/api/admin/projects/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await adminFetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    toast.success(editId ? "Project updated" : "Project added");
    setForm(empty);
    setEditId(null);
    await onSaved();
  };

  const startEdit = (item: ProjectRow) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      year: item.year,
      featured: item.featured,
      githubUrl: item.github_url,
      demoUrl: item.demo_url ?? "",
      sortOrder: item.sort_order,
      techStackIds: stacks.filter((s) => item.tech.includes(s.name)).map((s) => s.id),
    });
  };

  const remove = async (id: number) => {
    await adminFetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
    toast.success("Deleted");
    await onSaved();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        className="space-y-4 rounded-lg border border-border/70 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          save().catch((err) => toast.error(err.message));
        }}
      >
        <h2 className="font-medium">{editId ? "Edit project" : "Add project"}</h2>
        <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
        </div>
        <Field label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} />
        <Field label="GitHub URL" value={form.githubUrl} onChange={(v) => setForm({ ...form, githubUrl: v })} />
        <Field label="Demo URL (optional)" value={form.demoUrl} onChange={(v) => setForm({ ...form, demoUrl: v })} />
        <Field label="Sort order" type="number" value={String(form.sortOrder)} onChange={(v) => setForm({ ...form, sortOrder: Number(v) })} />
        <div className="flex items-center gap-2">
          <Switch checked={form.featured} onCheckedChange={(featured) => setForm({ ...form, featured })} />
          <Label>Featured on homepage</Label>
        </div>
        <TechMultiSelect
          stacks={stacks}
          value={form.techStackIds}
          onChange={(techStackIds) => setForm({ ...form, techStackIds })}
          label="Tech stack"
        />
        <Button type="submit">{editId ? "Update" : "Create"}</Button>
      </form>
      <ListPanel
        title="Existing"
        items={items.map((i) => ({
          id: i.id,
          title: i.title,
          subtitle: `${i.year}${i.featured ? " · featured" : ""}`,
        }))}
        onEdit={(id) => startEdit(items.find((x) => x.id === id)!)}
        onDelete={remove}
      />
    </div>
  );
}

function FeaturedStackPanel({
  stacks,
  featuredIds,
  onSaved,
}: {
  stacks: TechStackRow[];
  featuredIds: number[];
  onSaved: () => Promise<void>;
}) {
  const [selected, setSelected] = useState<number[]>(featuredIds);

  useEffect(() => {
    setSelected(featuredIds);
  }, [featuredIds]);

  const save = async () => {
    await adminFetch("/api/admin/featured-stack", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ techStackIds: selected }),
    });
    toast.success("Featured stack updated");
    await onSaved();
  };

  return (
    <div className="space-y-4 rounded-lg border border-border/70 p-4 max-w-lg">
      <h2 className="font-medium">Homepage stack grid</h2>
      <p className="text-sm text-muted-foreground">
        Select technologies shown in the //stack section. Order follows selection order.
      </p>
      <TechMultiSelect stacks={stacks} value={selected} onChange={setSelected} />
      <div className="flex flex-wrap gap-3 pt-2">
        {selected.map((id) => {
          const t = stacks.find((s) => s.id === id);
          if (!t) return null;
          return (
            <div key={id} className="flex flex-col items-center gap-1 rounded-md border p-2">
              <Image src={t.icon_light_url} alt={t.name} width={28} height={28} className="dark:hidden" />
              <Image src={t.icon_dark_url} alt={t.name} width={28} height={28} className="hidden dark:block" />
              <span className="text-xs">{t.name}</span>
            </div>
          );
        })}
      </div>
      <Button onClick={() => save().catch((e) => toast.error(e.message))}>Save featured stack</Button>
    </div>
  );
}

function TechCatalogPanel({
  stacks,
  onSaved,
}: {
  stacks: TechStackRow[];
  onSaved: () => Promise<void>;
}) {
  const [presetKey, setPresetKey] = useState(TECH_ICON_PRESETS[0].name);
  const [form, setForm] = useState({
    name: TECH_ICON_PRESETS[0].name,
    simpleIconSlug: TECH_ICON_PRESETS[0].slug,
    colorLight: TECH_ICON_PRESETS[0].colorLight,
    colorDark: TECH_ICON_PRESETS[0].colorDark ?? "",
    sortOrder: 0,
  });
  const [editId, setEditId] = useState<number | null>(null);

  const applyPreset = (name: string) => {
    const p = TECH_ICON_PRESETS.find((x) => x.name === name);
    if (!p) return;
    setPresetKey(name);
    setForm({
      name: p.name,
      simpleIconSlug: p.slug,
      colorLight: p.colorLight,
      colorDark: p.colorDark ?? "",
      sortOrder: form.sortOrder,
    });
  };

  const preview = urlsFromPreset({
    name: form.name,
    slug: form.simpleIconSlug,
    colorLight: form.colorLight,
    colorDark: form.colorDark || undefined,
  });

  const save = async () => {
    if (editId) {
      await adminFetch(`/api/admin/tech-stacks/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await adminFetch("/api/admin/tech-stacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    toast.success(editId ? "Updated" : "Added");
    setEditId(null);
    await onSaved();
  };

  const remove = async (id: number) => {
    await adminFetch(`/api/admin/tech-stacks?id=${id}`, { method: "DELETE" });
    toast.success("Deleted");
    await onSaved();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        className="space-y-4 rounded-lg border border-border/70 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          save().catch((err) => toast.error(err.message));
        }}
      >
        <h2 className="font-medium">{editId ? "Edit technology" : "Add technology"}</h2>
        <div className="space-y-2">
          <Label>Preset (Simple Icons)</Label>
          <Select value={presetKey} onValueChange={applyPreset}>
            <SelectTrigger>
              <SelectValue placeholder="Choose preset" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {TECH_ICON_PRESETS.map((p) => (
                <SelectItem key={p.name} value={p.name}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Field label="Display name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="Simple Icons slug" value={form.simpleIconSlug} onChange={(v) => setForm({ ...form, simpleIconSlug: v })} />
        <Field label="Light mode color (hex)" value={form.colorLight} onChange={(v) => setForm({ ...form, colorLight: v })} />
        <Field label="Dark mode color (hex, optional)" value={form.colorDark} onChange={(v) => setForm({ ...form, colorDark: v })} />
        <Field label="Sort order" type="number" value={String(form.sortOrder)} onChange={(v) => setForm({ ...form, sortOrder: Number(v) })} />
        <div className="flex items-center gap-3 rounded-md border p-3">
          <Image src={preview.iconLight} alt="" width={32} height={32} className="dark:hidden" />
          <Image src={preview.iconDark} alt="" width={32} height={32} className="hidden dark:block" />
          <span className="text-sm text-muted-foreground">Logo preview</span>
        </div>
        <Button type="submit">{editId ? "Update" : "Create"}</Button>
      </form>
      <ListPanel
        title="Catalog"
        items={stacks.map((s) => ({ id: s.id, title: s.name, subtitle: s.simple_icon_slug }))}
        onEdit={(id) => {
          const s = stacks.find((x) => x.id === id)!;
          setEditId(id);
          setForm({
            name: s.name,
            simpleIconSlug: s.simple_icon_slug,
            colorLight: s.color_light,
            colorDark: s.color_dark ?? "",
            sortOrder: s.sort_order,
          });
          setPresetKey(s.name);
        }}
        onDelete={remove}
      />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function ListPanel({
  title,
  items,
  onEdit,
  onDelete,
}: {
  title: string;
  items: { id: number; title: string; subtitle: string }[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => Promise<void>;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-border/70 p-4">
      <h2 className="font-medium">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-2 rounded-md border border-border/50 px-3 py-2 text-sm"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <Button type="button" size="sm" variant="ghost" onClick={() => onEdit(item.id)}>
                Edit
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="text-destructive"
                onClick={() => {
                  onDelete(item.id).catch((e: Error) =>
                    toast.error(e.message)
                  );
                }}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">No entries yet. Run migrate or add one.</p>
        )}
      </ul>
    </div>
  );
}
