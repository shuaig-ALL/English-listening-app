import { Microphone, Headphones, User, Info } from "@phosphor-icons/react/dist/ssr";
import { Waveform } from "@/components/Waveform";

const navCards = [
  {
    title: "听力练习",
    subtitle: "Listen & Practice",
    icon: Headphones,
    href: "/listening",
  },
  {
    title: "口语练习",
    subtitle: "Speak & Improve",
    icon: Microphone,
    href: "/speaking",
  },
  {
    title: "个人中心",
    subtitle: "Personal Center",
    icon: User,
    href: "/profile",
  },
  {
    title: "关于",
    subtitle: "About",
    icon: Info,
    href: "/about",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <section className="flex flex-col items-center justify-center min-h-[90dvh] px-6 pt-16 pb-24">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-center text-zinc-900 leading-none">
          英语听说练习
        </h1>

        <p className="mt-4 text-lg md:text-xl text-zinc-500 text-center max-w-lg leading-relaxed">
          提升英语听力口语能力，随时随地高效练习
        </p>

        <div className="mt-14 flex items-center justify-center">
          <Waveform />
        </div>
      </section>

      <section className="flex flex-col items-center px-6 pb-32">
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          {navCards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-8 py-10 transition-colors hover:border-accent hover:bg-zinc-50/50"
            >
              <card.icon
                weight="duotone"
                className="w-9 h-9 text-zinc-300 transition-colors group-hover:text-accent"
              />
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-semibold text-zinc-900 tracking-tight">
                  {card.title}
                </span>
                <span className="text-sm text-zinc-400 font-mono tracking-wide">
                  {card.subtitle}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="flex items-center justify-center py-8 border-t border-zinc-100">
        <p className="text-xs text-zinc-400 font-mono">
          本项目基于 Next.js 构建
        </p>
      </footer>
    </div>
  );
}
