"use client";

import { useEffect, useState } from "react";
import { Mail, Send, User, MessageSquare, AtSign } from "lucide-react";
import { toast } from "sonner";


interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export function SocialGrid() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const username = "rohiit257";
        
        // Calculate date range for last 365 days
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
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    fetchContributions();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('=== Social Grid Form Submission ===');
      console.log('Form data:', formData);
      
      const response = await fetch('https://n8n-lhkb.onrender.com/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: new Date().toISOString(),
          source: 'portfolio-social-grid'
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        let data;
        try {
          data = await response.json();
          console.log('Success response:', data);
        } catch (e) {
          console.log('Webhook returned non-JSON (OK)');
        }
        
        // Reset form on success
        setFormData({ name: '', email: '', message: '' });
        toast('Message sent successfully! I\'ll get back to you soon.');
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to send: ${response.status}`);
      }
    } catch (error) {
      console.error('=== Social Grid Form Submission FAILED ===');
      console.error('Error:', error);
      alert('Failed to send message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-secondary";
      case 1:
        return "bg-emerald-200 dark:bg-emerald-900";
      case 2:
        return "bg-emerald-300 dark:bg-emerald-700";
      case 3:
        return "bg-emerald-400 dark:bg-emerald-600";
      case 4:
        return "bg-emerald-500 dark:bg-emerald-500";
      default:
        return "bg-secondary";
    }
  };

  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* GitHub Contributions - Large Card */}
          <div className="md:col-span-2 lg:col-span-2 bg-card border border-border rounded-2xl p-4 sm:p-6 hover:border-foreground/30 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">GitHub Activity</h3>
                  <p className="text-xs text-muted-foreground">
                    {totalContributions} contributions in the last year
                  </p>
                </div>
              </div>
              <a
                href="https://github.com/rohiit257"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                @rohiit257
              </a>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-24 sm:h-32">
                <div className="text-sm text-muted-foreground">Loading...</div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto pb-2">
                  <div className="inline-flex gap-0.5 sm:gap-1 min-w-max">
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-0.5 sm:gap-1">
                        {week.map((day, dayIndex) => (
                          <div
                            key={dayIndex}
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm ${getLevelColor(day.level)} transition-all hover:ring-1 hover:ring-foreground/50 cursor-pointer`}
                            title={`${day.date}: ${day.count} contributions`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground pt-2 border-t border-border/40 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline">Less</span>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((level) => (
                        <div key={level} className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm ${getLevelColor(level)}`} />
                      ))}
                    </div>
                    <span className="hidden sm:inline">More</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Twitter Profile Card */}
          <div className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <a
              href="https://twitter.com/rohitdebugbugs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full justify-between"
            >
              <div className="flex items-center gap-3 mb-4">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <h3 className="text-white font-semibold">X / Twitter</h3>
              </div>
              <div className="space-y-2">
                <p className="text-white/90 font-semibold text-lg">@rohitdebugbugs</p>
                <p className="text-white/70 text-sm">Building in Web3 & Blockchain</p>
              </div>
            </a>
          </div>

          {/* Code Editor Showcase */}
          <div className="md:col-span-2 lg:col-span-2 bg-card border border-border rounded-2xl p-4 sm:p-6 hover:border-foreground/30 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-xs text-muted-foreground ml-2">solana-program.rs</span>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 font-mono text-xs sm:text-sm overflow-x-auto">
              <pre className="text-muted-foreground">
                <span className="text-purple-400">use</span> <span className="text-foreground">anchor_lang::prelude::*;</span>{'\n'}
                {'\n'}
                <span className="text-blue-400">declare_id!</span>(<span className="text-green-400">"Fg6P..."</span>);{'\n'}
                {'\n'}
                <span className="text-purple-400">#[program]</span>{'\n'}
                <span className="text-purple-400">pub mod</span> <span className="text-yellow-400">my_program</span> {'{'}{'\n'}
                {'  '}<span className="text-purple-400">pub fn</span> <span className="text-blue-400">initialize</span>(ctx: Context) {'->'} Result{'<'}<span className="text-yellow-400">()</span>{'>'} {'{'}{'\n'}
                {'    '}<span className="text-blue-400">msg!</span>(<span className="text-green-400">"Hello Solana!"</span>);{'\n'}
                {'    '}<span className="text-purple-400">Ok</span>(()){'  '}{'\n'}
                {'  }'}
                {'\n'}
                {'}'}
              </pre>
            </div>
          </div>

          {/* Hashnode Blog Card */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <a
              href="https://rohitdebugbugs.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full justify-between"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-white font-semibold">Hashnode Blog</h3>
              </div>
              <div className="space-y-2">
                <p className="text-white/90 font-semibold">Web3 & Blockchain</p>
                <p className="text-white/70 text-sm">Technical articles and tutorials</p>
              </div>
            </a>
          </div>

          {/* Mint NFT Card */}
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
            <a
              href="https://metabazaar.vercel.app/mint"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full justify-between"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🎨</div>
                <h3 className="text-white font-semibold">Mint NFT</h3>
              </div>
              <div className="space-y-2">
                <p className="text-white/90 font-semibold text-lg">Create & Mint</p>
                <p className="text-white/70 text-sm">Launch your NFT collection</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-white/80 text-xs">Launch App</span>
                  <svg className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          </div>

          {/* Quick Contact Form */}
          <div className="md:col-span-2 bg-card border border-border rounded-2xl p-6 hover:border-foreground/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Quick Message</h3>
                <p className="text-xs text-muted-foreground">Send me a message</p>
              </div>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/30 border border-border/40 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  required
                />
              </div>
              
              <div className="relative">
                <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/30 border border-border/40 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  required
                />
              </div>
              
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <textarea
                  placeholder="Your message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/30 border border-border/40 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                  rows={3}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Dialog */}
      {showContactDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in" onClick={() => setShowContactDialog(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Let's Connect</h3>
                <p className="text-sm text-muted-foreground">Choose how you'd like to reach out</p>
              </div>
              <button
                onClick={() => setShowContactDialog(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:rohit@example.com"
                className="flex items-center gap-3 p-4 rounded-lg border border-border/40 hover:bg-secondary/30 hover:border-foreground/30 transition-all group"
              >
                <Mail className="h-5 w-5 text-foreground/80 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">rohit@example.com</div>
                </div>
              </a>

              <a
                href="https://github.com/rohiit257"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border/40 hover:bg-secondary/30 hover:border-foreground/30 transition-all group"
              >
                <svg className="h-5 w-5 text-foreground/80 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <div>
                  <div className="font-medium">GitHub</div>
                  <div className="text-sm text-muted-foreground">@rohiit257</div>
                </div>
              </a>

              <a
                href="https://twitter.com/rohitdebugbugs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border/40 hover:bg-secondary/30 hover:border-foreground/30 transition-all group"
              >
                <svg className="h-5 w-5 text-foreground/80 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <div>
                  <div className="font-medium">X / Twitter</div>
                  <div className="text-sm text-muted-foreground">@rohitdebugbugs</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
