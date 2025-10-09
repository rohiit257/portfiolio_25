"use client";

const technologies = [
  {
    name: "Next.js",
    iconLight: "https://cdn.simpleicons.org/nextdotjs/000000",
    iconDark: "https://cdn.simpleicons.org/nextdotjs/ffffff",
  },
  {
    name: "Express.js",
    iconLight: "https://cdn.simpleicons.org/express/000000",
    iconDark: "https://cdn.simpleicons.org/express/ffffff",
  },
  {
    name: "TypeScript",
    iconLight: "https://cdn.simpleicons.org/typescript/3178C6",
    iconDark: "https://cdn.simpleicons.org/typescript/3178C6",
  },
  {
    name: "C++",
    iconLight: "https://cdn.simpleicons.org/cplusplus/00599C",
    iconDark: "https://cdn.simpleicons.org/cplusplus/00599C",
  },
  {
    name: "Rust",
    iconLight: "https://cdn.simpleicons.org/rust/CE422B",
    iconDark: "https://cdn.simpleicons.org/rust/CE422B",
  },
  {
    name: "Solana",
    iconLight: "https://cdn.simpleicons.org/solana/14F195",
    iconDark: "https://cdn.simpleicons.org/solana/14F195",
  },
  {
    name: "Ethereum",
    iconLight: "https://cdn.simpleicons.org/ethereum/3C3C3D",
    iconDark: "https://cdn.simpleicons.org/ethereum/ffffff",
  },
  {
    name: "Solidity",
    iconLight: "https://cdn.simpleicons.org/solidity/363636",
    iconDark: "https://cdn.simpleicons.org/solidity/ffffff",
  },
];

export function TechStack() {
  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center space-y-2">
            <p className="text-sm sm:text-base text-muted-foreground">
              Technologies I work with
            </p>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 md:gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 p-2 sm:p-2.5 md:p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  {/* Light mode icon */}
                  <img
                    src={tech.iconLight}
                    alt={tech.name}
                    className="w-full h-full object-contain opacity-100 hover:opacity-70 transition-opacity dark:hidden"
                    loading="lazy"
                  />
                  {/* Dark mode icon */}
                  <img
                    src={tech.iconDark}
                    alt={tech.name}
                    className="w-full h-full object-contain opacity-100 hover:opacity-70 transition-opacity hidden dark:block"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <div className="bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                    {tech.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
