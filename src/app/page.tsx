import { Microphone, Headphones, User, Info } from "@phosphor-icons/react/dist/ssr";
import { Waveform } from "@/components/Waveform";
import { ThreeGlobeBackground } from "@/components/ThreeGlobeBackground";
import Link from "next/link";

const navCards = [
  {
    title: "听力练习",
    description: "精选英语听力材料，逐句精听提升理解能力",
    icon: Headphones,
    href: "/listening",
    label: "进入练习",
  },
  {
    title: "口语练习",
    description: "AI 语音评测，实时反馈发音准确度",
    icon: Microphone,
    href: "/speaking",
    label: "进入练习",
  },
  {
    title: "个人中心",
    description: "查看学习记录、收藏内容和学习数据",
    icon: User,
    href: "/profile",
    label: "进入练习",
  },
  {
    title: "关于",
    description: "了解项目背景、技术栈与使用说明",
    icon: Info,
    href: "/about",
    label: "查看",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <ThreeGlobeBackground />
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

      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6">
          {navCards.map((card) => (
            <div
              key={card.href}
              className="flex flex-col items-center w-[260px] rounded-2xl border border-zinc-200 bg-white px-6 py-10"
            >
              <div className="flex flex-col items-center gap-4 flex-1">
                <card.icon
                  weight="duotone"
                  className="w-9 h-9 text-zinc-300"
                />
                <h3 className="text-lg font-semibold text-zinc-900 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-400 text-center leading-relaxed">
                  {card.description}
                </p>
              </div>
              <Link
                href={card.href}
                className="mt-6 inline-flex items-center justify-center h-10 rounded-full bg-zinc-900 px-6 text-sm font-bold text-white transition-colors hover:bg-accent"
              >
                {card.label}
              </Link>
            </div>
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