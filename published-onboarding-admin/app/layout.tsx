import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "功能引导管理后台",
  description: "智能创作平台功能引导管理后台交互原型",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

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
