import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultContent, type SiteContent } from "@/data/siteContent";

const ContentContext = createContext<SiteContent>(defaultContent);
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(defaultContent);
  useEffect(() => { fetch("/api/content").then((r) => r.ok ? r.json() : null).then((data) => { if (data?.content) setContent({ ...defaultContent, ...data.content }); }).catch(() => {}); }, []);
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
export const useSiteContent = () => useContext(ContentContext);
