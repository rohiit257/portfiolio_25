"use client";

import { Layout } from "@/components/layout/Layout";
import { useSiteContent } from "@/lib/content";

const Contact = () => {
  const { contact } = useSiteContent();
  return (
    <Layout hideFooter variant="dark">
      <section className="min-h-screen flex items-center bg-black text-white pt-24">
        <div className="container py-20 md:py-32">
          <div className="max-w-4xl">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-[-0.03em] mb-12">
              {contact.headline}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-16 leading-relaxed">
              {contact.description}
            </p>

            {/* Email CTA */}
            <div className="mb-20">
              <p className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-4">Get in touch</p>
              <a
                href={`mailto:${contact.email}`}
                className="text-2xl md:text-3xl lg:text-4xl font-medium text-white hover:text-gray-300 transition-colors inline-flex items-center gap-4 group"
              >
                {contact.email}
                <span className="inline-block transition-transform group-hover:translate-x-2 text-gray-500">→</span>
              </a>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-800 mb-16" />

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-4">For Networking</p>
                <div className="flex flex-col gap-3">
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-white hover:text-gray-300 transition-colors inline-flex items-center gap-2 group"
                  >
                    LinkedIn
                    <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-500">↗</span>
                  </a>
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-white hover:text-gray-300 transition-colors inline-flex items-center gap-2 group"
                  >
                    GitHub
                    <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-500">↗</span>
                  </a>
                  <a
                    href={contact.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-white hover:text-gray-300 transition-colors inline-flex items-center gap-2 group"
                  >
                    X (Twitter)
                    <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-500">↗</span>
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-4">Based In</p>
                <p className="text-lg text-gray-400">
                  {contact.location}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-4">Open To</p>
                <p className="text-lg text-gray-400">
                  {contact.openTo}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <div className="mt-32 md:mt-48">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Rohit Shahi. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
