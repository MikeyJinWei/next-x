import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "M",
  description: "A minimalist social app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-between max-w-7xl mx-auto">
          <div className="hidden sm:inline p-3 border-r h-screen">
            <Sidebar />
          </div>

          <div>{children}</div>

          <div className="hidden lg:flex w-96 h-screen lg:flex-col p-3 border-l">
            <div className="sticky top-0 py-2 bg-white">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 text-sm border border-neutral-300 rounded-3xl bg-gray-100 focus:outline-indigo-400"
              />
            </div>
            <News />
          </div>
        </div>
      </body>
    </html>
  );
}
