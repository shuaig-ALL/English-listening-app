import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80dvh] gap-4 px-6">
      <h1 className="text-8xl font-bold tracking-tighter text-zinc-200">404</h1>
      <p className="text-sm text-zinc-500">页面不存在</p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center justify-center h-10 rounded-xl bg-zinc-900 px-6 text-sm font-bold text-white transition-colors hover:bg-accent"
      >
        返回首页
      </Link>
    </div>
  );
}
