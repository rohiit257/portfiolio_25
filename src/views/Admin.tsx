"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { defaultContent, type SiteContent } from "@/data/siteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const tokenKey = "portfolio_admin_token";
type Panel = "overview" | "content" | "projects" | "media";

export default function Admin() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [raw, setRaw] = useState(JSON.stringify(defaultContent, null, 2));
  const [panel, setPanel] = useState<Panel>("overview");
  const [selectedProject, setSelectedProject] = useState(0);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const project = content.projects[selectedProject];
  const parseError = useMemo(() => { try { JSON.parse(raw); return ""; } catch (e) { return e instanceof Error ? e.message : "Invalid JSON"; } }, [raw]);

  useEffect(() => { setToken(sessionStorage.getItem(tokenKey) || ""); }, []);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    fetch("/api/content").then((r) => r.ok ? r.json() : Promise.reject(new Error("Could not load saved content")))
      .then((data) => { if (data.content) { const merged = { ...defaultContent, ...data.content }; setContent(merged); setRaw(JSON.stringify(merged, null, 2)); } })
      .catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, [token]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Sign in failed");
      sessionStorage.setItem(tokenKey, data.token); setToken(data.token);
    } catch (e) { setError(e instanceof Error ? e.message : "Sign in failed"); }
  };

  const save = async () => {
    let parsed: SiteContent;
    try { parsed = JSON.parse(raw); } catch { setError("Fix the content JSON before saving."); return; }
    setSaving(true); setError("");
    try {
      const response = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(parsed) });
      const data = await response.json(); if (!response.ok) { if (response.status === 401) { sessionStorage.removeItem(tokenKey); setToken(""); } throw new Error(data.error || "Save failed"); }
      const saved = { ...defaultContent, ...data.content }; setContent(saved); setRaw(JSON.stringify(saved, null, 2));
      toast({ title: "Changes published", description: "Your portfolio content has been saved." });
    } catch (e) { setError(e instanceof Error ? e.message : "Save failed"); }
    finally { setSaving(false); }
  };

  const syncRaw = (next: SiteContent) => { setContent(next); setRaw(JSON.stringify(next, null, 2)); };
  const uploadImage = async (file?: File) => {
    if (!file || !project) return;
    setError("");
    try {
      const sign = await fetch("/api/admin/cloudinary-signature", { method: "POST", headers: { Authorization: `Bearer ${token}` } }).then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); return d; });
      const form = new FormData(); form.append("file", file); form.append("api_key", sign.apiKey); form.append("timestamp", String(sign.timestamp)); form.append("folder", sign.folder); form.append("signature", sign.signature);
      const result = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`, { method: "POST", body: form }).then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error?.message || "Upload failed"); return d; });
      const projects = content.projects.map((p, i) => i === selectedProject ? { ...p, heroImage: result.secure_url, galleryImages: [result.secure_url, ...p.galleryImages.filter((image) => image !== result.secure_url)] } : p);
      syncRaw({ ...content, projects }); toast({ title: "Image uploaded", description: "Save changes to publish it on your site." });
    } catch (e) { setError(e instanceof Error ? e.message : "Image upload failed"); }
  };

  if (!token) return <main className="min-h-screen bg-black text-white flex items-center justify-center px-6"><form onSubmit={login} className="w-full max-w-sm space-y-7"><Link href="/" className="text-xs uppercase tracking-[.18em] text-gray-400">← Back to portfolio</Link><div><p className="text-xs uppercase tracking-[.18em] text-gray-500 mb-3">Portfolio / Admin</p><h1 className="text-4xl font-medium">Sign in</h1></div><Input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" required className="bg-gray-900 border-gray-700 text-white" />{error && <p className="text-sm text-red-400">{error}</p>}<Button className="w-full" type="submit">Continue</Button></form></main>;

  return <div className="min-h-screen bg-[#f5f5f3] text-[#171717]">
    <header className="h-20 border-b border-black/10 px-5 md:px-10 flex items-center justify-between bg-white"><Link href="/" className="text-sm uppercase tracking-[.13em] font-medium">Rohit Shahi <span className="text-gray-400">/ Studio</span></Link><div className="flex items-center gap-4"><Link href="/" className="text-sm text-gray-500 hover:text-black">View site ↗</Link><button className="text-sm text-gray-500 hover:text-black" onClick={() => { sessionStorage.removeItem(tokenKey); setToken(""); }}>Sign out</button></div></header>
    <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-10 md:py-14"><div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"><div><p className="text-xs uppercase tracking-[.18em] text-gray-500 mb-3">Portfolio management</p><h1 className="text-4xl md:text-5xl tracking-tight">Content studio</h1><p className="text-gray-500 mt-3">Edit every part of your portfolio from one place.</p></div><Button onClick={save} disabled={saving || !!parseError}>{saving ? "Saving…" : "Publish changes"}</Button></div>
      <div className="flex gap-2 overflow-x-auto border-b border-black/10 mb-8">{(["overview", "content", "projects", "media"] as Panel[]).map((item) => <button key={item} onClick={() => setPanel(item)} className={`px-4 py-3 text-sm capitalize border-b-2 ${panel === item ? "border-black text-black" : "border-transparent text-gray-500"}`}>{item}</button>)}</div>
      {error && <div className="mb-6 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}{loading ? <p className="py-20 text-center text-gray-500">Loading saved content…</p> : <>
      {panel === "overview" && <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{[["Projects", content.projects.length], ["Experience entries", content.experience.length], ["Interests", content.interests.length], ["Stack items", content.stack.length]].map(([label, number]) => <div key={label} className="bg-white p-6 border border-black/5"><p className="text-xs uppercase tracking-widest text-gray-500">{label}</p><p className="text-4xl mt-5">{number}</p></div>)}<div className="sm:col-span-2 lg:col-span-4 bg-white p-6 border border-black/5"><p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Home headline</p><p className="text-xl max-w-4xl">{content.hero}</p></div></div>}
      {panel === "content" && <div className="grid lg:grid-cols-2 gap-5"><section className="bg-white p-6 space-y-5"><h2 className="text-xl">Home page</h2><Field label="Hero headline"><Textarea value={content.hero} onChange={(e) => syncRaw({ ...content, hero: e.target.value })} rows={4} /></Field><Field label="Biography"><Textarea value={content.bio} onChange={(e) => syncRaw({ ...content, bio: e.target.value })} rows={6} /></Field><JsonField label="Experience" value={content.experience} onChange={(value) => syncRaw({ ...content, experience: value })} /><JsonField label="Education" value={content.education} onChange={(value) => syncRaw({ ...content, education: value })} /><JsonField label="Interests" value={content.interests} onChange={(value) => syncRaw({ ...content, interests: value })} /><Field label="Stack items (comma separated)"><Input value={content.stack.join(", ")} onChange={(e) => syncRaw({ ...content, stack: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })} /></Field></section><section className="bg-white p-6 space-y-5"><h2 className="text-xl">Contact page</h2>{Object.entries(content.contact).map(([key, value]) => <Field key={key} label={key}><Textarea rows={key === "description" ? 4 : 1} value={value} onChange={(e) => syncRaw({ ...content, contact: { ...content.contact, [key]: e.target.value } })} /></Field>)}</section></div>}
      {panel === "projects" && <div className="grid lg:grid-cols-[280px_1fr] gap-5"><section className="bg-white p-4"><div className="flex justify-between items-center px-2 py-2"><h2 className="font-medium">Projects</h2><button className="text-sm underline" onClick={() => { const fresh = { id: `project-${Date.now()}`, title: "New project", subtitle: "", description: "", role: "", tags: [], color: "hsl(0, 0%, 35%)", fullDescription: "", galleryImages: [] }; syncRaw({ ...content, projects: [...content.projects, fresh] }); setSelectedProject(content.projects.length); }}>+ Add</button></div>{content.projects.map((p, i) => <div key={`${p.id}-${i}`} className={`flex items-center justify-between px-3 py-3 text-sm ${selectedProject === i ? "bg-gray-100" : ""}`}><button className="text-left flex-1 truncate" onClick={() => setSelectedProject(i)}>{p.title}</button><button aria-label={`Delete ${p.title}`} className="text-gray-400 hover:text-red-600 px-2" onClick={() => { const next = content.projects.filter((_, ix) => ix !== i); syncRaw({ ...content, projects: next }); setSelectedProject(Math.max(0, Math.min(i, next.length - 1))); }}>×</button></div>)}</section><section className="bg-white p-6">{project ? <><div className="flex justify-between items-center mb-6"><h2 className="text-xl">Edit project</h2><button className="text-xs uppercase tracking-wider text-gray-500" onClick={() => setPanel("media")}>Manage images ↗</button></div><JsonField label="Project data" value={project} onChange={(value) => syncRaw({ ...content, projects: content.projects.map((p, i) => i === selectedProject ? value : p) })} rows={25} /><p className="text-xs text-gray-500 mt-3">Use <code>heroImage</code> or <code>galleryImages</code> for Cloudinary image URLs. Leave year and link empty when unavailable.</p></> : <p className="text-gray-500">Add a project to begin.</p>}</section></div>}
      {panel === "media" && <section className="bg-white p-6 max-w-3xl"><h2 className="text-xl mb-2">Project images</h2><p className="text-sm text-gray-500 mb-6">Images are uploaded securely to Cloudinary. Choose a project, upload its hero image, then publish the changes.</p><label className="text-xs uppercase tracking-widest">Project<select className="block w-full border border-gray-200 p-3 mt-2 bg-white" value={selectedProject} onChange={(e) => setSelectedProject(Number(e.target.value))}>{content.projects.map((p, i) => <option key={p.id} value={i}>{p.title}</option>)}</select></label><label className="mt-6 block border border-dashed border-gray-300 p-10 text-center cursor-pointer hover:bg-gray-50"><span className="block mb-2">Upload image to Cloudinary</span><span className="text-xs text-gray-500">PNG, JPG, WEBP</span><input className="sr-only" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => uploadImage(e.target.files?.[0])} /></label>{project?.heroImage && <div className="mt-6"><img src={project.heroImage} alt={project.title} className="max-h-72 object-contain" /><p className="text-xs text-gray-500 mt-2 break-all">{project.heroImage}</p></div>}</section>}
      </>}
    </div>
  </div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-xs uppercase tracking-widest text-gray-500">{label}<div className="mt-2">{children}</div></label>; }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function JsonField({ label, value, onChange, rows = 8 }: { label: string; value: unknown; onChange: (value: any) => void; rows?: number }) {
  const [text, setText] = useState(JSON.stringify(value, null, 2));
  useEffect(() => setText(JSON.stringify(value, null, 2)), [value]);
  return <Field label={label}><Textarea className="font-mono text-xs" rows={rows} value={text} onChange={(e) => { setText(e.target.value); try { onChange(JSON.parse(e.target.value)); } catch { /* Keep editing until valid JSON. */ } }} /></Field>;
}
