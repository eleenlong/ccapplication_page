import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const forwardedProto = requestHeaders.get("x-forwarded-proto");
  const protocol = forwardedProto ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: "信用卡专区 · AI 智能荐卡 Demo",
    description: "一个融合个性化排序、办理资格判断与 AI 荐卡的信用卡专区交互原型。",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "信用卡专区 · AI 智能荐卡",
      description: "找到真正适合你的卡",
      images: [new URL("/og.png", base).toString()],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "信用卡专区 · AI 智能荐卡",
      description: "找到真正适合你的卡",
      images: [new URL("/og.png", base).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
