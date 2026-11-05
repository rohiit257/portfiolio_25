"use client";

import Link from "next/link";
import { useSiteContent } from "@/lib/content";

export function Footer() {
  const { contact, name } = useSiteContent();
  const socialLinks = [
    { category: "For Networking", links: [{ label: "LinkedIn", href: contact.linkedin }, { label: "GitHub", href: contact.github }, { label: "X (Twitter)", href: contact.x }] },
    { category: "Direct", links: [{ label: "Email", href: `mailto:${contact.email}` }] },
  ];
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      <div className="container py-20 md:py-28">
        {/* Main CTA */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-[0.95] tracking-[-0.02em] mb-6">
            {contact.footerHeadline}
          </h2>
          <a
            href={`mailto:${contact.email}`}
            className="text-lg md:text-xl text-gray-500 hover:text-black transition-colors inline-flex items-center gap-2 group"
          >
            {contact.email}
            <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-400">→</span>
          </a>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {socialLinks.map((group) => (
            <div key={group.category}>
              <p className="text-xs uppercase tracking-[0.15em] font-medium text-gray-400 mb-4">{group.category}</p>
              <div className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="text-base text-black hover:text-gray-500 transition-colors inline-flex items-center gap-2 group"
                  >
                    {link.label}
                    <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-400">↗</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <nav className="flex items-center gap-8">
            <Link href="/" className="text-sm text-gray-400 hover:text-black transition-colors">
              Home
            </Link>
            <Link href="/work" className="text-sm text-gray-400 hover:text-black transition-colors">
              Work
            </Link>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-black transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
