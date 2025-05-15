import type { Metadata } from "next";
import { SideBar } from "./components/sidebar";
import NavBar from "./components/nav";
import "./globals.css";
import "./fonts.css";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
  <body className="flex min-h-screen bg-gray-100">
    <SideBar />
    <div className="flex flex-col flex-1">
      <NavBar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  </body>
</html>

  );
}


