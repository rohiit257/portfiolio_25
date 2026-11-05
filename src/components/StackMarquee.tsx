import { useSiteContent } from "@/lib/content";
const logo = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

function Row({ stack }: { stack: { name: string; src: string }[] }) {
  return (
    <div className="flex shrink-0 items-center gap-16 pr-16" aria-hidden="true">
      {stack.map((item) => (
        <div
          key={item.name}
          className="group/logo flex w-16 flex-col items-center gap-3"
        >
          <img
            src={item.src}
            alt={item.name}
            loading="lazy"
            onError={(e) => ((e.currentTarget.parentElement as HTMLElement).style.display = "none")}
            className="h-10 w-10 object-contain opacity-60 grayscale transition-all duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0"
          />
          <span className="text-xs text-gray-400 transition-colors group-hover/logo:text-black">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export function StackMarquee() {
  const content = useSiteContent();
  const stack = content.stack.map((name) => ({ name, src: logo(name.toLowerCase().replaceAll(".", "dot").replaceAll("+", "plusplus")) }));
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row stack={stack} />
        <Row stack={stack} />
      </div>
    </div>
  );
}
