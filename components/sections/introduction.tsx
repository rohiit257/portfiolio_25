"use client";

export function Introduction() {
  return (
    <section id="home" className="min-h-[70vh] flex items-center justify-center pt-24 pb-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 animate-scale-in">
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Hello, I&apos;m
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Rohit Shahi
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
            21-year-old developer based in India
          </p>
        </div>

        <div className="space-y-6 text-base text-muted-foreground leading-relaxed max-w-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="hover:text-foreground transition-colors duration-300">
            Currently, in my final year{" "}
            <span className="text-foreground font-medium">Computer Engineering</span>{" "}
            working across full-stack stuff, Blockchain, and Agentic AI Workflows.
            also i am part of{" "}
            <span className="text-foreground font-medium">School of Solana</span>.
          </p>
          <p className="hover:text-foreground transition-colors duration-300">
            In my free time, I enjoy gaming, music, programming and thinking (a lot).
          </p>
        </div>

        <div className="pt-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 animate-float"
          >
            View my work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
